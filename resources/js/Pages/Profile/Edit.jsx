import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold text-gray-800 leading-tight">
                    Pengaturan Profil
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Grid Layout: Kiri (Info) & Kanan (Password & Delete) */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Kolom Kiri: Update Info */}
                        <div className="bg-white p-6 sm:p-8 shadow-sm border border-gray-100 rounded-2xl h-fit">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                                    <span className="material-icons-round text-2xl">
                                        badge
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">
                                        Informasi Pribadi
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Perbarui data diri dan email akun Anda.
                                    </p>
                                </div>
                            </div>
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>

                        {/* Kolom Kanan: Keamanan */}
                        <div className="space-y-6">
                            {/* Update Password */}
                            <div className="bg-white p-6 sm:p-8 shadow-sm border border-gray-100 rounded-2xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-orange-50 text-orange-600 rounded-xl">
                                        <span className="material-icons-round text-2xl">
                                            lock_reset
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800">
                                            Ganti Password
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Pastikan password Anda aman dan
                                            kuat.
                                        </p>
                                    </div>
                                </div>
                                <UpdatePasswordForm className="max-w-xl" />
                            </div>

                            {/* Delete Account */}
                            <div className="bg-white p-6 sm:p-8 shadow-sm border border-red-100 rounded-2xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-red-50 text-red-600 rounded-xl">
                                        <span className="material-icons-round text-2xl">
                                            no_accounts
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-red-700">
                                            Hapus Akun
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Tindakan ini permanen dan tidak bisa
                                            dibatalkan.
                                        </p>
                                    </div>
                                </div>
                                <DeleteUserForm className="max-w-xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
