"use client";
import Sidebar from "./layouts/Sidebar";
import Main from "./main";
import Header from "./layouts/Header";
import { GlobalProvider } from "./context/GlobalContext";

const Providers = ({ children,departmentID,departmentDataIDWise,serviceID,services,service,serviceDetails,departmentName }) => {
  // console.log(languageWiseSections, "languageWiseSections.........");

  return (
    <div className="container flex mx-auto">
      <GlobalProvider
      departmentID={departmentID}
      departmentDataIDWise={departmentDataIDWise}
      serviceID={serviceID}
      services={services}
      service={service}
      serviceDetails={serviceDetails}
      departmentName={departmentName}
      >
          <Header className="fixed top-0 left-0 lg:left-0 right-0 z-10" />
          <div className="flex pt-8 flex-grow">
            <Sidebar
              className={`hidden lg:block fixed top-16 bottom-0 z-10 `}
            />
            <Main>{children}</Main>
          </div>
       
      </GlobalProvider>
    </div>
  );
};

export default Providers;
