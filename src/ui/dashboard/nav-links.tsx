"use client";
import useAuthUser from "@/app/hooks/use-auth-user";
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Cloud, Download, LayoutDashboard, Upload } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const user = useAuthUser();
  const links = [
    {
      name: "Upload",
      href: "/dashboard/upload",
      icon: Upload,
    },
    {
      name: "Download",
      href: "/dashboard/download",
      icon: Download,
    },
    {
      name: "Dashboard",
      href: "/dashboard/list",
      icon: LayoutDashboard,
    },
  ];

  const pathname = usePathname();

  if (user && user.isAdmin) {
    links.push({
      name: "Admin Area",
      href: "/dashboard/admins",
      icon: Cloud,
    });
  }

  return (
    <div className="flex flex-col space-y-3 p-4 bg-white shadow-lg rounded-lg overflow-y-auto">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex items-center space-x-3 rounded-md p-2 transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white",
              {
                "bg-gradient-to-r from-blue-500 to-purple-600 text-white": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6 h-6" />
            <span className="hidden md:inline text-sm font-medium">{link.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
