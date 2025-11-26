import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600 p-3 bg-green-50 rounded-xl border border-green-100">
                    {status}
                </div>
            )}

            <div className="flex flex-col items-center mb-6 text-center">
                {/* Ikon Header Estetik */}
                <div className="w-16 h-16 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                    <span className="material-icons-round text-4xl">
                        verified_user
                    </span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Selamat Datang
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Silakan masukkan akun Anda untuk melanjutkan.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                {/* Input Email / NIP */}
                <div>
                    <InputLabel
                        htmlFor="email"
                        value="NIP / Email"
                        className="mb-1 text-gray-600 font-medium"
                    />
                    <div className="relative">
                        <TextInput
                            id="email"
                            type="text"
                            name="email"
                            value={data.email}
                            className="pl-10 w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all py-3"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="Masukkan NIP / Email"
                        />
                        <span className="material-icons-round absolute left-3 top-3 text-gray-400 text-lg">
                            badge
                        </span>
                    </div>
                    <InputError message={errors.email} className="mt-1" />
                </div>

                {/* Input Password */}
                <div>
                    <InputLabel
                        htmlFor="password"
                        value="Password"
                        className="mb-1 text-gray-600 font-medium"
                    />
                    <div className="relative">
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="pl-10 w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all py-3"
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            placeholder="Masukkan Password"
                        />
                        <span className="material-icons-round absolute left-3 top-3 text-gray-400 text-lg">
                            lock
                        </span>
                    </div>
                    <InputError message={errors.password} className="mt-1" />
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                            className="rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Ingat saya
                        </span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline"
                        >
                            Lupa password?
                        </Link>
                    )}
                </div>

                {/* Tombol Login */}
                <div className="pt-2">
                    <PrimaryButton
                        className="w-full justify-center py-3 bg-blue-800 hover:bg-blue-900 rounded-xl shadow-lg shadow-blue-800/20 transition-all text-base font-semibold"
                        disabled={processing}
                    >
                        {processing ? "Memuat..." : "Masuk"}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
