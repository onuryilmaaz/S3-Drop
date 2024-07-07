// import AcmeLogo from "@/ui/acme-logo";

// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <main className="flex items-center justify-center md:h-screen">
//       <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
//         <div className="flex h-20 w-full items-end rounded-lg bg-white-100 p-3 md:h-36">
//           <div className="w-32 text-white md:w-36">
//             <AcmeLogo />
//           </div>
//         </div>
//         {children}
//       </div>
//     </main>
//   );
// }


// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-700 to-gray-900">
//       <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-6 p-6 md:-mt-32 bg-gray-800 rounded-lg shadow-lg text-gray-200">
//         {children}
//       </div>
//     </main>
//   );
// }


import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex items-center justify-center min-h-screen bg-cover bg-center"
          style={{ backgroundImage: "url('/bg2.jpg')" }}>
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-6 p-6 md:-mt-32 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg text-gray-200">
        {children}
      </div>
    </main>
  );
}

