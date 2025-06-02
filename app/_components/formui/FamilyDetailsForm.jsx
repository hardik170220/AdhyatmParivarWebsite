// "use client";
// import React, { useState } from "react";
// import { Form, Input, Select, Button, message, Tooltip } from "antd";
// import axios from "axios"; // For API calls
// import { states } from "../../states";
// import { FaSpinner } from "react-icons/fa";

// // import { InfoCircleOutlined } from "@ant-design/icons";

// const { Option } = Select;

// const FamilyDetailsForm = () => {
//   const [form] = Form.useForm();
//   const [pincodeLoading, setPincodeLoading] = useState(false);

//   const relations = [
//     { label: "पुत्र", value: "पुत्र" },
//     { label: "पुत्री", value: "पुत्री" },
//     { label: "पिता", value: "पिता" },
//     { label: "माता", value: "माता" },
//     { label: "भाई", value: "भाई" },
//     { label: "बहन", value: "बहन" },
//     { label: "दादा", value: "दादा" },
//     { label: "दादी", value: "दादी" },
//     { label: "नाना", value: "नाना" },
//     { label: "नानी", value: "नानी" },
//     { label: "पोता", value: "पोता" },
//     { label: "पोती", value: "पोती" },
//     { label: "भतीजा", value: "भतीजा" },
//     { label: "भतीजी", value: "भतीजी" },
//     { label: "भांजा", value: "भांजा" },
//     { label: "भांजी", value: "भांजी" },
//     { label: "चाचा", value: "चाचा" },
//     { label: "चाची", value: "चाची" },
//     { label: "ताऊ", value: "ताऊ" },
//     { label: "ताई", value: "ताई" },
//     { label: "मामा", value: "मामा" },
//     { label: "मामी", value: "मामी" },
//     { label: "बुआ", value: "बुआ" },
//     { label: "फूफा", value: "फूफा" },
//     { label: "मौसी", value: "मौसी" },
//     { label: "मौसा", value: "मौसा" },
//     { label: "ससुर", value: "ससुर" },
//     { label: "सास", value: "सास" },
//     { label: "देवर", value: "देवर" },
//     { label: "ननद", value: "ननद" },
//     { label: "जेठ", value: "जेठ" },
//     { label: "जेठानी", value: "जेठानी" },
//     { label: "देवरानी", value: "देवरानी" },
//     { label: "साला", value: "साला" },
//     { label: "साली", value: "साली" },
//     { label: "जीजा", value: "जीजा" },
//   ];

//   // Function to fetch location data using pincode API
//   const fetchLocationByPincode = async (pincode) => {
//     if (!pincode || pincode.length !== 6 || !/^\d+$/.test(pincode)) {
//       return;
//     }

//     try {
//       setPincodeLoading(true);
//       const response = await axios.get(
//         `https://api.postalpincode.in/pincode/${pincode}`
//       );

//       if (
//         response.data &&
//         response.data[0]?.Status === "Success" &&
//         response.data[0]?.PostOffice?.length > 0
//       ) {
//         const postOfficeData = response.data[0].PostOffice[0];

//         // Update form with fetched location data
//         form.setFieldsValue({
//           city: postOfficeData.District || "",
//           state: postOfficeData.State || "",
//           country: "India",
//           area: postOfficeData.Name || "",
//         });

//         message.success("पिनकोड से स्थान की जानकारी मिल गई!");
//       } else {
//         message.error("इस पिनकोड के लिए कोई स्थान नहीं मिला।");
//       }
//     } catch (error) {
//       console.error("Error fetching pincode data:", error);
//       message.error(
//         "स्थान डेटा प्राप्त करने में विफल। कृपया पुनः प्रयास करें।"
//       );
//     } finally {
//       setPincodeLoading(false);
//     }
//   };

//   // Handle pincode change with debounce
//   const handlePincodeChange = (e) => {
//     const pincode = e.target.value;

//     // Clear any existing timeout
//     if (window.pincodeTimeout) {
//       clearTimeout(window.pincodeTimeout);
//     }

//     // Set a new timeout to fetch data after user stops typing
//     if (pincode && pincode.length === 6) {
//       window.pincodeTimeout = setTimeout(() => {
//         fetchLocationByPincode(pincode);
//       }, 500);
//     }
//   };

