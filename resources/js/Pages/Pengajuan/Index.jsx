import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index({ auth, pengajuans }) {
    // Helper Hitung Lama Ajuan
    const hitungLamaAjuan = (tanggal) => {
        const now = new Date();
        const then = new Date(tanggal);
        const diffMs = now.getTime() - then.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "Hari ini";
        if (diffDays === 1) return "Kemarin";
        return `${diffDays} hari lalu`;
    };

    // Helper Warna Badge Status
    const getStatusBadge = (status) => {
        switch (status) {
            case "Selesai":
                return "bg-green-100 text-green-800 border-green-200";
            case "Disetujui Kabag":
                return "bg-blue-100 text-blue-800 border-blue-200";
            case "Pending":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "Ditolak":
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} header={"Riwayat Pengajuan"}>
            <Head title="Riwayat Pengajuan" />

            <div className="py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                            <span className="material-icons-round text-2xl">
                                history_edu
                            </span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">
                                Daftar Pengajuan Saya
                            </h3>
                            <p className="text-sm text-gray-500">
                                Pantau status permintaan barang Anda di sini.
                            </p>
                        </div>
                    </div>

                    {/* Tabel Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100">
                                <thead className="bg-gray-50/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            ID / Tanggal
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Barang
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Jumlah
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Waktu Berlalu
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">
                                    {pengajuans.map((p) => (
                                        <tr
                                            key={p.id}
                                            className="group hover:bg-blue-50/30 transition-colors duration-200"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-bold text-gray-800">
                                                    #{p.id}
                                                </div>
                                                <div className="text-xs text-gray-400 font-mono mt-0.5 flex items-center gap-1">
                                                    <span className="material-icons-round text-[10px]">
                                                        event
                                                    </span>
                                                    {new Date(
                                                        p.created_at
                                                    ).toLocaleDateString(
                                                        "id-ID",
                                                        {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900 group-hover:text-blue-800 transition-colors">
                                                    {p.item.nama_barang}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded-lg">
                                                    {p.jumlah} Unit
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <span className="material-icons-round text-sm text-gray-400">
                                                        schedule
                                                    </span>
                                                    {hitungLamaAjuan(
                                                        p.created_at
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <span
                                                    className={`px-3 py-1 inline-flex text-xs font-bold uppercase tracking-wide rounded-lg border ${getStatusBadge(
                                                        p.status
                                                    )}`}
                                                >
                                                    {p.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}

                                    {/* Empty State */}
                                    {pengajuans.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="px-6 py-12 text-center text-gray-400 bg-gray-50/30"
                                            >
                                                <div className="flex flex-col items-center justify-center">
                                                    <span className="material-icons-round text-4xl mb-2 text-gray-300">
                                                        inbox
                                                    </span>
                                                    <p className="text-sm">
                                                        Belum ada riwayat
                                                        pengajuan.
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
