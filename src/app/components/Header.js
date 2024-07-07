// import React from 'react';
// import useAuthUser from '/app/hooks/use-auth-user';

// const Header = () => {
//   const user = useAuthUser();

//   return (
//     <header className="header">
//       <div className="container mx-auto py-4 flex justify-end items-center">
//         {user ? (
//           <div className="flex items-center space-x-4">
//             <span className="text-gray-600">Hoşgeldiniz, {user.username}</span>
//             <span className="text-gray-600">({user.attributes.email})</span>
//           </div>
//         ) : (
//           <span>Yükleniyor...</span>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;

import React from 'react';
import useAuthUser from '/app/hooks/use-auth-user';

const Header = () => {
  const user = useAuthUser();

  return (
    <header className="bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <a href="/" className="hover:underline">MyApp</a>
        </div>
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-white font-semibold">Hoşgeldiniz, {user.username}</span>
            <span className="text-gray-200">({user.attributes.email})</span>
            <button className="bg-white text-purple-600 px-4 py-2 rounded-full hover:bg-gray-100 transition duration-300">Logout</button>
          </div>
        ) : (
          <span className="text-gray-200">Yükleniyor...</span>
        )}
      </div>
    </header>
  );
};

export default Header;
