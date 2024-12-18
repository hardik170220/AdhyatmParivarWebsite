import Nbsp from '@/app/_components/Nbsp'
import Providers from '@/app/providers'
import React from 'react'

const Page = () => {
  return (
    <Providers>
       <div className="sm:py-6 pl-[1.2rem] sm:pl-[4.6rem]">
        <div className="flex justify-start items-center">
          <span className="text-base text-gray-800 sm:text-lg font-semibold font-Teko mr-4">
          अध्यात्म विभाग
          </span>
          <div>
            <img className="h-4" src="/next.png" alt="" />
          </div>
          <span className="text-gray-600 font-semibold font-Teko text-base sm:text-lg ml-4">
          अध्यात्मशाला (बालसंस्करण पाठशाला)
          </span>
        </div>
        <hr className="w-full border-t-2" />
      </div>
      {/* Large Screen - Single Image */}
      <div className="hidden lg:flex flex-col  w-full h-full">
      <div>
          <img 
            src="/4/4.9.jpg" 
            alt="Small screen image 1"
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Small Screen - Three Images in Column */}
      <div className="lg:hidden w-full space-y-4 p-4">
        <div>
          <img 
            src="/4/4.9s-1.jpg" 
            alt="Small screen image 1"
            className="w-full h-auto"
          />
        </div>
        <div>
          <img 
            src="/4/4.9s-2.jpg" 
            alt="Small screen image 3"
            className="w-full h-auto"
          />
        </div>
      </div>
    </Providers>
  )
}

export default Page