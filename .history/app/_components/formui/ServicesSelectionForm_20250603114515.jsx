"use client";
import React, { useState, useEffect } from "react";
import { Form, Collapse, Checkbox, Radio, Input, Button, message } from "antd";
import { FaSpinner } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const { Panel } = Collapse;
const CheckboxGroup = Checkbox.Group;

const Page = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isDailyChecked, setIsDailyChecked] = useState(false);

  // Departments data
  const departments = [
    {
      departmentID: 1,
      name: "जिनप्रतिमा क्षेत्र",
      services: [
        { serviceID: 101, name: "माहिती एकत्रीकरण" },
        { serviceID: 102, name: "विधियुक्त नवनिर्माण" },
        { serviceID: 103, name: "सुरक्षा-शुद्धि-शोभा" },
        { serviceID: 104, name: "शुद्ध द्रव्य प्रसार" },
      ],
    },
    {
      departmentID: 2,
      name: "जिनमंदिर क्षेत्र",
      services: [
        { serviceID: 201, name: "जीर्णोद्धार" },
        { serviceID: 202, name: "शिल्पज्ञान" },
        { serviceID: 203, name: "शुद्धि-शोभा" },
        { serviceID: 204, name: "विधि विधान" },
      ],
    },
    {
      departmentID: 3,
      name: "जिनागम क्षेत्र",
      services: [
        { serviceID: 301, name: "ज्ञानप्राप्ति" },
        { serviceID: 302, name: "ज्ञान भंडारनी संभाळ" },
        { serviceID: 303, name: "हस्तलेखन व्यवस्था" },
        { serviceID: 304, name: "पुस्तक प्रकाशन व्यवस्था" },
      ],
    },
    {
      departmentID: 4,
      name: "साधु-साध्वी क्षेत्र",
      services: [
        { serviceID: 401, name: "पारिष्ठापनिका व्यवस्था" },
        { serviceID: 402, name: "विहार व्यवस्था" },
        { serviceID: 403, name: "अन्य वेयावच्च/भक्ति" },
      ],
    },
    {
      departmentID: 5,
      name: "श्रावक-श्राविका क्षेत्र",
      services: [
        { serviceID: 501, name: "पौषधशाळा निर्माण" },
        { serviceID: 502, name: "धार्मिक भणाववुं/धर्मप्रसार" },
        { serviceID: 503, name: "पर्युषण आराधना" },
        { serviceID: 504, name: "साधर्मिक भक्ति" },
      ],
    },
    {
      departmentID: 6,
      name: "अन्य",
      services: [
        { serviceID: 601, name: "अनुष्ठान आयोजन" },
        { serviceID: 602, name: "जीवदया" },
        { serviceID: 603, name: "अनुकंपा" },
      ],
    },
  ];

  // Generate department field names
  const departmentFields = departments.map(
    (dept) => `department_${dept.departmentID}`
  );

  useEffect(() => {
    if (formData) {
      form.setFieldsValue(formData);
      
      // Set isDailyChecked based on formData
      if (formData.timeAvailability && formData.timeAvailability.includes("daily")) {
        setIsDailyChecked(true);
      }
    }
  }, [formData, form]);

  const handleSubmit = (values) => {
    console.log("Form Values:", values);
    messageApi.success("फॉर्म सफलतापूर्वक जमा किया गया!");
  };

  const checkAndProceed = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      updateFormData(values);
      nextStep();
    } catch (errorInfo) {
      messageApi.error("कृपया सभी आवश्यक फ़ील्ड भरें!");
      const errorField = document.querySelector(".ant-form-item-has-error");
      errorField?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleDailyCheckChange = (e) => {
    setIsDailyChecked(e.target.checked);
    
    // Update the timeAvailability field
    const currentTimeAvailability = form.getFieldValue('timeAvailability') || [];
    
    if (e.target.checked) {
      if (!currentTimeAvailability.includes('daily')) {
        form.setFieldsValue({
          timeAvailability: [...currentTimeAvailability, 'daily']
        });
      }
    } else {
      form.setFieldsValue({
        timeAvailability: currentTimeAvailability.filter(item => item !== 'daily')
      });
    }
  };

  // Extract daily checkbox value from timeAvailability array
  const isDailySelected = formData?.timeAvailability?.includes("daily") || false;

  return (
    <div className="relative w-full flex-col font-Karma flex justify-center">
      {contextHolder}
      <div className="w-full px-5 md:px-20 pb-6">
        <p className="font-semibold text-base text-gray-700 py-5">
          ➱ शासन रक्षादि कार्यो में आपकी रूचि काबिलियत किस विषय में है :
        </p>

        <Form
          form={form}
          layout="vertical"
          initialValues={formData || {}}
          preserve={true}
          validateMessages={{
            required: "${label} आवश्यक है",
            types: {
              number: "${label} एक वैध संख्या नहीं है",
            },
            number: {
              min: "${label} ${min} से बड़ा होना चाहिए",
            },
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-x-4">
            <Form.Item
              name="serviceSelection"
              dependencies={departmentFields}
              rules={[
                {
                  validator: (_, value) => {
                    const values = form.getFieldsValue(departmentFields);
                    const selected = departmentFields.some(
                      (field) => values[field]?.length > 0
                    );
                    return selected
                      ? Promise.resolve()
                      : Promise.reject("कृपया कम से कम एक सेवा का चयन करें");
                  },
                },
              ]}
            >
              <Collapse accordion>
                {departments.map((department) => (
                  <Panel
                    header={`${department.departmentID}. ${department.name}`}
                    key={department.departmentID}
                  >
                    <Form.Item
                      name={`department_${department.departmentID}`}
                      noStyle
                    >
                      <CheckboxGroup>
                        <div className="flex flex-col space-y-2">
                          {department.services.map((service) => (
                            <Checkbox
                              key={service.serviceID}
                              value={service.serviceID}
                            >
                              {service.name}
                            </Checkbox>
                          ))}
                        </div>
                      </CheckboxGroup>
                    </Form.Item>
                  </Panel>
                ))}
              </Collapse>
            </Form.Item>

            {/* Time Availability Section */}
            <div className="my-6 border-b pb-6">
              <p className="font-semibold text-base font-Karma text-gray-700 py-5">
                आप महीने में कितना समय दे सकते हो?
              </p>

              <Form.Item name="timeAvailability" hidden>
                <Checkbox.Group />
              </Form.Item>

              <div className="flex items-center mb-2">
                <Checkbox 
                  checked={isDailyChecked}
                  onChange={handleDailyCheckChange}
                >
                  हर रोज़
                </Checkbox>
                <div className="ml-6 flex items-center">
                  <span className="mr-2">कितने घंटे</span>
                  <Form.Item name="dailyHours" noStyle>
                    <Input type="number" style={{ width: "100px" }} />
                  </Form.Item>
                </div>
              </div>

              <Form.Item
                label={<span className="font-Karma font-semibold text-base">छुट्टी के दिनों में अन्य कोई समय दे सकते हो ?</span>}
                name="holidayTimeAvailability"
                rules={[{ required: true, message: "कृपया एक विकल्प चुनें" }]}
                className="mt-6"
              >
                <Radio.Group>
                  <Radio value="yes">हाँ</Radio>
                  <Radio value="no">ना</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                label={<span className="font-Karma font-semibold text-base">शासन कार्य के लिए प्रवास करने की आपकी रूचि अनुकूलता है?</span>}
                name="workTravelInterest"
                rules={[{ required: true, message: "कृपया एक विकल्प चुनें" }]}
              >
                <Radio.Group>
                  <Radio value="yes">हाँ</Radio>
                  <Radio value="no">ना</Radio>
                </Radio.Group>
              </Form.Item>
            </div>

            {/* Navigation Buttons */}
            <div className="flex mt-8 justify-between items-center">
              <button
                onClick={() => {
                  updateFormData(form.getFieldsValue());
                  prevStep();
                }}
                className="flex items-center px-4 py-2 rounded-sm bg-blue-50 border-blue-200 border-2 text-gray-800 font-medium hover:bg-blue-100 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <FaArrowLeft className="mr-2" /> Previous
              </button>
              <button
                onClick={checkAndProceed}
                className="flex items-center px-4 py-2 rounded-sm bg-gray-800 text-gray-100 font-medium hover:bg-gray-900 shadow-md hover:shadow-lg transition-all duration-300"
              >
                Continue <FaArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Page;

// "use client";
// import React, { useState, useEffect } from "react";
// import { Form, Button, Collapse, Checkbox, Radio, Input } from "antd";
// import axios from "axios";
// import Providers from "@/app/providers";
// import Nbsp from "@/app/_components/Nbsp";
// import { FaSpinner } from "react-icons/fa";

// const { Panel } = Collapse;
// const CheckboxGroup = Checkbox.Group;

// const Page = () => {
//   const [form] = Form.useForm();
//   const [departments, setDepartments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch departments and services data when component mounts
//     const fetchDepartmentsAndServices = async () => {
//       try {
//         setLoading(true);

//         // Fetch departments
//         const departmentsResponse = await axios.get(
//           "https://api.adhyatmparivar.com/apmasterapi/master/departments"
//         );

//         // Fetch all services
//         const servicesResponse = await axios.get(
//           "https://api.adhyatmparivar.com/apmasterapi/master/services"
//         );

//         const fetchedDepartments = departmentsResponse.data;
//         const fetchedServices = servicesResponse.data;

//         // Group services by their department ID
//         const servicesGroupedByDepartment = fetchedServices.reduce(
//           (acc, service) => {
//             const departmentId = service.departmentFID;
//             if (!acc[departmentId]) {
//               acc[departmentId] = [];
//             }
//             acc[departmentId].push(service);
//             return acc;
//           },
//           {}
//         );

//         // Map departments with their services
//         const departmentsWithServices = fetchedDepartments.map(
//           (department) => ({
//             ...department,
//             services:
//               servicesGroupedByDepartment[department.departmentID] || [],
//           })
//         );

//         setDepartments(departmentsWithServices);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError("Failed to fetch departments or services.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDepartmentsAndServices();
//   }, []);

//   const onFinish = (values) => {
//     console.log("Form values:", values);
//   };

//   // Initialize hard-coded department names for fallback
//   const departmentNames = {
//     1: "जिनमूर्ति विभाग",
//     2: "जिनमंदिर विभाग",
//     3: "जिनागम विभाग",
//     4: "अध्यात्म विभाग",
//   };

//   return (
//     // <Providers>
//     <div className="relative w-full flex-col font-Karma flex justify-center">
//       {/* <div className="text-center pt-10  text-3xl px-5 pb-5 md:pb-0 leading-relaxed underline underline-offset-8 text-gray-700 font-bold">
//           -::&nbsp; अध्यात्म परिवार सदस्य विगत पत्रक &nbsp;::-
//         </div> */}

//       <div className="w-full px-5 md:px-20 pb-6">
//         {/* <Nbsp /> */}

//         <p className=" min-w-[70vw] font-semibold text-base text-gray-700 py-5">
//           ➱ शासन रक्षादि कार्यो में आपकी रूचि काबिलियत किस विषय में है :
//         </p>

//         {loading ? (
//           <div className="flex items-center justify-center py-4">
//             <FaSpinner size={32} className="animate-spin" />
//           </div>
//         ) : error ? (
//           <div className="text-center py-4 text-red-500">{error}</div>
//         ) : (
//           <Form
//             form={form}
//             layout="vertical"
//             onFinish={onFinish}
//             style={{ minWidth: "70vw" }}
//           >
//             <div className="grid grid-cols-1 lg:grid-cols-1 gap-x-4">
//               <Collapse accordion>
//                 {departments.map((department, deptIndex) => {
//                   // Use sequential numbers (1-based index) instead of department IDs
//                   const deptNum = deptIndex + 1;
//                   const deptName =
//                     department.name ||
//                     departmentNames[deptNum] ||
//                     `Department ${deptNum}`;

//                   return (
//                     <Panel
//                       header={`${deptNum}. ${deptName}`}
//                       key={department.departmentID}
//                     >
//                       <Form.Item name={`department_${department.departmentID}`}>
//                         <CheckboxGroup>
//                           <div className="flex flex-col space-y-2">
//                             {department.services.map(
//                               (service, serviceIndex) => (
//                                 <Checkbox
//                                   key={service.serviceID}
//                                   value={service.serviceID}
//                                 >
//                                   {`${deptNum}.${serviceIndex + 1} - ${
//                                     service.name
//                                   }`}
//                                 </Checkbox>
//                               )
//                             )}
//                           </div>
//                         </CheckboxGroup>
//                       </Form.Item>
//                     </Panel>
//                   );
//                 })}
//               </Collapse>
//               {/* Time availability question - NEWLY ADDED */}
//               <div className="my-6 border-b pb-6">
//                 <p className="min-w-[70vw] font-semibold font-Karma text-base text-gray-700 py-5">
//                   आप महीने में कितना समय दे सकते हो?
//                 </p>

//                 <Form.Item name="timeAvailability" className="mb-2">
//                   <div className="flex items-center">
//                     <Checkbox value="daily">हर रोज़</Checkbox>

//                     <div className="ml-6 flex items-center">
//                       <span className="mr-2">कितने घंटे</span>
//                       <Form.Item name="dailyHours" noStyle>
//                         <Input type="number" style={{ width: "100px" }} />
//                       </Form.Item>
//                     </div>
//                   </div>
//                 </Form.Item>

//                 <p className="min-w-[70vw] font-semibold font-Karma text-base text-gray-700 py-3">
//                   छुट्टी के दिनों में अन्य कोई समय दे सकते हो?
//                 </p>

//                 <Form.Item name="holidayTimeAvailability">
//                   <Radio.Group>
//                     <Radio value="yes">हाँ</Radio>
//                     <Radio value="no">ना</Radio>
//                   </Radio.Group>
//                 </Form.Item>
//                 <Form.Item
//                   label={
//                     <span className="min-w-[70vw] font-Karma font-semibold text-base text-gray-700 py-3">
//                       शासन कार्य के लिए प्रवास करने की आपकी रूचि अनुकूलता है
//                     </span>
//                   }
//                   name="workTravelInterest"
//                   className="sm:col-span-1"
//                 >
//                   <Radio.Group className="flex flex-wrap">
//                     <Radio value="yes">हाँ</Radio>
//                     <Radio value="no">ना</Radio>
//                   </Radio.Group>
//                 </Form.Item>
//               </div>
//             </div>
//           </Form>
//         )}
//       </div>
//     </div>
//     // {/* </Providers> */}
//   );
// };

// export default Page;
