'use client'
import Link from 'next/link';
import React, { useState, useCallback, useMemo } from 'react';
import { FaEye, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { FaX } from "react-icons/fa6";
import { photoData1 } from '@/app/data/sba';

const PhotoGalleryHome = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Memoize the latest photos to prevent recalculation on every render
  const latestPhotos = useMemo(() => {
    const allPhotos = [...photoData1.hindi];
    return allPhotos
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 4);
  }, []);

  // Memoized navigation handlers to prevent unnecessary re-renders
  const goToPrevious = useCallback(() => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? latestPhotos.length - 1 : prev - 1
    );
  }, [latestPhotos.length]);

  const goToNext = useCallback(() => {
    setSelectedImageIndex((prev) =>
      prev === latestPhotos.length - 1 ? 0 : prev + 1
    );
  }, [latestPhotos.length]);

  const goToSlide = useCallback((index) => {
    setSelectedImageIndex(index);
  }, []);

  const PhotoCard = ({ photo, index, isActive = false }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
      <div
        className="group bg-white font-Teko rounded-sm shadow-lg hover:shadow-2xl transition-all duration-500  overflow-hidden border border-gray-100"
      >
        <div className="relative overflow-hidden rounded-t-sm">
          {!imageError ? (
            <>
              {!imageLoaded && (
                <div className="w-full h-auto min-h-[300px] bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
                  <div className="text-gray-400 flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mb-3">
                      <div className="w-8 h-8 text-gray-400">
                        <img src="/hero1.png" alt="adhyatm" />
                      </div>
                    </div>
                    <div className="text-sm">Loading...</div>
                  </div>
                </div>
              )}
              <img
                src={photo.imageUrl}
                alt={photo.name}
                className={`w-full h-auto object-contain bg-gray-50 transition-all duration-700 group-hover:scale-102 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0 absolute'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  console.error(`Failed to load image: ${photo.imageUrl}`);
                  setImageError(true);
                }}
                loading={isActive ? "eager" : "lazy"}
                decoding="async"
              />
            </>
          ) : (
            <div className="w-full h-auto min-h-[300px] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mb-3 mx-auto">
                  <FaX className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm font-medium">Image not available</div>
              </div>
            </div>
          )}
        </div>

        {/* Title below image - always visible */}
        <Link href={'/pages/sba'} className="p-3 block bg-golden">
          <h3 className="text-base font-bold text-gray-100 line-clamp-2 text-center">
            {photo.name}
          </h3>
        </Link>
      </div>
    );
  };

  // Navigation Dots Component
  const NavigationDots = () => (
    <div className="flex justify-center items-center space-x-3 mt-4">
      {latestPhotos.map((_, index) => (
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className={`transition-all duration-300 rounded-full ${
            index === selectedImageIndex
              ? 'w-8 h-3 bg-golden/90 shadow-md'
              : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );

  return (
    <div className="font-Teko bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
      {/* Header */}
      <div className='border-b-2 border-golden mb-6'>
        <h2 className="font-bold flex items-center gap-2 text-xl text-gray-600 text-start">शासनभक्ति की अंजलि</h2>
        <p className="font-karma text-sm font-bold text-gray-600 mb-4">
          अध्यात्म परिवार द्वारा किए जा रहे शासन सेवा - सुरक्षा के कार्यों की झलक
        </p>
      </div>

      {/* Latest Photos Section */}
      <div>
        {/* Mobile Carousel */}
        <div className="lg:hidden">
          {latestPhotos.length > 0 && (
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative overflow-hidden rounded-lg">
                <PhotoCard 
                  photo={latestPhotos[selectedImageIndex]} 
                  index={selectedImageIndex}
                  isActive={true}
                />

                {/* Navigation Arrows */}
                <button
                  onClick={goToPrevious}
                  className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white/60  rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 z-10"
                  aria-label="Previous image"
                >
                  <FaChevronLeft/>
                </button>

                <button
                  onClick={goToNext}
                  className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white/60  rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 z-10"
                  aria-label="Next image"
                >
                  <FaChevronRight/>
                </button>

                {/* Image Counter */}
                {/* <div className="absolute top-3 right-3 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {selectedImageIndex + 1} / {latestPhotos.length}
                </div> */}
              </div>

              {/* Navigation Dots */}
              <NavigationDots />

              {/* Thumbnail Preview */}
              <div className="flex justify-center space-x-2 mt-4 px-4">
                {latestPhotos.map((photo, index) => (
                  <button
                    key={photo.id}
                    onClick={() => goToSlide(index)}
                    className={`relative w-16 h-12 rounded-md overflow-hidden transition-all duration-300 ${
                      index === selectedImageIndex
                        ? 'ring-2 ring-golden/80 ring-offset-2 scale-110'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={photo.imageUrl}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-4 gap-4 sm:gap-6">
          {latestPhotos.map((photo, index) => (
            <PhotoCard key={photo.id} photo={photo} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-8 text-center">
          <Link
            href="/pages/sba"
            className="font-Roboto font-bold flex rounded-md sm:inline-flex items-center justify-center bg-golden text-white px-8 py-3 hover:from-golden/80 transition-all duration-300 group shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            View all
            <FaChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* Empty State */}
        {latestPhotos.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaEye className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              कोई फोटो उपलब्ध नहीं है
            </h3>
            <p className="text-gray-500">
              जल्द ही नई फोटो जोड़ी जाएंगी
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoGalleryHome;