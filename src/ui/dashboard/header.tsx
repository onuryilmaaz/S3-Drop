"use client";
import React from 'react';
import useAuthUser from "@/app/hooks/use-auth-user";
import { File } from 'lucide-react';
import Link from "next/link";
import clsx from "clsx";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const user = useAuthUser();

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
      <div className="container mx-auto py-4 px-6 flex justify-between items-center">
        <div className="flex items-center text-white">
          <File className="w-8 h-8 mr-2" /> 
          <h1 className="text-2xl font-extrabold tracking-wide">S3 Drop</h1>
        </div>
        <div className="text-white">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-lg">Hoşgeldiniz, {user.name}</span>
              <Link
                href="/dashboard/profile"
                className={clsx(
                  "flex items-center gap-2 rounded-full bg-blue-700 px-4 py-2 text-sm font-medium hover:bg-blue-800"
                )}
              >
                <UserCircleIcon className="w-6 h-6" />
                <span className="hidden md:inline">Profil</span>
              </Link>
            </div>
          ) : (
            <span className="text-lg">Loading...</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
