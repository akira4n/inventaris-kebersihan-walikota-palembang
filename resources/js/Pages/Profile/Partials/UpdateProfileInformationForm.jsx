import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            nip: user.nip || "",
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <form onSubmit={submit} className="space-y-6">
                {/* Nama */}
                <div>
                    <InputLabel
                        htmlFor="name"
                        value="Nama Lengkap"
                        className="mb-1 text-gray-600"
                    />
                    <div className="relative">
                        <TextInput
                            id="name"
                            className="pl-10 w-full border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-all"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                            isFocused
                            autoComplete="name"
                        />
                        <span className="material-icons-round absolute left-3 top-2 text-gray-400 text-lg">
                            face
                        </span>
                    </div>
                    <InputError className="mt-1" message={errors.name} />
                </div>

                {/* NIP */}
                <div>
                    <InputLabel
                        htmlFor="nip"
                        value="NIP (Nomor Induk Pegawai)"
                        className="mb-1 text-gray-600"
                    />
                    <div className="relative">
                        <TextInput
                            id="nip"
                            className="pl-10 w-full border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-all"
                            value={data.nip}
                            onChange={(e) => setData("nip", e.target.value)}
                            required
                            autoComplete="username"
                        />
                        <span className="material-icons-round absolute left-3 top-2 text-gray-400 text-lg">
                            numbers
                        </span>
                    </div>
                    <InputError className="mt-1" message={errors.nip} />
                </div>

                {/* Email */}
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
                            className="pl-10 w-full border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-all"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                            autoComplete="username"
                        />
                        <span className="material-icons-round absolute left-3 top-2 text-gray-400 text-lg">
                            email
                        </span>
                    </div>
                    <InputError className="mt-1" message={errors.email} />
                </div>

                {/* Verifikasi Email (Jarang dipakai di local, tapi tetep ada) */}
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                        <p className="text-sm text-yellow-800">
                            Email Anda belum diverifikasi.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="ml-1 underline font-bold hover:text-yellow-900"
                            >
                                Kirim ulang link verifikasi.
                            </Link>
                        </p>
                        {status === "verification-link-sent" && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                Link verifikasi baru telah dikirim ke email
                                Anda.
                            </div>
                        )}
                    </div>
                )}

                {/* Tombol Simpan */}
                <div className="flex items-center gap-4 pt-2">
                    <PrimaryButton
                        disabled={processing}
                        className="px-6 bg-blue-800 hover:bg-blue-900 rounded-xl shadow-lg shadow-blue-800/20"
                    >
                        Simpan
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-600 flex items-center gap-1">
                            <span className="material-icons-round text-sm">
                                check_circle
                            </span>
                            Berhasil disimpan.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
