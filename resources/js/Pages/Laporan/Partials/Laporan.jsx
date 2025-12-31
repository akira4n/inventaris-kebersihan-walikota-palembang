import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";

export function Laporan() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    const { data: dataBulanan, setData: setDataBulanan } = useForm({
        bulan: currentMonth,
        tahun: currentYear,
    });

    const { data: dataSemesteran, setData: setDataSemesteran } = useForm({
        semester: "1",
        tahun: currentYear,
    });

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

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* FORM BULANAN */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                        <span className="material-icons-round">date_range</span>
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
                                    setDataBulanan("bulan", e.target.value)
                                }
                            >
                                {months.map((m) => (
                                    <option key={m.value} value={m.value}>
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
                                    setDataBulanan("tahun", e.target.value)
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
                        <span className="material-icons-round">assessment</span>
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
                                    <option key={s.value} value={s.value}>
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
                                    setDataSemesteran("tahun", e.target.value)
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
    );
}
