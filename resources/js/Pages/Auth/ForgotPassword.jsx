import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm, Link } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Lupa Password" />

            <div className="flex flex-col items-center mb-6 text-center">
                {/* Ikon Header */}
                <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                    <span className="material-icons-round text-4xl">
                        lock_reset
                    </span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Lupa Password?
                </h1>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed max-w-xs">
                    Jangan khawatir. Masukkan email Anda dan kami akan
                    mengirimkan link reset password.
                </p>
            </div>

            {status && (
                <div className="mb-6 text-sm font-medium text-green-600 p-3 bg-green-50 rounded-xl border border-green-100 flex items-center gap-2">
                    <span className="material-icons-round text-sm">
                        check_circle
                    </span>
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                {/* Input Email */}
                <div>
                    <div className="relative">
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Masukkan Email Terdaftar"
                            value={data.email}
                            className="pl-10 w-full border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-xl transition-all py-3"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <span className="material-icons-round absolute left-3 top-3 text-gray-400 text-lg">
                            email
                        </span>
                    </div>
                    <InputError message={errors.email} className="mt-1" />
                </div>

                {/* Tombol Kirim */}
                <div className="pt-2">
                    <PrimaryButton
                        className="w-full justify-center py-3 bg-orange-600 hover:bg-orange-700 focus:bg-orange-700 active:bg-orange-800 rounded-xl shadow-lg shadow-orange-600/20 transition-all text-base font-semibold"
                        disabled={processing}
                    >
                        {processing ? "Mengirim..." : "Kirim Link Reset"}
                    </PrimaryButton>
                </div>

                {/* Link Kembali */}
                <div className="text-center mt-4">
                    <Link
                        href={route("login")}
                        className="text-sm text-gray-500 hover:text-gray-800 font-medium transition-colors flex items-center justify-center gap-1"
                    >
                        <span className="material-icons-round text-sm">
                            arrow_back
                        </span>
                        Kembali ke Halaman Login
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
