// // TestimonialSlider.jsx
// "use client";
// import React, { useState, useEffect } from 'react';

// export default function TestimonialSlider() {
//   const testimonials = [
//     {
//       quote: "प्रतिभाजी की सुरक्षा के लिए टीका आदि अत्यंत ही जोखमी है, तथा औषध आदि के कार्यों में चालू कारीगर बिल्कुल विश्वसनीय नहीं है। अतः इस संबंध में अध्यात्म परिवार संस्था के सहयोग से काम करवाना हितावह है।",
//       author: "बाबू अमीचंद पन्नालाल आदेश्वर",
//       organization: "टेपल चेरिटेबल ट्रस्ट, मुंबई"
//     },
//     {
//       quote: "हमारी सोसाइटी में अभी तक कुंडी के लिए जो कंप्लेंट आती थी, इसबार आपके मार्गदर्शन से कार्य करने से उसका समाधान हो गया है। लगभग कंप्लेंट बंद ही हो गई है। मेरी सर्व संघों से विनती है कि आप सभी को भी इसी प्रकार कुंडी बनवाना चाहिए।",
//       author: "श्री श्वेतांबर मूर्ति पूजक तपगच्छ",
//       organization: "जैन संघ, मुलुंड पूर्व, मुंबई"
//     },
//     {
//       quote: "हमारे श्री चिंतामणि पार्श्वनाथ जिनालय में पिछले काफी समय से ऊपर छत से गोमासे की ऋतु में पानी आता था। इस संबंध में हमने आपश्री का संपर्क किया था तथा आपश्री ने हमारे उस काम को बहुत सुंदर रूप से संपन्न किया। अब वहां से जरा भी पानी नहीं आता है और हम जिनालय की आशातना से बच सके है।",
//       author: "श्री देहरूरी जैन संघ, वडोदरा"
//     },
//     {
//       quote: "अण्णश्री के परिवार ने वर्तमान काल में विश्ववंदारिन पालने वाले महात्माओं को शहर में निर्दोष भूमि बहुत दुर्लभ हो गई है। उनके लिए कृत्रिम निर्दोष भूमि बनाकर शासन की किंतना से बचाने के लिए जो बीड़ा उठाया है उसके बदले अध्यात्म परिवार को लाख धन्यवाद...",
//       author: "मुनि जगतशेखरविजय का धर्मलाभ"
//     },
//     {
//       quote: "जिस प्रकार गंगौत्री में से निकलती गंगा आगे बढ़ती है और विराट फलक पर फैल जाती है, उसी प्रकार आपके परिवार की श्रुतयात्रा भी फलक पर विस्तृत होती जाए ऐसी प्रभु से प्रार्थना है। एक बार पुनः आपके इस कार्य की खूब-खूब अनुमोदना।",
//       author: "श्रमण भगवंत"
//     },
//     {
//       quote: "जि. झालोर (राज.) से श्री आदिनाथजी जैन श्रे.मू.पू.संघ विशेष आप द्वारा हमारे जिन मंदिर हेतु मंदिर उपकरण पित्तल के भेजे गए उसके लिये हमारा श्री संघ आपकी अनुमोदना करते है।",
//       author: "श्री संघवत्सल्यश्री जैन श्वेताम्बर",
//       organization: "मूर्तिपूजक संस्थान, सागवाडा, झालोर"
//     },
//     {
//       quote: "शासन की ऐसोहर ऐसे जिनालय की सुरक्षा के लिए हमारे श्री संघ की विनती को आपके परिवार ने स्वीकार किया। उसके लिए श्री अध्यात्म परिवार की खूब अनुमोदना।",
//       author: "श्री श्वेतांबर मूर्तिपूजक तपगच्छ",
//       organization: "जैन संघ, जगदुशानगर, मुंबई"
//     },
//     {
//       quote: "प्राचः अप्राप्त्य तथा अप्रगट ऐसे बहुत सारे प्राचीन साहित्य का पूज्यों द्वारा संशोधन-संपादन करके सर्वप्रथम बार प्रकाशित हुआ, इसकी खूब अनुमोदना।",
//       author: "पू.बाबूभाई सरैयल, वैशावाला"
//     },
//     {
//       quote: "हमारे श्रीसंघ मे आर्यविद्याशाला तथा पूज्य साधु-साध्वीजी भगवंतों को गरम पानी जल्दी से ठंडा होकर मिल सके इसके लिए आपके हस्तक पानी का स्टैंड प्राप्त हुआ है। श्रीसंघ आपके इस उत्तम कार्य की खूब-खूब अनुमोदना करता है।",
//       author: "श्री रांदेर रोड जैन संघ, सूरत"
//     }
//   ];

