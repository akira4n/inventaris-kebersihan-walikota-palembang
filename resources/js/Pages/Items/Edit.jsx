import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";

export default function Edit({ auth, item }) {
    const { data, setData, put, processing, errors } = useForm({
        nama_barang: item.nama_barang,
        harga: item.harga,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("items.update", item.id));
    };

    return (
        <AuthenticatedLayout user={auth.user} header={"Edit Barang"}>
            <Head title={`Edit Barang: ${item.nama_barang}`} />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden">
                        {/* Header Section dalam Card */}
                        <div className="p-6 border-b border-gray-50 flex items-center gap-4">
                            <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                                <span className="material-icons-round text-2xl">
                                    edit_note
                                </span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">
                                    Update Informasi Barang
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Silakan ubah detail barang di bawah ini.
                                </p>
                            </div>
                        </div>

                        <div className="p-6">
                            <form onSubmit={submit} className="space-y-6">
                                {/* Input Nama Barang */}
                                <div>
                                    <InputLabel
                                        htmlFor="nama_barang"
                                        value="Nama Barang"
                                        className="mb-1 text-gray-600"
                                    />
                                    <div className="relative">
                                        <TextInput
                                            id="nama_barang"
                                            className="pl-10 w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all"
                                            value={data.nama_barang}
                                            onChange={(e) =>
                                                setData(
                                                    "nama_barang",
                                                    e.target.value
                                                )
                                            }
                                            required
                                            isFocused
                                            placeholder="Contoh: Kursi Kantor"
                                        />
                                        <span className="material-icons-round absolute left-3 top-2 text-gray-400 text-lg">
                                            label
                                        </span>
                                    </div>
                                    <InputError
                                        message={errors.nama_barang}
                                        className="mt-1"
                                    />
                                </div>

                                {/* Input Harga */}
                                <div>
                                    <InputLabel
                                        htmlFor="harga"
                                        value="Harga Satuan (Rp)"
                                        className="mb-1 text-gray-600"
                                    />
                                    <div className="relative">
                                        <TextInput
                                            id="harga"
                                            type="number"
                                            className="pl-10 w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all"
                                            value={data.harga}
                                            onChange={(e) =>
                                                setData("harga", e.target.value)
                                            }
                                            required
                                            placeholder="0"
                                        />
                                        <span className="material-icons-round absolute left-3 top-2 text-gray-400 text-lg">
                                            attach_money
                                        </span>
                                    </div>
                                    <InputError
                                        message={errors.harga}
                                        className="mt-1"
                                    />
                                </div>

                                {/* Tombol Aksi */}
                                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-50 mt-6">
                                    <Link
                                        href={route("items.index")}
                                        className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                                    >
                                        Batal
                                    </Link>

                                    <PrimaryButton
                                        disabled={processing}
                                        className="bg-blue-800 hover:bg-blue-900 rounded-xl shadow-lg shadow-blue-800/20 gap-2"
                                    >
                                        <span className="material-icons-round text-sm">
                                            save
                                        </span>
                                        Simpan Perubahan
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
