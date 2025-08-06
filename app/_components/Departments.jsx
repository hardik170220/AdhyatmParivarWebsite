"use client";
import React from "react";
import Link from "next/link";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const Departments = () => {
  return (
    <div className="pt-16 px-5 sm:px-10">
      
      {/* <Link
        href="/pages/booklist"
        className="group relative block w-full h-40 sm:h-52 overflow-hidden rounded-sm shadow-lg my-6 transform transition-transform duration-300 hover:scale-[1]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center brightness-50 group-hover:brightness-75 transition-all duration-500"
          style={{
            backgroundImage: "url(/book-store.jpg)",
            backgroundPosition: "center",
          }}
        />

        <div className="relative z-10 flex items-center justify-between p-4 sm:p-6 h-full text-white">
          <div className="flex items-center gap-4">
            <img
              src="/book-illustration.png"
              className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-white/20 p-2"
              alt="Book icon"
            />
            <span className="font-Teko text-base sm:text-3xl font-bold drop-shadow-md">
              ज्ञान भंडार में मौजूद पुस्तकों की सूची देखने के लिए यहां क्लिक
              करें
            </span>
          </div>

          <MdOutlineKeyboardDoubleArrowRight
            size={32}
            className="text-white opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
          />
        </div>

        <div className="absolute bottom-0 left-0 w-full h-2 bg-golden origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
      </Link> */}

      <div className="">
        <h1 className="font-bold flex items-center gap-2 border-b-2  border-golden font-Teko mb-8 text-xl text-gray-600 text-start">
          रजिस्ट्रेशन फॉर्म
          {/* इवेंट्स के लिए */}
          <MdOutlineKeyboardDoubleArrowRight size={24} className="arrow" />
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-8 font-Karma justify-items-center">
          {/* Book Card */}
           <div className="flex flex-col items-center justify-center w-full group max-w-[210px]">
            <div className="relative w-full h-[320px]"> {/* Fixed height for portrait aspect ratio */}
              <div className="relative bg-[#F0E9D7] font-Anek overflow-hidden w-full h-full">
                <img
                  className="h-full w-full object-cover object-center"
                  src="/ravanni-bhitarma.jpg"
                  alt="ravanni-bhitarma"
                />
                <div className="absolute inset-x-0 bottom-0 h-full bg-black/80 flex flex-col items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out p-6 text-white">
                  <h3 className="text-2xl text-center font-bold mb-3">
                    રાવણની ભીતરમાં
                  </h3>
                  <div className="space-y-2 text-sm text-center mb-4">
                    <p className="font-semibold text-golden">ઓફિસ ડીટેલ:</p>
                    <p>અધ્યાત્મ ભવન</p>
                    <p>ત્રીજો માળ, આનંદ શ્રાવક આરાધના ભવન</p>
                    <p>સંજીવકુમાર ઓડિટોરીયમ પાસે, પાલ, સુરત - 395 009</p>
                    <p className="">M. 7676769600</p>
                  </div>
                </div>
              </div>
            </div>
            <Link
              href="/pages/form/ravanni-bhitarma"
              className="text-lg font-Teko py-2 w-full text-center bg-golden text-white font-semibold"
            >
              Register here
            </Link>
          </div>
          
         <div className="flex flex-col items-center justify-center w-full group max-w-[210px]">
  <div className="relative w-full h-[320px]"> {/* Fixed height for portrait aspect ratio */}
    <div className="relative bg-[#F0E9D7] font-Anek overflow-hidden w-full h-full">
      <img
        className="h-full w-full object-cover object-center"
        src="/udayanmantri.JPG"
        alt="udayanmantri"
      />
      <div className="absolute inset-x-0 bottom-0 h-full bg-black/80 flex flex-col items-center justify-center translate-y-0 transition-transform duration-300 ease-in-out p-6 text-gray-400">
        <h3 className="text-2xl text-center font-bold mb-3">
          તાસકમાં મસ્તક<br />
          ઉદયનમંત્રી
        </h3>
        <div className="space-y-2 text-sm text-center mb-4">
          <p className="font-semibold text-golden">ઓફિસ ડીટેલ:</p>
          <p>અધ્યાત્મ ભવન</p>
          <p>ત્રીજો માળ, આનંદ શ્રાવક આરાધના ભવન</p>
          <p>સંજીવકુમાર ઓડિટોરીયમ પાસે, પાલ, સુરત - 395 009</p>
          <p className="">M. 7676769600</p>
        </div>
      </div>
    </div>
  </div>
  <div className="text-lg font-Teko py-2 w-full text-center bg-golden text-white font-semibold opacity-50 cursor-not-allowed">
    Out Of Stock
  </div>
  </div>
          {/* You can add more book cards with the same structure */}
          <div className="flex flex-col items-center justify-center w-full group max-w-[210px]">
  <div className="relative w-full h-[320px]">
    <div className="relative bg-[#F0E9D7] font-Anek overflow-hidden w-full h-full">
      <img
        className="h-full w-full object-cover object-center"
        src="/Mahabharat.jpg"
        alt="mahabharat"
      />
      <div className="absolute inset-x-0 bottom-0 h-full bg-black/80 flex flex-col items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out p-6 text-white">
        <h3 className="text-2xl text-center font-bold mb-3">
          મહાભારત - જૈન ગ્રંથોના આલોકમાં <br />
        </h3>
        <div className="space-y-2 text-sm text-center mb-4">
          <p className="font-semibold text-golden">ઓફિસ ડીટેલ:</p>
          <p>અધ્યાત્મ ભવન</p>
          <p>ત્રીજો માળ, આનંદ શ્રાવક આરાધના ભવન</p>
          <p>સંજીવકુમાર ઓડિટોરીયમ પાસે, પાલ, સુરત - 395 009</p>
          <p className="">M. 7676769600</p>
        </div>
      </div>
    </div>
  </div>
  <Link
    href="/pages/form/mahabharat"
    className="text-lg font-Teko py-2 w-full text-center bg-golden text-white font-semibold"
  >
    Register here
  </Link>
</div>
        </div>
      </div>
    </div>
  );
};

