// "use client";
// import React, { useState, useEffect } from "react";
// import { Radio, Input, Button, Select, Form, message } from "antd";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import { IoIosAddCircleOutline } from "react-icons/io";

// const { Option } = Select;

// const DikshitDetailsForm = ({ formData, updateFormData, nextStep, prevStep, handleRegister }) => {
//   const [form] = Form.useForm();
//   const [messageApi, contextHolder] = message.useMessage();
//   const [isDikshit, setIsDikshit] = useState(formData?.isDikshit ?? null);

//   // Initialize form with formData on component mount
//   useEffect(() => {
//     if (formData) {
//       // Set the initial form values properly
//       const initialValues = {
//         isDikshit: formData.isDikshit,
//         dikshitDetails: formData.dikshitDetails || [
//           {
//             dikshitName: "",
//             worldlyName: "",
//             guruName: "",
//             relationship: "",
//             community: "",
//           }
//         ]
//       };
      
//       form.setFieldsValue(initialValues);
      
//       if (formData.isDikshit !== undefined) {
//         setIsDikshit(formData.isDikshit);
//       }
//     }
//   }, [formData, form]);

//   // Update form when isDikshit changes
//   useEffect(() => {
//     form.setFieldsValue({ isDikshit });
    
//     // If switching to "Yes" and no dikshit details exist, add default entry
//     if (isDikshit === true) {
//       const currentDetails = form.getFieldValue('dikshitDetails') || [];
//       if (currentDetails.length === 0) {
//         form.setFieldsValue({
//           dikshitDetails: [{
//             dikshitName: "",
//             worldlyName: "",
//             guruName: "",
//             relationship: "",
//             community: "",
//           }]
//         });
//       }
//     }
//   }, [isDikshit, form]);

//   const addMoreDetails = () => {
//     const currentDetails = form.getFieldValue('dikshitDetails') || [];
//     const newDetails = [
//       ...currentDetails,
//       {
//         dikshitName: "",
//         worldlyName: "",
//         guruName: "",
//         relationship: "",
//         community: "",
//       },
//     ];
    
//     form.setFieldsValue({
//       dikshitDetails: newDetails,
//     });
//   };

//   const removeDetail = (index) => {
//     const currentDetails = form.getFieldValue('dikshitDetails') || [];
//     if (currentDetails.length > 1) {
//       const updatedDetails = currentDetails.filter((_, i) => i !== index);
//       form.setFieldsValue({
//         dikshitDetails: updatedDetails,
//       });
//     }
//   };

//   // Function to format data as requested structure
//   const formatDataForSubmission = (formValues) => {
//     const { isDikshit, dikshitDetails } = formValues;
    
//     // Create the requested structure
//     const formattedData = {
//       isDikshit: isDikshit,
//       dikshitDetail: []
//     };

//     // If dikshit details exist, format them with dikshitdetailID always 0
//     if (isDikshit && dikshitDetails && dikshitDetails.length > 0) {
//       formattedData.dikshitDetail = dikshitDetails.map((detail) => ({
//         dikshitdetailID: 0, // Always 0 for every detail
//         dikshitName: detail.dikshitName || "",
//         worldlyName: detail.worldlyName || "",
//         guruName: detail.guruName || "",
//         relationship: detail.relationship || "",
//         community: detail.community || ""
//       }));
//     }

//     return formattedData;
//   };

//   const handleSubmit = async () => {
//     try {
//       // Validate all fields in the form using Ant Design's built-in validation
//       const values = await form.validateFields();
      
//       // Format the data in the requested structure
//       const formattedData = formatDataForSubmission(values);
      
//       // Log the formatted data for debugging
//       console.log("Form data to be sent:", formattedData);
//       console.log("Raw form values:", values);
      
//       // Update parent form data with the formatted structure
//       updateFormData(formattedData);
      
//       // Show success message
//       messageApi.success("फॉर्म सफलतापूर्वक जमा किया गया!");
      
//       // Call handleRegister with the formatted data
//       handleRegister(formattedData);
//     } catch (errorInfo) {
//       // Form validation failed
//       console.log("Validation failed:", errorInfo);
//       messageApi.error('कृपया सभी आवश्यक फ़ील्ड भरें!');
      
