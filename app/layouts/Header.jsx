

"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
import { FiAlignJustify, FiX } from 'react-icons/fi';
import Sidebar from './Sidebar';
import { useGlobalProvider } from '../context/GlobalContext';

const Header = ({ className }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [screenSize, setScreenSize] = useState('');

    const { isSidebarHide, setIsSidebarHide } = useGlobalProvider();
        
    const handleResize = () => {
        if (window.innerWidth < 768) {
            setScreenSize('small');
        } else if (window.innerWidth < 1024) {
            setScreenSize('medium');
        } else {
            setScreenSize('large');
            setIsSidebarOpen(false); // Close sidebar on larger screens
        }
    };

    useEffect(() => {
        handleResize(); // Check initial screen size
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        if (screenSize === 'small' || screenSize === 'medium') {
            setIsSidebarOpen(!isSidebarOpen);
        } else {
            setIsSidebarHide(!isSidebarHide);
        }
    };

    return (
        <>
            <header className={`font-notoSans text-gray-500 z-50 shadow-lg  md:w-full sm:w-full border-gray-500 bg-white ${className}`}>
                <div className="container mx-auto flex flex-wrap px-5 py-4 items-center justify-between">
                    <div className="flex items-center justify-between w-full md:w-1/3">
                        <div
                            className='bg-gray-100 flex items-center justify-center p-2 cursor-pointer h-10 w-10 rounded-full md:h-auto md:w-auto order-1 md:order-1'
                            onClick={toggleSidebar}
                        >
                            {isSidebarOpen ? <FiX size={24} /> : <FiAlignJustify size={24} />}
                        </div>
                    </div>
                    <div className="flex justify-center w-full md:w-1/3 order-2 md:order-2 ">
                        <Link href={'/'} className="flex gap-4 items-center mb-4 md:mb-0">
                            <img className='h-10' src="/hero1.png" alt="" />
                            <span className="text-sm tracking-widest uppercase text-gray-800"><b>Adhyatm&nbsp;&nbsp;&nbsp;Parivar</b></span>
                        </Link>
                    </div>
                    <div className="relative mt-4 md:mt-0 w-full md:w-1/3 flex justify-end order-3 md:order-3">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-gray-100 text-sm placeholder:text-sm border-0 py-2 px-3 pr-10 w-full md:w-auto focus:outline-none hover:bg-gray-200"
                        />
                        <FaSearch className="absolute right-3 top-2.5 text-gray-600" />
                    </div>
                </div>
            </header>
            {(screenSize === 'small' || screenSize === 'medium') && (
                <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-30 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
                    <div className="bg-white p-2 w-64 h-full">
                        <button className="text-gray-500 flex items-center justify-center h-10 w-10 rounded-full bg-gray-100" onClick={toggleSidebar}><FiX size={24} /></button>
                        <Sidebar />
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;