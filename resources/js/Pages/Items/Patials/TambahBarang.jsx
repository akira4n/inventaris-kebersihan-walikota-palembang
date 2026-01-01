import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

export function TambahBarangForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama_barang: "",
        harga: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("items.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <section className="h-full flex flex-col">
            <header className="flex items-start gap-3 border-b border-gray-100 pb-4 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-800">
                    <span className="material-icons-round text-xl">
                        add_box
                    </span>
                </div>
                <div>
                    <h2 className="text-lg font-bold text-gray-800">
                        Barang Baru
                    </h2>
                    <p className="text-sm text-gray-500">
                        Daftarkan barang inventaris baru.
                    </p>
                </div>
            </header>

            <form onSubmit={submit} className="space-y-5 flex-1 flex flex-col">
                <div>
                    <InputLabel
                        htmlFor="nama_barang"
                        value="Nama Barang"
                        className="mb-1 text-gray-600"
                    />
                    <div className="relative">
                        <TextInput
                            id="nama_barang"
                            placeholder="Contoh: Sapu Lidi"
                            className="pl-10 w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all"
                            value={data.nama_barang}
                            onChange={(e) =>
                                setData("nama_barang", e.target.value)
                            }
                            required
                        />
                        <span className="material-icons-round absolute left-3 top-2 text-gray-400 text-lg">
                            label
                        </span>
                    </div>
                    <InputError message={errors.nama_barang} className="mt-1" />
                </div>

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
                            placeholder="0"
                            className="pl-10 w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all"
                            value={data.harga}
                            onChange={(e) => setData("harga", e.target.value)}
                            required
                        />
                        <span className="material-icons-round absolute left-3 top-2 text-gray-400 text-lg">
                            attach_money
                        </span>
                    </div>
                    <InputError message={errors.harga} className="mt-1" />
                </div>

                <div className="mt-auto pt-4">
                    <PrimaryButton
                        disabled={processing}
                        className="w-full justify-center py-3 bg-blue-800 hover:bg-blue-900 rounded-xl shadow-lg shadow-blue-800/20 gap-2"
                    >
                        <span className="material-icons-round text-sm">
                            save
                        </span>
                        Simpan Barang
                    </PrimaryButton>
                </div>
            </form>
        </section>
    );
}
