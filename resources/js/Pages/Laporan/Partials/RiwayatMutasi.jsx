import { Link, router } from "@inertiajs/react";
import { useState } from "react";

export function RiwayatMutasi({ history, filters }) {
    const [perPage, setPerPage] = useState(filters.per_page || 10);

    const handlePerPageChange = (e) => {
        const value = e.target.value;
        setPerPage(value);
        router.get(
            route("laporan.stok.page"),
            { per_page: value },
            { preserveState: true, replace: true }
        );
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <span className="material-icons-round">history</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">
                            Riwayat Mutasi
                        </h3>
                        <p className="text-sm text-gray-500">
                            Aktivitas keluar masuk barang bulan ini.
                        </p>
                    </div>
                </div>

                {/* Filter Dropdown */}
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                    <span className="text-xs font-bold text-gray-500 uppercase">
                        Show
                    </span>
                    <select
                        value={perPage}
                        onChange={handlePerPageChange}
                        className="bg-transparent border-none text-sm font-medium focus:ring-0 cursor-pointer p-0 text-gray-700"
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
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
                                Barang
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                Eksekutor
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                Jumlah
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                Keterangan
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">
                                Tipe
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {history.data && history.data.length > 0 ? (
                            history.data.map((h) => (
                                <tr
                                    key={h.id}
                                    className="hover:bg-gray-50/50 transition-colors"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(
                                            h.created_at
                                        ).toLocaleDateString("id-ID")}
                                        <div className="text-xs text-gray-400 mt-0.5">
                                            {new Date(
                                                h.created_at
                                            ).toLocaleTimeString("id-ID", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-bold text-gray-800">
                                            {h.item?.nama_barang || "-"}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {h.user?.name || "-"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-700">
                                        {Math.abs(h.jumlah)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">
                                        {h.keterangan}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <span
                                            className={`px-2.5 py-1 inline-flex text-xs font-bold uppercase tracking-wide rounded-md ${
                                                h.tipe === "masuk"
                                                    ? "bg-green-100 text-green-700 border border-green-200"
                                                    : "bg-red-100 text-red-700 border border-red-200"
                                            }`}
                                        >
                                            {h.tipe}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="px-6 py-12 text-center text-gray-400 italic bg-gray-50/30"
                                >
                                    <div className="flex flex-col items-center justify-center">
                                        <span className="material-icons-round text-4xl mb-2 text-gray-300">
                                            event_busy
                                        </span>
                                        Belum ada aktivitas mutasi barang bulan
                                        ini.
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {history.links.length > 3 && (
                <div className="p-4 border-t border-gray-100 flex justify-center">
                    <div className="flex gap-1 bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
                        {history.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || "#"}
                                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                                    link.active
                                        ? "bg-blue-800 text-white shadow-md shadow-blue-800/20"
                                        : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
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
    );
}
