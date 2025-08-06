// "use client";
// // import { useGSAP } from "@gsap/react";
// // import gsap from "gsap";
// import "../../globals.css";
// // import { useRef } from "react";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Departments from "../../_components/Departments";
// import LogoDescription from "../../_components/LogoDescription";
// import Hero from "../../_components/Hero";
// import LetterPage from "../../_components/letter";
// import Providers from "@/app/providers";
// import { AnimatedGridPattern } from "@/app/_components/magicui/animated-grid-pattern";

// // gsap.registerPlugin(ScrollTrigger);

// export default function Home() {
//   // const secRef = useRef();

//   // useGSAP(() => {
//   //   gsap.to(secRef.current, {
//   //     transform: "translateX(-250%)",
//   //     delay: 0.5,
//   //     duration: 5,
//   //     scrollTrigger: {
//   //       trigger: secRef.current,
//   //       start: "top 13%",
//   //       end: "bottom 60%",
//   //       // markers:true,
//   //       scroller: "body",
//   //       scrub: 2,
//   //       pin: true,
//   //       duration: 1,
//   //     },
//   //   });
//   // });

//   return (
//     <div>
//       <Providers>
//         <AnimatedGridPattern />
//         <Hero />
//         {/* <FrontPage/> */}
//         <LogoDescription />
//         <Departments />
//         <LetterPage />
//       </Providers>
//     </div>
//   );
// }



"use client";
import React, { useEffect, useState } from "react";
import "../../globals.css";
import Departments from "../../_components/Departments";
import Sba from "../../_components/Sba";
import LogoDescription from "../../_components/LogoDescription";
import Hero from "../../_components/Hero";
import LetterPage from "../../_components/letter";
import Providers from "@/app/providers";
import { AnimatedGridPattern } from "@/app/_components/magicui/animated-grid-pattern";

// Animated wrapper component for individual sections
const AnimatedSection = ({ children, delay = 0, direction = "up", className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getAnimationClasses = () => {
    const baseClasses = "transition-all duration-1000 ease-out";
    
    if (!isVisible) {
      switch (direction) {
        case "left":
          return `${baseClasses} opacity-0 -translate-x-8`;
        case "right":
          return `${baseClasses} opacity-0 translate-x-8`;
        case "down":
          return `${baseClasses} opacity-0 -translate-y-8`;
        case "up":
        default:
          return `${baseClasses} opacity-0 translate-y-8`;
      }
    }
    
    return `${baseClasses} opacity-100 translate-x-0 translate-y-0`;
  };

  return (
    <div className={`${getAnimationClasses()} ${className}`}>
      {children}
    </div>
  );
};



export default function Home() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Start animations immediately after component mounts
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`transition-all duration-1000 ${
      showContent ? 'opacity-100' : 'opacity-0'
    }`}>
      <Providers>
        {/* Background Pattern - No animation needed */}
        <AnimatedGridPattern />
        
        {/* Hero Section - First to appear */}
        <AnimatedSection delay={200} direction="up" className="relative z-10">
          <Hero />
        </AnimatedSection>

        {/* Logo Description - Slides from left */}
        <AnimatedSection delay={600} direction="left" className="relative z-10">
          <LogoDescription />
        </AnimatedSection>

         <AnimatedSection delay={800} direction="right" className="relative z-10">
          <Sba />
        </AnimatedSection>

        {/* Letter Page - Fades up last */}
        <AnimatedSection delay={1000} direction="up" className="relative z-10">
          <LetterPage />
        </AnimatedSection>

            {/* Departments - Slides from right */}
        <AnimatedSection delay={1400} direction="right" className="relative z-10">
          <Departments />
        </AnimatedSection>
      </Providers>
    </div>
  );
}
