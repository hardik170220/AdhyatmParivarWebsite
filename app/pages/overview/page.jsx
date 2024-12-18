import Nbsp from '@/app/_components/Nbsp'
import Providers from '@/app/providers'
import React from 'react'

const Page = () => {
  return (
    <Providers>
      <div className="sm:py-6 pl-[1.9rem] sm:pl-[2.2rem]">
        <div className="flex justify-start items-center">
          <span className="text-base text-gray-800 sm:text-lg font-semibold font-Teko mr-4">
          Overview
          </span>
        </div>
        <hr className="w-full border-t-2" />
      </div>
      {/* Large Screen - Single Image */}
      <div className="hidden lg:flex flex-col  w-full h-full">
      <div>
          <img 
            src="/0/1.jpg" 
            alt="Small screen image 1"
            className="w-full h-auto"
          />
        </div>
        <div>
          <img 
            src="/0/2.jpg" 
            alt="Small screen image 1"
            className="w-full h-auto"
          />
        </div>
        <div>
          <img 
            src="/0/3.jpg" 
            alt="Small screen image 1"
            className="w-full h-auto"
          />
        </div>
        <div>
          <img 
            src="/0/4.jpg" 
            alt="Small screen image 1"
            className="w-full h-auto"
          />
        </div>
        <div>
          <img 
            src="/0/5.jpg" 
            alt="Small screen image 1"
            className="w-full h-auto"
          />
        </div>
        <div>
          <img 
            src="/0/6.jpg" 
            alt="Small screen image 1"
            className="w-full h-auto"
          />
        </div>
        <div>
          <img 
            src="/0/7.jpg" 
            alt="Small screen image 1"
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Small Screen - Three Images in Column */}
      <div className="lg:hidden w-full space-y-4 p-4">
        <div>
          <img 
            src="/0/1-1.jpg" 
            alt="Small screen image 1"
            className="w-full h-auto"
          />
        </div>
        <div>
          <img 
            src="/0/1-2.jpg" 
            alt="Small screen image 1"
            className="w-full h-auto"
          />
        </div>
        <div>
          <img 
            src="/0/2.jpg" 
            alt="Small screen image 2"
            className="w-full h-auto"
          />
        </div>
        <div>
          <img 
            src="/0/3.jpg" 
            alt="Small screen image 3"
            className="w-full h-auto"
          />
        </div>
        <div>
          <img 
            src="/0/4.jpg" 
            alt="Small screen image 3"
            className="w-full h-auto"
          />
        </div>
        <div>
          <img 
            src="/0/5.jpg" 
            alt="Small screen image 3"
            className="w-full h-auto"
          />
        </div>
        <div>
          <img 
            src="/0/6.jpg" 
            alt="Small screen image 3"
            className="w-full h-auto"
          />
        </div>
        <div>
          <img 
            src="/0/7-1.jpg" 
            alt="Small screen image 3"
            className="w-full h-auto"
          />
        </div>
        <div>
          <img 
            src="/0/7-2.jpg" 
            alt="Small screen image 3"
            className="w-full h-auto"
          />
        </div>
        <div>
          <img 
            src="/0/7-3.jpg" 
            alt="Small screen image 3"
            className="w-full h-auto"
          />
        </div>
      
      </div>
    </Providers>
  )
}

export default Page