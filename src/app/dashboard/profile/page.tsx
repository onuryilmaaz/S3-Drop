import { lusitana } from "@/ui/fonts";
import UpdateProfileForm from "@/ui/profile-settings/update-profile-form";
import UpdatePasswordForm from "@/ui/profile-settings/update-password-form";
import UpdateEmailForm from "@/ui/profile-settings/update-email-form";

export default function Profile() {
  return (
    <main>
      <div className="flex w-full items-center justify-between mb-4">
        <h1 className={`${lusitana.className} text-2xl`}>Profil ayarları</h1>
      </div>
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
        <UpdateProfileForm />
        <UpdatePasswordForm />
        <UpdateEmailForm />
      </div>
    </main>
  );
}

