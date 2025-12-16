<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Pengajuan;
use App\Models\StokMutasi;

class DashboardController extends Controller
{
    public function index(Request $request)
    {   
        $request->validate([
            'year' => 'nullable|integer|digits:4|min:2020|max:2099',
        ]);

        $user = Auth::user();
        $stats = [];

        $year = $request->input('year', date('Y'));

        if($user->role === 'staff'){
            $stats['total_pengajuan'] = Pengajuan::where('user_id', $user->id)
                                        ->count();

            $stats['ruangan'] = $user->ruangan;

            $stats['belum_selesai'] = Pengajuan::where('user_id', $user->id)
                                        ->whereIn('status', ['Pending', 'Disetujui Kabag'])
                                        ->count();
            
            $stats['selesai'] = Pengajuan::where('user_id', $user->id)
                                    ->where('status', 'Selesai')
                                    ->count();
        } else {
            $stats['total_pengajuan'] = Pengajuan::count();
            $stats['belum_selesai'] = Pengajuan::whereIn('status', ['Pending', 'Disetujui Kabag'])->count();
            $stats['selesai'] = Pengajuan::where('status', 'Selesai')->count();

            $masukPerBulan = StokMutasi::selectRaw('MONTH(created_at) as bulan, SUM(jumlah) as total')
                ->whereYear('created_at', $year)
                ->where('tipe', 'masuk')
                ->groupBy('bulan')
                ->pluck('total', 'bulan');

            $keluarPerBulan = StokMutasi::selectRaw('MONTH(created_at) as bulan, SUM(jumlah) as total')
                ->whereYear('created_at', $year)
                ->where('tipe', 'keluar')
                ->groupBy('bulan')
                ->pluck('total', 'bulan');

            $pengajuanPerBulan = Pengajuan::selectRaw('MONTH(created_at) as bulan, COUNT(*) as total')
                ->whereYear('created_at', $year)
                ->groupBy('bulan')
                ->pluck('total', 'bulan');

            $dataMasuk = [];
            $dataKeluar = [];
            $dataPengajuan = [];

            for ($i = 1; $i <= 12; $i++) {
                $dataMasuk[] = $masukPerBulan[$i] ?? 0;
                $dataKeluar[] = abs($keluarPerBulan[$i] ?? 0);
                $dataPengajuan[] = $pengajuanPerBulan[$i] ?? 0;
            }

            $stats['charts'] = [
                'masuk' => $dataMasuk,
                'keluar' => $dataKeluar,
                'pengajuan' => $dataPengajuan,
                'year' => $year 
            ];
        }

        return Inertia::render('Dashboard', [
            'stats' => $stats
        ]);
    }
}
