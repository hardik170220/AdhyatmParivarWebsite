import React from "react";
import { FaSearch } from "react-icons/fa";

const Header1 = () => {
  return (
    <div>
      <header class=" container w-screen flex flex-wrap p-5 px-10 flex-col md:flex-row items-center justify-between">
        
          <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <img className="h-10" src="/hero1.png" alt="" />
            <span class="ml-3 font-bold text-xl">ADHYATM PARIVAR</span>
          </a>

          <div className="relative mt-4 md:mt-0 w-full md:w-1/3 flex justify-end order-3 md:order-3">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-100 text-sm placeholder:text-sm border-0 py-2 px-3 pr-10 w-full md:w-auto focus:outline-none hover:bg-gray-200"
            />
            <FaSearch className="absolute right-3 top-2.5 text-gray-600" />
          </div>
        
      </header>
    </div>
  );
};

export default Header1;
