// import { GlobeAltIcon } from "@heroicons/react/24/outline";
// import { lusitana } from "@/ui/fonts";
// import { AlignCenterIcon, AlignJustify, File, } from "lucide-react";

// export default function AcmeLogo() {
//   return (
//     <div className={`${lusitana.className}  text-white`}>
//       <File className="h-10 w-10" />
//       <p className="text-[20px] text-center">S3-Drop</p> 
//     </div>
//   );
// }

import { lusitana } from "@/ui/fonts";
import { File } from "lucide-react";

export default function AcmeLogo() {
  return (
    <div className={`${lusitana.className} text-white flex items-center justify-center space-x-2`}>
      {/* <img src="/logo.svg" alt="Logo" className="h-10 w-10" /> */}
      <p className="text-2xl">S3-Drop</p>
    </div>
  );
}