export default Departments;

// // "use client"

// // import Link from "next/link";

// // // import { useGSAP } from '@gsap/react';
// // // import gsap from 'gsap';
// // // import React, { useRef } from 'react';
// // // import { ScrollTrigger } from 'gsap/ScrollTrigger';

// // // gsap.registerPlugin(ScrollTrigger);

// // const Departments = () => {

// //     // const containerRefs = useRef([]);

// //   // useGSAP(()=>{
// //   //   containerRefs.current.forEach((el) => {
// //   //       gsap.from(
// //   //         el.querySelector('.bg-animate'),
// //   //         {
// //   //           rotation: 0,
// //   //           opacity: 0,
// //   //           duration:0.5,
// //   //           scrollTrigger: {
// //   //               trigger: el,
// //   //               start: 'top 20%',
// //   //               end: 'bottom 30%',
// //   //               // markers: true,
// //   //             },
// //   //         },

// //   //       );
// //   //       gsap.from(
// //   //           el.querySelector('.text-animate'),
// //   //           {
// //   //             opacity: 0,
// //   //             x: 100,
// //   //             duration:0.5,
// //   //             scrollTrigger: {
// //   //                 trigger: el,
// //   //                 start: 'top 20%',
// //   //                 end: 'bottom 30%',
// //   //               //   markers: true,
// //   //               },
// //   //           },

// //   //         );
// //   //     });
// //   // })
// //   const quotes = [
// //     {
// //       text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est tempora esse voluptatum. Dolorem molestiae ut libero amet reprehenderit quasi ullam accusantium porro alias, consequatur quidem quis ad a. Quas dolore tempore doloribus, sit repellat deleniti fugit iusto rerum doloremque atque?",
// //       Department: 'Updhan-2024',
// //       image: './department1.jpg',
// //       link: './pages/form/updhan-2024'
// //     },
// //     {
// //       text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. A ratione nemo dolorum blanditiis impedit ipsum sunt est nam nobis. Quaerat eligendi, suscipit vero obcaecati accusamus sequi atque beatae odio asperiores, quasi omnis est rem dolorem delectus dolorum debitis? Optio a architecto natus.',
// //       Department: 'Vachana-2024',
// //       image: '/department2.jpg',
// //       link: './pages/form/vachana-2024'
// //     },
// //     // {
// //     //   text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. A ratione nemo dolorum blanditiis impedit ipsum sunt est nam nobis. Quaerat eligendi, suscipit vero obcaecati accusamus sequi atque beatae odio asperiores, quasi omnis est rem dolorem delectus dolorum debitis? Optio a architecto natus.',
// //     //   Department: 'Department-3',
// //     //   image: 'https://www.craftsnchisel.com/cdn/shop/products/5-5-inches-mahavir-swamy-brass-idol-pooja-statue-for-home-festive-decor-indian-home-decor-crafts-n-chisel-1.jpg?v=1671240715',
// //     // },
// //     // {
// //     //   text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. A ratione nemo dolorum blanditiis impedit ipsum sunt est nam nobis. Quaerat eligendi, suscipit vero obcaecati accusamus sequi atque beatae odio asperiores, quasi omnis est rem dolorem delectus dolorum debitis? Optio a architecto natus.',
// //     //   Department: 'Department-4',
// //     //   image: 'https://www.craftsnchisel.com/cdn/shop/products/5-5-inches-mahavir-swamy-brass-idol-pooja-statue-for-home-festive-decor-indian-home-decor-crafts-n-chisel-1.jpg?v=1671240715',
// //     // },
// //   ];

