import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { TambahBarangForm } from "./Patials/TambahBarang";
import { TambahStokForm } from "./Patials/TambahStokForm";
import { TabelBarang } from "./Patials/TabelBarang";

export default function Index({ auth, items }) {
    return (
        <AuthenticatedLayout user={auth.user} header={"Manajemen Barang"}>
            <Head title="Manajemen Barang" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto space-y-8 mt-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="p-6 bg-white shadow-sm border border-gray-100 rounded-2xl h-full">
                            <TambahBarangForm />
                        </div>

                        <div className="p-6 bg-white shadow-sm border border-gray-100 rounded-2xl h-full">
                            <TambahStokForm items={items} />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-4 px-1">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">
                                    Daftar Barang
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Kelola data barang yang tersedia.
                                </p>
                            </div>

                            <div className="p-2 bg-blue-50 text-blue-800 rounded-lg text-sm font-bold">
                                Total: {items.length} Barang
                            </div>
                        </div>

                        <TabelBarang items={items} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
