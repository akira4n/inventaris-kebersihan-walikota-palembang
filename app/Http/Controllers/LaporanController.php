<?php

namespace App\Http\Controllers;

use App\Exports\StokLaporanExport;
use App\Models\Item;
use App\Models\StokMutasi;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class LaporanController extends Controller
{
    public function indexLaporan(Request $request)
    {   
        $request->validate([
            'per_page' => 'nullable|integer|in:5,10,20,50'
        ]);

        $now = Carbon::now();
        $bulanIni = $now->month;
        $tahunIni = $now->year;

        $barangMasuk = StokMutasi::where('tipe', 'masuk')
                        ->whereMonth('created_at', $bulanIni)
                        ->whereYear('created_at', $tahunIni)
                        ->sum('jumlah');

        $barangKeluar = StokMutasi::where('tipe', 'keluar')
                        ->whereMonth('created_at', $bulanIni)
                        ->whereYear('created_at', $tahunIni)
                        ->sum('jumlah');

        $sisaStok = Item::sum('stok');

        $totalAset = DB::table('items')
                        ->selectRaw('SUM(stok * harga) as total')
                        ->value('total');

        $perPage = $request->input('per_page', 10);
        
        $history = StokMutasi::with(['item', 'user'])
                    ->whereMonth('created_at', $bulanIni)
                    ->whereYear('created_at', $tahunIni)
                    ->latest()
                    ->paginate($perPage)
                    ->withQueryString();

        return Inertia::render('Laporan/Index', [
            'summary' =>
            [
                'masuk' => $barangMasuk,
                'keluar' => abs($barangKeluar),
                'sisa_stok' => $sisaStok,
                'total_aset' => $totalAset ?? 0, 
            ],
            'history' => $history,
            'filters' => $request->only(['per_page']),
        ]);
    }

    public function LaporanBulan(Request $request)
    {
        $data = $request->validate([
            'bulan' => 'required|integer|min:1|max:12',
            'tahun' => 'required|integer|min:2020|max:2099',
        ]);

        $bulan = $data['bulan'];
        $tahun = $data['tahun'];

        $tanggalAwalBulan = Carbon::create($tahun, $bulan, 1)->startOfMonth();
        $tanggalAkhirBulan = Carbon::create($tahun, $bulan, 1)->endOfMonth();

        $hasil = $this->hitungDataLaporan($tanggalAwalBulan, $tanggalAkhirBulan);

        $namaBulan = $tanggalAwalBulan->monthName; 
        $periode = "LAPORAN PERIODE " . strtoupper($namaBulan) . " $tahun";

        $fileName = "laporan-stok-bulanan-{$bulan}-{$tahun}.xlsx";

        return (new StokLaporanExport($hasil['data'], $hasil['totals'], $periode))
            ->download($fileName);
    }

    public function LaporanSemester(Request $request)
    {
        $data = $request->validate([
            'semester' => 'required|integer|in:1,2',
            'tahun' => 'required|integer|min:2020|max:2099',
        ]);

        $semester = $data['semester'];
        $tahun = $data['tahun'];

        if ($semester == 1) {
            $tanggalAwalSemester = Carbon::create($tahun, 1, 1)->startOfMonth();
            $tanggalAkhirSemester = Carbon::create($tahun, 6, 1)->endOfMonth();
        } else {
            $tanggalAwalSemester = Carbon::create($tahun, 7, 1)->startOfMonth();
            $tanggalAkhirSemester = Carbon::create($tahun, 12, 1)->endOfMonth();
        }

        $hasil = $this->hitungDataLaporan($tanggalAwalSemester, $tanggalAkhirSemester);

        $periode = "LAPORAN PERIODE SEMESTER $semester TAHUN $tahun";

        $fileName = "laporan-stok-semester-{$semester}-{$tahun}.xlsx";

        return (new StokLaporanExport($hasil['data'], $hasil['totals'], $periode))
            ->download($fileName);
    }

    private function hitungDataLaporan(Carbon $tanggalAwal, Carbon $tanggalAkhir)
    {
        $items = Item::all();

        $data = [];

        $totals = [
            'stokAwal_Tampilan' => 0,
            'stokAwal_Jumlah' => 0,
            'pengeluaran_Volume' => 0,
            'pengeluaran_Jumlah' => 0,
            'stokAkhir_Volume' => 0,
            'stokAkhir_Jumlah' => 0,
        ];

        foreach ($items as $item) {
            $harga = $item->harga;

            $stokAwal_BulanLalu = StokMutasi::where('item_id', $item->id)
                ->where('created_at', '<', $tanggalAwal)
                ->sum('jumlah');

            $barangMasuk_BulanIni = StokMutasi::where('item_id', $item->id)
                ->where('tipe', 'masuk')
                ->whereBetween('created_at', [$tanggalAwal, $tanggalAkhir])
                ->sum('jumlah');

            $pengeluaran_BulanIni = StokMutasi::where('item_id', $item->id)
                ->where('tipe', 'keluar')
                ->whereBetween('created_at', [$tanggalAwal, $tanggalAkhir])
                ->sum('jumlah');

            $stokAkhir = StokMutasi::where('item_id', $item->id)
                ->where('created_at', '<=', $tanggalAkhir)
                ->sum('jumlah');

            $stokAwal_Tampilan = $stokAwal_BulanLalu + $barangMasuk_BulanIni;
            $pengeluaran_Volume = abs($pengeluaran_BulanIni);

            $data[] = [
                'nama_barang' => $item->nama_barang,
                'harga' => $harga,
                'stokAwal_Tampilan' => $stokAwal_Tampilan,
                'pengeluaran_Volume' => $pengeluaran_Volume,
                'stokAkhir' => $stokAkhir,
            ];

            $totals['stokAwal_Tampilan'] += $stokAwal_Tampilan;
            $totals['stokAwal_Jumlah'] += $stokAwal_Tampilan * $harga;
            $totals['pengeluaran_Volume'] += $pengeluaran_Volume;
            $totals['pengeluaran_Jumlah'] += $pengeluaran_Volume * $harga;
            $totals['stokAkhir_Volume'] += $stokAkhir;
            $totals['stokAkhir_Jumlah'] += $stokAkhir * $harga;
        }

        return ['data' => $data, 'totals' => $totals];
    }
}
