"use client";
import { File, Upload, Cloud, Download } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function SideNav() {
    const menuList = [
        {
            id: 1,
            name: 'Upload',
            icon: Upload,
            path: '/upload'
        },
        {
            id: 2,
            name: 'Download',
            icon: Download,
            path: '/download'
        },
        {
            id: 3,
            name: 'Dashboard',
            icon: Cloud,
            path: '/dashboard'
        }
    ];

    const [activeIndex, setActiveIndex] = useState(null);
    const router = useRouter();

    const handleMenuItemClick = (path, index) => {
        setActiveIndex(index);
        router.push(path); // Belirli bir sayfaya yönlendirme yap
    };

    return (
        <div className='shadow-sm border-r h-full'>
            <div className='p-5 border-b'>
                <Image src='/logo.svg' width={150} height={100} alt="Logo" />
            </div>
            <div className='flex flex-col float-left'>
                {menuList.map((item, index) => (
                    <button
                        key={item.id}
                        className={`flex gap-2 p-4 px-6 hover:bg-gray-100 w-full text-gray-500 
                        ${activeIndex === index ? 'bg-blue-50 text-primary' : ''}`}
                        onClick={() => handleMenuItemClick(item.path, index)}
                    >
                        <item.icon />
                        <h2>{item.name}</h2>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default SideNav;

