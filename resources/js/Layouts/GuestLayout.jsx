import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col  items-center pt-6 sm:justify-center sm:pt-0">
            <div className="flex flex-col justify-center items-center w-full overflow-hidden px-6 py-6 border border-gray-200 sm:max-w-md sm:rounded-lg">
                <Link href="/">
                    <ApplicationLogo className="h-20 fill-current" />
                </Link>
                <div className="w-full p-4">{children}</div>
            </div>
        </div>
    );
}
