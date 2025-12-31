export function Summary({ summary }) {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;

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

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

            {/* Barang Keluar */}
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

            {/* Sisa Stok */}
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
                <div className="text-xs text-gray-400 mt-1">Semua Item</div>
            </div>

            {/* Jumlah Aset */}
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
    );
}
