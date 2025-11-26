import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton"; // Import PrimaryButton

export function TambahStokForm({ items }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        item_id: "",
        jumlah: "",
        keterangan: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("stok.masuk.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <section className="h-full flex flex-col">
            <header className="flex items-start gap-3 border-b border-gray-100 pb-4 mb-4">
                <div className="p-2 bg-green-50 rounded-lg text-green-700">
                    <span className="material-icons-round text-xl">input</span>
                </div>
                <div>
                    <h2 className="text-lg font-bold text-gray-800">
                        Catat Stok Masuk
                    </h2>
                    <p className="text-sm text-gray-500">
                        Update stok barang yang diterima.
                    </p>
                </div>
            </header>

            <form onSubmit={submit} className="space-y-5 flex-1">
                {/* ... Input Dropdown, Jumlah, Keterangan (TETAP SAMA) ... */}
                <div>
                    <InputLabel
                        htmlFor="item_id"
                        value="Pilih Barang"
                        className="mb-1 text-gray-600"
                    />
                    <div className="relative">
                        <select
                            id="item_id"
                            name="item_id"
                            className="pl-10 w-full border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-xl transition-all appearance-none text-sm text-gray-700"
                            value={data.item_id}
                            onChange={(e) => setData("item_id", e.target.value)}
                            required
                        >
                            <option value="">Pilih Nama Barang</option>
                            {items.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.nama_barang} (Stok: {item.stok})
                                </option>
                            ))}
                        </select>
                        <span className="material-icons-round absolute left-3 top-1.5 text-gray-400 text-lg">
                            inventory_2
                        </span>
                    </div>
                    <InputError message={errors.item_id} className="mt-1" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <InputLabel
                            htmlFor="jumlah"
                            value="Jumlah"
                            className="mb-1 text-gray-600"
                        />
                        <div className="relative">
                            <TextInput
                                id="jumlah"
                                type="number"
                                placeholder="0"
                                className="pl-10 w-full border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-xl transition-all"
                                value={data.jumlah}
                                onChange={(e) =>
                                    setData("jumlah", e.target.value)
                                }
                                required
                            />
                            <span className="material-icons-round absolute left-3 top-2 text-gray-400 text-lg">
                                numbers
                            </span>
                        </div>
                        <InputError message={errors.jumlah} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="keterangan"
                            value="Sumber/Keterangan"
                            className="mb-1 text-gray-600"
                        />
                        <div className="relative">
                            <TextInput
                                id="keterangan"
                                placeholder="Cth: Pembelian Toko A"
                                className="pl-10 w-full border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-xl transition-all"
                                value={data.keterangan}
                                onChange={(e) =>
                                    setData("keterangan", e.target.value)
                                }
                                required
                            />
                            <span className="material-icons-round absolute left-3 top-2 text-gray-400 text-lg">
                                description
                            </span>
                        </div>
                        <InputError
                            message={errors.keterangan}
                            className="mt-1"
                        />
                    </div>
                </div>

                {/* --- UPDATE BAGIAN TOMBOL --- */}
                <div className="pt-4">
                    <PrimaryButton
                        disabled={processing}
                        className="w-full justify-center py-3 bg-green-700 hover:bg-green-800 rounded-xl shadow-lg shadow-green-700/20 gap-2"
                    >
                        <span className="material-icons-round text-sm">
                            check_circle
                        </span>
                        Simpan Stok
                    </PrimaryButton>
                </div>
            </form>
        </section>
    );
}
