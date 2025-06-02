import React from "react";
export default function Home() {
  return (
    <div className=" bg-gray-50 p-4 pb-12 md:p-8">
      <main className="max-w-6xl mx-auto font-Karma">
        {/* Sanskrit Invocation at the top */}
        <div className="text-center mb-6 font-bold text-gray-600">
          <p className="text-sm">॥ नमोऽस्तु तस्मै जिनशासनाय ॥</p>
          <p className="text-sm">॥ नमामि वीरं गिरिसारधीरम् ॥</p>
          <p className="text-sm">
            ॥ श्री जित-हीर-बुद्धि-तिलक- शांतिचंद्र कनकप्रभ-सोमचंद्र-जिनचंद-
            संयमरत्नसूरि सद्गुरुभ्यो नमः ॥
          </p>
        </div>

        {/* Main content - two column layout */}
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {/* Left Column - Adhyatma Parivar with PNG Border */}
          <div className="w-full md:w-1/2">
            {/* Container with relative positioning for the border image */}
            <div className="relative">
              {/* Border image - using a div with background image for better control */}
              <div
                className="absolute inset-0 z-10"
                style={{
                  backgroundImage: "url(/squareborder2.png)",
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  /* Make the border image slightly larger than the content */
                  top: "-20px",
                  left: "-20px",
                  right: "-20px",
                  bottom: "-20px",
                }}
              ></div>

              {/* Content container with padding to accommodate border */}
              <div className="relative z-0 p-6">
                <div className=" p-6 flex flex-col items-center justify-center min-h-[400px] text-center">
                  <div className="mb-6  text-gray-800"></div>

                  <h1 className=" text-gray-800 font-Teko text-5xl font-bold mb-8">
                    अध्यात्म
                    <br />
                    परिवार
                  </h1>

                  <div className=" text-gray-600 font-bold text-lg">
                    <p>मेरा शासन, मेरा जीवन</p>
                    <p className=" text-gray-600 text-base font-bold">
                      कार्यदर्शिनी: वि.सं. २०७९
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 font-semibold text-sm">
              <p className="text-center">
                <span className="block text-center text-gray-600 mb-1">
                  :: पथप्रदर्शक ::
                </span>
                <span className="block text-center text-gray-600">
                सूरिशान्ति - जिन-संयम' कृपापात्र, दिक्षाधर्म के महानायक, कृपानाथ
                  <br />
                  <span className="text-lg font-extrabold text-gray-700">
                  प.पू.आ.भ. श्रीमद् विजय योगतिलकसूरीश्वरजी महाराजा
                  </span>
                </span>
              </p>
            </div>
          </div>

          {/* Right Column - Message */}
          <div className="w-full font-Karma border font-semibold  text-sm md:w-1/2">
            <div className="bg-gradient-to-r from-[#faf4e9] via-[#ffffff] to-[#faf7f1]  p-6 min-h-[500px] flex flex-col">
              <div className="mb-8">
                <h2 className="text-center font-medium mb-4  text-gray-800">
                  महामोहपाध्याय श्रीमद् यशोविजयजी महाराजा
                  <br />
                  'बत्रीशी' ग्रंथ में फरमाते हैं कि,
                </h2>

                <div className="text-center mb-4  text-gray-800">
                  <p className="mb-4 text-lg font-bold font-Teko">
                    "अस्यैव शासने भक्तिः कार्या चेच्चेतनाऽस्ति वः ॥"
                  </p>

                  <p className="mb-4">
                    यदि थोड़ी भी जीवंतता हो तो
                    <br />
                    प्रभु के शासन की भक्ति के लिए अपना
                    <br />
                    तन-मन-धन दे देना चाहिए।
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-4  text-gray-600">
                <p className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    {" "}
                    इन वचनों की गूँज को पथदर्शक पूज्य कृपानाथ की वाणी में सुना
                    है।
                  </span>
                </p>

                <p className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    कलिकाल की बलिहारी से शासन के प्रत्येक अंग पर तोड़ देने वाली
                    समस्याओं का पहाड़ दिखाई दे रहा है।
                  </span>
                </p>

                <p className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    पूज्य कृपानाथ की दीर्घदृष्टि में इसका उपाय समझ आया और शासन
                    के अमाप ऋण को याद करके, शासन को अंजली अर्पण करने के लिए एक
                    सेवायज्ञ की शुरुआत हुई।
                  </span>
                </p>
              </div>

              <div className="mt-auto text-center  text-gray-800">
                <p>
                  हमें विश्वास है कि इस कार्यदर्शिनी के प्रत्येक पृष्ठ को
                  <br />
                  निहारते हुए आपका शासनप्रेमी हृदय <br />
                  आनंद से सराबोर हो जाएगा ।
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
