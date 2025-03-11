// import SidebarItem from '../_components/SidebarItem';
// import { useGlobalProvider } from '../context/GlobalContext';
// import { FaUser, FaUsers, FaUserFriends, FaUserCheck } from 'react-icons/fa';




// //...................axios........................
// import axios from 'axios';

// const fetchSectionsAndSubsections = async () => {
//   const URLDepartments = "https://api.adhyatmparivar.com/apmasterapi/department/all";
//   const config = {
//     headers: {
//       'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoiZGlzcGxheW5hbWUiLCJVc2VySUQiOiI0MiIsIk1vYmlsZVBob25lIjoiNzY2NTM3NDMzMSIsIlBlcm1pc3Npb24iOiJbXSIsImV4cCI6MTczNDY3OTk4OCwiaXNzIjoiaHR0cHM6Ly90ZWNod2luZHMuaW4iLCJhdWQiOiJodHRwczovL3RlY2h3aW5kcy5pbiJ9.EhLukhe3TxZHRfiQzdQKU963_YqD2KXmNfgZHCnZuSs',
//       'accept': 'text/plain'
//     }
//   };

//   try {
//     const departmentResponse = await axios.get(URLDepartments, config);
//     const sections = departmentResponse.data;

//     console.log("Fetched Sections:", sections);

//     const sectionWithSubsections = await Promise.all(
//       sections.map(async (section) => {
//         const urlSubsection = `https://api.adhyatmparivar.com/apmasterapi/service/all?departmentId=${section.departmentID}`;
//         // console.log(urlSubsection,"urlSubsection")
//         try {
//           const subsectionResponse = await axios.get(urlSubsection, config);
//           return { 
//             ...section, 
//             subsections: subsectionResponse.data
//           };
//         } catch (error) {
//           console.error(`Error fetching subsections for department ID ${section.id}:`, error);
//           return { 
//             ...section, 
//             subsections: [] // If failed, return empty subsections
//           };
//         }
//       })
//     );

//     console.log("Sections with Subsections:", sectionWithSubsections);
//   } catch (error) {
//     console.error("Error fetching sections:", error);
//   }
// };

// // Run the function
// // fetchSectionsAndSubsections();


//   //........................axios.............................


// const staticSections = [
//   {
//     attributes: {
//       SectionID: 'overview',
//       Title: 'Overview',
//       StandAlone: true,
//     },
//   },
  
