import Nbsp from '@/app/_components/Nbsp'
import Providers from '@/app/providers'
import React from 'react'

const Page = () => {
  return (
    <Providers>
      <div className="sm:py-6 pl-[2.2rem] sm:pl-[1.2rem]">
        <div className="flex justify-start items-center">
          <span className="text-base text-gray-800 sm:text-lg font-semibold font-Teko mr-4">
            जिनमूर्ति विभाग
          </span>
          <div>
            <img className="h-4" src="/next.png" alt="" />
          </div>
          <span className="text-gray-600 font-semibold font-Teko text-base sm:text-lg ml-4">
            जिनप्रतिमा सुरक्षा (लेप-धोप)
          </span>
        </div>
        <hr className="w-full border-t-2" />
      </div>
      {/* Large Screen - Single Image */}
      <div className="hidden lg:block w-full h-full">
        <img 
          src="/1/1.3.jpg" 
          alt="Large screen image"
          className="w-full h-auto"
        />
      </div>

      {/* Small Screen - Three Images in Column */}
      <div className="lg:hidden w-full space-y-4 p-4">
        <div>
          <img 
            src="/1/1.3-1.jpg" 
            alt="Small screen image 1"
            className="w-full h-auto"
          />
        </div>
        <div>
          <img 
            src="/1/1.3-2.jpg" 
            alt="Small screen image 2"
            className="w-full h-auto"
          />
        </div>
        <div>
          <img 
            src="/1/1.1-3.jpg" 
            alt="Small screen image 3"
            className="w-full h-auto"
          />
        </div>
      </div>
    </Providers>
  )
}

export default Page