// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
import "./globals.css";
import { redirect } from 'next/navigation'

// import { ScrollTrigger } from "gsap/ScrollTrigger";


// gsap.registerPlugin(ScrollTrigger);

export default function Home() {

//   useGSAP(() => {
//     gsap.to(secRef.current, {
//       transform: "translateX(-250%)",
//       delay: 0.5,
//       duration: 5,
//       scrollTrigger: {
//         trigger: secRef.current,
//         start: "top 13%",
//         end: "bottom 60%",
//         // markers:true,
//         scroller: "body",
//         scrub: 2,
//         pin: true,
//         duration: 1,
//       },
//     });
//   });

    return redirect("/pages/welcome");

}