//   {
//     attributes: {
//       SectionID: 'section0',
//       Title: 'अध्यात्म परिवार सदस्यता',
//       StandAlone: false,
//       episodes: {
//         data: [
//           { title: 'आपकी विगत', url: '/pages/membership/selfdetails',Icon: FaUser  },
//           { title: 'परिवार की विगत', url: '/pages/membership/familydetails',Icon: FaUsers },
//           { title: 'अध्यात्म परिवार सदस्य विगत पत्रक', url: '/pages/membership/memberdetails',Icon: FaUserFriends },
//           { title: 'दीक्षित सदस्य की विगत', url: '/pages/membership/dikshitdetails',Icon: FaUserCheck },
//         ],
//       },
//     },
//   },
//   {
//     attributes: {
//       SectionID: 'section1',
//       Title: 'जिनमूर्ति विभाग',
//       StandAlone: false,
//       episodes: {
//         data: [
//           { title: '1.1 - जिनप्रतिमा सुरक्षा (लेप-धोप)', url: '/pages/jinmurti/1.1'},
//           { title: '1.2 - जिनप्रतिमा निर्माण - पाषाण (अध्यात्म शिल्पशाला)', url: '/pages/jinmurti/1.2' },
//           { title: '1.3 - जिनप्रतिमा निर्माण - धातु', url: '/pages/jinmurti/1.3' },
//           { title: '1.4 - प्राचीन जिनप्रतिमा संग्रहण', url: '/pages/jinmurti/1.4' },
//           { title: '1.5 - जिनप्रतिमा आशातरा निवारण (बिना अंजन वाली प्रतिमाओं की योग्य व्यवस्था)', url: '/pages/jinmurti/1.5' },
//         ],
//       },
//     },
//   },
//   {
//     attributes: {
//       SectionID: 'section2',
//       Title: 'जिनमंदिर विभाग',
//       StandAlone: false,
//       episodes: {
//         data: [
//           { title: '2.1 - जिनालय सुरक्षा (मरम्मत)', url: '/pages/jinmandir/2.1' },
//           { title: '2.2 - जिनालय शुद्धि - उपाश्रय शुद्धि', url: '/pages/jinmandir/2.2' },
//           { title: '2.3 - जिनालय नवनिर्माण तथा मार्गदर्शन', url: '/pages/jinmandir/2.3' },
//           { title: '2.4 - जिनालय और गृहजिनालय के लिए संगमरमर के पत्थर की घड़ाई', url: '/pages/jinmandir/2.4' },
//           { title: '2.5 - देव बगीचे का निर्माण', url: '/pages/jinmandir/2.5' },
//         ],
//       },
//     },
//   },
//   {
//     attributes: {
//       SectionID: 'section3',
//       Title: 'जिनागम विभाग',
//       StandAlone: false,
//       episodes: {
//         data: [
//           { title: '3.1 - प्राचीन श्रुत सुरक्षा', url: '/pages/jinagam/3.1' },
//           { title: '3.2 - अर्वाचीन श्रुत प्रकाशन-प्रचार', url: '/pages/jinagam/3.2' },
//           { title: '3.3 - हरिभद्रसूरी शास्त्रसंग्रह (श्रीसंघ को श्रुत की उपलब्धि)', url: '/pages/jinagam/3.3' },
//           { title: '3.4 - अध्यात्म ज्ञानतीर्थ (संग्रह-संशोधन-प्रकाशन)', url: '/pages/jinagam/3.4' },
//           { title: '3.5 - गणीपिटक निर्माण प्रसार', url: '/pages/jinagam/3.5' },
//         ],
//       },
//     },
//   },
//   {
//     attributes: {
//       SectionID: 'section4',
//       Title: 'अध्यात्म विभाग',
//       StandAlone: false,
//       episodes: {
//         data: [
//           { title: '4.1 - परिष्ठापानिका समिति सुरक्षा मात्रु की कुंडी निर्माण स्थंडिल भूमि (डेम) निर्माण', url: '/pages/adhyatm/4.1' },
//           { title: '4.2 - विहार सुरक्षा', url: '/pages/adhyatm/4.2' },
//           { title: '4.3 - चारित्र उपकरण भक्ति', url: '/pages/adhyatm/4.3' },
//           { title: '4.4 - उष्ण जल ठंडा करने का स्टैंड', url: '/pages/adhyatm/4.4' },
//           { title: '4.5 - शुद्ध पूजा के द्रव्यों की सम्प्राप्ति', url: '/pages/adhyatm/4.5' },
//           { title: '4.6 - धर्मानुष्ठान सुशोभन सामग्री की उपलब्धि', url: '/pages/adhyatm/4.6' },
//           { title: '4.7 - उद्यापन उपकरण व्यवस्था', url: '/pages/adhyatm/4.7' },
//           { title: '4.8 - अनुष्ठान आयोजन (सामूहिक दीक्षा, उपधान , वाचना श्रेणी आदि)', url: '/pages/adhyatm/4.8' },
//           { title: '4.9 - अध्यात्मशाला (बालसंस्करण पाठशाला)', url: '/pages/adhyatm/4.9' },
//           { title: '4.10 संस्कृत शिक्षण वर्ग (संशिव)', url: '/pages/adhyatm/4.10' },
//           { title: '4.11 पाइयशाला (प्राकृत शिक्षणशाला)', url: '/pages/adhyatm/4.11' },
//           { title: '4.12 जीवंत दृश्यावली (भावोत्पादक नाटक)', url: '/pages/adhyatm/4.12' },
//           { title: '4.13 प्रभुभक्ति आदि के बेजोड़ उपकरणों का निर्माण', url: '/pages/adhyatm/4.13' },
//           { title: '4.14 उत्तम भक्तिद्रव्य संशोधन', url: '/pages/adhyatm/4.14' },
//           { title: '4.15 लीगल सेल : क़ानूनी मार्गदर्शन', url: '/pages/adhyatm/4.15' },
//           { title: '4.16 चित्र निर्माण', url: '/pages/adhyatm/4.16' },
//           { title: '4.17 विविध संघो तथा आराधना भवनों का संचालन', url: '/pages/adhyatm/4.17' },
//         ],
//       },
//     },
//   },
// ];


