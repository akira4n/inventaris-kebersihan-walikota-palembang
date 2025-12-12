import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import Dropdown from "@/Components/Dropdown";

const SidebarLink = ({ href, active, icon, children }) => {
    return (
        <Link
            href={href}
            className={`flex items-center px-6 py-3 w-full mb-1 transition-all duration-200 rounded-xl group ${
                active
                    ? "bg-blue-800 text-white"
                    : "text-gray-500 hover:bg-blue-50 hover:text-blue-800"
            }`}
        >
            <span
                className={`material-icons-round text-xl mr-3 transition-colors ${
                    active
                        ? "text-white"
                        : "text-gray-400 group-hover:text-blue-800"
                }`}
            >
                {icon}
            </span>
            <span className="font-medium text-sm tracking-wide">
                {children}
            </span>
        </Link>
    );
};

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingMobileMenu, setShowingMobileMenu] = useState(false);

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* --- MOBILE OVERLAY --- */}
            <div
                className={`fixed inset-0 z-20 transition-opacity bg-black/50 lg:hidden ${
                    showingMobileMenu ? "block" : "hidden"
                }`}
                onClick={() => setShowingMobileMenu(false)}
            ></div>

            {/* --- SIDEBAR --- */}
            <aside
                className={`fixed inset-y-0 left-0 z-30 w-64 bg-white transition-transform duration-300 transform lg:translate-x-0 lg:static lg:inset-0 flex flex-col ${
                    showingMobileMenu ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex items-center justify-center h-20 shrink-0 mx-5 my-7 ">
                    <Link href="/" className="flex items-center gap-2 ">
                        <ApplicationLogo className="block h-8 w-auto fill-current text-blue-800" />
                        <span className="text-md font-bold text-gray-800 tracking-tight text-center hover:text-blue-600 transition-all duration-150">
                            Sistem Pengadaan dan Distribusi Alat Kebersihan
                            Walikota Palembang
                        </span>
                    </Link>
                </div>

                {/* scrollabe */}
                <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden py-2">
                    <nav className="space-y-2 px-3">
                        <SidebarLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                            icon="dashboard"
                        >
                            Dashboard
                        </SidebarLink>

                        {/* admin */}
                        {user.role === "admin" && (
                            <>
                                <SidebarLink
                                    href={route("items.index")}
                                    active={route().current("items.*")}
                                    icon="inventory_2"
                                >
                                    Manajemen Barang
                                </SidebarLink>
                                <SidebarLink
                                    href={route("users.index")}
                                    active={route().current("users.*")}
                                    icon="manage_accounts"
                                >
                                    Manajemen Pengguna
                                </SidebarLink>

                                <SidebarLink
                                    href={route("admin.index")}
                                    active={route().current("admin.*")}
                                    icon="assignment_turned_in"
                                >
                                    Proses Pengajuan
                                </SidebarLink>
                            </>
                        )}

                        {/* staff */}
                        {user.role === "staff" && (
                            <>
                                <SidebarLink
                                    href={route("pengajuan.create")}
                                    active={route().current("pengajuan.create")}
                                    icon="add_shopping_cart"
                                >
                                    Buat Pengajuan
                                </SidebarLink>
                                <SidebarLink
                                    href={route("pengajuan.index")}
                                    active={route().current("pengajuan.index")}
                                    icon="receipt_long"
                                >
                                    Riwayat Pengajuan
                                </SidebarLink>
                            </>
                        )}

                        {/* kabag */}
                        {user.role === "kabag" && (
                            <>
                                <SidebarLink
                                    href={route("kabag.index")}
                                    active={route().current("kabag.*")}
                                    icon="verified_user"
                                >
                                    Persetujuan
                                </SidebarLink>
                            </>
                        )}

                        {/* laporan */}
                        {(user.role === "admin" || user.role === "kabag") && (
                            <>
                                <SidebarLink
                                    href={route("laporan.stok.page")}
                                    active={route().current("laporan.*")}
                                    icon="insights"
                                >
                                    Laporan & Aktivitas
                                </SidebarLink>
                            </>
                        )}
                    </nav>
                </div>

                {/* footer sidebar */}
                <div className="py-4 px-3 border-t border-gray-50 shrink-0 space-y-2">
                    <SidebarLink
                        href={route("profile.edit")}
                        active={route().current("profile.edit")}
                        icon="settings"
                    >
                        Settings
                    </SidebarLink>

                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className=" flex items-center px-6 py-3 w-full transition-colors duration-200 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 group"
                    >
                        <span className="material-icons-round text-xl mr-3 text-gray-400 group-hover:text-red-600 transition-colors">
                            logout
                        </span>
                        <span className="font-medium text-sm tracking-wide">
                            Log out
                        </span>
                    </Link>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <div className="flex-1 flex flex-col overflow-hidden relative ">
                {/* header */}
                <header className="z-20 flex items-center justify-between px-8 py-5 absolute w-full bg-clip-padding backdrop-filter backdrop-blur-md border-b border-gray-200">
                    <button
                        onClick={() => setShowingMobileMenu(true)}
                        className="text-gray-500 focus:outline-none lg:hidden"
                    >
                        <span className="material-icons-round text-2xl">
                            menu
                        </span>
                    </button>

                    {/* Page Title (Desktop) */}
                    <div className="hidden lg:block text-xl font-bold text-gray-800">
                        {header}
                    </div>

                    {/* Right Side: Greeting & Profile */}
                    <div className="flex items-center gap-4 ml-auto">
                        <div className="text-right hidden sm:block">
                            <div className="text-sm font-bold text-gray-800">
                                {user.name}
                            </div>
                            <div className="text-xs text-gray-500 capitalize">
                                {user.role}
                            </div>
                        </div>

                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="flex items-center focus:outline-none group">
                                    <div className="w-10 h-10 rounded-full bg-sky-50 text-blue-800 flex items-center justify-center font-bold text-lg border border-blue-100 group-hover:bg-blue-800 group-hover:text-white transition-colors shadow-sm">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <p className="text-sm text-gray-900 font-bold">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                        {user.email}
                                    </p>
                                </div>
                                <Dropdown.Link href={route("profile.edit")}>
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="text-red-600"
                                >
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </header>

                {/* isi*/}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-blue-50 p-4 lg:p-8 z-0">
                    {/* mobile */}
                    <div className="lg:hidden mb-6 mt-24 text-xl font-bold text-gray-800">
                        {header}
                    </div>

                    <div className="lg:mt-8">{children}</div>
                </main>
            </div>
        </div>
    );
}
