"use client";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
import "../../globals.css";
// import { useRef } from "react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
import Departments from "../../_components/Departments";
import LogoDescription from "../../_components/LogoDescription";
import Hero from "../../_components/Hero";
import FrontPage from "../../_components/frontpage";
import LetterPage from "../../_components/letter";
import Providers from "@/app/providers";
import { AnimatedGridPattern } from "@/app/_components/magicui/animated-grid-pattern";

// gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // const secRef = useRef();

  // useGSAP(() => {
  //   gsap.to(secRef.current, {
  //     transform: "translateX(-250%)",
  //     delay: 0.5,
  //     duration: 5,
  //     scrollTrigger: {
  //       trigger: secRef.current,
  //       start: "top 13%",
  //       end: "bottom 60%",
  //       // markers:true,
  //       scroller: "body",
  //       scrub: 2,
  //       pin: true,
  //       duration: 1,
  //     },
  //   });
  // });

  return (
    <div>
      <Providers>
        <AnimatedGridPattern />
        <Hero />
        {/* <FrontPage/> */}
        <LogoDescription />
        <Departments />
        <LetterPage />
      </Providers>
    </div>
  );
}
