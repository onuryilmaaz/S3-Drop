"use client";
import { useState, useEffect } from 'react';

const Favorites = ({ favorites, setFavorites }) => {
  const getFileIcon = (key) => {
    const ext = key.split('.').pop().toLowerCase();
    switch (ext) {
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
        return '🖼️'; // Resim ikonu
      case 'pdf':
        return '📄'; // PDF ikonu
      case 'doc':
      case 'docx':
        return '📄'; // Word doküman ikonu
      case 'xls':
      case 'xlsx':
        return '📄'; // Excel doküman ikonu
      case 'txt':
        return '📄'; // Metin dosyası ikonu
      default:
        return '📄'; // Genel dosya ikonu
    }
  };

  const handleRemoveFavorite = (key) => {
    setFavorites((prevFavorites) => prevFavorites.filter(file => file.key !== key));
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Favori Dosyalar</h1>
      <div className="bg-white p-4 rounded shadow-md">
        {favorites.length === 0 ? (
          <p className="text-center">Henüz favorilere dosya eklenmedi.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favorites.map((file) => {
              const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2); // Byte cinsinden gelen boyutu MB'ye çevir
              const fileLastModified = new Date(file.lastModified).toLocaleString(); // UNIX zaman damgasını tarih ve saat formatına çevir
              return (
                <div key={file.key} className="bg-gray-100 p-4 rounded shadow-md">
                  <div className="flex items-center space-x-2 mb-4">
                    <span>{getFileIcon(file.key)}</span>
                    <span className="font-medium">{file.key.split('/').pop()}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-500">{fileSizeMB} MB</span>
                    <span className="text-gray-500">{fileLastModified}</span>
                  </div>
                  <div className="flex justify-between mt-4">
                    <button 
                      onClick={() => handleRemoveFavorite(file.key)}
                      className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      Favorilerden Kaldır
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