//   // Group testimonials in sets of 3 for the slider
//   const testimonialGroups = [];
//   for (let i = 0; i < testimonials.length; i += 3) {
//     testimonialGroups.push(testimonials.slice(i, i + 3));
//   }

//   const [currentGroup, setCurrentGroup] = useState(0);
//   const [autoplay, setAutoplay] = useState(true);
//   const autoplayInterval = 5000; // 5 seconds per slide

//   // Auto-advance the slider
//   useEffect(() => {
//     if (!autoplay) return;
    
//     const interval = setInterval(() => {
//       setCurrentGroup((prevGroup) => (prevGroup + 1) % testimonialGroups.length);
//     }, autoplayInterval);
    
//     return () => clearInterval(interval);
//   }, [autoplay, testimonialGroups.length]);

//   // Pause autoplay when user interacts
//   const handleMouseEnter = () => setAutoplay(false);
//   const handleMouseLeave = () => setAutoplay(true);

//   const goToGroup = (index) => {
//     setCurrentGroup(index);
//     setAutoplay(false); // Pause when user navigates manually
//     setTimeout(() => setAutoplay(true), 5000); // Resume after 5 seconds
//   };

//   const nextGroup = () => {
//     setCurrentGroup((prevGroup) => (prevGroup + 1) % testimonialGroups.length);
//     setAutoplay(false);
//     setTimeout(() => setAutoplay(true), 5000);
//   };

//   const prevGroup = () => {
//     setCurrentGroup((prevGroup) => 
//       prevGroup === 0 ? testimonialGroups.length - 1 : prevGroup - 1
//     );
//     setAutoplay(false);
//     setTimeout(() => setAutoplay(true), 5000);
//   };

//   return (
//     <div className="bg-purple-50 min-h-screen p-8">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold text-center text-purple-800 mb-8">प्रतिभाव पत्रों में से कुछ चुनिंदा प्रशांसी...</h1>
        
//         <div 
//   className="relative overflow-hidden" 
//   onMouseEnter={handleMouseEnter}
//   onMouseLeave={handleMouseLeave}
// >
//           {/* Slider controls */}
//           <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
//             <button 
//               onClick={prevGroup}
//               className="bg-purple-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-purple-800 focus:outline-none transition-all duration-300"
//               aria-label="Previous testimonials"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//             </button>
//           </div>
          
//           <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
//             <button 
//               onClick={nextGroup}
//               className="bg-purple-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-purple-800 focus:outline-none transition-all duration-300"
//               aria-label="Next testimonials"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </div>
          
//           {/* Slider track */}
//           <div 
//     className="flex transition-transform duration-500 ease-in-out"
//     style={{ transform: `translateX(-${currentGroup * 100}%)` }}
//   >
//             {testimonialGroups.map((group, groupIndex) => (
//               <div key={groupIndex} className="w-full flex-shrink-0 grid grid-cols-3 gap-6 px-2">
//                 {group.map((testimonial, index) => (
//                   <div 
//                     key={index} 
//                     className="bg-white rounded-lg shadow-lg border border-purple-100 overflow-hidden aspect-square flex flex-col transition-all duration-300 hover:shadow-xl hover:border-purple-300"
//                   >
//                     <div className="p-6 flex flex-col h-full">
//                       <div className="absolute top-4 left-4 opacity-10">
//                         <svg width="40" height="40" viewBox="0 0 24 24" fill="purple">
//                           <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144C8.97 4.222 8.737 4.278 8.472 4.345c-.271.05-.56.187-.882.312C7.272 4.799 6.904 4.895 6.562 5.123c-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.945-.33.358-.656.734-.909 1.162C3.219 8.33 2.875 8.75 2.875 9.5c0 .39.061.765.172 1.114.112.38.26.773.602 1.208.377.47.912.935 1.602.935.468 0 .88-.236 1.175-.475.145-.135.26-.313.35-.488.095-.18.146-.359.196-.361.167-.11.036-.207.036-.207zM17.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L20.758 4.03c0 0-.218.052-.597.144-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.945-.33.358-.656.734-.909 1.162-.319.404-.663.824-.663 1.573 0 .39.061.765.172 1.114.112.38.26.773.602 1.208.377.47.912.935 1.602.935.468 0 .88-.236 1.175-.475.145-.135.26-.313.35-.488.095-.18.146-.359.196-.361.167-.11.036-.207.036-.207z"></path>
//                         </svg>
//                       </div>
//                       <div className="mb-4 flex-grow overflow-y-auto">
//                         <p className="text-gray-700 text-sm md:text-base">"{testimonial.quote}"</p>
//                       </div>
//                       <div className="mt-auto border-t border-purple-100 pt-4">
//                         <p className="text-purple-700 font-semibold text-right">...{testimonial.author}</p>
//                         {testimonial.organization && (
//                           <p className="text-purple-500 text-sm text-right">{testimonial.organization}</p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
          
