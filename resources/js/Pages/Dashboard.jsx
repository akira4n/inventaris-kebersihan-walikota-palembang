import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth, stats }) {
    const currentDate = new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

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

            <div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* TAMPILAN KHUSUS STAFF */}
                    {auth.user.role === "staff" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Card 1: Total Pengajuan */}
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

                            {/* Card 2: Lokasi Ruangan */}
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

                            {/* Card 3: Belum Selesai */}
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

                            {/* Card 4: Selesai */}
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

                    {/* Placeholder untuk Admin/Kabag (Sementara) */}
                    {auth.user.role !== "staff" && (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <p className="text-gray-500">
                                Dashboard untuk Admin dan Kabag akan kita bangun
                                setelah ini...
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
