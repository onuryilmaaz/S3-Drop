// 'use client';

// import { useState } from 'react';

// export default function DownloadFile() {
//   const [fileKey, setFileKey] = useState('');

//   const handleDownload = async () => {
//     const response = await fetch(`/api/download?fileKey=${fileKey}`);
//     if (!response.ok) {
//       console.error('Dosya indirilirken hata oluştu:', response.statusText);
//       return;
//     }
//     const blob = await response.blob();
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.style.display = 'none';
//     a.href = url;
//     a.download = fileKey;
//     document.body.appendChild(a);
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="flex items-center justify-center bg-white">
//       <div className="bg-gray-100 p-6 rounded-lg shadow-xl w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Download File</h2>
//         <input
//           type="text"
//           value={fileKey}
//           onChange={(e) => setFileKey(e.target.value)}
//           placeholder="Enter file key"
//           className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           onClick={handleDownload}
//           className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
//         >
//           Download File
//         </button>
//       </div>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';

export default function DownloadFile() {
  const [fileKey, setFileKey] = useState('');

  const handleDownload = async () => {
    const response = await fetch(`/api/download?fileKey=${fileKey}`);
    if (!response.ok) {
      console.error('Dosya indirilirken hata oluştu:', response.statusText);
      return;
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = fileKey;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Download File</h2>
        <input
          type="text"
          value={fileKey}
          onChange={(e) => setFileKey(e.target.value)}
          placeholder="Enter file key"
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleDownload}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Download File
        </button>
      </div>
    </div>
  );
}
