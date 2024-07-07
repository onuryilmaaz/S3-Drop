"use client";
import { useState } from 'react';
import { ExclamationCircleIcon, KeyIcon , EyeIcon,EyeSlashIcon,} from "@heroicons/react/24/outline";
import { Button } from "@/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { handleUpdatePassword } from "@/lib/cognitoActions";

export default function UpdatePasswordForm() {
  const [status, dispatch] = useFormState(handleUpdatePassword, undefined);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Mevcut Şifre
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="current_password"
                type={showPassword ? "text" : "password"}
                name="current_password"
                placeholder="Şifreniz"
                required
                minLength={6}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Yeni Şifre
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="new_password"
                type={showPassword ? "text" : "password"}
                name="new_password"
                placeholder="Yeni Şifreniz"
                required
                minLength={6}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>
        </div>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {status === "error" && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">
              Şifre güncellenirken bir hata oluştu.
              </p>
            </>
          )}
          {status === "success" && (
            <p className="text-sm text-green-500">
              Şifre başarıyla güncellendi.
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <UpdateButton />
      </div>
    </form>
  );
}

function UpdateButton() {
  const { pending } = useFormStatus();

  return <Button aria-disabled={pending}>Şifreyi Güncelle</Button>;
}