//       // Scroll to the first error field
//       const errorField = document.querySelector('.ant-form-item-has-error');
//       if (errorField) {
//         errorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       }
//     }
//   };

//   // Add this function to save form values before going to previous step
//   const handlePrevStep = () => {
//     // Save current form values without validation
//     const currentValues = form.getFieldsValue();
    
//     // Format data and send to parent
//     const formattedData = formatDataForSubmission(currentValues);
//     updateFormData(formattedData);
    
//     // Now navigate to previous step
//     prevStep();
//   };

//   const relationshipOptions = [
//     "पिता",
//     "माता",
//     "भाई",
//     "बहन",
//     "पुत्र",
//     "पुत्री",
//     "दादा",
//     "दादी",
//     "नाना",
//     "नानी",
//     "चाचा",
//     "चाची",
//     "मामा",
//     "मामी",
//     "अन्य",
//   ];

//   return (
//     <div className="relative w-full  flex-col flex items-center text-gray-700 justify-center">
//       {contextHolder}
//       <div className="w-full px-5 md:px-20 pb-6">
//       <Form
//         form={form}
//         layout="vertical"
//         style={{ width: "100%" }}
//       >
//         <div className="grid grid-cols-1 lg:grid-cols-1 gap-x-4">
//         <Form.Item
//           name="isDikshit"
//           label={
//             <span className="font-semibold font-Karma text-base">
//               ➱ परिवार में दीक्षा हुई है?
//             </span>
//           }
//           rules={[
//             {
//               required: true,
//               message: "कृपया बताएं कि क्या परिवार में दीक्षा हुई है!",
//             },
//           ]}
//         >
//           <Radio.Group
//             onChange={(e) => setIsDikshit(e.target.value)}
//             value={isDikshit}
//             className="flex gap-8"
//           >
//             <Radio value={true} className="">
//               हाँ
//             </Radio>
//             <Radio value={false} className="">
//               ना
//             </Radio>
//           </Radio.Group>
//         </Form.Item>

//         {/* Conditional rendering based on isDikshit */}
//         {isDikshit && (
//           <Form.List name="dikshitDetails">
//             {(fields, { add, remove }) => (
//               <div className="space-y-8">
//                 {fields.map((field, index) => (
//                   <div
//                     key={field.key}
//                     className="border border-gray-200 rounded-lg p-6 transition-all duration-300 hover:shadow-md relative animate-fade-in"
//                   >
//                     {fields.length > 1 && (
//                       <button
//                         onClick={() => removeDetail(index)}
//                         className="absolute right-3 top-3 bg-red-50 hover:bg-red-100 text-red-500 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200"
//                         aria-label="Remove detail"
//                         type="button"
//                       >
//                         ✕
//                       </button>
//                     )}

//                     <h3 className="font-semibold font-Teko text-lg mb-8 text-gray-700 border-l-4 border-gray-800 pl-3 transition-all duration-300 hover:border-gray-600">
//                       दीक्षित विवरण - {index + 1}
//                     </h3>

//                     {/* Two fields in one row on larger screens */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <Form.Item
//                         label={
//                           <span className="font-medium font-Karma">
//                             दीक्षित पूज्यश्री का नाम
//                             <span className="text-red-500 ml-1">*</span>
//                           </span>
//                         }
//                         name={[field.name, "dikshitName"]}
//                         rules={[
//                           {
//                             required: true,
//                             message: "दीक्षित पूज्यश्री का नाम आवश्यक है",
//                           },
//                         ]}
//                       >
//                         <Input
//                           placeholder="दीक्षित पूज्यश्री का नाम दर्ज करें"
//                           className="border-gray-300 !py-2 transition-all duration-200 focus:border-gray-500 hover:border-gray-400"
//                         />
//                       </Form.Item>

//                       <Form.Item
//                         label={<span className="font-medium font-Karma">दीक्षित पूज्यश्री का संसारी नाम</span>}
//                         name={[field.name, "worldlyName"]}
//                       >
//                         <Input
//                           placeholder="संसारी नाम दर्ज करें"
//                           className="border-gray-300 !py-2 transition-all duration-200 focus:border-gray-500 hover:border-gray-400"
//                         />
//                       </Form.Item>
//                     </div>