//   const handleSubmit = (values) => {
//     console.log("Form Values:", values);
//   };

//   const requiredField = (message) => [{ required: true, message }];

//   const pincodeValidation = [
//     { required: true, message: "कृपया पिन कोड दर्ज करें!" },
//     {
//       pattern: /^[0-9]{6}$/,
//       message: "कृपया 6 अंकों का वैध पिन कोड दर्ज करें!",
//     },
//   ];

//   return (
//     <div className="relative w-full flex-col flex justify-center">
//       <div className="w-full px-5 md:px-20 pb-6 ">
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleSubmit}
//           initialValues={{ job: "select option", country: "India" }}
//           className="w-full"
//           style={{ minWidth: "70vw" }}
//         >
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
//             {/* Family & Address Information Section */}

//             <Form.Item
//               rules={requiredField("कृपया अपना परिवार का नाम दर्ज करें!")}
//               label={
//                 <span className="font-Karma text-base">परिवार का नाम</span>
//               }
//               name="familyName"
//             >
//               <Input className="!py-2" placeholder="परिवार का नाम भरे" />
//             </Form.Item>

//             <Form.Item
//               label={
//                 <span className="font-Karma text-base">
//                   मुख्य सदस्य का संपर्क नं
//                 </span>
//               }
//               name="mainMemberContact"
//               rules={requiredField("कृपया मुख्य सदस्य का संपर्क दर्ज करें!")}
//             >
//               <Input className="!py-2" placeholder="फ़ोन नंबर भरे" />
//             </Form.Item>

//             <Form.Item
//               label={<span className="font-Karma text-base">समाज</span>}
//               name="society"
//             >
//               <Input placeholder="समाज का नाम भरे" className="!py-2" />
//             </Form.Item>

//             <Form.Item
//               rules={requiredField("कृपया मूलवतन दर्ज करें!")}
//               label={<span className="font-Karma text-base">मूलवतन</span>}
//               name="hometown"
//             >
//               <Input className="!py-2" placeholder="मूलवतन भरे" />
//             </Form.Item>

//             <Form.Item
//               rules={pincodeValidation}
//               label={
//                 <div>
//                   <span className="font-Karma text-base">पिनकोड</span>
//                 </div>
//               }
//               name="pincode"
//             >
//               <Input
//                 className="!py-2"
//                 placeholder="पिनकोड भरे"
//                 onChange={handlePincodeChange}
//                 maxLength={6}
//                 suffix={
//                   pincodeLoading ? (
//                     <span className="animate-spin"><FaSpinner/></span>
//                   ) : null
//                 }
//               />
//             </Form.Item>

//             {/* Address-related fields */}
//             <Form.Item
//               rules={requiredField("कृपया घर का पता दर्ज करें!")}
//               label={<span className="font-Karma text-base">घर का पता</span>}
//               name="homeAddress"
//             >
//               <Input className="!py-2" placeholder="घर का पता भरे" />
//             </Form.Item>

//             <Form.Item
//               label={<span className="font-Karma text-base">एरिया</span>}
//               name="area"
//             >
//               <Input className="!py-2" placeholder="एरिया भरे" />
//             </Form.Item>

//             <Form.Item
//               label={<span className="font-Karma text-base">लैंडमार्क</span>}
//               name="landmark"
//             >
//               <Input className="!py-2" placeholder="लैंडमार्क भरे" />
//             </Form.Item>

//             <Form.Item
//               rules={requiredField("कृपया शहर दर्ज करें!")}
//               label={<span className="font-Karma text-base">शहर</span>}
//               name="city"
//             >
//               <Input className="!py-2" placeholder="शहर भरे" />
//             </Form.Item>

//             <Form.Item
//               rules={requiredField("कृपया राज्य दर्ज करें!")}
//               label={<span className="font-Karma text-base">राज्य</span>}
//               name="state"
//             >
//               <Select placeholder="राज्य भरे" className="w-full">
//                 {states.map((state) => (
//                   <Option key={state.value} value={state.value}>
//                     {state.label} / {state.value}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             <Form.Item
//               rules={requiredField("कृपया देश दर्ज करें!")}
//               label={<span className="font-Karma text-base">देश</span>}
//               name="country"
//             >
//               <Select placeholder="देश चुनें" className="w-full">
//                 <Option value="India">India</Option>
//                 {/* Add more countries as needed */}
//               </Select>
//             </Form.Item>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default FamilyDetailsForm;

