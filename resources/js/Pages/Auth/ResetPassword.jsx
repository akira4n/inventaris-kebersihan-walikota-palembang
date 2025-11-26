import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.store"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <div className="flex flex-col items-center mb-6 text-center">
                {/* Ikon Header */}
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                    <span className="material-icons-round text-4xl">
                        password
                    </span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Reset Password
                </h1>
                <p className="text-sm text-gray-500 mt-2">
                    Buat password baru yang kuat untuk akun Anda.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                {/* Email (Readonly usually, but let's keep it editable if needed) */}
                <div>
                    <InputLabel
                        htmlFor="email"
                        value="Email"
                        className="mb-1 text-gray-600 font-medium"
                    />
                    <div className="relative">
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="pl-10 w-full border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-xl transition-all py-3 bg-gray-50 text-gray-500 cursor-not-allowed"
                            autoComplete="username"
                            onChange={(e) => setData("email", e.target.value)}
                            readOnly // Biasanya email di-lock dari link
                        />
                        <span className="material-icons-round absolute left-3 top-3 text-gray-400 text-lg">
                            email
                        </span>
                    </div>
                    <InputError message={errors.email} className="mt-1" />
                </div>

                {/* Password Baru */}
                <div>
                    <InputLabel
                        htmlFor="password"
                        value="Password Baru"
                        className="mb-1 text-gray-600 font-medium"
                    />
                    <div className="relative">
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="pl-10 w-full border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-xl transition-all py-3"
                            autoComplete="new-password"
                            isFocused={true}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            placeholder="Minimal 8 karakter"
                        />
                        <span className="material-icons-round absolute left-3 top-3 text-gray-400 text-lg">
                            lock
                        </span>
                    </div>
                    <InputError message={errors.password} className="mt-1" />
                </div>

                {/* Konfirmasi Password */}
                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Konfirmasi Password"
                        className="mb-1 text-gray-600 font-medium"
                    />
                    <div className="relative">
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="pl-10 w-full border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-xl transition-all py-3"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            placeholder="Ulangi password baru"
                        />
                        <span className="material-icons-round absolute left-3 top-3 text-gray-400 text-lg">
                            lock_reset
                        </span>
                    </div>
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-1"
                    />
                </div>

                {/* Tombol Submit */}
                <div className="pt-2">
                    <PrimaryButton
                        className="w-full justify-center py-3 bg-green-700 hover:bg-green-800 focus:bg-green-800 active:bg-green-900 rounded-xl shadow-lg shadow-green-700/20 transition-all text-base font-semibold gap-2"
                        disabled={processing}
                    >
                        <span className="material-icons-round text-sm">
                            save
                        </span>
                        Simpan Password Baru
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
