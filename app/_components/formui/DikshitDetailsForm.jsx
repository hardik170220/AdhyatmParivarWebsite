"use client";
import React, { useState, useEffect } from "react";
import { Radio, Input, Button, Select, Form, message, InputNumber } from "antd";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";

const { Option } = Select;

// Global counter for unique IDs - persists across component instances
let globalDikshitDetailIdCounter = 1;

// Function to get next unique ID
const getNextUniqueId = () => {
  return globalDikshitDetailIdCounter++;
};

// Function to reset counter (optional, if needed for testing)
const resetIdCounter = () => {
  globalDikshitDetailIdCounter = 1;
};

const DikshitDetailsForm = ({ formData, updateFormData, nextStep, prevStep, handleRegister }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [isDikshit, setIsDikshit] = useState(formData?.isDikshit ?? null);
  const [numberOfDiksharthi, setNumberOfDiksharthi] = useState(formData?.numberOfDiksharthi || null);
  const [isRegistering, setIsRegistering] = useState(false);

  // Initialize form with formData on component mount
  useEffect(() => {
    if (formData) {
      const initialValues = {
        isDikshit: formData.isDikshit,
        numberOfDiksharthi: formData.numberOfDiksharthi,
        dikshitDetails: formData.dikshitDetails || []
      };
      
      form.setFieldsValue(initialValues);
      
      if (formData.isDikshit !== undefined) {
        setIsDikshit(formData.isDikshit);
      }
      if (formData.numberOfDiksharthi !== undefined) {
        setNumberOfDiksharthi(formData.numberOfDiksharthi);
      }
    }
  }, [formData, form]);

  // Update form when isDikshit changes
  useEffect(() => {
    form.setFieldsValue({ isDikshit });
    
    // If switching to "No", clear the number and details
    if (isDikshit === false) {
      setNumberOfDiksharthi(null);
      form.setFieldsValue({
        numberOfDiksharthi: null,
        dikshitDetails: []
      });
    }
  }, [isDikshit, form]);

  // Handle number of diksharthi change
  const handleNumberChange = (value) => {
    setNumberOfDiksharthi(value);
    form.setFieldsValue({ numberOfDiksharthi: value });
    
    if (value && value > 0) {
      // Create exact number of dikshit detail forms with unique IDs
      const newDetails = Array.from({ length: value }, () => ({
        dikshitName: "",
        worldlyName: "",
        guruName: "",
        relationship: "",
        community: "",
        sadhuSadhvi: "",
        uniqueId: getNextUniqueId() // Assign unique ID to each detail
      }));
      
      form.setFieldsValue({
        dikshitDetails: newDetails,
      });
    } else {
      // Clear details if number is 0 or null
      form.setFieldsValue({
        dikshitDetails: [],
      });
    }
  };

  const addMoreDetails = () => {
    const currentDetails = form.getFieldValue('dikshitDetails') || [];
    const newDetails = [
      ...currentDetails,
      {
        dikshitName: "",
        worldlyName: "",
        guruName: "",
        relationship: "",
        community: "",
        sadhuSadhvi: "",
        uniqueId: getNextUniqueId() // Assign unique ID to new detail
      },
    ];
    
    form.setFieldsValue({
      dikshitDetails: newDetails,
    });
    
    // Update the number count
    setNumberOfDiksharthi(newDetails.length);
    form.setFieldsValue({ numberOfDiksharthi: newDetails.length });
  };

  const removeDetail = (index) => {
    const currentDetails = form.getFieldValue('dikshitDetails') || [];
    if (currentDetails.length > 1) {
      const updatedDetails = currentDetails.filter((_, i) => i !== index);
      form.setFieldsValue({
        dikshitDetails: updatedDetails,
      });
      
      // Update the number count
      setNumberOfDiksharthi(updatedDetails.length);
      form.setFieldsValue({ numberOfDiksharthi: updatedDetails.length });
    }
  };

  // Function to format data as requested structure
  const formatDataForSubmission = (formValues) => {
    const { isDikshit, numberOfDiksharthi, dikshitDetails } = formValues;
    
    console.log("Formatting data - dikshitDetails:", dikshitDetails); // Debug log
    
    // Create the requested structure
    const formattedData = {
      IsDikshaInFamily: isDikshit,
      dikshitCount: numberOfDiksharthi || 0,
      dikshitDetail: []
    };

    // If dikshit details exist, format them with unique IDs
    if (isDikshit && dikshitDetails && Array.isArray(dikshitDetails) && dikshitDetails.length > 0) {
      formattedData.dikshitDetail = dikshitDetails
        .filter(detail => detail && Object.keys(detail).length > 0) // Filter out empty objects
        .map((detail) => ({
          dikshitdetailID: detail.uniqueId || getNextUniqueId(), // Use the unique ID assigned to each detail
          dikshitName: detail.dikshitName || "",
          sansariName: detail.worldlyName || "",
          gurusName: detail.guruName || "",
          sansariRelation: detail.relationship || "",
          samudayName: detail.community || "",
          sadhuOrSadhvi: detail.sadhuSadhvi || ""
        }));
    }

    return formattedData;
  };

  const handleSubmit = async () => {
    try {
      // Validate all fields in the form using Ant Design's built-in validation
      const values = await form.validateFields();
      
      // Set loading state
      setIsRegistering(true);
      
      // Get fresh values from form to ensure we have latest data
      const freshValues = form.getFieldsValue();
      console.log("Fresh form values:", freshValues); // Debug log
      
      // Format the data in the requested structure using fresh values
      const formattedData = formatDataForSubmission(freshValues);
      
      // Log the formatted data for debugging
      console.log("Complete form data:", formattedData);
      console.log("Raw form values:", values);
      console.log("Current global ID counter:", globalDikshitDetailIdCounter); // Debug log for ID tracking
      
      // Update parent form data with the formatted structure
      updateFormData(formattedData);
      
      // Show success message
      // messageApi.success("फॉर्म सफलतापूर्वक जमा किया गया!");
      
      try {
        // Call handleRegister with the formatted data
        await handleRegister(formattedData);
        console.log(formattedData, "dikshit step data");
              // Proceed to next step
      } catch (registerError) {
        console.error("Registration failed:", registerError);
        messageApi.error('पंजीकरण में त्रुटि हुई है। कृपया दोबारा कोशिश करें।');
      } finally {
        // Always reset loading state
        setIsRegistering(false);
      }
    } catch (errorInfo) {
      // Form validation failed
      console.log("Validation failed:", errorInfo);
      messageApi.error('कृपया सभी आवश्यक फ़ील्ड भरें!');
      
      // Reset loading state if validation fails
      setIsRegistering(false);
      
      // Scroll to the first error field
      const errorField = document.querySelector('.ant-form-item-has-error');
      if (errorField) {
        errorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Add this function to save form values before going to previous step
  const handlePrevStep = () => {
    // Save current form values without validation
    const currentValues = form.getFieldsValue();
    
    // Format data and send to parent
    const formattedData = formatDataForSubmission(currentValues);
    updateFormData(formattedData);
    
    // Now navigate to previous step
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
    <div className="relative w-full  flex-col flex items-center  justify-center">
      {contextHolder}
      <div className="w-full px-5 md:px-20 pb-6">
      <Form
        form={form}
        layout="vertical"
        style={{ width: "100%" }}
        onValuesChange={(changedValues, allValues) => {
          // Debug log to track form changes
          console.log("Form values changed:", allValues);
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-x-4">
        <Form.Item
          name="isDikshit"
          label={
            <span className="font-Karma text-base">
              परिवार में दीक्षा हुई है?
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
            onChange={(e) => setIsDikshit(e.target.value)}
            value={isDikshit}
            className="flex gap-8"
          >
            <Radio value={true} className="">
              हाँ
            </Radio>
            <Radio value={false} className="">
              ना
            </Radio>
          </Radio.Group>
        </Form.Item>

        {/* Number of Diksharthi counter - appears when Yes is selected */}
        {isDikshit === true && (
          <Form.Item
            name="numberOfDiksharthi"
            label={
              <span className="font-Karma text-base">
                 कितने दीक्षित हैं?
              </span>
            }
            rules={[
              {
                required: true,
                message: "कृपया दीक्षितो की संख्या दर्ज करें!",
              },
              {
                type: 'number',
                min: 1,
                max: 20,
                message: "संख्या 1 से 20 के बीच होनी चाहिए!"
              }
            ]}
          >
            <div className="flex items-center border border-gray-300 rounded-md w-32 transition-all duration-200 hover:border-gray-400 focus-within:border-gray-500">
              <button
                type="button"
                onClick={() => {
                  const currentValue = numberOfDiksharthi || 0;
                  if (currentValue > 1) {
                    handleNumberChange(currentValue - 1);
                  }
                }}
                className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-all duration-200 rounded-l-md"
                disabled={!numberOfDiksharthi || numberOfDiksharthi <= 1}
              >
                <span className="text-base font-semibold">−</span>
              </button>
              
              <div className="flex-1 text-center py-0 text-gray-700 font-medium text-lg">
                {numberOfDiksharthi || 0}
              </div>
              
              <button
                type="button"
                onClick={() => {
                  const currentValue = numberOfDiksharthi || 0;
                  if (currentValue < 20) {
                    handleNumberChange(currentValue + 1);
                  }
                }}
                className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-all duration-200 rounded-r-md"
                disabled={numberOfDiksharthi >= 20}
              >
                <span className="text-base font-semibold">+</span>
              </button>
            </div>
          </Form.Item>
        )}

        {/* Conditional rendering based on isDikshit and numberOfDiksharthi */}
        {isDikshit === true && numberOfDiksharthi > 0 && (
          <Form.List name="dikshitDetails">
            {(fields, { add, remove }) => (
              <div className="space-y-8">
                {fields.map((field, index) => (
                  <div
                    key={field.key}
                    className="border border-gray-200 rounded-lg p-6 transition-all duration-300 hover:shadow-md relative animate-fade-in"
                  >
                    {/* Keep the original remove functionality for all forms */}
                    {fields.length > 1 && (
                      <button
                        onClick={() => removeDetail(index)}
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

                    {/* Hidden field to store unique ID */}
                    <Form.Item
                      name={[field.name, "uniqueId"]}
                      style={{ display: 'none' }}
                    >
                      <Input type="hidden" />
                    </Form.Item>

                    {/* Two fields in one row on larger screens */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Form.Item
                        label={
                          <span className="font-medium font-Karma">
                            दीक्षित पूज्यश्री का नाम
                           
                          </span>
                        }
                        name={[field.name, "dikshitName"]}
                        rules={[
                          {
                            required: true,
                            message: "दीक्षित पूज्यश्री का नाम आवश्यक है",
                          },
                        ]}
                      >
                        <Input
                          placeholder="दीक्षित पूज्यश्री का नाम दर्ज करें"
                          className="border-gray-300 !py-2 transition-all duration-200 focus:border-gray-500 hover:border-gray-400"
                        />
                      </Form.Item>

                      <Form.Item
                        label={<span className="font-medium font-Karma">दीक्षित पूज्यश्री का संसारी नाम</span>}
                        name={[field.name, "worldlyName"]}
                      >
                        <Input
                          placeholder="संसारी नाम दर्ज करें"
                          className="border-gray-300 !py-2 transition-all duration-200 focus:border-gray-500 hover:border-gray-400"
                        />
                      </Form.Item>
                    </div>

                    {/* Two more fields in one row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Form.Item
                        label={
                          <span className="font-medium font-Karma">
                            उनके साथ आपका संसारी रिश्ता
                           
                          </span>
                        }
                        name={[field.name, "relationship"]}
                        rules={[
                          {
                            required: true,
                            message: "उनके साथ आपका संसारी रिश्ता आवश्यक है",
                          },
                        ]}
                      >
                        <Select
                          placeholder="रिश्ता चुनें"
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
                           साधु/साध्वीजी
                           
                          </span>
                        }
                        name={[field.name, "sadhuSadhvi"]}
                        rules={[
                          {
                            required: true,
                            message: "साधु/साध्वीजी चुनें",
                          },
                        ]}
                      >
                        <Select
                          placeholder="साधु/साध्वीजी चुनें"
                          className="w-full transition-all duration-200"
                        >
                            <Option key="sadhuji" value="पूज्य साधु भगवंत">पूज्य साधु भगवंत</Option>
                            <Option key="sadhviji" value="पूज्य साध्वीजी भगवंत">पूज्य साध्वीजी भगवंत</Option>
                        </Select>
                      </Form.Item>
                    </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <Form.Item
                        label={
                          <span className="font-medium font-Karma">
                            गुरुवर्य का नाम
                           
                          </span>
                        }
                        name={[field.name, "guruName"]}
                        rules={[
                          {
                            required: true,
                            message: "गुरुवर्य का नाम आवश्यक है",
                          },
                        ]}
                      >
                        <Input
                          placeholder="गुरुवर्य का नाम दर्ज करें"
                          className="border-gray-300 !py-2 transition-all duration-200 focus:border-gray-500 hover:border-gray-400"
                        />
                      </Form.Item>
                    

                    <Form.Item
                      label={<span className="font-medium font-Karma">समुदाय</span>}
                      name={[field.name, "community"]}
                    >
                      <Input
                        placeholder="समुदाय दर्ज करें"
                        className="border-gray-300 !py-2 transition-all duration-200 focus:border-gray-500 hover:border-gray-400"
                      />
                    </Form.Item>
                     </div>
                  </div>
                ))}
                

                {/* Keep the original add more functionality */}
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
          </Form.List>
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
            disabled={isRegistering}
            className={`flex items-center px-4 py-2 rounded-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 min-w-[120px] justify-center ${
              isRegistering 
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                : 'bg-green-600 text-gray-100 hover:bg-green-700'
            }`}
          >
            {isRegistering ? (
              <>
                <svg 
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  ></circle>
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                Register <FaArrowRight className="ml-2" />
              </>
            )}
          </button>
        </div>
        </div>
      </Form>
      </div>
    </div>
  );
};

// Export the reset function if needed for testing or admin purposes
export { resetIdCounter };

export default DikshitDetailsForm;


// "use client";
// import React, { useState, useEffect } from "react";
// import { Radio, Input, Button, Select, Form, message, InputNumber } from "antd";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import { IoIosAddCircleOutline } from "react-icons/io";

// const { Option } = Select;

// const DikshitDetailsForm = ({ formData, updateFormData, nextStep, prevStep, handleRegister }) => {
//   const [form] = Form.useForm();
//   const [messageApi, contextHolder] = message.useMessage();
//   const [isDikshit, setIsDikshit] = useState(formData?.isDikshit ?? null);
//   const [numberOfDiksharthi, setNumberOfDiksharthi] = useState(formData?.numberOfDiksharthi || null);

//   // Initialize form with formData on component mount
//   useEffect(() => {
//     if (formData) {
//       const initialValues = {
//         isDikshit: formData.isDikshit,
//         numberOfDiksharthi: formData.numberOfDiksharthi,
//         dikshitDetails: formData.dikshitDetails || []
//       };
      
//       form.setFieldsValue(initialValues);
      
//       if (formData.isDikshit !== undefined) {
//         setIsDikshit(formData.isDikshit);
//       }
//       if (formData.numberOfDiksharthi !== undefined) {
//         setNumberOfDiksharthi(formData.numberOfDiksharthi);
//       }
//     }
//   }, [formData, form]);

//   // Update form when isDikshit changes
//   useEffect(() => {
//     form.setFieldsValue({ isDikshit });
    
//     // If switching to "No", clear the number and details
//     if (isDikshit === false) {
//       setNumberOfDiksharthi(null);
//       form.setFieldsValue({
//         numberOfDiksharthi: null,
//         dikshitDetails: []
//       });
//     }
//   }, [isDikshit, form]);

//   // Handle number of diksharthi change
//   const handleNumberChange = (value) => {
//     setNumberOfDiksharthi(value);
//     form.setFieldsValue({ numberOfDiksharthi: value });
    
//     if (value && value > 0) {
//       // Create exact number of dikshit detail forms
//       const newDetails = Array.from({ length: value }, () => ({
//         dikshitName: "",
//         worldlyName: "",
//         guruName: "",
//         relationship: "",
//         community: "",
//         sadhuSadhvi: "",
//       }));
      
//       form.setFieldsValue({
//         dikshitDetails: newDetails,
//       });
//     } else {
//       // Clear details if number is 0 or null
//       form.setFieldsValue({
//         dikshitDetails: [],
//       });
//     }
//   };

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
//         sadhuSadhvi: "",
//       },
//     ];
    
//     form.setFieldsValue({
//       dikshitDetails: newDetails,
//     });
    
//     // Update the number count
//     setNumberOfDiksharthi(newDetails.length);
//     form.setFieldsValue({ numberOfDiksharthi: newDetails.length });
//   };

//   const removeDetail = (index) => {
//     const currentDetails = form.getFieldValue('dikshitDetails') || [];
//     if (currentDetails.length > 1) {
//       const updatedDetails = currentDetails.filter((_, i) => i !== index);
//       form.setFieldsValue({
//         dikshitDetails: updatedDetails,
//       });
      
//       // Update the number count
//       setNumberOfDiksharthi(updatedDetails.length);
//       form.setFieldsValue({ numberOfDiksharthi: updatedDetails.length });
//     }
//   };

//   // Function to format data as requested structure
//   const formatDataForSubmission = (formValues) => {
//     const { isDikshit, numberOfDiksharthi, dikshitDetails } = formValues;
    
//     console.log("Formatting data - dikshitDetails:", dikshitDetails); // Debug log
    
//     // Create the requested structure
//     const formattedData = {
//       IsDikshaInFamily: isDikshit,
//       dikshitCount: numberOfDiksharthi || 0,
//       dikshitDetail: []
//     };

//     // If dikshit details exist, format them with dikshitdetailID always 0
//     if (isDikshit && dikshitDetails && Array.isArray(dikshitDetails) && dikshitDetails.length > 0) {
//       formattedData.dikshitDetail = dikshitDetails
//         .filter(detail => detail && Object.keys(detail).length > 0) // Filter out empty objects
//         .map((detail) => ({
//           dikshitdetailID: 0, // Always 0 for every detail
//           dikshitName: detail.dikshitName || "",
//           sansariName: detail.worldlyName || "",
//           gurusName: detail.guruName || "",
//           sansariRelation: detail.relationship || "",
//           samudayName: detail.community || "",
//           sadhuOrSadhvi: detail.sadhuSadhvi || ""
//         }));
//     }

//     return formattedData;
//   };

//   const handleSubmit = async () => {
//     try {
//       // Validate all fields in the form using Ant Design's built-in validation
//       const values = await form.validateFields();
      
//       // Get fresh values from form to ensure we have latest data
//       const freshValues = form.getFieldsValue();
//       console.log("Fresh form values:", freshValues); // Debug log
      
//       // Format the data in the requested structure using fresh values
//       const formattedData = formatDataForSubmission(freshValues);
      
//       // Log the formatted data for debugging
//       console.log("Complete form data:", formattedData);
//       console.log("Raw form values:", values);
      
//       // Update parent form data with the formatted structure
//       updateFormData(formattedData);
      
//       // Show success message
//       // messageApi.success("फॉर्म सफलतापूर्वक जमा किया गया!");
      
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
//     <div className="relative w-full  flex-col flex items-center  justify-center">
//       {contextHolder}
//       <div className="w-full px-5 md:px-20 pb-6">
//       <Form
//         form={form}
//         layout="vertical"
//         style={{ width: "100%" }}
//         onValuesChange={(changedValues, allValues) => {
//           // Debug log to track form changes
//           console.log("Form values changed:", allValues);
//         }}
//       >
//         <div className="grid grid-cols-1 lg:grid-cols-1 gap-x-4">
//         <Form.Item
//           name="isDikshit"
//           label={
//             <span className="font-Karma text-base">
//               परिवार में दीक्षा हुई है?
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

//         {/* Number of Diksharthi counter - appears when Yes is selected */}
//         {isDikshit === true && (
//           <Form.Item
//             name="numberOfDiksharthi"
//             label={
//               <span className="font-Karma text-base">
//                  कितने दीक्षित हैं?
//               </span>
//             }
//             rules={[
//               {
//                 required: true,
//                 message: "कृपया दीक्षितो की संख्या दर्ज करें!",
//               },
//               {
//                 type: 'number',
//                 min: 1,
//                 max: 20,
//                 message: "संख्या 1 से 20 के बीच होनी चाहिए!"
//               }
//             ]}
//           >
//             <div className="flex items-center border border-gray-300 rounded-md w-32 transition-all duration-200 hover:border-gray-400 focus-within:border-gray-500">
//               <button
//                 type="button"
//                 onClick={() => {
//                   const currentValue = numberOfDiksharthi || 0;
//                   if (currentValue > 1) {
//                     handleNumberChange(currentValue - 1);
//                   }
//                 }}
//                 className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-all duration-200 rounded-l-md"
//                 disabled={!numberOfDiksharthi || numberOfDiksharthi <= 1}
//               >
//                 <span className="text-base font-semibold">−</span>
//               </button>
              
//               <div className="flex-1 text-center py-0 text-gray-700 font-medium text-lg">
//                 {numberOfDiksharthi || 0}
//               </div>
              
//               <button
//                 type="button"
//                 onClick={() => {
//                   const currentValue = numberOfDiksharthi || 0;
//                   if (currentValue < 20) {
//                     handleNumberChange(currentValue + 1);
//                   }
//                 }}
//                 className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-all duration-200 rounded-r-md"
//                 disabled={numberOfDiksharthi >= 20}
//               >
//                 <span className="text-base font-semibold">+</span>
//               </button>
//             </div>
//           </Form.Item>
//         )}

//         {/* Conditional rendering based on isDikshit and numberOfDiksharthi */}
//         {isDikshit === true && numberOfDiksharthi > 0 && (
//           <Form.List name="dikshitDetails">
//             {(fields, { add, remove }) => (
//               <div className="space-y-8">
//                 {fields.map((field, index) => (
//                   <div
//                     key={field.key}
//                     className="border border-gray-200 rounded-lg p-6 transition-all duration-300 hover:shadow-md relative animate-fade-in"
//                   >
//                     {/* Keep the original remove functionality for all forms */}
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
//                        <Form.Item
//                         label={
//                           <span className="font-medium font-Karma">
//                            साधु/साध्वीजी
                           
//                           </span>
//                         }
//                         name={[field.name, "sadhuSadhvi"]}
//                         rules={[
//                           {
//                             required: true,
//                             message: "साधु/साध्वीजी चुनें",
//                           },
//                         ]}
//                       >
//                         <Select
//                           placeholder="साधु/साध्वीजी चुनें"
//                           className="w-full transition-all duration-200"
//                         >
//                             <Option key="sadhuji" value="पूज्य साधु भगवंत">पूज्य साधु भगवंत</Option>
//                             <Option key="sadhviji" value="पूज्य साध्वीजी भगवंत">पूज्य साध्वीजी भगवंत</Option>
//                         </Select>
//                       </Form.Item>
//                     </div>

//                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                        <Form.Item
//                         label={
//                           <span className="font-medium font-Karma">
//                             गुरुवर्य का नाम
                           
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
//                           placeholder="गुरुवर्य का नाम दर्ज करें"
//                           className="border-gray-300 !py-2 transition-all duration-200 focus:border-gray-500 hover:border-gray-400"
//                         />
//                       </Form.Item>
                    

//                     <Form.Item
//                       label={<span className="font-medium font-Karma">समुदाय</span>}
//                       name={[field.name, "community"]}
//                     >
//                       <Input
//                         placeholder="समुदाय दर्ज करें"
//                         className="border-gray-300 !py-2 transition-all duration-200 focus:border-gray-500 hover:border-gray-400"
//                       />
//                     </Form.Item>
//                      </div>
//                   </div>
//                 ))}
                

//                 {/* Keep the original add more functionality */}
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