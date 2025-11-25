import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";

export default function LaporanPage({ auth, summary }) {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    const { data: dataBulanan, setData: setDataBulanan } = useForm({
        bulan: currentMonth,
        tahun: currentYear,
    });

    // helper format rupiah
    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(number);
    };

    const months = [
        { value: 1, label: "Januari" },
        { value: 2, label: "Februari" },
        { value: 3, label: "Maret" },
        { value: 4, label: "April" },
        { value: 5, label: "Mei" },
        { value: 6, label: "Juni" },
        { value: 7, label: "Juli" },
        { value: 8, label: "Agustus" },
        { value: 9, label: "September" },
        { value: 10, label: "Oktober" },
        { value: 11, label: "November" },
        { value: 12, label: "Desember" },
    ];

    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

    const submitBulanan = (e) => {
        e.preventDefault();
        const url =
            route("laporan.stok.download") +
            `?bulan=${dataBulanan.bulan}&tahun=${dataBulanan.tahun}`;
        window.location.href = url;
    };

    // laporan semester
    const { data: dataSemesteran, setData: setDataSemesteran } = useForm({
        semester: "1",
        tahun: currentYear,
    });

    const semesters = [
        { value: 1, label: "Semester 1 (Januari - Juni)" },
        { value: 2, label: "Semester 2 (Juli - Desember)" },
    ];

    const submitSemesteran = (e) => {
        e.preventDefault();
        const url =
            route("laporan.semesteran") +
            `?semester=${dataSemesteran.semester}&tahun=${dataSemesteran.tahun}`;
        window.location.href = url;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Laporan Stok
                </h2>
            }
        >
            <Head title="Laporan Stok" />

            <div className="py-12 flex flex-col justify-center items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {/* Card 1: Barang Masuk */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-green-500">
                        <div className="text-gray-500 text-sm font-medium uppercase">
                            Barang Masuk ({months[currentMonth - 1].label})
                        </div>
                        <div className="mt-2 text-3xl font-bold text-gray-900">
                            {summary.masuk}{" "}
                            <span className="text-sm font-normal text-gray-400">
                                Unit
                            </span>
                        </div>
                    </div>

                    {/* Card 2: Barang Keluar */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-red-500">
                        <div className="text-gray-500 text-sm font-medium uppercase">
                            Barang Keluar ({months[currentMonth - 1].label})
                        </div>
                        <div className="mt-2 text-3xl font-bold text-gray-900">
                            {summary.keluar}{" "}
                            <span className="text-sm font-normal text-gray-400">
                                Unit
                            </span>
                        </div>
                    </div>

                    {/* Card 3: Sisa Stok */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-blue-500">
                        <div className="text-gray-500 text-sm font-medium uppercase">
                            Total Sisa Stok
                        </div>
                        <div className="mt-2 text-3xl font-bold text-gray-900">
                            {summary.sisa_stok}{" "}
                            <span className="text-sm font-normal text-gray-400">
                                Unit
                            </span>
                        </div>
                    </div>

                    {/* Card 4: Total Nilai Aset */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-l-4 border-yellow-500">
                        <div className="text-gray-500 text-sm font-medium uppercase">
                            Total Nilai Aset
                        </div>
                        <div
                            className="mt-2 text-2xl font-bold text-gray-900 truncate"
                            title={formatRupiah(summary.total_aset)}
                        >
                            {formatRupiah(summary.total_aset)}
                        </div>
                    </div>
                </div>

                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Laporan Bulanan */}
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section>
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">
                                    Laporan Stok Bulanan
                                </h2>
                                <p className="mt-1 text-sm text-gray-600">
                                    Pilih periode bulan dan tahun untuk
                                    men-download laporan stok bulanan.
                                </p>
                            </header>

                            <form
                                onSubmit={submitBulanan}
                                className="mt-6 space-y-6"
                            >
                                <div>
                                    <InputLabel htmlFor="bulan" value="Bulan" />
                                    <select
                                        id="bulan"
                                        name="bulan"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={dataBulanan.bulan}
                                        onChange={(e) =>
                                            setDataBulanan(
                                                "bulan",
                                                e.target.value
                                            )
                                        }
                                    >
                                        {months.map((m) => (
                                            <option
                                                key={m.value}
                                                value={m.value}
                                            >
                                                {m.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <InputLabel htmlFor="tahun" value="Tahun" />
                                    <select
                                        id="tahun"
                                        name="tahun"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={dataBulanan.tahun}
                                        onChange={(e) =>
                                            setDataBulanan(
                                                "tahun",
                                                e.target.value
                                            )
                                        }
                                    >
                                        {years.map((y) => (
                                            <option key={y} value={y}>
                                                {y}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton>
                                        Download Laporan Bulanan
                                    </PrimaryButton>
                                </div>
                            </form>
                        </section>
                    </div>

                    {/* Laporan Semesteran */}
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section>
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">
                                    Laporan Stok Semesteran
                                </h2>
                                <p className="mt-1 text-sm text-gray-600">
                                    Pilih periode semester dan tahun untuk
                                    men-download laporan stok semesteran.
                                </p>
                            </header>

                            <form
                                onSubmit={submitSemesteran}
                                className="mt-6 space-y-6"
                            >
                                <div>
                                    <InputLabel
                                        htmlFor="semester"
                                        value="Semester"
                                    />
                                    <select
                                        id="semester"
                                        name="semester"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={dataSemesteran.semester}
                                        onChange={(e) =>
                                            setDataSemesteran(
                                                "semester",
                                                e.target.value
                                            )
                                        }
                                    >
                                        {semesters.map((s) => (
                                            <option
                                                key={s.value}
                                                value={s.value}
                                            >
                                                {s.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="tahun_semester"
                                        value="Tahun"
                                    />
                                    <select
                                        id="tahun_semester"
                                        name="tahun_semester"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={dataSemesteran.tahun}
                                        onChange={(e) =>
                                            setDataSemesteran(
                                                "tahun",
                                                e.target.value
                                            )
                                        }
                                    >
                                        {years.map((y) => (
                                            <option key={y} value={y}>
                                                {y}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton>
                                        Download Laporan Semesteran
                                    </PrimaryButton>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