//                     {/* Two more fields in one row */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <Form.Item
//                         label={
//                           <span className="font-medium font-Karma">
//                             उनके साथ आपका संसारी रिश्ता
//                             <span className="text-red-500 ml-1">*</span>
//                           </span>
//                         }
//                         name={[field.name, "relationship"]}
//                         rules={[
//                           {
//                             required: true,
//                             message: "उनके साथ आपका संसारी रिश्ता आवश्यक है",
//                           },
//                         ]}
//                       >
//                         <Select
//                           placeholder="रिश्ता चुनें"
//                           className="w-full transition-all duration-200"
//                         >
//                           {relationshipOptions.map((option) => (
//                             <Option key={option} value={option}>
//                               {option}
//                             </Option>
//                           ))}
//                         </Select>
//                       </Form.Item>

//                       <Form.Item
//                         label={
//                           <span className="font-medium font-Karma">
//                             गुरुवर्य का नाम
//                             <span className="text-red-500 ml-1">*</span>
//                           </span>
//                         }
//                         name={[field.name, "guruName"]}
//                         rules={[
//                           {
//                             required: true,
//                             message: "गुरुवर्य का नाम आवश्यक है",
//                           },
//                         ]}
//                       >
//                         <Input
//                           placeholder="गुरुजी का नाम दर्ज करें"
//                           className="border-gray-300 !py-2 transition-all duration-200 focus:border-gray-500 hover:border-gray-400"
//                         />
//                       </Form.Item>
//                     </div>

//                     <Form.Item
//                       label={<span className="font-medium font-Karma">समुदाय</span>}
//                       name={[field.name, "community"]}
//                     >
//                       <Input
//                         placeholder="समुदाय दर्ज करें"
//                         className="border-gray-300 !py-2 transition-all duration-200 focus:border-gray-500 hover:border-gray-400"
//                       />
//                     </Form.Item>
//                   </div>
//                 ))}

//                 <div className="flex justify-end">
//                   <button
//                     onClick={addMoreDetails}
//                     type="button"
//                     className="w-12 h-12 text-blue-400 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110 transform"
//                   >
//                     <IoIosAddCircleOutline size={40} />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </Form.List>
//         )}

//         <div className="flex mt-8 justify-between items-center">
//           <button
//             onClick={handlePrevStep}
//             type="button"
//             className="flex items-center px-4 py-2 rounded-sm bg-blue-50 border-blue-200 border-2 text-gray-800 font-medium hover:bg-blue-100 shadow-md hover:shadow-lg transition-all duration-300"
//           >
//             <FaArrowLeft className="mr-2" /> Previous 
//           </button>
//           <button
//             onClick={handleSubmit}
//             type="button"
//             className="flex items-center px-4 py-2 rounded-sm bg-green-600 text-gray-100 font-medium hover:bg-green-700 shadow-md hover:shadow-lg transition-all duration-300"
//           >
//              Register <FaArrowRight className="ml-2" />
//           </button>
//         </div>
//         </div>
//       </Form>
//       </div>
//     </div>
//   );
// };

// export default DikshitDetailsForm;



"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Radio, Input, Button, Select, Form, message } from "antd";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";

const { Option } = Select;

