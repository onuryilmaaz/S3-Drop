// "use client";

// import { PowerIcon } from "@heroicons/react/24/outline";

// import { handleSignOut } from "@/lib/cognitoActions";

// export default function LogoutForm() {
//   return (
//     <form action={handleSignOut}>
//       <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
//         <PowerIcon className="w-6" />
//         <div className="hidden md:block">Çıkış Yap</div>
//       </button>
//     </form>
//   );
// }

"use client";

import { PowerIcon } from "@heroicons/react/24/outline";
import { handleSignOut } from "@/lib/cognitoActions";

export default function LogoutForm() {
  return (
    <form onSubmit={handleSignOut} className="flex flex-col">
      <button
        type="submit"
        className="flex items-center space-x-3 rounded-md p-2 transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white w-full"
      >
        <PowerIcon className="w-6 h-6" />
        <span className="hidden md:inline text-sm font-medium">Çıkış Yap</span>
      </button>
    </form>
  );
}
