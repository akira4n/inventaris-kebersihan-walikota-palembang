import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, Link } from "@inertiajs/react";
import { useState } from "react";
import ConfirmModal from "@/Components/ConfirmModal";

export default function Index({ auth, pengajuans, riwayat }) {
    // --- STATE MODAL & ACTION ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPengajuan, setSelectedPengajuan] = useState(null);
    const [actionType, setActionType] = useState(""); // 'approve' atau 'reject'
    const [isProcessing, setIsProcessing] = useState(false);

    // Helper: Buka File Berkas
    const lihatBerkas = (berkasPath) => {
        if (berkasPath) {
            window.open(`/storage/${berkasPath}`, "_blank");
        } else {
            alert("Tidak ada berkas lampiran.");
        }
    };

    // Helper: Warna Badge Status
    const getStatusBadge = (status) => {
        switch (status) {
            case "Selesai":
                return "bg-green-100 text-green-800 border-green-200";
            case "Disetujui Kabag":
                return "bg-blue-100 text-blue-800 border-blue-200";
            case "Ditolak":
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
        }
    };

    // 1. Trigger Modal Setuju
    const confirmApprove = (pengajuan) => {
        setSelectedPengajuan(pengajuan);
        setActionType("approve");
        setIsModalOpen(true);
    };

    // 2. Trigger Modal Tolak
    const confirmReject = (pengajuan) => {
        setSelectedPengajuan(pengajuan);
        setActionType("reject");
        setIsModalOpen(true);
    };

    // 3. Reset Modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPengajuan(null);
        setActionType("");
    };

    // 4. Eksekusi ke Backend
    const handleExecution = () => {
        if (!selectedPengajuan) return;

        setIsProcessing(true);

        // Tentukan URL berdasarkan aksi
        const routeName =
            actionType === "approve" ? "kabag.setuju" : "kabag.tolak";

        router.patch(
            route(routeName, selectedPengajuan.id),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    closeModal();
                    setIsProcessing(false);
                },
                onError: () => {
                    closeModal();
                    setIsProcessing(false);
                },
            }
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Persetujuan Pengajuan
                </h2>
            }
        >
            <Head title="Persetujuan Kabag" />

            <div className="py-8 px-4 sm:px-6 lg:px-8 space-y-8">
                {/* --- BAGIAN 1: DAFTAR MENUNGGU PERSETUJUAN (PENDING) --- */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 text-gray-900">
                        {/* Header Card */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                                <span className="material-icons-round">
                                    pending_actions
                                </span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">
                                    Menunggu Persetujuan
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Daftar pengajuan yang perlu validasi Anda.
                                </p>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100">
                                <thead className="bg-gray-50/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Tanggal
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Pemohon
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Barang
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Jumlah
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Berkas
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">
                                    {pengajuans.map((p) => (
                                        <tr
                                            key={p.id}
                                            className="group hover:bg-blue-50/30 transition-colors duration-200"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(
                                                    p.created_at
                                                ).toLocaleDateString("id-ID", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-bold text-gray-800">
                                                    {p.user.name}
                                                </div>
                                                <div className="text-xs text-gray-400 flex items-center gap-1">
                                                    <span className="material-icons-round text-[10px]">
                                                        meeting_room
                                                    </span>
                                                    {p.user.ruangan}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {p.item.nama_barang}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    Stok: {p.item.stok}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap font-bold text-blue-600 text-lg">
                                                {p.jumlah}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <button
                                                    onClick={() =>
                                                        lihatBerkas(
                                                            p.berkas_path
                                                        )
                                                    }
                                                    className="text-gray-400 hover:text-blue-600 flex items-center gap-1 transition-colors"
                                                    title="Lihat Berkas"
                                                >
                                                    <span className="material-icons-round text-lg">
                                                        description
                                                    </span>
                                                    <span className="text-xs underline">
                                                        Lihat
                                                    </span>
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end gap-2">
                                                    {/* Tombol Setuju (Memicu Modal) */}
                                                    <button
                                                        onClick={() =>
                                                            confirmApprove(p)
                                                        }
                                                        className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700 transition-all shadow-sm gap-1"
                                                    >
                                                        <span className="material-icons-round text-sm">
                                                            check
                                                        </span>
                                                        Setuju
                                                    </button>

                                                    {/* Tombol Tolak (Memicu Modal) */}
                                                    <button
                                                        onClick={() =>
                                                            confirmReject(p)
                                                        }
                                                        className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-all shadow-sm gap-1"
                                                    >
                                                        <span className="material-icons-round text-sm">
                                                            close
                                                        </span>
                                                        Tolak
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {pengajuans.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="px-6 py-12 text-center text-gray-400 bg-gray-50/30"
                                            >
                                                <div className="flex flex-col items-center justify-center">
                                                    <span className="material-icons-round text-4xl mb-2 text-gray-300">
                                                        task_alt
                                                    </span>
                                                    <p className="text-sm">
                                                        Tidak ada pengajuan yang
                                                        perlu disetujui.
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

                {/* --- BAGIAN 2: RIWAYAT PERSETUJUAN (HISTORY) --- */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 text-gray-900">
                        {/* Header Card */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <span className="material-icons-round">
                                    history
                                </span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">
                                    Riwayat Keputusan
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Arsip pengajuan yang sudah Anda proses.
                                </p>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100">
                                <thead className="bg-gray-50/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Tanggal
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Pemohon
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Barang
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Jumlah
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Berkas
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">
                                    {/* Mapping Data Riwayat */}
                                    {riwayat.data.map((r) => (
                                        <tr
                                            key={r.id}
                                            className="hover:bg-gray-50/50 transition-colors"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(
                                                    r.created_at
                                                ).toLocaleDateString("id-ID", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {r.user.name}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {r.user.ruangan}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {r.item.nama_barang}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-700">
                                                {r.jumlah}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <button
                                                    onClick={() =>
                                                        lihatBerkas(
                                                            r.berkas_path
                                                        )
                                                    }
                                                    className="text-gray-400 hover:text-blue-600 transition-colors underline text-xs"
                                                >
                                                    Lihat
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <span
                                                    className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-bold rounded-md border ${getStatusBadge(
                                                        r.status
                                                    )}`}
                                                >
                                                    {r.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}

                                    {/* Empty State Riwayat */}
                                    {riwayat.data.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="px-6 py-12 text-center text-gray-400 bg-gray-50/30"
                                            >
                                                <p className="text-sm italic">
                                                    Belum ada riwayat keputusan.
                                                </p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination (Hanya muncul jika halaman > 1) */}
                        {riwayat.links.length > 3 && (
                            <div className="mt-6 flex justify-center">
                                <div className="flex gap-1 bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
                                    {riwayat.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || "#"}
                                            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                                                link.active
                                                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                                                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                                            } ${
                                                !link.url
                                                    ? "opacity-50 cursor-not-allowed"
                                                    : ""
                                            }`}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                            preserveScroll
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* --- MODAL KONFIRMASI DINAMIS --- */}
            <ConfirmModal
                show={isModalOpen}
                onClose={closeModal}
                onConfirm={handleExecution}
                processing={isProcessing}
                // Judul Modal
                title={
                    actionType === "approve"
                        ? "Setujui Pengajuan?"
                        : "Tolak Pengajuan?"
                }
                // Konten Modal
                content={
                    actionType === "approve"
                        ? `Anda akan menyetujui permintaan "${selectedPengajuan?.item.nama_barang}" sebanyak ${selectedPengajuan?.jumlah} unit dari ${selectedPengajuan?.user.name}.`
                        : `Anda yakin ingin MENOLAK permintaan "${selectedPengajuan?.item.nama_barang}" dari ${selectedPengajuan?.user.name}?`
                }
                // Teks Tombol
                confirmText={
                    actionType === "approve" ? "Ya, Setujui" : "Ya, Tolak"
                }
                // Warna Tombol (Merah jika Tolak, Biru jika Setuju)
                danger={actionType === "reject"}
            />
        </AuthenticatedLayout>
    );
}