//           {/* Dots navigation */}
//           <div className="flex justify-center mt-8">
//             {testimonialGroups.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToGroup(index)}
//                 className={`w-3 h-3 mx-1 rounded-full focus:outline-none transition-all duration-300 ${
//                   currentGroup === index ? 'bg-purple-700 scale-125' : 'bg-purple-300'
//                 }`}
//                 aria-label={`Go to slide ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>
        
//         {/* Page number */}
//         <div className="flex justify-center mt-10">
//           <div className="w-12 h-12 rounded-full bg-purple-700 flex items-center justify-center text-white font-bold shadow-md">
//             41
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





"use client";
import React, { useState, useEffect } from 'react';

export default function TestimonialSlider() {

    const testimonials = [
        {
          quote: "प्रतिमाजी की सुरक्षा के लिए टीका आदि अत्यंत ही जोखमी है, तथा ओप आदि के कार्यों में चालू कारीगर बिल्कुल विश्वसनीय नहीं हैं। अतः इस संबंध में अध्यात्म परिवार संस्था के सहयोग से काम करवाना हितावह है। ",
          author: "बाबु अमीचंद पन्नालाल",
          organization: "आदेश्वर टेंपल चैरिटेबल ट्रस्ट, मुंबई"
        },
        {
          quote: "आपश्री के परिवार ने वर्तमान काल में विशुद्धचारित्र पालने वाले महात्माओं को शहर में निर्दोष भूमि बहुत दुर्लभ हो गई है। उनके लिए कृत्रिम निर्दोष भूमि बनाकर शासन की हिलना से बचाने के लिए जो बीड़ा उठाया है उसके बदले अध्यात्म परिवार को लाख धन्यवाद...",
          author: "मुनि जगतशेखरविजय का धर्मलाभ",
        },
        {
          quote: "शासन की धरोहर ऐसे जिनालय की सुरक्षा के लिए हमारे श्री संघ की विनंती को आपके परिवार ने स्वीकार किया। उसके लिए श्री अध्यात्म परिवार की खूब अनुमोदना ।",
          author: "श्री श्वेतांबर मूर्तिपूजक तपागच्छ ",
          organization:"जैन संघ, जगडूशानगर, मुंबई"
        },
        {
          quote: "हमारी सोसाइटी में अभी तक कुंडी के लिए जो कंप्लेंट आती थी, इसबार आपके मार्गदर्शन से कार्य करने से उसका समाधान हो गया है। लगभग कंप्लेंट बंद ही हो गई है। मेरी सर्व संघों से विनती है कि आप सभी को भी इसी प्रकार कुंडी बनवाना चाहिए।",
          author: " श्री श्वेतांबर मूर्ति पूजक तपागच्छ ",
          organization:"जैन संघ, मुलुंड पूर्व, मुंबई"
        },
        {
          quote: "जिस प्रकार गंगोत्री में से निकलती गंगा आगे बढ़ती है और विराट फलक पर फैल जाती है, उसी प्रकार आपके परिवार की श्रुतयात्रा भी फलक पर विस्तृत होती जाए ऐसी प्रभु से प्रार्थना है।” एक बार पुनः आपके इस कार्य की खूब - खूब अनुमोदना ",
          author: "श्रमण भगवंत"
        },
        {
          quote: "प्रायः अप्राप्तव्य तथा अप्रगट ऐसे बहुत सारे प्राचीन साहित्य का पूज्यों द्वारा संशोधन-संपादन करके सर्वप्रथम बार प्रकाशित हुआ, इसकी खूब अनुमोदना।",
          author: "सु.बाबूभाई सरेमल, बेड़ावाला",
        },
        {
          quote: "हमारे श्री चिंतामणि पार्श्वनाथ जिनालय में पिछले काफी समय से ऊपर छत से चोमासे की ऋतु में पानी आता था। इस संबंध में हमने आपश्री का संपर्क किया था तथा आपश्री ने हमारे उस काम को बहुत सुंदर रूप से संपन्न किया। अब वहां से जरा भी पानी नहीं आता है और हम जिनालय की आशातना से बच सके हैं। ",
          author: "श्री इंद्रपुरी जैन संघ, वडोदरा",
        },
        {
          quote: "जि. डूंगरपूर (राज.) से श्री आदिनाथजी जैन वे.मू.पू.संघ विशेष आप द्वारा हमारे जिन मंदिर हेतु मंदिर उपकरण पित्तल के भेजे गए उसके लिये हमारा श्री संघ आपकी अनुमोदना करते है।",
          author: " श्री संभवनाथजी जैन श्वेताम्बर मूर्तिपूजक ",
          organization:"संस्थान सागवाडा, डूंगरपुर"
        },
        {
          quote: "हमारे श्रीसंघ में आयंबिलशाला तथा पूज्य साधु-साध्वीजी भगवन्तों को गरम पानी जल्दी से ठंडा होकर मिल सके इसके लिए आपके हस्तक पानी का स्टैंड प्राप्त हुआ है। श्रीसंघ आपके इस उत्तम कार्य की खूब-खूब अनुमोदना करता है।",
          author: "श्री रांदेर रोड जैन संघ, सुरत"
        }
      ];

  const [currentGroup, setCurrentGroup] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);
  const autoplayInterval = 5000;

  // Handle window resize and group calculation
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setCurrentGroup(0); // Reset to first group on resize
    };
    
    handleResize(); // Initial set
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate groups based on screen size
  const groupSize = windowWidth <= 768 ? 1 : 3; // Adjust breakpoint as needed
  const testimonialGroups = [];
  for (let i = 0; i < testimonials.length; i += groupSize) {
    testimonialGroups.push(testimonials.slice(i, i + groupSize));
  }

  // Auto-advance the slider
  useEffect(() => {
    if (!autoplay || testimonialGroups.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentGroup((prev) => (prev + 1) % testimonialGroups.length);
    }, autoplayInterval);
    
    return () => clearInterval(interval);
  }, [autoplay, testimonialGroups.length]);

  // Pause autoplay when user interacts
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  const goToGroup = (index) => {
    setCurrentGroup(index);
    setAutoplay(false); // Pause when user navigates manually
    setTimeout(() => setAutoplay(true), 5000); // Resume after 5 seconds
  };

  const nextGroup = () => {
    setCurrentGroup((prevGroup) => (prevGroup + 1) % testimonialGroups.length);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 5000);
  };

  const prevGroup = () => {
    setCurrentGroup((prevGroup) => 
      prevGroup === 0 ? testimonialGroups.length - 1 : prevGroup - 1
    );
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 5000);
  };


  return (
    <div className='pt-20'>
        <img src="/6.jpg" alt="" />
    <div className="bg-purple-50  font-Karma p-8 ">
      <div className="max-w-6xl mx-auto">
        <h1 className=" text-2xl  sm:text-3xl font-Teko font-bold text-center text-gray-800 mb-8">
        प्रतिभाव पत्रों में से कुछ चुनिंदा प्रसादी...
        </h1>

        <div 
          className="relative overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10">
            <button 
              onClick={prevGroup}
              className="bg-golden/50 text-gray-100 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-golden focus:outline-none transition-all duration-300"
              aria-label="Previous testimonials"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          <div className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10">
            <button 
              onClick={nextGroup}
              className="bg-golden/50 text-gray-100 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-golden focus:outline-none transition-all duration-300"
              aria-label="Next testimonials"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Slider Track */}
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentGroup * 100}%)` }}
          >
            {testimonialGroups.map((group, index) => (
              <div 
                key={index}
                className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-3 gap-6 px-2"
              >
                {group.map((testimonial, idx) => (
                  <div 
                    key={idx}
                    className="bg-white  border border-purple-100 overflow-hidden aspect-square flex flex-col transition-all duration-300 hover:shadow-xl hover:border-purple-300"
                  >
                 <div 
                    key={index} 
                    className="bg-white  border border-purple-100 overflow-hidden aspect-square flex flex-col transition-all duration-300 hover:shadow-xl hover:border-purple-300"
                  >
                    <div className="p-6 flex flex-col h-full">
                      <div className="mb-4 flex-grow overflow-y-auto">
                        <p className="text-gray-700 leading-relaxed text-sm md:text-[0.95rem]">"{testimonial.quote}"</p>
                      </div>
                      <div className="mt-auto border-t border-purple-100 pt-4">
                        <p className="text-[#AC7D0C] font-semibold text-right">...{testimonial.author}</p>
                        {testimonial.organization && (
                          <p className="text-[#AC7D0C] text-sm text-right">{testimonial.organization}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Dots navigation */}
          <div className="flex justify-center mt-8">
            {testimonialGroups.map((_, index) => (
              <button
                key={index}
                onClick={() => goToGroup(index)}
                className={`w-3 h-3 mx-1 rounded-full focus:outline-none transition-all duration-300 ${
                  currentGroup === index ? 'bg-golden scale-125' : 'bg-golden/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        
       
        </div>
      </div>
    </div>
    </div>
  );
}