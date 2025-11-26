import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useRef, useState } from "react";

export default function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();
        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <div className="pt-2">
                <DangerButton
                    onClick={confirmUserDeletion}
                    className="px-6 py-2.5 rounded-xl shadow-lg shadow-red-600/20"
                >
                    Hapus Akun Saya
                </DangerButton>
            </div>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    {/* Icon Warning */}
                    <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                        <span className="material-icons-round text-red-600 text-2xl">
                            warning
                        </span>
                    </div>

                    <h2 className="text-lg font-bold text-center text-gray-900">
                        Apakah Anda yakin?
                    </h2>

                    <p className="mt-2 text-sm text-center text-gray-500">
                        Akun yang dihapus tidak dapat dikembalikan. Semua data,
                        riwayat pengajuan, dan informasi terkait akan hilang
                        permanen.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="sr-only"
                        />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="mt-1 block w-3/4 mx-auto text-center border-gray-200 rounded-xl"
                            isFocused
                            placeholder="Masukkan Password untuk konfirmasi"
                        />
                        <InputError
                            message={errors.password}
                            className="mt-2 text-center"
                        />
                    </div>

                    <div className="mt-6 flex justify-center gap-3">
                        <SecondaryButton
                            onClick={closeModal}
                            className="rounded-xl"
                        >
                            Batal
                        </SecondaryButton>

                        <DangerButton
                            className="ms-3 rounded-xl"
                            disabled={processing}
                        >
                            Ya, Hapus Akun
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
