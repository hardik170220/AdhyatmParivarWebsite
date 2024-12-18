import React from "react";

const Hero = () => {
  return (
    <div>
      <section className="text-gray-600  body-font">
        <div className="container mx-auto flex px-5 py-10 md:flex-row flex-col-reverse items-center">
          <div className="lg:flex-grow md:w-1/2 lg:px-12 md:px-8 flex flex-col md:items-start md:text-left mt-16 md:mt-0 items-center">
            <h1 className="font-Teko sm:text-3xl text-xl mb-4 font-bold text-gray-700">
            अध्यात्म परिवार-मेरा शासन मेरा जीवन
            </h1>
            <p className="mb-2 font-Karma leading-relaxed">
              अध्यात्म परिवार एक समर्पित संगठन है, जो धार्मिक और अध्यात्मिक
              उन्नति के मार्ग पर समाज का मार्गदर्शन करता है। इस संगठन द्वारा
              शासन आराधना, प्रभावना, और धार्मिक परंपराओं की रक्षा जैसे कार्यों
              का संचालन किया जाता है। इसके साथ ही, विशेष आयोजन, ध्यान शिविर, और
              प्रवचन कार्यक्रमों के माध्यम से समाज में अध्यात्मिक जागरूकता और
              समर्पण की भावना को प्रोत्साहित किया जाता है।
            </p>
            <div className="flex lg:flex-row md:flex-col"></div>
          </div>
          <div className="lg:max-w-lg relative flex items-center justify-center lg:w-full md:w-1/2 w-5/6">
            <img className="absolute object-cover object-center h-[23rem] " src="/squareborder1.png" alt="" />
            <img
              className="object-cover object-center h-[16rem]"
              alt="hero"
              src="/hero1.png"
            />
          </div>
        </div>
        
      </section>
    </div>
  );
};

export default Hero;
