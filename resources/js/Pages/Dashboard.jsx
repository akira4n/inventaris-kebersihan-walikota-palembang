import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function Dashboard({ auth, stats }) {
    const currentDate = new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const currentYear = new Date().getFullYear();
    const startYear = 2020;
    const yearsList = Array.from(
        { length: currentYear - startYear + 1 },
        (_, i) => startYear + i
    );

    const handleYearChange = (e) => {
        router.get(
            route("dashboard"),
            { year: e.target.value },
            { preserveState: true, preserveScroll: true }
        );
    };

    const chartLabels = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agt",
        "Sep",
        "Okt",
        "Nov",
        "Des",
    ];

    const dataMutasi = {
        labels: chartLabels,
        datasets: [
            {
                label: "Barang Masuk",
                data: stats.charts?.masuk || [],
                borderColor: "rgb(34, 197, 94)", // Hijau
                backgroundColor: "rgba(34, 197, 94, 0.5)",
                tension: 0.3, // Garis agak melengkung
            },
            {
                label: "Barang Keluar",
                data: stats.charts?.keluar || [],
                borderColor: "rgb(239, 68, 68)", // Merah
                backgroundColor: "rgba(239, 68, 68, 0.5)",
                tension: 0.3,
            },
        ],
    };

    const dataPengajuan = {
        labels: chartLabels,
        datasets: [
            {
                label: "Total Pengajuan",
                data: stats.charts?.pengajuan || [],
                borderColor: "rgb(59, 130, 246)", // Biru
                backgroundColor: "rgba(59, 130, 246, 0.5)",
                tension: 0.3,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1, // Agar sumbu Y bilangan bulat
                },
            },
        },
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Halo, Selamat Datang, {auth.user.name}!
                </h2>
                <div className="text-sm text-gray-500 mt-2 md:mt-0">
                    {currentDate}
                </div>
            </div>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                {/* staff */}
                {auth.user.role === "staff" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-blue-500 hover:shadow-md transition">
                            <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">
                                Total Pengajuan Saya
                            </div>
                            <div className="mt-2 text-4xl font-bold text-gray-800">
                                {stats.total_pengajuan}
                            </div>
                            <div className="mt-1 text-sm text-gray-400">
                                Riwayat keseluruhan
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-indigo-500 hover:shadow-md transition">
                            <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">
                                Lokasi Ruangan
                            </div>
                            <div className="mt-2 text-2xl font-bold text-gray-800 truncate">
                                {stats.ruangan}
                            </div>
                            <div className="mt-1 text-sm text-gray-400">
                                Ruangan terdaftar
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-yellow-500 hover:shadow-md transition">
                            <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">
                                Pengajuan Proses
                            </div>
                            <div className="mt-2 text-4xl font-bold text-yellow-600">
                                {stats.belum_selesai}
                            </div>
                            <div className="mt-1 text-sm text-gray-400">
                                Menunggu persetujuan/proses
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-green-500 hover:shadow-md transition">
                            <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">
                                Pengajuan Selesai
                            </div>
                            <div className="mt-2 text-4xl font-bold text-green-600">
                                {stats.selesai}
                            </div>
                            <div className="mt-1 text-sm text-gray-400">
                                Barang telah diterima
                            </div>
                        </div>
                    </div>
                )}

                {/* Kabag & Admin */}
                {auth.user.role !== "staff" && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-t-4 border-blue-500">
                                <div className="text-gray-500 text-sm font-bold uppercase">
                                    Total Semua Pengajuan
                                </div>
                                <div className="mt-2 text-4xl font-bold text-gray-800">
                                    {stats.total_pengajuan}
                                </div>
                            </div>
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-t-4 border-yellow-500">
                                <div className="text-gray-500 text-sm font-bold uppercase">
                                    Pengajuan Belum Selesai
                                </div>
                                <div className="mt-2 text-4xl font-bold text-yellow-600">
                                    {stats.belum_selesai}
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                    Pending / Disetujui Kabag
                                </div>
                            </div>
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-t-4 border-green-500">
                                <div className="text-gray-500 text-sm font-bold uppercase">
                                    Pengajuan Selesai
                                </div>
                                <div className="mt-2 text-4xl font-bold text-green-600">
                                    {stats.selesai}
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                    Barang Diterima
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end items-center space-x-2">
                            <label
                                htmlFor="year"
                                className="text-sm font-medium text-gray-700"
                            >
                                Filter Tahun:
                            </label>
                            <select
                                id="year"
                                value={stats.charts?.year}
                                onChange={handleYearChange}
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-sm"
                            >
                                {yearsList.map((y) => (
                                    <option key={y} value={y}>
                                        {y}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                <h3 className="text-lg font-bold text-gray-700 mb-4 text-center">
                                    Statistik Mutasi Barang
                                </h3>
                                <div className="relative h-64 w-full">
                                    <Line
                                        options={chartOptions}
                                        data={dataMutasi}
                                    />
                                </div>
                            </div>

                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                <h3 className="text-lg font-bold text-gray-700 mb-4 text-center">
                                    Statistik Frekuensi Pengajuan
                                </h3>
                                <div className="relative h-64 w-full">
                                    <Line
                                        options={chartOptions}
                                        data={dataPengajuan}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