"use client";
import React, { useState } from "react";
import { Form, Input, Select, Button, message } from "antd";
import axios from "axios";
import { CiLocationOn } from "react-icons/ci";
import { states } from "../../states"; // Ensure this file has your state data
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const { Option } = Select;

const FamilyDetailsForm = ({ formData, onFormUpdate, nextStep, prevStep }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const GOOGLE_API_KEY = 'AIzaSyDkbpb6Cy4mt1xpJDDB-OQ80ilPSK_A3Is';

  // Relations list
  const relations = [
    { label: "पुत्र", value: "पुत्र" },
    // ... keep all your existing relations array items
  ];

  const parseAddressComponents = (components) => {
    let address = {
      city: "",
      state: "",
      country: "",
      pincode: "",
      sublocality: "",
      locality: "",
      formattedAddress: ""
    };

    components.forEach(component => {
      const types = component.types;
      if (types.includes("sublocality_level_1") || types.includes("sublocality")) {
        address.sublocality = component.long_name;
      }
      if (types.includes("locality")) {
        address.locality = component.long_name;
        address.city = component.long_name;
      }
      if (types.includes("administrative_area_level_1")) {
        address.state = component.long_name;
      }
      if (types.includes("country")) {
        address.country = component.long_name;
      }
      if (types.includes("postal_code")) {
        address.pincode = component.long_name;
      }
    });

    if (!address.city && address.sublocality) {
      address.city = address.sublocality;
    }

    return address;
  };

  const fillAddressFromLocation = async (lat, lng) => {
    try {
      if (!GOOGLE_API_KEY) {
        throw new Error("Google API key not configured");
      }

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
      );

      if (response.data.status !== "OK") {
        throw new Error(response.data.error_message || "Location data not found");
      }

      const firstResult = response.data.results[0];
      const address = parseAddressComponents(firstResult.address_components);

      form.setFieldsValue({
        homeAddress: firstResult.formatted_address,
        area: address.sublocality,
        city: address.city,
        state: address.state,
        country: address.country,
        pincode: address.pincode,
      });

      message.success("स्थान सफलतापूर्वक प्राप्त किया गया!");
    } catch (error) {
      console.error("Geocoding error:", error);
      message.error(error.message || "पता प्राप्त करने में असमर्थ। कृपया पुन: प्रयास करें।");
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      message.error("इस ब्राउज़र द्वारा जियोलोकेशन समर्थित नहीं है।");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          await fillAddressFromLocation(latitude, longitude);
        } catch (error) {
          console.error("Location error:", error);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setLoading(false);
        console.error("Geolocation error:", error);
        message.error(
          error.code === error.PERMISSION_DENIED
            ? "स्थान एक्सेस अस्वीकृत। कृपया ब्राउज़र सेटिंग्स की जाँच करें।"
            : "स्थान प्राप्त करने में असमर्थ। कृपया पुन: प्रयास करें।"
        );
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  const checkAndProceed = async () => {
    try {
      // Validate all fields in the form
      const values = await form.validateFields();
    
      
      // All validations passed, update form data and proceed to next step
      console.log("Form Values:", values);
      
      // If onFormUpdate function is provided, update the parent component's state
      if (onFormUpdate) {
        onFormUpdate(values);
      }
      
      // If nextStep function is provided, call it to move to the next step
      if (nextStep) {
        nextStep();
      } else {
        // If no nextStep function, just show success message
        messageApi.success('फॉर्म सफलतापूर्वक जमा किया गया!');
      }
    } catch (errorInfo) {
      // Form validation failed
      console.log("Validation failed:", errorInfo);
      messageApi.error('कृपया सभी आवश्यक फ़ील्ड भरें!');
      
      // Scroll to the first error field
      const errorField = document.querySelector('.ant-form-item-has-error');
      if (errorField) {
        errorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleSubmit = (values) => {
    console.log("Form Values:", values);
    messageApi.success('फॉर्म सफलतापूर्वक जमा किया गया!');
  };

  const requiredField = (message) => [
    { required: true, message },
  ];

  const pincodeValidation = [
    { required: true, message: 'कृपया पिन कोड दर्ज करें!' },
    { pattern: /^[0-9]{6}$/, message: 'कृपया 6 अंकों का वैध पिन कोड दर्ज करें!' },
  ];

  return (
    <div className="relative w-full flex-col flex justify-center">
      {contextHolder}
      <div className="w-full px-5 md:px-20 pb-6">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="w-full"
          style={{ minWidth: "70vw" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            {/* Family Information Fields */}
            <Form.Item 
              rules={requiredField('कृपया अपना परिवार का नाम दर्ज करें!')} 
              label={<span className="font-Karma text-base">परिवार का नाम</span>} 
              name="familyName"
            >
              <Input className="!py-2" placeholder="परिवार का नाम भरे" />
            </Form.Item>

            <Form.Item
              label={<span className="font-Karma text-base">मुख्य सदस्य का संपर्क नं</span>}
              name="mainMemberContact"
              rules={requiredField('कृपया मुख्य सदस्य का संपर्क दर्ज करें!')}
            >
              <Input className="!py-2" placeholder="फ़ोन नंबर भरे" />
            </Form.Item>

            <Form.Item label={<span className="font-Karma text-base">समाज</span>} name="society">
              <Input placeholder="समाज का नाम भरे" className="!py-2" />
            </Form.Item>

            <Form.Item 
              rules={requiredField('कृपया मूलवतन दर्ज करें!')} 
              label={<span className="font-Karma text-base">मूलवतन</span>} 
              name="hometown"
            >
              <Input className="!py-2" placeholder="मूलवतन भरे" />
            </Form.Item>

            {/* Location Button */}
            <div className="xs:col-span-1 sm:col-span-2 mb-4">
              <Button
                type="default"
                icon={<CiLocationOn size={26} />}
                loading={loading}
                onClick={handleGetLocation}
                className="w-full border-blue-400 bg-blue-50 !py-5 !rounded-sm flex justify-center items-center"
              >
                स्थान प्राप्त करें
              </Button>
            </div>

            {/* Address Fields */}
            <Form.Item 
              rules={requiredField('कृपया घर का पता दर्ज करें!')} 
              label={<span className="font-Karma text-base">घर का पता</span>} 
              name="homeAddress"
            >
              <Input className="!py-2" placeholder="घर का पता भरे" />
            </Form.Item>

            <Form.Item label={<span className="font-Karma text-base">एरिया</span>} name="area">
              <Input className="!py-2" placeholder="एरिया भरे" />
            </Form.Item>
            
            <Form.Item label={<span className="font-Karma text-base">लैंडमार्क</span>} name="landmark">
              <Input className="!py-2" placeholder="लैंडमार्क भरे" />
            </Form.Item>

            <Form.Item 
              rules={requiredField('कृपया शहर दर्ज करें!')} 
              label={<span className="font-Karma text-base">शहर</span>} 
              name="city"
            >
              <Input className="!py-2" placeholder="शहर चुनें" />
            </Form.Item>

            <Form.Item 
              rules={requiredField('कृपया राज्य दर्ज करें!')} 
              label={<span className="font-Karma text-base">राज्य</span>} 
              name="state"
            >
              <Select placeholder="राज्य भरे" className="w-full">
                {states.map((state) => (
                  <Option key={state.value} value={state.value}>
                    {state.label} / {state.value}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item 
              rules={requiredField('कृपया देश दर्ज करें!')} 
              label={<span className="font-Karma text-base">देश</span>} 
              name="country"
            >
              <Select placeholder="देश चुनें" className="w-full">
                <Option value="India">India</Option>
                {/* Add more countries as needed */}
              </Select>
            </Form.Item>

            <Form.Item 
              rules={pincodeValidation} 
              label={<span className="font-Karma text-base">पिनकोड</span>} 
              name="pincode"
            >
              <Input className="!py-2" placeholder="पिनकोड भरे" />
            </Form.Item>
          
          </div>
           <div className="flex mt-8 justify-between items-center">
            <button
              onClick={prevStep}
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
        </Form>
      </div>
    </div>
  );
};

export default FamilyDetailsForm;
