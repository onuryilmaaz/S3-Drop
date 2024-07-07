"use client";
import Link from "next/link";
import NavLinks from "@/ui/dashboard/nav-links";
import AcmeLogo from "@/ui/acme-logo";
import LogoutForm from "@/ui/dashboard/logout-form";
import clsx from "clsx";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

export default function SideNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col px-3 py-4 md:px-2">
      <div className="flex flex-col space-y-4">
        <NavLinks />
        
        <Link
          href="/dashboard/profile"
          className={clsx(
            "flex items-center space-x-3 rounded-md p-2 transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white",
            {
              "bg-gradient-to-r from-blue-500 to-purple-600 text-white": pathname === "/dashboard/profile",
            }
          )}
        >
          <UserCircleIcon className="w-6 h-6" />
          <span className="hidden md:inline text-sm font-medium">Profil</span>
        </Link>
        
        <LogoutForm />
      </div>
    </div>
  );
}
