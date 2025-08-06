import React from "react";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";

const Header1 = () => {
  return (
    <div>
      <header className="font-notoSans container bg-gray-100 max-w-7xl flex flex-wrap p-3 px-10 flex-col md:flex-row items-center justify-between">
        <Link href={"/"} className="flex gap-4 items-center mb-4 md:mb-0">
          <img className="h-10" src="/hero1.png" alt="" />
          <span className="text-sm font-Roboto tracking-widest uppercase text-gray-800">
            <b>Adhyatm&nbsp;&nbsp;&nbsp;Parivar</b>
          </span>
        </Link>

        <div className="relative mt-4 md:mt-0 w-full md:w-1/3 flex justify-end order-3 md:order-3">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-100 text-sm border placeholder:text-sm  py-2 px-3 pr-10 w-full md:w-auto focus:outline-none hover:bg-gray-200"
          />
          <FaSearch className="absolute right-3 top-2.5 text-gray-600" />
        </div>
      </header>
    </div>
  );
};

export default Header1;
