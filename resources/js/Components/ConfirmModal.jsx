import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton"; // Import PrimaryButton

export default function ConfirmModal({
    show,
    onClose,
    onConfirm,
    title = "Konfirmasi",
    content = "Apakah Anda yakin?",
    confirmText = "Ya, Lanjutkan",
    processing = false,
    danger = true,
}) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="md">
            <div className="p-6">
                <div
                    className={`flex items-center justify-center w-12 h-12 mx-auto rounded-full mb-4 ${
                        danger ? "bg-red-100" : "bg-blue-100"
                    }`}
                >
                    <span
                        className={`material-icons-round text-2xl ${
                            danger ? "text-red-600" : "text-blue-600"
                        }`}
                    >
                        {danger ? "warning" : "info"}
                    </span>
                </div>

                <h2 className="text-lg font-bold text-center text-gray-900">
                    {title}
                </h2>
                <p className="mt-2 text-sm text-center text-gray-500">
                    {content}
                </p>

                <div className="mt-6 flex justify-center gap-3">
                    <SecondaryButton onClick={onClose} disabled={processing}>
                        Batal
                    </SecondaryButton>

                    {/* Tombol Dinamis */}
                    {danger ? (
                        <DangerButton
                            onClick={onConfirm}
                            disabled={processing}
                            className="ms-3"
                        >
                            {processing ? "Memproses..." : confirmText}
                        </DangerButton>
                    ) : (
                        <PrimaryButton
                            onClick={onConfirm}
                            disabled={processing}
                            className="ms-3 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800"
                        >
                            {processing ? "Memproses..." : confirmText}
                        </PrimaryButton>
                    )}
                </div>
            </div>
        </Modal>
    );
}
