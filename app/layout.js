// // app/layout.jsx (Server Component)
// import "./globals.css";
// import Footer from "./layouts/Footer";
// import Header from "./layouts/Header";
// import Sidebar from "./layouts/Sidebar"

// export const metadata = {
//   title: "Adhyatm",
//   description: "Brochure",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className="container bg-orange-50">
//         {/* Header */}
//         <Header /> 

//         {/* Main Content Layout */}
//         <div className="flex">
//           {/* Sidebar Component */}
//           <Sidebar />

//           {/* Main Content Area (with padding to account for header and sidebar) */}
//           <div className="flex flex-col w-full md:ml-64 mt-20">
//             <main className="flex-1 p-4">
//               <div className="container mx-auto max-w-6xl">{children}</div>
//             </main>

//             {/* Footer */}
//             <Footer />
//           </div>
//         </div>
//       </body>
//     </html>
//   );
// }

import "./globals.css";

export const metadata = {
  title: "Adhyatm Parivar",
  description: "Home",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Kameron:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Karma:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+Gujarati:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiko:wght@400;600;700&family=Anek+Gujarati:wght@100..800&family=Noto+Sans+Gujarati:wght@100..900&family=Oswald:wght@200..700&family=Teko:wght@300..700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiko:wght@400;600;700&family=Anek+Gujarati:wght@100..800&family=Noto+Sans+Gujarati:wght@100..900&family=Teko:wght@300..700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiko:wght@400;600;700&family=Anek+Gujarati:wght@100..800&family=Noto+Sans+Gujarati:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css2?family=Anek+Gujarati:wght@100..800&display=swap" rel="stylesheet"/>
      </head>

      <body className="relative overflow-x-hidden bg-white flex flex-col items-center min-h-screen">
        {children}
      </body>
    </html>
  );
}
