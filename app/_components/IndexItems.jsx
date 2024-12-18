import React from "react";

const sections = [
  {
    title: "जिनमूर्ति विभाग...",
    colorClass: "text-red-600",
    items: [
      { title: "1.1 जिनप्रतिमा सुरक्षा (लेप-धोप)", page: "02" },
      {
        title: "1.2 जिनप्रतिमा निर्माण - पाषाण (अध्यात्म शिल्पशाला)",
        page: "05",
      },
      { title: "1.3 जिनप्रतिमा निर्माण - धातु", page: "06" },
      { title: "1.4 प्राचीन जिनप्रतिमा संग्रहण", page: "07" },
      {
        title:
          "1.5 जिनप्रतिमा आशातरा निवारण (बिना अंजन वाली प्रतिमाओं की योग्य व्यवस्था)",
        page: "08",
      },
    ],
  },
  {
    title: "जिनमंदिर विभाग...",
    colorClass: "text-teal-600",
    items: [
      { title: "2.1 जिनालय सुरक्षा (मरम्मत)", page: "10" },
      { title: "2.2 जिनालय शुद्धि - उपाश्रय शुद्धि", page: "12" },
      { title: "2.3 जिनालय नवनिर्माण तथा मार्गदर्शन", page: "13" },
      {
        title: "2.4 जिनालय और गृहजिनालय के लिए संगमरमर के पत्थर की घड़ाई",
        page: "16",
      },
      { title: "2.5 देव बगीचे का निर्माण", page: "16" },
    ],
  },
  {
    title: "जिनागम विभाग...",
    colorClass: "text-gray-700",
    items: [
      { title: "3.1 प्राचीन श्रुत सुरक्षा", page: "20" },
      { title: "3.2 अर्वाचीन श्रुत प्रकाशन-प्रचार", page: "21" },
      {
        title: "3.3 हरिभद्रसूरी शास्त्रसंग्रह (श्रीसंघ को श्रुत की उपलब्धि)",
        page: "23",
      },
      { title: "3.4 अध्यात्म ज्ञानतीर्थ (संग्रह-संशोधन-प्रकाशन)", page: "24" },
      { title: "3.5 गणीपिटक निर्माण प्रसार", page: "24" },
    ],
  },
];

const lastSection = [
  {
    title:
      "4.1 परिष्ठापानिका समिति सुरक्षा मात्रु की कुंडी निर्माण स्थंडिल भूमि (डेम) निर्माण",
    page: "26",
  },
  { title: "4.2 विहार सुरक्षा", page: "26" },
  { title: "4.3 चारित्र उपकरण भक्ति", page: "27" },
  { title: "4.4 उष्ण जल ठंडा करने का स्टैंड", page: "28" },
  { title: "4.5 शुद्ध पूजा के द्रव्यों की सम्प्राप्ति", page: "28" },
  { title: "4.6 धर्मानुष्ठान सुशोभन सामग्री की उपलब्धि", page: "30" },
  { title: "4.7 उद्यापन उपकरण व्यवस्था", page: "31" },
  {
    title: "4.8 अनुष्ठान आयोजन (सामूहिक दीक्षा, उपधान , वाचना श्रेणी आदि)",
    page: "31",
  },
  { title: "4.9 अध्यात्मशाला (बालसंस्करण पाठशाला)", page: "33" },
  { title: "4.10 संस्कृत शिक्षण वर्ग (संशिव)", page: "33" },
  { title: "4.11 पाइयशाला (प्राकृत शिक्षणशाला)", page: "33" },
  { title: "4.12 जीवंत दृश्यावली (भावोत्पादक नाटक)", page: "34" },
  { title: "4.13 प्रभुभक्ति आदि के बेजोड़ उपकरणों का निर्माण", page: "34" },
  { title: "4.14 उत्तम भक्तिद्रव्य संशोधन", page: "35" },
  { title: "4.15 लीगल सेल : क़ानूनी मार्गदर्शन", page: "36" },
  { title: "4.16 चित्र निर्माण", page: "37" },
  { title: "4.17 विविध संघो तथा आराधना भवनों का संचालन", page: "38" },
];

