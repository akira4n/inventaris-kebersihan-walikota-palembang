import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        nip: "",
        ruangan: "",
        role: "staff",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("users.store"), {
            onSuccess: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={"Buat Akun Baru"}>
            <Head title="Buat Akun Baru" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden">
                        {/* Header Card */}
                        <div className="p-6 border-b border-gray-50 flex items-center gap-4">
                            <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                                <span className="material-icons-round text-2xl">
                                    person_add
                                </span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">
                                    Registrasi Pengguna
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Tambahkan akun pegawai baru.
                                </p>
                            </div>
                        </div>

                        <div className="p-6">
                            <form onSubmit={submit} className="space-y-5">
                                <div>
                                    <InputLabel
                                        htmlFor="name"
                                        value="Nama Lengkap"
                                        className="mb-1 text-gray-600"
                                    />
                                    <div className="relative">
                                        <TextInput
                                            id="name"
                                            className="pl-10 w-full border-gray-200 rounded-xl"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            required
                                            placeholder="Nama Pegawai"
                                        />
                                        <span className="material-icons-round absolute left-3 top-2 text-gray-400 text-lg">
                                            badge
                                        </span>
                                    </div>
                                    <InputError
                                        message={errors.name}
                                        className="mt-1"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel
                                            htmlFor="nip"
                                            value="NIP"
                                            className="mb-1 text-gray-600"
                                        />
                                        <div className="relative">
                                            <TextInput
                                                id="nip"
                                                className="pl-10 w-full border-gray-200 rounded-xl"
                                                value={data.nip}
                                                onChange={(e) =>
                                                    setData(
                                                        "nip",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Nomor Induk"
                                            />
                                            <span className="material-icons-round absolute left-3 top-2 text-gray-400 text-lg">
                                                numbers
                                            </span>
                                        </div>
                                        <InputError
                                            message={errors.nip}
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="ruangan"
                                            value="Ruangan"
                                            className="mb-1 text-gray-600"
                                        />
                                        <div className="relative">
                                            <TextInput
                                                id="ruangan"
                                                className="pl-10 w-full border-gray-200 rounded-xl"
                                                value={data.ruangan}
                                                onChange={(e) =>
                                                    setData(
                                                        "ruangan",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                                placeholder="Cth: Umum"
                                            />
                                            <span className="material-icons-round absolute left-3 top-2 text-gray-400 text-lg">
                                                meeting_room
                                            </span>
                                        </div>
                                        <InputError
                                            message={errors.ruangan}
                                            className="mt-1"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="role"
                                        value="Role / Jabatan"
                                        className="mb-1 text-gray-600"
                                    />
                                    <div className="relative">
                                        <select
                                            id="role"
                                            className="pl-10 w-full border-gray-200 rounded-xl appearance-none text-sm"
                                            value={data.role}
                                            onChange={(e) =>
                                                setData("role", e.target.value)
                                            }
                                        >
                                            <option value="staff">Staff</option>
                                            <option value="kabag">
                                                Kepala Bagian (Kabag)
                                            </option>
                                            <option value="admin">Admin</option>
                                        </select>
                                        <span className="material-icons-round absolute left-3 top-1 text-gray-400 text-lg">
                                            admin_panel_settings
                                        </span>
                                    </div>
                                    <InputError
                                        message={errors.role}
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="email"
                                        value="Email Login"
                                        className="mb-1 text-gray-600"
                                    />
                                    <div className="relative">
                                        <TextInput
                                            id="email"
                                            type="email"
                                            className="pl-10 w-full border-gray-200 rounded-xl"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            required
                                            placeholder="email@instansi.go.id"
                                        />
                                        <span className="material-icons-round absolute left-3 top-2 text-gray-400 text-lg">
                                            email
                                        </span>
                                    </div>
                                    <InputError
                                        message={errors.email}
                                        className="mt-1"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel
                                            htmlFor="password"
                                            value="Password"
                                            className="mb-1 text-gray-600"
                                        />
                                        <div className="relative">
                                            <TextInput
                                                id="password"
                                                type="password"
                                                className="pl-10 w-full border-gray-200 rounded-xl"
                                                value={data.password}
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                            <span className="material-icons-round absolute left-3 top-2 text-gray-400 text-lg">
                                                lock
                                            </span>
                                        </div>
                                        <InputError
                                            message={errors.password}
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="password_confirmation"
                                            value="Konfirmasi Password"
                                            className="mb-1 text-gray-600"
                                        />
                                        <div className="relative">
                                            <TextInput
                                                id="password_confirmation"
                                                type="password"
                                                className="pl-10 w-full border-gray-200 rounded-xl"
                                                value={
                                                    data.password_confirmation
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "password_confirmation",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                            <span className="material-icons-round absolute left-3 top-2 text-gray-400 text-lg">
                                                lock_reset
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-4 mt-6 border-t border-gray-50">
                                    <Link
                                        href={route("users.index")}
                                        className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors"
                                    >
                                        Batal
                                    </Link>
                                    <PrimaryButton
                                        disabled={processing}
                                        className="px-6 bg-blue-800 hover:bg-blue-900 rounded-xl shadow-lg shadow-blue-800/20 gap-2"
                                    >
                                        <span className="material-icons-round text-sm">
                                            save
                                        </span>{" "}
                                        Simpan
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
