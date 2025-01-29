"use client";
import React, { useState } from "react";
import { useGlobalProvider } from "../context/GlobalContext";
import { BiChevronRight } from "react-icons/bi";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const ServiceDetails = () => {
  const { serviceDetails,departmentName,service } = useGlobalProvider();
  const [featuredIndex, setFeaturedIndex] = useState(0);

  // Get featured post based on current index
  const featuredService = serviceDetails[featuredIndex];

  // Get all posts except the currently featured one
  const remainingServiceDetails = serviceDetails.filter(
    (_, index) => index !== featuredIndex
  );

  const handleCardClick = (originalIndex) => {
    setFeaturedIndex(originalIndex);
  };

  return (
    <div className="w-full mx-auto sm:px-4">
      {/* Header Section */}
      <div className="mb-4 border-b-2">
        <h1 className="text-base sm:text-xl flex items-center font-Teko text-gray-800 font-bold">
          <span>{departmentName}</span>
          <BiChevronRight size={30} />
          <span>{service.name}</span>
        </h1>
      </div>

      {/* Featured serviceDetail */}
      {featuredService && (
        <div className="mb-4 bg-white font-Karma overflow-hidden">
          <div className="grid sm:h-[400px] sm:grid-cols-2 gap-4">
            <div className="relative">
              <img
                className="w-full h-full object-cover"
                src={`${process.env.IMG_URL}${featuredService.imageUrl}`}
                alt={featuredService.imageUrl}
              />
            </div>
            <div className="flex custom-scrollbar sm:overflow-y-scroll flex-col justify-start">
              <p className="text-gray-600 tracking-wider leading-relaxed">
                {featuredService.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Remaining serviceDetails */}
      <div className="flex flex-col">
      <div className="my-4 border-b-2">
        <h1 className="text-base sm:text-xl flex items-center gap-4 font-Teko text-gray-800 font-bold">
          <span>अन्य कार्य</span>
          <MdKeyboardDoubleArrowRight size={24} className="arrow" />
        </h1>
      </div>
      <div className="grid sm:grid-cols-5 font-Karma gap-4">
        {remainingServiceDetails.map((serviceDetail) => (
          <article
            key={serviceDetail.serviceDetailID}
            className="overflow-hidden transition-transform duration-300 hover:translate-y-[-4px] bg-white flex sm:flex-col sm:block sm:cursor-pointer"
            onClick={() =>
              handleCardClick(
                serviceDetails.findIndex(
                  (sd) =>
                    sd.serviceDetailID === serviceDetail.serviceDetailID
                )
              )
            }
          >
            {/* Image Section */}
            <div className="w-[4.5rem] h-[4.5rem] flex-shrink-0 sm:relative sm:h-32 sm:w-full">
              {serviceDetail.imageUrl && (
                <img
                  src={`${process.env.IMG_URL}${serviceDetail.imageUrl}`}
                  className="w-full h-full object-cover"
                  alt={serviceDetail.imageUrl}
                />
              )}
            </div>

            {/* Content Section */}
            <div className="ml-4 flex flex-col justify-center sm:ml-0 sm:py-2">
              <h3 className="text-sm font-medium sm:text-base text-gray-700 font-Teko mb-2 line-clamp-1">
                {serviceDetail.shortDescription}
              </h3>
              <p className="text-xs text-gray-500 mt-1 sm:text-sm sm:mb-2 line-clamp-2">
                {serviceDetail.description}...
              </p>
              <div className="hidden sm:flex items-center justify-between">
                <button className="text-blue-600 font-NotoSansHindi text-xs hover:underline">
                  Read More
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
