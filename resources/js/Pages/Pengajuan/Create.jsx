import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";

export default function Create({ auth, items }) {
    const { data, setData, post, processing, errors } = useForm({
        item_id: "",
        jumlah: "",
        berkas: null,
        ruangan: auth.user.ruangan,
    });

    // Fungsi untuk menangani submit form
    const submit = (e) => {
        e.preventDefault();
        post(route("pengajuan.store"));
    };

    return (
        <AuthenticatedLayout user={auth.user} header={"Buat Pengajuan Baru"}>
            <Head title="Buat Pengajuan Baru" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden">
                        {/* Header Card */}
                        <div className="p-6 border-b border-gray-50 flex items-center gap-4">
                            <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                                <span className="material-icons-round text-2xl">
                                    add_shopping_cart
                                </span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">
                                    Formulir Pengajuan
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Isi detail barang yang ingin Anda ajukan.
                                </p>
                            </div>
                        </div>

                        <div className="p-6">
                            <form onSubmit={submit} className="space-y-5">
                                {/* Dropdown Nama Barang */}
                                <div>
                                    <InputLabel
                                        htmlFor="item_id"
                                        value="Nama Barang"
                                        className="mb-1 text-gray-600"
                                    />
                                    <div className="relative">
                                        <select
                                            id="item_id"
                                            name="item_id"
                                            className="pl-10 w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl appearance-none text-sm text-gray-700 transition-all"
                                            value={data.item_id}
                                            onChange={(e) =>
                                                setData(
                                                    "item_id",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        >
                                            <option value="">
                                                Pilih Barang
                                            </option>
                                            {items.map((item) => (
                                                <option
                                                    key={item.id}
                                                    value={item.id}
                                                >
                                                    {item.nama_barang}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="material-icons-round absolute left-3 top-1.5 text-gray-400 text-lg">
                                            inventory_2
                                        </span>
                                    </div>
                                    <InputError
                                        message={errors.item_id}
                                        className="mt-1"
                                    />
                                </div>

                                {/* Grid: Jumlah & Ruangan */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Jumlah Barang */}
                                    <div>
                                        <InputLabel
                                            htmlFor="jumlah"
                                            value="Jumlah Barang"
                                            className="mb-1 text-gray-600"
                                        />
                                        <div className="relative">
                                            <TextInput
                                                id="jumlah"
                                                type="number"
                                                className="pl-10 w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all"
                                                value={data.jumlah}
                                                onChange={(e) =>
                                                    setData(
                                                        "jumlah",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                                placeholder="0"
                                            />
                                            <span className="material-icons-round absolute left-3 top-2 text-gray-400 text-lg">
                                                numbers
                                            </span>
                                        </div>
                                        <InputError
                                            message={errors.jumlah}
                                            className="mt-1"
                                        />
                                    </div>

                                    {/* Ruangan (Read Only) */}
                                    <div>
                                        <InputLabel
                                            htmlFor="ruangan"
                                            value="Ruangan (Otomatis)"
                                            className="mb-1 text-gray-600"
                                        />
                                        <div className="relative">
                                            <TextInput
                                                id="ruangan"
                                                className="pl-10 w-full border-gray-200 bg-gray-50 text-gray-500 rounded-xl cursor-not-allowed focus:ring-0"
                                                value={data.ruangan}
                                                disabled
                                            />
                                            <span className="material-icons-round absolute left-3 top-2 text-gray-400 text-lg">
                                                meeting_room
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Berkas Pengajuan (File Upload) */}
                                <div>
                                    <InputLabel
                                        htmlFor="berkas"
                                        value="Berkas Pendukung (Nota Dinas)"
                                        className="mb-1 text-gray-600"
                                    />
                                    <div className="relative">
                                        <input
                                            id="berkas"
                                            type="file"
                                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-gray-200 rounded-xl cursor-pointer focus:outline-none focus:border-blue-500 transition-all"
                                            onChange={(e) =>
                                                setData(
                                                    "berkas",
                                                    e.target.files[0]
                                                )
                                            }
                                            required
                                        />
                                    </div>
                                    <p className="mt-1 text-xs text-gray-400">
                                        Format: JPG, PNG, PDF (Max 2MB)
                                    </p>
                                    <InputError
                                        message={errors.berkas}
                                        className="mt-1"
                                    />
                                </div>

                                {/* Tombol Aksi */}
                                <div className="flex items-center justify-end gap-3 pt-4 mt-6 border-t border-gray-50">
                                    <Link
                                        href={route("pengajuan.index")}
                                        className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                                    >
                                        Batal
                                    </Link>

                                    <PrimaryButton
                                        disabled={processing}
                                        className="px-6 py-2.5 bg-blue-800 hover:bg-blue-900 rounded-xl shadow-lg shadow-blue-800/20 gap-2"
                                    >
                                        <span className="material-icons-round text-sm">
                                            send
                                        </span>
                                        Kirim Pengajuan
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
