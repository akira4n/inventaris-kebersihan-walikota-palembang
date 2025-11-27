import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import ConfirmModal from "@/Components/ConfirmModal";

export default function Index({ auth, users }) {
    // State untuk Modal Hapus
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const confirmDelete = (user) => {
        setUserToDelete(user);
        setConfirmingDeletion(true);
    };

    const closeModal = () => {
        setConfirmingDeletion(false);
        setUserToDelete(null);
    };

    const handleDelete = () => {
        if (!userToDelete) return;
        setIsDeleting(true);
        router.delete(route("users.destroy", userToDelete.id), {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
                setIsDeleting(false);
            },
            onError: () => {
                setIsDeleting(false);
                closeModal();
            },
        });
    };

    // Helper Warna Badge Role
    const getRoleBadge = (role) => {
        switch (role) {
            case "admin":
                return "bg-blue-100 text-blue-800 border-blue-200";
            case "kabag":
                return "bg-purple-100 text-purple-800 border-purple-200";
            case "staff":
                return "bg-green-100 text-green-800 border-green-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} header={"Manajemen Akun"}>
            <Head title="Manajemen Akun" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">
                                Daftar Pengguna
                            </h3>
                            <p className="text-sm text-gray-500">
                                Kelola akun pegawai yang terdaftar.
                            </p>
                        </div>
                        <Link
                            href={route("users.create")}
                            className="inline-flex items-center px-5 py-2.5 bg-blue-800 border border-transparent rounded-xl font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none transition ease-in-out duration-150 shadow-lg shadow-blue-800/20 gap-2"
                        >
                            <span className="material-icons-round text-sm">
                                person_add
                            </span>
                            Tambah Akun
                        </Link>
                    </div>

                    {/* TABEL CARD */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100">
                                <thead className="bg-gray-50/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Nama & NIP
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Ruangan
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">
                                    {users.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="group hover:bg-blue-50/30 transition-colors duration-200"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-bold text-gray-800 group-hover:text-blue-800 transition-colors">
                                                    {user.name}
                                                </div>
                                                <div className="text-xs text-gray-400 font-mono mt-0.5 flex items-center gap-1">
                                                    <span className="material-icons-round text-[10px]">
                                                        badge
                                                    </span>
                                                    {user.nip || "-"}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {user.ruangan}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-bold uppercase tracking-wide rounded-md border ${getRoleBadge(
                                                        user.role
                                                    )}`}
                                                >
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() =>
                                                        confirmDelete(user)
                                                    }
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                                                    title="Hapus"
                                                >
                                                    <span className="material-icons-round text-lg">
                                                        delete
                                                    </span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {users.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="px-6 py-12 text-center text-gray-400 bg-gray-50/30"
                                            >
                                                <div className="flex flex-col items-center justify-center">
                                                    <span className="material-icons-round text-4xl mb-2 text-gray-300">
                                                        group_off
                                                    </span>
                                                    <p className="text-sm">
                                                        Belum ada data pengguna.
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

            <ConfirmModal
                show={confirmingDeletion}
                onClose={closeModal}
                onConfirm={handleDelete}
                processing={isDeleting}
                title="Hapus Pengguna?"
                content={`Apakah Anda yakin ingin menghapus pengguna "${userToDelete?.name}"? Akses akun ini akan hilang permanen.`}
            />
        </AuthenticatedLayout>
    );
}
