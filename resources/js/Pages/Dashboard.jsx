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
                borderColor: "rgb(34, 197, 94)",
                backgroundColor: "rgba(34, 197, 94, 0.5)",
                tension: 0.3,
            },
            {
                label: "Barang Keluar",
                data: stats.charts?.keluar || [],
                borderColor: "rgb(239, 68, 68)",
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
                borderColor: "rgb(59, 130, 246)",
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
                    stepSize: 1,
                },
            },
        },
    };

    return (
        <AuthenticatedLayout user={auth.user} header={"Dashboard"}>
            <Head title="Dashboard" />

            <div className="py-8 px-4 sm:px-6 lg:px-8">
                {" "}
                {/* Reduced top padding for cleaner look */}
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8">
                    {" "}
                    {/* Added margin bottom */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 leading-tight">
                            {" "}
                            {/* Increased font size */}
                            Halo, Selamat Datang,{" "}
                            <span className="text-blue-600">
                                {auth.user.name}!
                            </span>
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Have a nice day!
                        </p>
                    </div>
                    <div className="text-sm font-medium text-gray-500 mt-4 md:mt-0 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 flex items-center gap-2">
                        {" "}
                        {/* Styled date display */}
                        <span className="material-icons-round text-gray-400 text-base">
                            calendar_today
                        </span>
                        {currentDate}
                    </div>
                </div>
                <div className="max-w-7xl mx-auto">
                    {/* staff */}
                    {auth.user.role === "staff" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Card 1 */}
                            <div className="bg-white overflow-hidden shadow-sm rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow relative">
                                <div className="absolute top-4 right-4 p-2 bg-blue-50 rounded-xl text-blue-600">
                                    <span className="material-icons-round text-2xl">
                                        assignment
                                    </span>
                                </div>
                                <div className="text-gray-500 text-sm font-bold uppercase tracking-wider">
                                    Total Pengajuan Saya
                                </div>
                                <div className="mt-4 text-4xl font-bold text-gray-800">
                                    {stats.total_pengajuan}
                                </div>
                                <div className="mt-2 text-sm text-gray-400 flex items-center gap-1">
                                    <span className="material-icons-round text-base">
                                        history
                                    </span>
                                    Riwayat keseluruhan
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-white overflow-hidden shadow-sm rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow relative">
                                <div className="absolute top-4 right-4 p-2 bg-indigo-50 rounded-xl text-indigo-600">
                                    <span className="material-icons-round text-2xl">
                                        room
                                    </span>
                                </div>
                                <div className="text-gray-500 text-sm font-bold uppercase tracking-wider">
                                    Lokasi Ruangan
                                </div>
                                <div className="mt-4 text-2xl font-bold text-gray-800 truncate">
                                    {stats.ruangan}
                                </div>
                                <div className="mt-2 text-sm text-gray-400 flex items-center gap-1">
                                    <span className="material-icons-round text-base">
                                        info
                                    </span>
                                    Ruangan terdaftar
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-white overflow-hidden shadow-sm rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow relative">
                                <div className="absolute top-4 right-4 p-2 bg-yellow-50 rounded-xl text-yellow-600">
                                    <span className="material-icons-round text-2xl">
                                        pending_actions
                                    </span>
                                </div>
                                <div className="text-gray-500 text-sm font-bold uppercase tracking-wider">
                                    Pengajuan Proses
                                </div>
                                <div className="mt-4 text-4xl font-bold text-yellow-600">
                                    {stats.belum_selesai}
                                </div>
                                <div className="mt-2 text-sm text-gray-400 flex items-center gap-1">
                                    <span className="material-icons-round text-base">
                                        schedule
                                    </span>
                                    Menunggu persetujuan
                                </div>
                            </div>

                            {/* Card 4 */}
                            <div className="bg-white overflow-hidden shadow-sm rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow relative">
                                <div className="absolute top-4 right-4 p-2 bg-green-50 rounded-xl text-green-600">
                                    <span className="material-icons-round text-2xl">
                                        check_circle
                                    </span>
                                </div>
                                <div className="text-gray-500 text-sm font-bold uppercase tracking-wider">
                                    Pengajuan Selesai
                                </div>
                                <div className="mt-4 text-4xl font-bold text-green-600">
                                    {stats.selesai}
                                </div>
                                <div className="mt-2 text-sm text-gray-400 flex items-center gap-1">
                                    <span className="material-icons-round text-base">
                                        done_all
                                    </span>
                                    Barang telah diterima
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Kabag & Admin */}
                    {auth.user.role !== "staff" && (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Admin Card 1 */}
                                <div className="bg-white overflow-hidden shadow-sm rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow relative">
                                    <div className="absolute top-4 right-4 p-2 bg-blue-50 rounded-xl text-blue-600">
                                        <span className="material-icons-round text-2xl">
                                            analytics
                                        </span>
                                    </div>
                                    <div className="text-gray-500 text-sm font-bold uppercase tracking-wider">
                                        Total Semua Pengajuan
                                    </div>
                                    <div className="mt-4 text-4xl font-bold text-gray-800">
                                        {stats.total_pengajuan}
                                    </div>
                                    <div className="mt-2 text-sm text-gray-400">
                                        Total akumulasi
                                    </div>
                                </div>

                                {/* Admin Card 2 */}
                                <div className="bg-white overflow-hidden shadow-sm rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow relative">
                                    <div className="absolute top-4 right-4 p-2 bg-yellow-50 rounded-xl text-yellow-600">
                                        <span className="material-icons-round text-2xl">
                                            hourglass_empty
                                        </span>
                                    </div>
                                    <div className="text-gray-500 text-sm font-bold uppercase tracking-wider">
                                        Pengajuan Belum Selesai
                                    </div>
                                    <div className="mt-4 text-4xl font-bold text-yellow-600">
                                        {stats.belum_selesai}
                                    </div>
                                    <div className="mt-2 text-sm text-gray-400">
                                        Pending / Disetujui Kabag
                                    </div>
                                </div>

                                {/* Admin Card 3 */}
                                <div className="bg-white overflow-hidden shadow-sm rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow relative">
                                    <div className="absolute top-4 right-4 p-2 bg-green-50 rounded-xl text-green-600">
                                        <span className="material-icons-round text-2xl">
                                            verified
                                        </span>
                                    </div>
                                    <div className="text-gray-500 text-sm font-bold uppercase tracking-wider">
                                        Pengajuan Selesai
                                    </div>
                                    <div className="mt-4 text-4xl font-bold text-green-600">
                                        {stats.selesai}
                                    </div>
                                    <div className="mt-2 text-sm text-gray-400">
                                        Barang Diterima
                                    </div>
                                </div>
                            </div>

                            {/* Filter & Charts Section */}
                            <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200">
                                {" "}
                                {/* Added a container for charts */}
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                        <span className="material-icons-round text-blue-600">
                                            insights
                                        </span>
                                        Analisis Data
                                    </h3>
                                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-gray-200 shadow-sm">
                                        <label
                                            htmlFor="year"
                                            className="font-medium text-gray-500 uppercase text-xs"
                                        >
                                            Tahun:
                                        </label>
                                        <select
                                            id="year"
                                            value={stats.charts?.year}
                                            onChange={handleYearChange}
                                            className="border-none text-sm font-bold text-gray-700 focus:ring-0 cursor-pointer bg-transparent p-0"
                                        >
                                            {yearsList.map((y) => (
                                                <option key={y} value={y}>
                                                    {y}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="bg-white overflow-hidden shadow-sm rounded-2xl p-6 border border-gray-100">
                                        <h3 className="text-sm font-bold text-gray-500 uppercase mb-6 text-center tracking-wider">
                                            Statistik Mutasi Barang
                                        </h3>
                                        <div className="relative h-72 w-full">
                                            {" "}
                                            {/* Increased height slightly */}
                                            <Line
                                                options={chartOptions}
                                                data={dataMutasi}
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-white overflow-hidden shadow-sm rounded-2xl p-6 border border-gray-100">
                                        <h3 className="text-sm font-bold text-gray-500 uppercase mb-6 text-center tracking-wider">
                                            Statistik Frekuensi Pengajuan
                                        </h3>
                                        <div className="relative h-72 w-full">
                                            {" "}
                                            {/* Increased height slightly */}
                                            <Line
                                                options={chartOptions}
                                                data={dataPengajuan}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