// //   return (
// //     <div className="md:py-10  py-5 font-kameron overflow-y-hidden">
// //       {quotes.map((quote, index) => (
// //         <div
// //           key={index}
// //           // ref={(el) => (containerRefs.current[index] = el)}
// //           className={`flex flex-col-reverse md:flex-row items-center justify-between p-4 my-10 ${
// //             index % 2 === 1 ? 'md:flex-row-reverse' : ''
// //           }`}
// //         >
// //           <div className="flex-1 p-2">
// //             <h1 className="text-2xl font-bold font-Teko uppercase text-gray-500">
// //               {quote.Department}
// //             </h1>
// //             <h2 className="text-gray-700 mb-6  text-sm leading-7 tracking-wide font-semibold text-animate">{quote.text}</h2>
// //             <Link href={quote.link} className="mt-4 px-6 py-2 bg-purple text-white font-semibold">
// //               Register here
// //             </Link>
// //           </div>
// //           <div className="flex-1 p-2 relative flex justify-center">
// //             <div className="relative inline-block group">
// //               <div className="absolute top-0 left-0 w-full h-full">
// //                 <div className="absolute -top-4 -left-4 w-52 h-64 bg-purple transform rotate-45 bg-animate -z-10 transition-transform  group-hover:rotate-[42deg]"></div>
// //                 <div className="absolute top-0 right-0 w-20 h-20 bg-gray-300 transform translate-x-4 -translate-y-4 -z-10 transition-transform duration-500 ease-in-out group-hover:rotate-[3deg]"></div>
// //               </div>
// //               <img
// //                 src={quote.image}
// //                 alt="Quote"
// //                 className="w-48 h-64 md:w-64 md:h-80 object-cover shadow-lg"
// //               />
// //             </div>
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default Departments;

// import React from "react";
// import Link from "next/link";

// const Departments = () => {
//   return (
//     <div className="py-20">
//       <h1 className="font-bold font-NotoSansHindi mb-8 text-xl text-gray-600 text-center">
//         REGISTRATION FOR EVENTS
//       </h1>
//       <div className="flex flex-col md:flex-row md:items-center font-Karma md:justify-evenly">
//       <div className="flex flex-col items-center justify-center ">
//           <div className="relative px-10 flex items-center justify-center">
//           <img className="absolute object-cover object-center h-[20rem] " src="/squareborder1.png" alt="" />
//           <img className="h-60" src="/department11.jpg" alt="updhan-2024" />
//           </div>
//           <Link
//             href="/pages/form/updhan-2024"
//             className="mt-8 px-6 py-2 md:w-full text-center bg-golden text-white font-semibold"
//           >
//             {" "}
//             Register here
//           </Link>
//         </div>
//         <div className="flex flex-col mt-10 md:mt-0 items-center justify-center ">
//           <div className="relative px-10 flex items-center justify-center">
//           <img className="absolute object-cover object-center h-[20rem] " src="/squareborder1.png" alt="" />
//           <img className="h-60" src="/department22.png" alt="vachana-2024" />
//           </div>
//           <Link
//             href="/pages/form/vachana-2024"
//             className="mt-8 px-6 py-2 md:w-full text-center bg-golden text-white font-semibold"
//           >
//             {" "}
//             Register here
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Departments;
