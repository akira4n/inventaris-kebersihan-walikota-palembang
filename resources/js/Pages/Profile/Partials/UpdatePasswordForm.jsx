import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { useRef } from "react";

export default function UpdatePasswordForm({ className = "" }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();
        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }
                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <form onSubmit={updatePassword} className="space-y-6">
                {/* Current Password */}
                <div>
                    <InputLabel
                        htmlFor="current_password"
                        value="Password Saat Ini"
                        className="mb-1 text-gray-600"
                    />
                    <div className="relative">
                        <TextInput
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) =>
                                setData("current_password", e.target.value)
                            }
                            type="password"
                            className="pl-10 w-full border-gray-200 rounded-xl focus:border-orange-500 focus:ring-orange-500 transition-all"
                            autoComplete="current-password"
                        />
                        <span className="material-icons-round absolute left-3 top-2 text-gray-400 text-lg">
                            key
                        </span>
                    </div>
                    <InputError
                        message={errors.current_password}
                        className="mt-1"
                    />
                </div>

                {/* New Password */}
                <div>
                    <InputLabel
                        htmlFor="password"
                        value="Password Baru"
                        className="mb-1 text-gray-600"
                    />
                    <div className="relative">
                        <TextInput
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            type="password"
                            className="pl-10 w-full border-gray-200 rounded-xl focus:border-orange-500 focus:ring-orange-500 transition-all"
                            autoComplete="new-password"
                        />
                        <span className="material-icons-round absolute left-3 top-2 text-gray-400 text-lg">
                            lock
                        </span>
                    </div>
                    <InputError message={errors.password} className="mt-1" />
                </div>

                {/* Confirm Password */}
                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Konfirmasi Password"
                        className="mb-1 text-gray-600"
                    />
                    <div className="relative">
                        <TextInput
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            type="password"
                            className="pl-10 w-full border-gray-200 rounded-xl focus:border-orange-500 focus:ring-orange-500 transition-all"
                            autoComplete="new-password"
                        />
                        <span className="material-icons-round absolute left-3 top-2 text-gray-400 text-lg">
                            lock_reset
                        </span>
                    </div>
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-1"
                    />
                </div>

                <div className="flex items-center gap-4 pt-2">
                    <PrimaryButton
                        disabled={processing}
                        className="px-6 bg-orange-600 hover:bg-orange-700 rounded-xl shadow-lg shadow-orange-600/20"
                    >
                        Ganti Password
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
                            Berhasil diganti.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
