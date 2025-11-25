import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link, router } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";

export default function LaporanPage({ auth, summary, history, filters }) {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    const { data: dataBulanan, setData: setDataBulanan } = useForm({
        bulan: currentMonth,
        tahun: currentYear,
    });

    const [perPage, setPerPage] = useState(filters.per_page || 10);

    const handlePerPageChange = (e) => {
        const value = e.target.value;
        setPerPage(value);
        // Reload halaman dengan parameter baru
        router.get(
            route("laporan.stok.page"),
            { per_page: value },
            { preserveState: true, replace: true }
        );
    };

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

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-4 border-b pb-2">
                                <h3 className="text-lg font-bold text-gray-800">
                                    Aktivitas Keluar dan Masuk Barang Bulan {(months[currentMonth - 1].label)}
                                </h3>

                                {/* Dropdown Filter Jumlah Data */}
                                <div className="flex items-center text-sm">
                                    <span className="mr-2 text-gray-600">
                                        Tampilkan:
                                    </span>
                                    <select
                                        value={perPage}
                                        onChange={handlePerPageChange}
                                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-sm py-1"
                                    >
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                    </select>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                                                Tanggal
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                                                Nama Item
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                                                Eksekutor
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                                                Jumlah
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                                                Tipe
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                                                Keterangan
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {/* Perhatikan: history.data, bukan history saja */}
                                        {history.data &&
                                        history.data.length > 0 ? (
                                            history.data.map((h) => (
                                                <tr
                                                    key={h.id}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        {new Date(
                                                            h.created_at
                                                        ).toLocaleDateString(
                                                            "id-ID"
                                                        )}
                                                        <div className="text-xs text-gray-400">
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
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {h.item?.nama_barang ||
                                                            "-"}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        {h.user?.name || "-"}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-700">
                                                        {Math.abs(h.jumlah)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span
                                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                                h.tipe ===
                                                                "masuk"
                                                                    ? "bg-green-100 text-green-800"
                                                                    : "bg-red-100 text-red-800"
                                                            }`}
                                                        >
                                                            {h.tipe
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                                h.tipe.slice(1)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">
                                                        {h.keterangan}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    className="px-6 py-8 text-center text-gray-500 italic"
                                                >
                                                    Belum ada aktivitas mutasi
                                                    barang bulan ini.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Tombol Pagination */}
                            <div className="mt-4 flex flex-wrap gap-1 justify-center sm:justify-end">
                                {history.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || "#"}
                                        className={`px-3 py-1 text-sm border rounded ${
                                            link.active
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
                                        } ${
                                            !link.url
                                                ? "opacity-50 cursor-not-allowed"
                                                : ""
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                        preserveState
                                        preserveScroll
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

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
