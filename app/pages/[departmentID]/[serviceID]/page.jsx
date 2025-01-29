import axios from "axios";
import Providers from "../../../providers";
import ServiceDetails from "../../../_components/ServiceDetails";

export async function generateMetadata({ params }) {
  try {
    const { serviceID, departmentID } = params;

    // Fetch services for specific department
    const { data: services } = await axios.get(
      `https://api.adhyatmparivar.com/apmasterapi/master/services/${departmentID}`
    );

    // Fetch specific service data
    const service = await services?.filter(
      (service) => service?.serviceID == serviceID
    )[0];

    return {
      title: service.name || "Service Details",
      description: service.description || "Service Overview",
      // openGraph: {

      // }
    };
  } catch (error) {
    console.error("Error fetching service metadata:", error);
    return {
      title: "Service Details",
      description: "Service Overview",
    };
  }
}

const ServicePage = async ({ params }) => {
  const { serviceID, departmentID } = params;

  //departname of perticular servicepage

  const response = await axios.get(
    `https://api.adhyatmparivar.com/apmasterapi/master/department/${departmentID}`
  );

  const departmentName = await response?.data?.name;

  // console.log(departmentName,"departmentName")

  // Fetch services for specific department
  const { data: services } = await axios.get(
    `https://api.adhyatmparivar.com/apmasterapi/master/services/${departmentID}`
  );

  // Fetch specific service data
  const service = await services?.filter(
    (service) => service?.serviceID == serviceID
  )[0];

  //Fetch Service detail by serviceID

  const { data: serviceDetails } = await axios.get(
    `https://api.adhyatmparivar.com/apmasterapi/master/service-details/${serviceID}`
  );

  return (
    <Providers
      serviceID={serviceID}
      departmentID={departmentID}
      services={services}
      service={service}
      serviceDetails={serviceDetails}
      departmentName={departmentName}
    >
      <div className=" p-4 px-5 md:py-7 md:px-0">
        <ServiceDetails />
      </div>
    </Providers>
  );
};

export async function generateStaticParams() {
  try {
    const { data: services } = await axios.get(
      `https://api.adhyatmparivar.com/apmasterapi/master/services`
    );

    return services.map((service) => ({
      departmentID: service?.departmentFID?.toString(),
      serviceID: service?.serviceID?.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default ServicePage;
