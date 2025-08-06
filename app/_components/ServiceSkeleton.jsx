import React from "react";

const ServiceSkeleton = () => {
  return (
    <div>
      <div className="border-b-2 animate-pulse w-full font-Teko mx-auto sm:px-4">
        <div className="flex items-center space-x-2">
          <div className="h-6 bg-gray-300 rounded w-32"></div>
          <div className="w-6 h-6 bg-gray-300 rounded"></div>
          <div className="h-6 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
      <div className="space-y-12 mt-8 animate-pulse">
        {[...Array(3)].map((_, index) => (
          <section key={index} className="container mx-auto">
            <div className="w-full mx-auto sm:px-4">
              <article className="flex flex-col gap-8">
                <div className="w-full flex flex-col justify-start space-y-4">
                  {/* Skeleton lines for content */}
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-300 rounded w-4/5"></div>
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </div>

                  {/* Skeleton bullet points */}
                  <div className="space-y-2 ml-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <div className="h-3 bg-gray-300 rounded w-48"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <div className="h-3 bg-gray-300 rounded w-40"></div>
                    </div>
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

export default ServiceSkeleton;
