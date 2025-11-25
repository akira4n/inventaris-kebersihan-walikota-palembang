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

            $dataMasuk = [];
            $dataKeluar = [];
            $dataPengajuan = [];

            for ($i = 1; $i <= 12; $i++) {
                $dataMasuk[] = StokMutasi::whereYear('created_at', $year)
                    ->whereMonth('created_at', $i)
                    ->where('tipe', 'masuk')
                    ->sum('jumlah');

                $dataKeluar[] = abs(StokMutasi::whereYear('created_at', $year)
                    ->whereMonth('created_at', $i)
                    ->where('tipe', 'keluar')
                    ->sum('jumlah'));

                $dataPengajuan[] = Pengajuan::whereYear('created_at', $year)
                    ->whereMonth('created_at', $i)
                    ->count();
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
