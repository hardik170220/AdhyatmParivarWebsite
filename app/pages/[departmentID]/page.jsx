import React from "react";
import Providers from "../../providers";
import axios from "axios";
import DepartmentOverview from "../../_components/DepartmentOverview";


export async function generateMetadata({ params }) {

  
  try {
    const departmentID = params.departmentID;
    
    // Fetch specific department data
    const { data: departmentData } = await axios.get(
      `https://api.adhyatmparivar.com/apmasterapi/master/department/${departmentID}`
    );

    return {
      title: departmentData.name || "Department",
      description: `Overview of ${departmentData.name} department`
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "Department",
      description: "Department Overview"
    };
  }
}

const DepartmentPage = async ({ params }) => {
  const { departmentID } = params;

    const { data: departmentDataIDWise } = await axios.get(
      `https://api.adhyatmparivar.com/apmasterapi/master/department/${departmentID}`
    );

    return (
      <div>
        <Providers
          departmentID={departmentID}
          departmentDataIDWise={departmentDataIDWise}
        >
         <DepartmentOverview/>
        </Providers>
      </div>
    );
   
};

export async function generateStaticParams() {
  try {
    const { data: departments } = await axios.get(
      `https://api.adhyatmparivar.com/apmasterapi/master/departments`
    );

    return departments.map((department) => ({
      departmentID: department.departmentID.toString()
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default DepartmentPage;