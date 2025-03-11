"use client";
import React from "react";
import { Lens } from "@/app/_components/magicui/lens";

const LogoDescription = () => {
  return (
    <>
      <section className="md:hidden px-5 text-gray-600 body-font">
        <h1 className="text-gray-600 font-bold text-xl text-center font-Teko  mb-4">
          ...सातक्षेत्र से सुशोभित अध्यात्म परिवार के लोगो का रहस्य...
        </h1>
        <div className="flex  flex-col items-center justify-center gap-4">
          <div className=" mb-4 text-center ">
            <h2 className="text-golden font-bold">1. जिनप्रतिमा</h2>
            <p className="text-sm font-semibold text-gray-600 ">
              सदा के लिए सम्पूर्ण सुखी बनने का मार्ग बताने वाली इस विश्व की
              सर्वोत्तम हस्ती की प्रतिकृति।
            </p>
          </div>
          <div className="text-center mb-4">
            <h2 className="text-golden font-bold">2. जिनमंदिर</h2>
            <p className="text-sm font-semibold text-gray-600">
              यह उन सर्वोत्तम हस्ती का सर्वोत्कृष्ट पवित्र स्थान!
            </p>
          </div>
          <div className="text-center mb-4 ">
            <h2 className="text-golden font-bold">3. जिनागम</h2>
            <p className="text-sm font-semibold text-gray-600">
              सुखी बनने के मार्ग की तमाम जानकारी तथा उसका नक्शा!!
            </p>
          </div>
          <div className="text-center mb-4">
            <h2 className="text-golden font-bold">4-5. श्रमण-श्रमणी (ओघा)</h2>
            <p className="text-sm font-semibold text-gray-600">
              इस जानकारी और इस नक्शे के अनुसार उद्यमपूर्वक स्वयं उस मार्ग पर सदा
              चलने वाले तथा विश्व को यह सच्चा मार्ग बताने वाले!
            </p>
          </div>
          <div className="text-center mb-4">
            <h2 className="text-golden font-bold">
              6-7. श्रावक-श्रविका (चरवला)
            </h2>
            <p className="text-sm font-semibold text-gray-600">
              इस मार्ग पर चलने वालों की समर्पित होकर, इस मार्ग पर चलने की चाहत
              रखने वाले तथा इसके लिए तन-मन-धन अर्पण करने वाले!
            </p>
          </div>
          <div className="text-center mb-4">
            <h2 className="text-golden font-bold">वृषभ</h2>
            <p className="text-sm font-semibold text-gray-600">
              इस भरतक्षेत्र के प्रथम शासनस्थापक श्री आदिनाथ परमात्मा का लछ्न!
            </p>
          </div>
          <div className="mb-4 text-center">
            <h2 className="text-golden font-bold">सिंह</h2>
            <p className="text-sm font-semibold text-gray-600">
              इस भरतक्षेत्र के चरम शासनस्थापक श्री महावीर परमात्मा का लछ्न!
            </p>
          </div>
          <div className="text-center mb-4">
            <h2 className="text-golden font-bold">धर्मचक्र</h2>
            <p className="text-sm font-semibold text-gray-600">
              इस अवसर्पिणी के २४ तीर्थंकरो की याद दिलाते धर्मचक्र के २४ आरे !
            </p>
          </div>
          <div className="text-center mb-4">
            <h2 className="text-golden font-bold">कमल</h2>
            <p className="text-sm font-semibold text-gray-600">
              सातक्षेत्र की भक्ति सुरक्षा द्वारा जो अवस्था प्राप्त करनी है उस
              निर्लेप अवस्था का सूचक!
            </p>
          </div>
        </div>
      </section>

      <div className="hidden md:block px-8 pt-16 max-w-4xl font-Karma mx-auto">
        <h1 className="text-gray-600 font-bold text-xl text-center font-Teko mb-4">
          ...सातक्षेत्र से सुशोभित अध्यात्म परिवार के लोगो का रहस्य...
        </h1>

        {/* First row - centered information */}
        <div className=" mb-4 px-64 text-center ">
          <h2 className="text-golden font-bold">1. जिनप्रतिमा</h2>
          <p className="text-sm font-semibold text-gray-600 ">
            सदा के लिए सम्पूर्ण सुखी बनने का मार्ग बताने वाली इस विश्व की
            सर्वोत्तम हस्ती की प्रतिकृति।
          </p>
        </div>

        <div className="flex">
          {/* Left column */}
          <div className="w-1/3 flex flex-col justify-between pr-4">
            <div className="text-end mb-4">
              <h2 className="text-golden font-bold">2. जिनमंदिर</h2>
              <p className="text-sm font-semibold text-gray-600">
                यह उन सर्वोत्तम हस्ती का सर्वोत्कृष्ट पवित्र स्थान!
              </p>
            </div>
            <div className="text-end mb-4 mr-8">
              <h2 className="text-golden font-bold">4-5. श्रमण-श्रमणी (ओघा)</h2>
              <p className="text-sm font-semibold text-gray-600">
                इस जानकारी और इस नक्शे के अनुसार उद्यमपूर्वक स्वयं उस मार्ग पर
                सदा चलने वाले तथा विश्व को यह सच्चा मार्ग बताने वाले!
              </p>
            </div>
            <div className="text-end mb-4 mr-12">
              <h2 className="text-golden font-bold">वृषभ</h2>
              <p className="text-sm font-semibold text-gray-600">
                इस भरतक्षेत्र के प्रथम शासनस्थापक श्री आदिनाथ परमात्मा का लछ्न!
              </p>
            </div>
            <div className="text-end">
              <h2 className="text-golden font-bold">धर्मचक्र</h2>
              <p className="text-sm font-semibold text-gray-600">
                इस अवसर्पिणी के २४ तीर्थंकरो की याद दिलाते धर्मचक्र के २४ आरे !
              </p>
            </div>
          </div>

          {/* Central image */}
          <div className="w-1/3 flex items-center justify-center">
            {/* <img src="/hero1.png" alt="Adhyatm Parivar" className="w-full h-auto  object-contain" /> */}
            <Lens
              zoomFactor={2}
              lensSize={150}
              isStatic={false}
              ariaLabel="Zoom Area"
            >
              <img
                src="/hero1.png"
                alt="Adhyatm Parivar"
                className="w-full h-auto  object-contain"
              />
            </Lens>
          </div>

          {/* Right column */}
          <div className="w-1/3 flex flex-col justify-between pl-4">
            <div className=" mb-4 ">
              <h2 className="text-golden font-bold">3. जिनागम</h2>
              <p className="text-sm font-semibold text-gray-600">
                सुखी बनने के मार्ग की तमाम जानकारी तथा उसका नक्शा!!
              </p>
            </div>
            <div className=" mb-4 ml-8">
              <h2 className="text-golden font-bold">
                6-7. श्रावक-श्रविका (चरवला)
              </h2>
              <p className="text-sm font-semibold text-gray-600">
                इस मार्ग पर चलने वालों की समर्पित होकर, इस मार्ग पर चलने की चाहत
                रखने वाले तथा इसके लिए तन-मन-धन अर्पण करने वाले!
              </p>
            </div>
            <div className="mb-4 ml-12">
              <h2 className="text-golden font-bold">सिंह</h2>
              <p className="text-sm font-semibold text-gray-600">
                इस भरतक्षेत्र के चरम शासनस्थापक श्री महावीर परमात्मा का लछ्न!
              </p>
            </div>
            <div className="">
              <h2 className="text-golden font-bold">कमल</h2>
              <p className="text-sm font-semibold text-gray-600">
                सातक्षेत्र की भक्ति सुरक्षा द्वारा जो अवस्था प्राप्त करनी है उस
                निर्लेप अवस्था का सूचक!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoDescription;
