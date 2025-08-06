"use client";
import React, { useEffect } from "react";
import { BiChevronRight } from "react-icons/bi";
import { useGlobalProvider } from "../context/GlobalContext";
// import TailwindSafelist from './TailwindSafelist';

const ServiceDetails = () => {
  
  useEffect(() => {
    // Check if the page has already been reloaded in this session
    if (!sessionStorage.getItem("reloaded")) {
      sessionStorage.setItem("reloaded", "true");
      window.location.reload();
    }
  }, []);
  
  const { serviceDetails, departmentName, service } = useGlobalProvider();
  // console.log(serviceDetails, "serviceDetail.description");

  

  return (
    <div className="w-full font-Teko mx-auto sm:px-4">
      {/* <TailwindSafelist /> */}
      {/* Header Section */}
      <div className=" border-b-2">
        <h1 className="text-base sm:text-xl flex items-center font-bold text-gray-800">
          <span>{departmentName}</span>
          <BiChevronRight className="w-6 h-6" />
          <span>{service.name}</span>
        </h1>
      </div>

      {/* Content Sections */}
      <div className="space-y-8">
        {serviceDetails.map((serviceDetail, index) => (
          
          <section
            key={serviceDetail.serviceDetailID}
            className="container mx-auto"
          >
            <div className="w-full mx-auto sm:px-4">
              <article
                className={`flex flex-col ${
                  index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                } gap-8`}
              >
                <div className="w-full flex flex-col justify-start">
                  <div className="prose max-w-none">
                    <div 
                      className="font-Karma" 
                      dangerouslySetInnerHTML={{ __html: serviceDetail.description }} 
                    />
                      {/* {serviceDetail.description.replace(/"/g, '')} */}

                    {/* </div> */}
                    {serviceDetail.bullets && (
                      <ul className="mt-4 pl-6 list-disc">
                        {serviceDetail.bullets.map((bullet, idx) => (
                          <li key={idx} className="text-gray-600 mb-2">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </article>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ServiceDetails;

// "use client";
// import React, { useEffect, useState } from "react";
// import { BiChevronRight } from "react-icons/bi";
// import { useGlobalProvider } from "../context/GlobalContext";
// import ServiceSkeleton from "./ServiceSkeleton";

// const ServiceDetails = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [showContent, setShowContent] = useState(false);
  
//   useEffect(() => {
//     // Check if the page has already been reloaded in this session
//     if (!sessionStorage.getItem("reloaded")) {
//       sessionStorage.setItem("reloaded", "true");
//       window.location.reload();
//     }
//   }, []);
  
//   const { serviceDetails, departmentName, service } = useGlobalProvider();

//   // Handle loading state
//   useEffect(() => {
//     if (serviceDetails && serviceDetails.length > 0) {
//       const timer = setTimeout(() => {
//         setIsLoading(false);
//         setTimeout(() => setShowContent(true), 100);
//       }, 800);

//       return () => clearTimeout(timer);
//     }
//   }, [serviceDetails]);

//   if (isLoading || !serviceDetails || serviceDetails.length === 0) {
//     return (
//       <div className="">
//         <ServiceSkeleton/>
//       </div>
//     );
//   }

//   return (
//     <div className={`w-full font-Teko mx-auto sm:px-4 transition-all duration-1000 ${
//       showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
//     }`}>
//       {/* Header Section */}
//       <div className={`border-b-2 transition-all duration-800 delay-200 ${
//         showContent ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
//       }`}>
//         <h1 className="text-base sm:text-xl flex items-center font-bold text-gray-800">
//           <span>{departmentName}</span>
//           <BiChevronRight className="w-6 h-6" />
//           <span>{service.name}</span>
//         </h1>
//       </div>

//       {/* Content Sections */}
//       <div className="space-y-12">
//         {serviceDetails.map((serviceDetail, index) => (
//           <section
//             key={serviceDetail.serviceDetailID}
//             className={`container mx-auto transition-all duration-1000 ease-out ${
//               showContent 
//                 ? 'opacity-100 translate-y-0' 
//                 : 'opacity-0 translate-y-8'
//             }`}
//             style={{
//               transitionDelay: `${400 + index * 200}ms`
//             }}
//           >
//             <div className="w-full mx-auto sm:px-4">
//               <article
//                 className={`flex flex-col ${
//                   index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
//                 } gap-8 group`}
//               >
//                 <div className="w-full flex flex-col justify-start">
//                   <div className={`prose max-w-none transition-all duration-700 ease-out ${
//                     showContent 
//                       ? 'opacity-100 scale-100' 
//                       : 'opacity-0 scale-95'
//                   }`}
//                   style={{
//                     transitionDelay: `${600 + index * 200}ms`
//                   }}>
//                     <div 
//                       className="font-Karma leading-relaxed text-gray-700 hover:text-gray-900 transition-colors duration-300" 
//                       dangerouslySetInnerHTML={{ __html: serviceDetail.description }} 
//                     />

//                     {serviceDetail.bullets && (
//                       <ul className={`mt-6 pl-6 list-disc space-y-2 transition-all duration-500 ${
//                         showContent 
//                           ? 'opacity-100 translate-x-0' 
//                           : 'opacity-0 translate-x-4'
//                       }`}
//                       style={{
//                         transitionDelay: `${800 + index * 200}ms`
//                       }}>
//                         {serviceDetail.bullets.map((bullet, idx) => (
//                           <li 
//                             key={idx} 
//                             className={`text-gray-600 mb-2 transition-all duration-500 hover:text-gray-800 hover:translate-x-1 ${
//                               showContent 
//                                 ? 'opacity-100 translate-x-0' 
//                                 : 'opacity-0 translate-x-2'
//                             }`}
//                             style={{
//                               transitionDelay: `${900 + index * 200 + idx * 100}ms`
//                             }}
//                           >
//                             {bullet}
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </div>
//                 </div>
//               </article>
//             </div>
//           </section>
//         ))}
//       </div>

//     </div>
//   );
// };

// export default ServiceDetails;