const DikshitDetailsForm = ({ formData, updateFormData, nextStep, prevStep, handleRegister }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [isDikshit, setIsDikshit] = useState(null);
  const [dikshitDetails, setDikshitDetails] = useState([
    {
      id: 1,
      dikshitName: "",
      worldlyName: "",
      guruName: "",
      relationship: "",
      community: "",
    },
  ]);

  // Debug function to log current state
  const debugState = useCallback(() => {
    console.log("=== DEBUG STATE ===");
    console.log("formData:", formData);
    console.log("isDikshit:", isDikshit);
    console.log("dikshitDetails:", dikshitDetails);
    console.log("==================");
  }, [formData, isDikshit, dikshitDetails]);

  // Function to restore state from formData
  const restoreFromFormData = useCallback(() => {
    if (!formData) {
      console.log("No formData to restore from");
      return;
    }

    console.log("Restoring from formData:", formData);

    // Restore isDikshit
    if (formData.isDikshit !== undefined && formData.isDikshit !== null) {
      console.log("Restoring isDikshit:", formData.isDikshit);
      setIsDikshit(formData.isDikshit);
    }

    // Restore dikshitDetails - handle multiple possible formats
    let detailsToRestore = [];
    
    if (formData.dikshitDetails && Array.isArray(formData.dikshitDetails)) {
      detailsToRestore = formData.dikshitDetails;
      console.log("Found dikshitDetails array:", detailsToRestore);
    } else if (formData.dikshitDetail && Array.isArray(formData.dikshitDetail)) {
      // Convert from API format
      detailsToRestore = formData.dikshitDetail.map((detail, index) => ({
        id: detail.id || index + 1,
        dikshitName: detail.dikshitName || "",
        worldlyName: detail.worldlyName || "",
        guruName: detail.guruName || "",
        relationship: detail.relationship || "",
        community: detail.community || "",
      }));
      console.log("Converted dikshitDetail to dikshitDetails:", detailsToRestore);
    }

    if (detailsToRestore.length > 0) {
      console.log("Setting dikshitDetails to:", detailsToRestore);
      setDikshitDetails(detailsToRestore);
    }
  }, [formData]);

  // Function to save current state to parent
  const saveToParent = useCallback(() => {
    const currentState = {
      isDikshit,
      dikshitDetails,
    };

    const formattedData = {
      isDikshit: currentState.isDikshit,
      dikshitDetail: currentState.isDikshit && currentState.dikshitDetails 
        ? currentState.dikshitDetails.map((detail) => ({
            dikshitdetailID: 0,
            dikshitName: detail.dikshitName || "",
            worldlyName: detail.worldlyName || "",
            guruName: detail.guruName || "",
            relationship: detail.relationship || "",
            community: detail.community || ""
          }))
        : [],
      // Also keep the original format for compatibility
      dikshitDetails: currentState.dikshitDetails,
    };

    console.log("Saving to parent:", formattedData);
    updateFormData(formattedData);
  }, [isDikshit, dikshitDetails, updateFormData]);

  // Initialize form when component mounts or formData changes
  useEffect(() => {
    console.log("Form component mounted/formData changed");
    restoreFromFormData();
  }, [restoreFromFormData]);

  // Update form fields when state changes
  useEffect(() => {
    console.log("Updating form fields with state:", { isDikshit, dikshitDetails });
    form.setFieldsValue({
      isDikshit,
      dikshitDetails,
    });
  }, [isDikshit, dikshitDetails, form]);

  // Auto-save to parent when state changes (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isDikshit !== null) { // Only save if isDikshit has been set
        saveToParent();
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [isDikshit, dikshitDetails, saveToParent]);

  const handleRadioChange = (e) => {
    const value = e.target.value;
    console.log("Radio changed to:", value);
    setIsDikshit(value);
    
    // If user selects "No", clear dikshit details
    if (value === false) {
      setDikshitDetails([{
        id: 1,
        dikshitName: "",
        worldlyName: "",
        guruName: "",
        relationship: "",
        community: "",
      }]);
    }
  };

  const handleInputChange = (id, name, value) => {
    console.log(`Input changed: id=${id}, name=${name}, value=${value}`);
    const updatedDetails = dikshitDetails.map((detail) =>
      detail.id === id ? { ...detail, [name]: value } : detail
    );
    setDikshitDetails(updatedDetails);
  };

  const handleSelectChange = (id, name, value) => {
    console.log(`Select changed: id=${id}, name=${name}, value=${value}`);
    handleInputChange(id, name, value);
  };

  const addMoreDetails = () => {
    console.log("Adding more details");
    const newId = dikshitDetails.length > 0
      ? Math.max(...dikshitDetails.map((d) => d.id)) + 1
      : 1;

    const newDetails = [
      ...dikshitDetails,
      {
        id: newId,
        dikshitName: "",
        worldlyName: "",
        guruName: "",
        relationship: "",
        community: "",
      },
    ];
    
    setDikshitDetails(newDetails);
  };

  const removeDetail = (id) => {
    if (dikshitDetails.length > 1) {
      console.log("Removing detail with id:", id);
      const updatedDetails = dikshitDetails.filter((detail) => detail.id !== id);
      setDikshitDetails(updatedDetails);
    }
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitting form...");
      debugState();
      
      // Validate form
      await form.validateFields();
      
      // Save current state before submitting
      saveToParent();
      
      // Format data for submission
      const formattedData = {
        isDikshit,
        dikshitDetail: isDikshit && dikshitDetails 
          ? dikshitDetails.map((detail) => ({
              dikshitdetailID: 0,
              dikshitName: detail.dikshitName || "",
              worldlyName: detail.worldlyName || "",
              guruName: detail.guruName || "",
              relationship: detail.relationship || "",
              community: detail.community || ""
            }))
          : []
      };
      
      console.log("Final submission data:", formattedData);
      
      messageApi.success("फॉर्म सफलतापूर्वक जमा किया गया!");
      handleRegister(formattedData);
      
    } catch (errorInfo) {
      console.log("Validation failed:", errorInfo);
      messageApi.error('कृपया सभी आवश्यक फ़ील्ड भरें!');
      
      const errorField = document.querySelector('.ant-form-item-has-error');
      if (errorField) {
        errorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handlePrevStep = () => {
    console.log("Going to previous step");
    debugState();
    
    // Save current state before navigation
    saveToParent();
    
    // Navigate to previous step
    prevStep();
  };

  const relationshipOptions = [
    "पिता",
    "माता",
    "भाई",
    "बहन",
    "पुत्र",
    "पुत्री",
    "दादा",
    "दादी",
    "नाना",
    "नानी",
    "चाचा",
    "चाची",
    "मामा",
    "मामी",
    "अन्य",
  ];

  return (
    <div className="relative w-full flex-col flex items-center text-gray-700 justify-center">
      {contextHolder}
      <div className="w-full px-5 md:px-20 pb-6">
        {/* Debug info - remove in production */}
        <div className="mb-4 p-2 bg-gray-100 rounded text-xs">
          <strong>Debug Info:</strong> isDikshit: {String(isDikshit)}, Details Count: {dikshitDetails.length}
          <button 
            onClick={debugState} 
            className="ml-2 px-2 py-1 bg-blue-500 text-white rounded text-xs"
            type="button"
          >
            Log State
          </button>
        </div>

        <Form
          form={form}
          layout="vertical"
          style={{ width: "100%" }}
          preserve={false}
        >
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-x-4">
            <Form.Item
              name="isDikshit"
              label={
                <span className="font-semibold font-Karma text-base">
                  ➱ परिवार में दीक्षा हुई है?
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "कृपया बताएं कि क्या परिवार में दीक्षा हुई है!",
                },
              ]}
            >
              <Radio.Group
                onChange={handleRadioChange}
                value={isDikshit}
                className="flex gap-8"
              >
                <Radio value={true}>हाँ</Radio>
                <Radio value={false}>ना</Radio>
              </Radio.Group>
            </Form.Item>

            {isDikshit === true && (
              <div className="space-y-8">
                {dikshitDetails.map((detail, index) => (
                  <div
                    key={detail.id}
                    className="border border-gray-200 rounded-lg p-6 transition-all duration-300 hover:shadow-md relative animate-fade-in"
                  >
                    {dikshitDetails.length > 1 && (
                      <button
                        onClick={() => removeDetail(detail.id)}
                        className="absolute right-3 top-3 bg-red-50 hover:bg-red-100 text-red-500 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200"
                        aria-label="Remove detail"
                        type="button"
                      >
                        ✕
                      </button>
                    )}

                    <h3 className="font-semibold font-Teko text-lg mb-8 text-gray-700 border-l-4 border-gray-800 pl-3 transition-all duration-300 hover:border-gray-600">
                      दीक्षित विवरण - {index + 1}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Form.Item
                        label={
                          <span className="font-medium font-Karma">
                            दीक्षित पूज्यश्री का नाम
                            <span className="text-red-500 ml-1">*</span>
                          </span>
                        }
                        name={[index, "dikshitName"]}
                        rules={[
                          {
                            required: true,
                            message: "दीक्षित पूज्यश्री का नाम आवश्यक है",
                          },
                        ]}
                      >
                        <Input
                          value={detail.dikshitName}
                          onChange={(e) =>
                            handleInputChange(
                              detail.id,
                              "dikshitName",
                              e.target.value
                            )
                          }
                          placeholder="दीक्षित पूज्यश्री का नाम दर्ज करें"
                          className="border-gray-300 !py-2 transition-all duration-200 focus:border-gray-500 hover:border-gray-400"
                        />
                      </Form.Item>

                      <Form.Item
                        label={<span className="font-medium font-Karma">दीक्षित पूज्यश्री का संसारी नाम</span>}
                        name={[index, "worldlyName"]}
                      >
                        <Input
                          value={detail.worldlyName}
                          onChange={(e) =>
                            handleInputChange(
                              detail.id,
                              "worldlyName",
                              e.target.value
                            )
                          }
                          placeholder="संसारी नाम दर्ज करें"
                          className="border-gray-300 !py-2 transition-all duration-200 focus:border-gray-500 hover:border-gray-400"
                        />
                      </Form.Item>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Form.Item
                        label={
                          <span className="font-medium font-Karma">
                            उनके साथ आपका संसारी रिश्ता
                            <span className="text-red-500 ml-1">*</span>
                          </span>
                        }
                        name={[index, "relationship"]}
                        rules={[
                          {
                            required: true,
                            message: "उनके साथ आपका संसारी रिश्ता आवश्यक है",
                          },
                        ]}
                      >
                        <Select
                          placeholder="रिश्ता चुनें"
                          value={detail.relationship || undefined}
                          onChange={(value) =>
                            handleSelectChange(detail.id, "relationship", value)
                          }
                          className="w-full transition-all duration-200"
                        >
                          {relationshipOptions.map((option) => (
                            <Option key={option} value={option}>
                              {option}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>

                      <Form.Item
                        label={
                          <span className="font-medium font-Karma">
                            गुरुवर्य का नाम
                            <span className="text-red-500 ml-1">*</span>
                          </span>
                        }
                        name={[index, "guruName"]}
                        rules={[
                          {
                            required: true,
                            message: "गुरुवर्य का नाम आवश्यक है",
                          },
                        ]}
                      >
                        <Input
                          value={detail.guruName}
                          onChange={(e) =>
                            handleInputChange(detail.id, "guruName", e.target.value)
                          }
                          placeholder="गुरुजी का नाम दर्ज करें"
                          className="border-gray-300 !py-2 transition-all duration-200 focus:border-gray-500 hover:border-gray-400"
                        />
                      </Form.Item>
                    </div>

                    <Form.Item
                      label={<span className="font-medium font-Karma">समुदाय</span>}
                      name={[index, "community"]}
                    >
                      <Input
                        value={detail.community}
                        onChange={(e) =>
                          handleInputChange(
                            detail.id,
                            "community",
                            e.target.value
                          )
                        }
                        placeholder="समुदाय दर्ज करें"
                        className="border-gray-300 !py-2 transition-all duration-200 focus:border-gray-500 hover:border-gray-400"
                      />
                    </Form.Item>
                  </div>
                ))}

                <div className="flex justify-end">
                  <button
                    onClick={addMoreDetails}
                    type="button"
                    className="w-12 h-12 text-blue-400 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110 transform"
                  >
                    <IoIosAddCircleOutline size={40} />
                  </button>
                </div>
              </div>
            )}

            <div className="flex mt-8 justify-between items-center">
              <button
                onClick={handlePrevStep}
                type="button"
                className="flex items-center px-4 py-2 rounded-sm bg-blue-50 border-blue-200 border-2 text-gray-800 font-medium hover:bg-blue-100 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <FaArrowLeft className="mr-2" /> Previous 
              </button>
              <button
                onClick={handleSubmit}
                type="button"
                className="flex items-center px-4 py-2 rounded-sm bg-green-600 text-gray-100 font-medium hover:bg-green-700 shadow-md hover:shadow-lg transition-all duration-300"
              >
                 Register <FaArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default DikshitDetailsForm;