import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import ConfirmModal from "@/Components/ConfirmModal";

export function TabelBarang({ items }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const confirmDelete = (item) => {
        setItemToDelete(item);
        setConfirmingUserDeletion(true);
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        setItemToDelete(null);
    };

    const handleDelete = () => {
        if (!itemToDelete) return;

        setIsDeleting(true);

        router.delete(route("items.destroy", itemToDelete.id), {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
                setIsDeleting(false);
            },
            onError: () => {
                setIsDeleting(false);
                closeModal();
                alert("Gagal menghapus data.");
            },
        });
    };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(number);
    };

    return (
        <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-4">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                    Nama Barang
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                    Stok
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                    Harga Satuan
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">
                                    Aksi
                                </th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-100">
                            {items.map((item) => (
                                <tr
                                    key={item.id}
                                    className="group hover:bg-blue-50/30 transition-colors duration-200"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-mono">
                                        #{item.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-bold text-gray-800 group-hover:text-blue-800 transition-colors">
                                            {item.nama_barang}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                item.stok > 0
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {item.stok} Unit
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">
                                        {formatRupiah(item.harga)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={route(
                                                    "items.edit",
                                                    item.id
                                                )}
                                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                                                title="Edit Barang"
                                            >
                                                <span className="material-icons-round text-lg">
                                                    edit
                                                </span>
                                            </Link>

                                            <button
                                                onClick={() =>
                                                    confirmDelete(item)
                                                }
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                                                title="Hapus Barang"
                                            >
                                                <span className="material-icons-round text-lg">
                                                    delete
                                                </span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {items.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-6 py-12 text-center text-gray-400 bg-gray-50/30"
                                    >
                                        <div className="flex flex-col items-center justify-center">
                                            <span className="material-icons-round text-4xl mb-2 text-gray-300">
                                                inventory_2
                                            </span>
                                            <p className="text-sm">
                                                Belum ada data barang.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ConfirmModal
                show={confirmingUserDeletion}
                onClose={closeModal}
                onConfirm={handleDelete}
                processing={isDeleting}
                title="Hapus Barang?"
                content={`Apakah Anda yakin ingin menghapus "${itemToDelete?.nama_barang}"? Data yang dihapus tidak dapat dikembalikan.`}
            />
        </>
    );
}