// const Sidebar = ({ className }) => {
//   const { isSidebarHide, setIsSidebarHide } = useGlobalProvider();


//   const renderSections = (sections) => {
//     return sections.map((section) => {
//       const subItemsWithOverview = [
       
//         ...(section?.attributes?.episodes?.data || []),
//       ];

//       return (
//         <SidebarItem
//           key={section?.attributes?.SectionID}
//           title={section?.attributes?.Title}
//           standAlone={section?.attributes?.StandAlone}
//           url={decodeURIComponent(section?.attributes?.SectionID)}
//           subItems={subItemsWithOverview}
//         />
//       );
//     });
//   };

//   return (
//     <div
//       style={{ transitionProperty: 'width' }}
//       className={`main-sidebar bg-white ${isSidebarHide ? 'lg:w-0' : 'lg:w-64'} transition-width duration-500 ease-in-out h-[calc(100vh-65px)] pb-6 md:pt-11 pt-36  text-white shadow-[rgba(0,0,15,0.1)_1px_0px_0px_0px] overflow-y-scroll custom-scrollbar border-gray-500 ${className}`}
//     >
//       <div>
//         <div className="mb-2">
//           {staticSections.length ? renderSections(staticSections) : (
//             <div>No data available</div>
//           )}
//         </div>
//       </div>
//       <hr />
//     </div>
//   );
// };

// export default Sidebar;

import React, { useEffect, useState } from 'react';
import SidebarItem from '../_components/SidebarItem';
import { useGlobalProvider } from '../context/GlobalContext';
import axios from 'axios';

const Sidebar = ({ className }) => {

 
  const { isSidebarHide } = useGlobalProvider();
  const [sections, setSections] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

 
  const fetchSectionsAndSubsections = async () => {

    const { data: services } = await axios.get(
      `https://api.adhyatmparivar.com/apmasterapi/master/services`
    );

    // console.log(services[0],"servicesservices")
    
    const URLDepartments = process.env.DEPT_URL;
    const urlServices = process.env.SERVICE_URL;

    try {
      const [departmentResponse, servicesResponse] = await Promise.all([
        axios.get(URLDepartments),
        axios.get(urlServices),
      ]);

      const fetchedDepartments = departmentResponse.data;
      const fetchedServices = servicesResponse.data; 

      const servicesGroupedByDepartment = fetchedServices.reduce((acc, service) => {
        const departmentFID = service.departmentFID;
        if (!acc[departmentFID]) acc[departmentFID] = [];
        acc[departmentFID].push(service);
        return acc;
      }, {});


      const sectionsWithSubsections = fetchedDepartments.map((section) => ({
        ...section,
        episodes: servicesGroupedByDepartment[section.departmentID] || [],
      }));

      setSections(sectionsWithSubsections);
    } catch (error) {
      console.error('Error fetching sections or services:', error);
      setError('Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSectionsAndSubsections();
  }, []);

  
  const renderSections = (sections) => {
    return sections.map((section) => {
      const subItems = section?.episodes?.map((episode) => ({
        title: episode?.title || episode?.name, 
        url: `/pages/${section.departmentID}/${episode?.serviceID}`, 
      })) || [];

      return (
        <SidebarItem
          key={section.departmentID}
          title={section.name} 
          standAlone={false}
          url={`#`}
          subItems={subItems}
        />
      );
    });
  };

  return (
    <div
      style={{ transitionProperty: 'width' }}
      className={`main-sidebar ${isSidebarHide ? 'lg:w-0' : 'lg:w-64'} transition-width bg-white duration-500 ease-in-out h-[calc(100vh-65px)] pb-6 pt-40 sm:pt-11 text-white shadow-[rgba(0,0,15,0.1)_1px_0px_0px_0px] overflow-y-scroll custom-scrollbar border-gray-500 ${className}`}
    >
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : sections.length ? (
        renderSections(sections)
      ) : (
        <div>No data available</div>
      )}
      <hr />
    </div>
  );
};

export default Sidebar;
