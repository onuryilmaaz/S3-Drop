"use client";
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [fileTree, setFileTree] = useState({});
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('/api/admin-list');
        const data = await response.json();
        const tree = buildFileTree(data);
        setFileTree(tree);
      } catch (error) {
        console.error('Dosyalar getirilirken hata oluştu:', error);
      }
    };

    fetchFiles();
  }, []);

  const buildFileTree = (files) => {
    const tree = {};
    files.forEach(file => {
      const parts = file.key.split('/');
      let current = tree;
      for (let i = 0; i < parts.length; i++) {
        if (!current[parts[i]]) {
          current[parts[i]] = (i === parts.length - 1) ? { ...file, size: file.size, lastModified: file.lastModified } : {};
        }
        current = current[parts[i]];
      }
    });
    return tree;
  };

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

  const renderFileTree = (tree, path = '') => {
    const parts = currentPath.split('/');
    let current = tree;
    for (let part of parts) {
      if (part && current[part]) {
        current = current[part];
      }
    }

    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Yüklenen Dosyalar</h1>
        <div className="bg-white p-4 rounded shadow-md">
          {path && (
            <div 
              className="cursor-pointer text-blue-500 hover:underline mb-2" 
              onClick={() => setCurrentPath(path.split('/').slice(0, -1).join('/'))}
            >
              ◀️ Geri
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.keys(current).map((key) => {
              const newPath = path ? `${path}/${key}` : key;
              if (typeof current[key] === 'object' && !current[key].key) {
                return (
                  <div key={newPath} className="flex items-center justify-between py-2">
                    <div 
                      onClick={() => setCurrentPath(newPath)}
                      className="cursor-pointer text-blue-500 hover:underline flex items-center"
                    >
                      <span className="mr-2">📁</span> 
                      <span>{key}</span>
                    </div>
                  </div>
                );
              } else {
                const file = current[key];
                const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2); // Byte cinsinden gelen boyutu MB'ye çevir
                const fileLastModified = new Date(file.lastModified).toLocaleString(); // UNIX zaman damgasını tarih ve saat formatına çevir
                return (
                  <div key={newPath} className="bg-gray-100 p-4 rounded shadow-md">
                    <div className="flex items-center space-x-2 mb-4">
                      <span>{getFileIcon(current[key].key)}</span>
                      <span className="font-medium">{key}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-500">{fileSizeMB} MB</span>
                      <span className="text-gray-500">{fileLastModified}</span>
                    </div>
                    <div className="flex justify-between mt-4">
                      <button 
                        onClick={() => handleDownload(current[key].key)}
                        className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                      >
                        İndir
                      </button>
                      <button 
                        onClick={() => handleDelete(current[key].key)}
                        className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  };

  const handleDownload = async (key) => {
    try {
      const response = await fetch(`/api/download?fileKey=${encodeURIComponent(key)}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = key.split('/').pop(); // Dosya adını alır
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Dosya indirilirken hata oluştu:', error);
    }
  };

  const handleDelete = async (key) => {
    try {
      const response = await fetch(`/api/list?fileKey=${encodeURIComponent(key)}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Dosya ağacını yeniden oluştur
        const updatedFiles = files.filter(file => file.key !== key);
        setFileTree(buildFileTree(updatedFiles));
      } else {
        console.error('Dosya silinirken hata oluştu:', await response.json());
      }
    } catch (error) {
      console.error('Dosya silinirken hata oluştu:', error);
    }
  };

  return (
    <div>
      {Object.keys(fileTree).length === 0 ? (
        <p className="text-center mt-8">Henüz dosya yüklenmedi.</p>
      ) : (
        renderFileTree(fileTree, currentPath)
      )}
    </div>
  );
};

export default Dashboard;
