import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";

export default function Index({ auth, pengajuans, riwayat }) {
    // Ambil 'flash message' (error) dari Inertia
    const { flash } = usePage().props;

    const lihatBerkas = (berkasPath) => {
        window.open(`/storage/${berkasPath}`, "_blank");
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Proses Pengajuan
                </h2>
            }
        >
            <Head title="Proses Pengajuan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Tampilkan pesan error jika ada */}
                    {flash?.error && (
                        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                            {flash.error}
                        </div>
                    )}

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium">
                                Daftar Pengajuan Siap Untuk Diproses
                            </h3>
                            <p className="mb-4">
                                Pengajuan ini sudah di Approve oleh Kepala
                                Bagian, dan siap untuk diproses oleh admin.
                            </p>

                            {/* TABEL PROSES */}
                            <table className="min-w-full divide-y divide-gray-200 mt-4">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Tgl. Ajuan
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            NIP
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Pengaju
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Ruangan
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Barang (Stok Saat Ini)
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Jumlah Diminta
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Berkas
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {pengajuans.map((p) => (
                                        <tr key={p.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {new Date(
                                                    p.created_at
                                                ).toLocaleDateString("id-ID")}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {p.user.nip}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {p.user.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {p.user.ruangan}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {p.item.nama_barang} (
                                                {p.item.stok})
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap font-bold text-red-600">
                                                {p.jumlah}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() =>
                                                        lihatBerkas(
                                                            p.berkas_path
                                                        )
                                                    }
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    Lihat
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                {/* Tombol Proses */}
                                                <Link
                                                    href={route(
                                                        "admin.proses",
                                                        p.id
                                                    )}
                                                    method="patch"
                                                    as="button"
                                                    className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                                                    onBefore={() =>
                                                        confirm(
                                                            "Proses dan kurangi stok untuk pengajuan ini?"
                                                        )
                                                    }
                                                >
                                                    Proses
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                    {pengajuans.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan="8"
                                                className="px-6 py-4 text-center text-gray-500"
                                            >
                                                Tidak ada pengajuan yang siap
                                                diproses.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pb-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium">
                                Riwayat Pengajuan
                            </h3>

                            <table className="min-w-full divide-y divide-gray-200 mt-4">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Tgl. Ajuan
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Pengaju
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Barang
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Jumlah
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {/* PERUBAHAN: Gunakan riwayat.data.map */}
                                    {riwayat.data.map((r) => (
                                        <tr key={r.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {new Date(
                                                    r.created_at
                                                ).toLocaleDateString("id-ID")}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {r.user.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {r.item.nama_barang}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap font-bold text-red-600">
                                                {r.jumlah}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-green-500 font-medium">
                                                {r.status}
                                            </td>
                                        </tr>
                                    ))}
                                    {riwayat.data.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="px-6 py-4 text-center text-gray-500"
                                            >
                                                Tidak Ada Riwayat Pengajuan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            {/* TOMBOL PAGINATION */}
                            <div className="mt-4 flex justify-center">
                                {riwayat.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || "#"}
                                        className={`px-3 py-1 mx-1 text-sm border rounded ${
                                            link.active
                                                ? "bg-blue-600 text-white"
                                                : "bg-white text-gray-700"
                                        } ${
                                            !link.url
                                                ? "opacity-50 cursor-not-allowed"
                                                : ""
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                        preserveScroll // Penting agar user tidak 'terlempar' ke atas halaman
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
