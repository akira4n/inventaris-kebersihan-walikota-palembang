import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Laporan } from "./Partials/Laporan";
import { RiwayatMutasi } from "./Partials/RiwayatMutasi";
import { Summary } from "./Partials/Summary";

export default function Index({ auth, summary, history, filters }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={"Laporan & Analisis Stok"}
        >
            <Head title="Manajemen Barang" />
            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    <Summary summary={summary} />
                    <RiwayatMutasi history={history} filters={filters} />
                    <Laporan />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