const Section = ({ title, items, colorClass }) => (
  <div className="p-6 bg-[#d49a4313]">
    <h2
      className={`text-base md:text-lg font-semibold font-NotoSansHindi ${colorClass} mb-2`}
    >
      {title}
    </h2>
    <ul className="space-y-4 text-xs md:text-sm">
      {items.map((item, index) => (
        <li key={index} className="flex justify-between font-semibold text-gray-600">
          <span>{item.title}</span>
          <span>...{item.page}</span>
        </li>
      ))}
    </ul>
  </div>
);

const TableOfContents = () => {
  return (
    <div className="p-4 md:py-10 font-Karma  mx-auto font-sans">
      <div className="text-center relative flex flex-col py-6 px-4 rounded-full items-center justify-center w-[90vw] max-w-[28rem] h-[90vw] max-h-[28rem] mx-auto mb-6 md:mb-8">
        <img
          className="absolute w-[100%] h-[100%] object-cover"
          src="/border.png"
          alt="border"
        />
        <div className="relative z-10 text-center">
          <h1 className="text-lg md:text-2xl font-bold font-NotoSansHindi text-teal-600 mb-3 md:mb-4">
            शासनभक्ति की अंजली...
          </h1>
          <p className="text-xs font-semibold md:text-sm text-gray-700 mb-2">
            सादर समान अर्पणकी की शासनने वर्षी करो.
            <br />
            याद रखे करके, मैंने तो बस अंजली भरी...
          </p>
          <p className="text-xs md:text-sm font-semibold text-teal-600">
            अध्यात्म परिवार द्वारा
            <br />
            वर्तमान में संचालित शासन आराधना-
            <br />
            प्रभावना-रक्षा के कार्यों की श्रेणी...
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
        {sections.map((section, index) => (
          <Section key={index} {...section} />
        ))}
      </div>

      <div className="bg-[#d49a4313] p-6 rounded">
        <h2 className="text-base md:text-lg font-NotoSansHindi font-semibold text-center text-purple-600 mb-6">
          चतुर्विध श्रीसंघ विभाग...
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs md:text-sm">
          {lastSection.map((item, index) => (
            <div key={index} className="flex justify-between font-semibold text-gray-600">
              <span>{item.title}</span>
              <span className="text-gray-500 ml-2">...{item.page}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;

// import React from 'react';

// const IndexItems = () => {
//   const sections = [
//     {
//       title: 'शासनभक्त की अंजलि...',
//       color: 'text-teal-700',
//       content: [
//         { text: 'सागर सम्पदा अग्रवाल की शान्तिबद्ध भाव कड़ी।', page: null },
//         { text: 'याद उसे करके, मैंने दी बस अंजलि ढेरी...', page: null },
//         { text: 'अध्यात्म परिवार द्वारा', page: null },
//         { text: 'वर्तमान में संचालित आध्यात्मिक- धार्मिक-रक्षा के कार्य की झांकी...', page: null },
//       ],
//     },
//     {
//       title: 'जिनामूर्ति विभाग...',
//       color: 'text-red-600',
//       content: [
//         { text: 'जिनामूर्ति सुरक्षा (लेप-ओज)', page: '02' },
//         { text: 'जिनामूर्ति निर्माण - पाषाण (अध्यात्म निर्यापक)', page: '04' },
//         { text: 'जिनामूर्ति निर्माण - धातु (अध्यात्म निर्यापक)', page: '06' },
//         { text: 'प्राचीन जिनमंदिर संरक्षण', page: '07' },
//         { text: 'जिनमूर्ति आसन्नासन नियंत्रण (किन्न अन्य प्रतिमाओं में बैठने की व्यवस्था)', page: '08' },
//       ],
//     },
//     {
//       title: 'जिनमंदिर विभाग...',
//       color: 'text-blue-600',
//       content: [
//         { text: 'जिनालय सुरक्षा (मद्रास)', page: '10' },
//         { text: 'जिनालय सुधार / धूपण सुधार', page: '12' },
//       ],
//     },
//     {
//       title: 'जिनालय निर्माण विभाग...',
//       color: 'text-green-600',
//       content: [
//         { text: 'प्राचीन धूप सुरक्षा', page: '20' },
//         { text: 'संग्रहालय और गृहिणालायक के लिए जिनालय के पत्थर की बढ़ाई', page: '21' },
//         { text: 'देव कीर्ति निर्माण', page: '23' },
//       ],
//     },
//     {
//       title: 'जिनानुमति विभाग...',
//       color: 'text-purple-600',
//       content: [
//         { text: 'प्राचीन धूप सुरक्षा', page: '20' },
//         { text: 'जिनमूर्ति शोध प्रकाशन - प्रचार', page: '21' },
//         { text: 'हरिपुरुषजी शास्त्रसार', page: '23' },
//         { text: 'पुरातन गुफा धूप की उपलब्धि', page: '23' },
//         { text: 'प्राचीन पात्र, रक्षा-संशोधन-प्रस्तारण', page: '24' },
//         { text: 'संगीतिया नीतिकेतु निर्माण', page: '24' },
//       ],
//     },
//     {
//       title: 'चतुर्थ श्रेणियाँ विभाग...',
//       color: 'text-gray-200',
//       content: [
//         { text: 'परिशीलन समिति सुरक्षा / स्मारक और संघी का निर्माण', page: '25' },
//         { text: 'धूप सुरक्षा', page: '26' },
//         { text: 'प्राचीन उपकरण भक्ति', page: '27' },
//         { text: 'अज्ञान उपक्रम व्यवस्था', page: '28' },
//         { text: 'अज्ञान आयोजन', page: '30' },
//         { text: 'उपयोग उपकरण व्यवस्था', page: '30' },
//         { text: 'अनुभाग आयोजन', page: '31' },
//         { text: 'अध्यायशाला (बाल संस्कार पाठशाला)', page: '33' },
//         { text: 'संस्कृतिचिन्ह निर्माण (संरक्षण)', page: '33' },
//         { text: 'पाठशाला (प्राचीन शिक्षणशाला)', page: '33' },
//         { text: 'जनेव दृश्यावली (भावीवर्षिता नाटक)', page: '34' },
//         { text: 'प्रमुखस्थान आदिके हेतु उपकरणों का निर्माण', page: '34' },
//         { text: 'भविष्यवाणी संगठन', page: '35' },
//         { text: 'अज्ञान शुद्धि : कालमण्डन', page: '35' },
//         { text: 'नितिमा निर्माण', page: '36' },
//         { text: 'सिंघ स्तंभ का निर्माण', page: '37' },
//         { text: 'आराधना पूजा का संचालन', page: '38' },
//       ],
//     },
//   ];

//   return (
//     <div className="container font-Karma table mx-auto p-4 bg-white">
//       {/* <h1 className="text-3xl font-bold text-center mb-8">Table of Contents</h1> */}
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-6 py-2 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">विभाग का नाम</th>
//             <th className="px-6 py-2 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">कार्यशाला</th>
//             <th className="px-6 py-2 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">पेज संख्या</th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {sections.map((section, sectionIndex) => (
//             <React.Fragment key={sectionIndex}>
//               {section.content.map((item, itemIndex) => (
//                 <tr key={itemIndex} className=''>
//                   {itemIndex === 0 && (
//                     <td rowSpan={section.content.length} className={`px-6 py-4 whitespace-nowrap  font-bold heading ${section.color}`}>
//                       {section.title}
//                     </td>
//                   )}
//                   <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
//                     {`${sectionIndex + 1}.  ${itemIndex + 1} ${item.text}`}
//                   </td>
//                   <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">{item.page || '-'}</td>
//                 </tr>
//               ))}
//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default IndexItems;
