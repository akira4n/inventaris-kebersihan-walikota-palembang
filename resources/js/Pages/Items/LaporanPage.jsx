import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link, router } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";

export default function LaporanPage({ auth, summary, history, filters }) {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    // --- FORMS ---
    const { data: dataBulanan, setData: setDataBulanan } = useForm({
        bulan: currentMonth,
        tahun: currentYear,
    });

    const { data: dataSemesteran, setData: setDataSemesteran } = useForm({
        semester: "1",
        tahun: currentYear,
    });

    // --- PAGINATION & FILTER ---
    const [perPage, setPerPage] = useState(filters.per_page || 10);

    const handlePerPageChange = (e) => {
        const value = e.target.value;
        setPerPage(value);
        router.get(
            route("laporan.stok.page"),
            { per_page: value },
            { preserveState: true, replace: true }
        );
    };

    // --- HELPERS ---
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

    const semesters = [
        { value: 1, label: "Semester 1 (Jan - Jun)" },
        { value: 2, label: "Semester 2 (Jul - Des)" },
    ];

    const submitBulanan = (e) => {
        e.preventDefault();
        const url =
            route("laporan.stok.download") +
            `?bulan=${dataBulanan.bulan}&tahun=${dataBulanan.tahun}`;
        window.location.href = url;
    };

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
            header={"Laporan & Analisis Stok"}
        >
            <Head title="Laporan Stok" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Card 1: Masuk */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                                    <span className="material-icons-round">
                                        arrow_circle_down
                                    </span>
                                </div>
                                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                                    Barang Masuk
                                </span>
                            </div>
                            <div className="text-3xl font-bold text-gray-800">
                                {summary.masuk}{" "}
                                <span className="text-sm text-gray-400 font-normal">
                                    Unit
                                </span>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                                Bulan {months[currentMonth - 1].label}
                            </div>
                        </div>

                        {/* Card 2: Keluar */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                                    <span className="material-icons-round">
                                        arrow_circle_up
                                    </span>
                                </div>
                                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                                    Barang Keluar
                                </span>
                            </div>
                            <div className="text-3xl font-bold text-gray-800 abs">
                                {summary.keluar}{" "}
                                <span className="text-sm text-gray-400 font-normal">
                                    Unit
                                </span>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                                Bulan {months[currentMonth - 1].label}
                            </div>
                        </div>

                        {/* Card 3: Sisa Stok */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                    <span className="material-icons-round">
                                        inventory_2
                                    </span>
                                </div>
                                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                                    Total Stok
                                </span>
                            </div>
                            <div className="text-3xl font-bold text-gray-800">
                                {summary.sisa_stok}{" "}
                                <span className="text-sm text-gray-400 font-normal">
                                    Unit
                                </span>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                                Semua Item
                            </div>
                        </div>

                        {/* Card 4: Aset */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg">
                                    <span className="material-icons-round">
                                        monetization_on
                                    </span>
                                </div>
                                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                                    Nilai Aset
                                </span>
                            </div>
                            <div
                                className="text-2xl font-bold text-gray-800 truncate"
                                title={formatRupiah(summary.total_aset)}
                            >
                                {formatRupiah(summary.total_aset)}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                                Estimasi Valuasi
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                    <span className="material-icons-round">
                                        history
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">
                                        Riwayat Mutasi
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Aktivitas keluar masuk barang bulan ini.
                                    </p>
                                </div>
                            </div>

                            {/* Filter Dropdown */}
                            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                                <span className="text-xs font-bold text-gray-500 uppercase">
                                    Show
                                </span>
                                <select
                                    value={perPage}
                                    onChange={handlePerPageChange}
                                    className="bg-transparent border-none text-sm font-medium focus:ring-0 cursor-pointer p-0 text-gray-700"
                                >
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                </select>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100">
                                <thead className="bg-gray-50/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Tanggal
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Barang
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Eksekutor
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Jumlah
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Keterangan
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            Tipe
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">
                                    {history.data && history.data.length > 0 ? (
                                        history.data.map((h) => (
                                            <tr
                                                key={h.id}
                                                className="hover:bg-gray-50/50 transition-colors"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(
                                                        h.created_at
                                                    ).toLocaleDateString(
                                                        "id-ID"
                                                    )}
                                                    <div className="text-xs text-gray-400 mt-0.5">
                                                        {new Date(
                                                            h.created_at
                                                        ).toLocaleTimeString(
                                                            "id-ID",
                                                            {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            }
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-bold text-gray-800">
                                                        {h.item?.nama_barang ||
                                                            "-"}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {h.user?.name || "-"}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-700">
                                                    {Math.abs(h.jumlah)}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">
                                                    {h.keterangan}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <span
                                                        className={`px-2.5 py-1 inline-flex text-xs font-bold uppercase tracking-wide rounded-md ${
                                                            h.tipe === "masuk"
                                                                ? "bg-green-100 text-green-700 border border-green-200"
                                                                : "bg-red-100 text-red-700 border border-red-200"
                                                        }`}
                                                    >
                                                        {h.tipe}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="px-6 py-12 text-center text-gray-400 italic bg-gray-50/30"
                                            >
                                                <div className="flex flex-col items-center justify-center">
                                                    <span className="material-icons-round text-4xl mb-2 text-gray-300">
                                                        event_busy
                                                    </span>
                                                    Belum ada aktivitas mutasi
                                                    barang bulan ini.
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {history.links.length > 3 && (
                            <div className="p-4 border-t border-gray-100 flex justify-center">
                                <div className="flex gap-1 bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
                                    {history.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || "#"}
                                            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                                                link.active
                                                    ? "bg-blue-800 text-white shadow-md shadow-blue-800/20"
                                                    : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                            } ${
                                                !link.url
                                                    ? "opacity-50 cursor-not-allowed"
                                                    : ""
                                            }`}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                            preserveScroll
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* FORM BULANAN */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                                    <span className="material-icons-round">
                                        date_range
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">
                                        Laporan Bulanan
                                    </h3>
                                    <p className="text-xs text-gray-500">
                                        Download rekap stok per bulan.
                                    </p>
                                </div>
                            </div>

                            <form
                                onSubmit={submitBulanan}
                                className="flex-1 flex flex-col gap-4"
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel
                                            htmlFor="bulan"
                                            value="Bulan"
                                            className="mb-1 text-gray-500 text-xs uppercase font-bold"
                                        />
                                        <select
                                            id="bulan"
                                            className="w-full border-gray-200 rounded-xl text-sm focus:border-blue-500 focus:ring-blue-500"
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
                                        <InputLabel
                                            htmlFor="tahun"
                                            value="Tahun"
                                            className="mb-1 text-gray-500 text-xs uppercase font-bold"
                                        />
                                        <select
                                            id="tahun"
                                            className="w-full border-gray-200 rounded-xl text-sm focus:border-blue-500 focus:ring-blue-500"
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
                                </div>
                                <div className="mt-auto pt-2">
                                    <PrimaryButton className="w-full justify-center bg-purple-700 hover:bg-purple-800 rounded-xl shadow-lg shadow-purple-700/20 gap-2">
                                        <span className="material-icons-round text-sm">
                                            download
                                        </span>
                                        Download Excel
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>

                        {/* FORM SEMESTERAN */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                                    <span className="material-icons-round">
                                        assessment
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">
                                        Laporan Semester
                                    </h3>
                                    <p className="text-xs text-gray-500">
                                        Download rekap stok 6 bulanan.
                                    </p>
                                </div>
                            </div>

                            <form
                                onSubmit={submitSemesteran}
                                className="flex-1 flex flex-col gap-4"
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel
                                            htmlFor="semester"
                                            value="Periode"
                                            className="mb-1 text-gray-500 text-xs uppercase font-bold"
                                        />
                                        <select
                                            id="semester"
                                            className="w-full border-gray-200 rounded-xl text-sm focus:border-blue-500 focus:ring-blue-500"
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
                                            className="mb-1 text-gray-500 text-xs uppercase font-bold"
                                        />
                                        <select
                                            id="tahun_semester"
                                            className="w-full border-gray-200 rounded-xl text-sm focus:border-blue-500 focus:ring-blue-500"
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
                                </div>
                                <div className="mt-auto pt-2">
                                    <PrimaryButton className="w-full justify-center  bg-orange-600 hover:bg-orange-700 rounded-xl shadow-lg shadow-orange-600/20 gap-2">
                                        <span className="material-icons-round text-sm">
                                            download
                                        </span>
                                        Download Excel
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
