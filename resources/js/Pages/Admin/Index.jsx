import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, router, Link } from "@inertiajs/react";
import { useState } from "react";
import ConfirmModal from "@/Components/ConfirmModal";

export default function Index({ auth, pengajuans, riwayat }) {
    const { flash } = usePage().props;

    const [confirmingProcess, setConfirmingProcess] = useState(false);
    const [pengajuanToProcess, setPengajuanToProcess] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const lihatBerkas = (berkasPath) => {
        if (berkasPath) {
            window.open(`/storage/${berkasPath}`, "_blank");
        } else {
            alert("Tidak ada berkas lampiran.");
        }
    };

    const confirmProcess = (pengajuan) => {
        setPengajuanToProcess(pengajuan);
        setConfirmingProcess(true);
    };

    const closeModal = () => {
        setConfirmingProcess(false);
        setPengajuanToProcess(null);
    };

    // proses handler
    const handleProcess = () => {
        if (!pengajuanToProcess) return;

        setIsProcessing(true);

        // route ke admin.proses
        router.patch(
            route("admin.proses", pengajuanToProcess.id),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    closeModal();
                    setIsProcessing(false);
                },
                onError: () => {
                    setIsProcessing(false);
                    closeModal();
                },
            }
        );
    };

    return (
        <AuthenticatedLayout user={auth.user} header={"Proses Pengajuan Admin"}>
            <Head title="Proses Pengajuan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    {/* Flash Messages */}
                    {flash?.message && (
                        <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-xl mb-6 flex items-center gap-2">
                            <span className="material-icons-round text-sm">
                                check_circle
                            </span>
                            {flash.message}
                        </div>
                    )}
                    {flash?.error && (
                        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl mb-6 flex items-center gap-2">
                            <span className="material-icons-round text-sm">
                                error
                            </span>
                            {flash.error}
                        </div>
                    )}

                    {/* --- BAGIAN 1: DAFTAR SIAP PROSES --- */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100">
                        <div className="p-6 text-gray-900">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                    <span className="material-icons-round">
                                        assignment_turned_in
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">
                                        Daftar Pengajuan Siap Proses
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Pengajuan yang telah disetujui Kabag dan
                                        menunggu eksekusi stok.
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
                                                    ).toLocaleDateString(
                                                        "id-ID",
                                                        {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-bold text-gray-800 group-hover:text-blue-800 transition-colors">
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
                                                        Sisa Stok:{" "}
                                                        <span className="font-semibold">
                                                            {p.item.stok}
                                                        </span>
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
                                                    {p.item.stok >= p.jumlah ? (
                                                        <button
                                                            onClick={() =>
                                                                confirmProcess(
                                                                    p
                                                                )
                                                            }
                                                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg shadow hover:bg-blue-700 transition-all transform hover:scale-105 active:scale-95 gap-2"
                                                        >
                                                            <span className="material-icons-round text-sm">
                                                                check_circle
                                                            </span>
                                                            Proses Barang
                                                        </button>
                                                    ) : (
                                                        <button
                                                            disabled={true}
                                                            className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white text-xs font-bold rounded-lg shadow gap-2 opacity-60"
                                                        >
                                                            <span className="material-icons-round text-sm">
                                                                error
                                                            </span>
                                                            Stok Tidak Cukup
                                                        </button>
                                                    )}
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
                                                            Semua beres! Tidak
                                                            ada pengajuan
                                                            pending.
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

                    {/* --- BAGIAN 2: RIWAYAT PROSES (SELESAI) --- */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100">
                        <div className="p-6 text-gray-900">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-gray-100 text-gray-600 rounded-lg">
                                    <span className="material-icons-round">
                                        history
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800">
                                    Riwayat Proses (Selesai)
                                </h3>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-100">
                                    <thead className="bg-gray-50/50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                                Tgl Proses
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                                Pemohon
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                                Ruangan
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                                Barang
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                                Jumlah
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        {riwayat &&
                                        riwayat.data &&
                                        riwayat.data.length > 0 ? (
                                            riwayat.data.map((r) => (
                                                <tr
                                                    key={r.id}
                                                    className="hover:bg-gray-50/50 transition-colors"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(
                                                            r.updated_at
                                                        ).toLocaleDateString(
                                                            "id-ID",
                                                            {
                                                                day: "numeric",
                                                                month: "short",
                                                                year: "numeric",
                                                            }
                                                        )}
                                                        <div className="text-xs text-gray-400 mt-0.5">
                                                            {new Date(
                                                                r.updated_at
                                                            ).toLocaleTimeString(
                                                                "id-ID",
                                                                {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                }
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {r.user.name}
                                                        </div>
                                                        <div className="text-xs text-gray-400 font-mono">
                                                            NIP: {r.user.nip}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {r.user.ruangan}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                                        {r.item.nama_barang}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-700">
                                                        {r.jumlah} Unit
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-bold rounded-md bg-green-100 text-green-800 border border-green-200">
                                                            Selesai
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    className="px-6 py-12 text-center text-gray-400 bg-gray-50/30"
                                                >
                                                    <p className="text-sm italic">
                                                        Belum ada riwayat
                                                        pengadaan yang selesai.
                                                    </p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination (Logic > 3) */}
                            {riwayat &&
                                riwayat.links &&
                                riwayat.links.length > 3 && (
                                    <div className="mt-6 flex justify-center">
                                        <div className="flex gap-1 bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
                                            {riwayat.links.map(
                                                (link, index) => (
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
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmModal
                show={confirmingProcess}
                onClose={closeModal}
                onConfirm={handleProcess}
                processing={isProcessing}
                title="Proses Pengajuan?"
                content={`Apakah Anda yakin ingin memproses pengajuan untuk "${pengajuanToProcess?.item.nama_barang}" sebanyak ${pengajuanToProcess?.jumlah} unit? Stok barang akan berkurang secara otomatis.`}
                confirmText="Ya, Proses"
                danger={false}
            />
        </AuthenticatedLayout>
    );
}
