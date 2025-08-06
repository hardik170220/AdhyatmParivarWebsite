"use client";
import React, { useState, useEffect } from "react";
import { Form, Collapse, Checkbox, Radio, Input, Button, message } from "antd";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const { Panel } = Collapse;
const CheckboxGroup = Checkbox.Group;

// Department configuration - moved outside component to prevent re-creation
const DEPARTMENTS = [
  {
    id: 1,
    name: "जिनप्रतिमा क्षेत्र",
    services: [
      {
        id: 101,
        name: "माहिती एकत्रीकरण",
        description:
          "जिसमे समग्र भारत में कितनी जिनप्रतिमा है उसका रेकॉर्ड स्टेप बाय स्टेप तैयार करना होता है",
      },
      {
        id: 102,
        name: "विधियुक्त नवनिर्माण",
        description: "पाषाण एवं धातु प्रतिमा के निर्माण कार्य का निरीक्षण",
      },
      {
        id: 103,
        name: "सुरक्षा",
        description:
          "अपने क्षेत्र में प्रतिमा सुरक्षा के कार्य का निरीक्षण आदि",
      },
      {
        id: 104,
        name: "शुद्धि",
        description:
          "अपने क्षेत्र में समयांतर से धातु प्रतिमाओं के शुद्धिकरण का कार्य",
      },
      {
        id: 105,
        name: "शोभा",
        description:
          "अपने क्षेत्र में शुद्ध द्रव्यों से अंगरचना के कार्य को वेग देना",
      },
      {
        id: 106,
        name: "शुद्ध द्रव्य प्रसार",
        description:
          "अपने क्षेत्र में परिवार के शुद्ध पूजा द्रव्यों का प्रसार करना",
      },
    ],
  },
  {
    id: 2,
    name: "जिनमंदिर क्षेत्र",
    services: [
      {
        id: 201,
        name: "जीर्णोद्धार",
        description:
          "परिवार द्वारा चल रहे जिनमंदिर सुरक्षा के कार्यो के निरीक्षण के लिए अनुकूलतानुसार प्रवास करना",
      },
      {
        id: 202,
        name: "शिल्पज्ञान",
        description: "समय अनुसार तज्ज्ञ के पास शिल्पज्ञान लेना",
      },
      {
        id: 203,
        name: "शुद्धि-शोभा",
        description: "जिनालय शुद्धि का कार्य, समूह बनाकर करना-करवाना",
      },
      {
        id: 204,
        name: "विधि विधान",
        description: "पूजा-पूजन आदि के विधि-विधान सीखना",
      },
    ],
  },
  {
    id: 3,
    name: "जिनागम क्षेत्र",
    services: [
      {
        id: 301,
        name: "ज्ञानप्राप्ति",
        description: "स्वयं शास्त्रज्ञान लेना",
      },
      {
        id: 302,
        name: "ज्ञान भंडार संभाळ",
        description: "अपने क्षेत्र में ज्ञानभंडार की संभाल रखना",
      },
      {
        id: 304,
        name: "पुस्तक प्रकाशन/प्रसार व्यवस्था",
        description:
          "पुस्तक के मुद्रण कार्य में एवं मुद्रित पुस्तकों के प्रसार में सहयोग देना",
      },
    ],
  },
  {
    id: 4,
    name: "साधु-साध्वी क्षेत्र",
    services: [
      {
        id: 401,
        name: "पारिष्ठापनिका व्यवस्था",
        description: "अपने क्षेत्र के कुंडी-डोम का समय-समय पर निरीक्षण करना",
      },
      {
        id: 402,
        name: "विहार व्यवस्था",
        description:
          "दूरदराज के क्षेत्रो का विचरण करते पूज्यों के विहार में व्यवस्थाएँ देखना",
      },
      {
        id: 403,
        name: "अन्य वेयावच्च/भक्ति",
        description:
          "अपने क्षेत्र में पधारे हुए पूज्यों की चारित्र उपकरण भक्ति आदि करना",
      },
    ],
  },
  {
    id: 5,
    name: "श्रावक-श्राविका क्षेत्र",
    services: [
      {
        id: 501,
        name: "पौषधशाळा निर्माण",
        description: "अपने क्षेत्र में यथासंभव इस कार्य में सहयोग देना",
      },
      {
        id: 502,
        name: "धार्मिक पढ़ाना/धर्मप्रसार",
        description:
          "अपने क्षेत्र में स्वयं संस्कारशाला जैसी प्रवृत्तियों का संचालन आदि करना",
      },
      {
        id: 503,
        name: "पर्युषण आराधना",
        description:
          "तालीम लेकर जहाँ गुरुभगवंत नहीं पहुँच पाते ऐसे क्षेत्रों में आराधना कराने के लिए जाना",
      },
      {
        id: 504,
        name: "साधर्मिक भक्ति",
        description:
          "अपने क्षेत्र में एवं परिवार के सामूहिक आयोजन में इस कार्य में समयदान करना",
      },
    ],
  },
  {
    id: 6,
    name: "अन्य",
    services: [
      {
        id: 601,
        name: "अनुष्ठान आयोजन",
        description: "अपने क्षेत्र में प्रतिमास कुछ शासनलक्षी कार्य करना",
      },
      { id: 602, name: "जीवदया", description: "यथासंभव इस कार्य में समय देना" },
      {
        id: 603,
        name: "अनुकंपा",
        description: "यथासंभव इस कार्य में समय देना",
      },
    ],
  },
];

const ServiceStep = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [isDailyChecked, setIsDailyChecked] = useState(false);
  const [isMonthlyChecked, setIsMonthlyChecked] = useState(false);

  // Initialize form from structured data
  useEffect(() => {
    const initializeForm = () => {
      const formValues = {};

      // Initialize ALL department fields as empty arrays FIRST
      DEPARTMENTS.forEach((dept) => {
        formValues[`dept_${dept.id}`] = [];
      });

      // Always initialize checkbox group fields as arrays
      formValues.holidayTimeAvailability = [];
      formValues.dailyHours = null;
      formValues.monthlyDays = null;
      formValues.workTravelInterest = null;

      // Reset local state
      let dailyChecked = false;
      let monthlyChecked = false;

      // If we have formData, populate it
      if (formData) {
        // Populate selected services
        if (formData.workInterests && Array.isArray(formData.workInterests)) {
          formData.workInterests.forEach((service) => {
            const deptKey = `dept_${service.departmentID}`;
            if (formValues[deptKey]) {
              formValues[deptKey].push(service.serviceID);
            }
          });
        }

        // Set time availability
        const timeAvail = formData.timeAvailability || {};

        if (timeAvail.isAvailableDaily) {
          formValues.dailyHours = timeAvail.dailyHours;
          dailyChecked = true;
        } else if (timeAvail.isAvailableMonthly) {
          formValues.monthlyDays = timeAvail.monthlyDays;
          monthlyChecked = true;
        }

        // Set holiday availability
        if (Array.isArray(timeAvail.holidayTimeAvailability)) {
          formValues.holidayTimeAvailability = [
            ...timeAvail.holidayTimeAvailability,
          ];
        }

        // Set travel interest
        if (formData.travel) {
          formValues.workTravelInterest = formData.travel;
        }
      }

      // Set form values first
      form.setFieldsValue(formValues);

      // Then update state to avoid render phase updates
      setIsDailyChecked(dailyChecked);
      setIsMonthlyChecked(monthlyChecked);
    };

    initializeForm();
  }, [formData, form]);

  // Convert form data to structured format
  const convertToStructuredData = (formValues) => {
    const workInterests = [];

    DEPARTMENTS.forEach((department) => {
      const selectedServices = formValues[`dept_${department.id}`] || [];
      if (Array.isArray(selectedServices)) {
        selectedServices.forEach((serviceId) => {
          const service = department.services.find((s) => s.id === serviceId);
          if (service) {
            workInterests.push({
              departmentID: department.id,
              departmentName: department.name,
              serviceID: service.id,
              serviceName: service.name,
            });
          }
        });
      }
    });

    // Use state variables instead of form values for time availability
    const holidayTimeAvailabilityArray = Array.isArray(
      formValues.holidayTimeAvailability
    )
      ? formValues.holidayTimeAvailability
      : [];

    return {
      workInterests,
      timeAvailability: {
        isAvailableDaily: isDailyChecked,
        dailyHours: formValues.dailyHours || null,
        isAvailableMonthly: isMonthlyChecked,
        monthlyDays: formValues.monthlyDays || null,
        holidayTimeAvailability: holidayTimeAvailabilityArray,
      },
      travel: formValues.workTravelInterest || null,
    };
  };

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      const structuredData = convertToStructuredData(values);
      updateFormData(structuredData);
      console.log(structuredData, "service step data");
      // Proceed to next step
      nextStep();
    } catch (errorInfo) {
      messageApi.error("कृपया सभी आवश्यक फ़ील्ड भरें!");
      document.querySelector(".ant-form-item-has-error")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleTimeAvailabilityChange = (type, checked) => {
    if (type === "daily") {
      setIsDailyChecked(checked);
      if (checked) {
        setIsMonthlyChecked(false);
        // Don't use form fields for timeAvailability - manage it manually
        form.setFieldsValue({
          monthlyDays: null,
        });
      } else {
        form.setFieldsValue({
          dailyHours: null,
        });
      }
    } else if (type === "monthly") {
      setIsMonthlyChecked(checked);
      if (checked) {
        setIsDailyChecked(false);
        // Don't use form fields for timeAvailability - manage it manually
        form.setFieldsValue({
          dailyHours: null,
        });
      } else {
        form.setFieldsValue({
          monthlyDays: null,
        });
      }
    }
  };

  const validateServiceSelection = () => {
    const values = form.getFieldsValue();
    const hasSelectedService = DEPARTMENTS.some((dept) => {
      const deptServices = values[`dept_${dept.id}`];
      return Array.isArray(deptServices) && deptServices.length > 0;
    });
    return hasSelectedService
      ? Promise.resolve()
      : Promise.reject(new Error("कृपया कम से कम एक सेवा का चयन करें"));
  };

  // FIXED: Safe navigation handler
  const handlePrevious = () => {
    try {
      const values = form.getFieldsValue();
      const structuredData = convertToStructuredData(values);
      updateFormData(structuredData);
      prevStep();
    } catch (error) {
      console.error("Error during previous step navigation:", error);
      // Even if there's an error, still navigate back
      prevStep();
    }
  };

  return (
    <div className="relative w-full flex-col font-Karma flex justify-center">
      {contextHolder}
      <div className="w-full px-5 md:px-20 pb-6">
        <p className="text-base py-5">
          <span className="text-red-500 text-lg">*</span> शासन सेवा-सुरक्षादि
          कार्यो में आपकी रूचि काबिलियत किस विषय में है :
        </p>

        <Form
          form={form}
          layout="vertical"
          preserve={false}
          key={formData ? "with-data" : "without-data"}
          validateMessages={{
            required: "${label} आवश्यक है",
            types: { number: "${label} एक वैध संख्या नहीं है" },
            number: { min: "${label} ${min} से बड़ा होना चाहिए" },
          }}
        >
          {/* Service Selection */}
          <Form.Item
            name="serviceSelection"
            rules={[{ validator: validateServiceSelection }]}
          >
            <Collapse defaultActiveKey={DEPARTMENTS.map((dept) => dept.id)}>
              {DEPARTMENTS.map((department) => (
                <Panel
                  header={`${department.id}. ${department.name}`}
                  key={department.id}
                >
                  <Form.Item
                    name={`dept_${department.id}`}
                    noStyle
                    initialValue={[]}
                  >
                    <CheckboxGroup
                      onChange={() =>
                        form
                          .validateFields(["serviceSelection"])
                          .catch(() => {})
                      }
                    >
                      <div className="flex flex-col space-y-3">
                        {department.services.map((service) => (
                          <div key={service.id} className="flex flex-col">
                            <Checkbox value={service.id} className="mb-1">
                              <span className="font-medium">
                                {service.name}
                              </span>
                            </Checkbox>
                            <div className="ml-6 text-sm text-gray-500 italic">
                              {service.description}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CheckboxGroup>
                  </Form.Item>
                </Panel>
              ))}
            </Collapse>
          </Form.Item>

          {/* Time Availability */}
          <div className="border-b pb-4">
            <p className="text-base font-Karma pt-8 pb-2">
              आप महीने में कितना समय दे सकते हो?
            </p>

            {/* FIXED: Hidden form item removed - using direct checkbox management */}

            {/* Daily/Monthly Options */}
            <div className="space-y-4">
              <div className="flex items-center">
                <Checkbox
                  checked={isDailyChecked}
                  onChange={(e) =>
                    handleTimeAvailabilityChange("daily", e.target.checked)
                  }
                >
                  हर रोज़
                </Checkbox>
                {isDailyChecked && (
                  <div className="ml-6 flex items-center">
                    <span className="mr-2">कितने घंटे</span>
                    <Form.Item name="dailyHours" noStyle>
                      <Input
                        type="number"
                        style={{ width: "100px" }}
                        placeholder="घंटे"
                      />
                    </Form.Item>
                  </div>
                )}
              </div>

              <div className="flex items-center">
                <Checkbox
                  checked={isMonthlyChecked}
                  onChange={(e) =>
                    handleTimeAvailabilityChange("monthly", e.target.checked)
                  }
                >
                  महीने में
                </Checkbox>
                {isMonthlyChecked && (
                  <div className="ml-6 flex items-center">
                    <span className="mr-2">कितने दिन</span>
                    <Form.Item name="monthlyDays" noStyle>
                      <Input
                        type="number"
                        style={{ width: "100px" }}
                        placeholder="दिन"
                      />
                    </Form.Item>
                  </div>
                )}
              </div>
            </div>

            {/* Holiday Availability - FIXED: Proper initialization */}
            <Form.Item
              label={
                <span className="font-Karma text-base mt-4">
                  छुट्टी के दिनों में अन्य कोई समय दे सकते हो ?
                </span>
              }
              name="holidayTimeAvailability"
              className="mt-6"
              initialValue={[]}
            >
              <CheckboxGroup>
                <div className="flex flex-col space-y-2">
                  <Checkbox value="diwali">दीपावली की छुट्टियाँ</Checkbox>
                  <Checkbox value="summer">ग्रीष्मकालीन छुट्टियाँ</Checkbox>
                </div>
              </CheckboxGroup>
            </Form.Item>

            {/* Travel Interest */}
            <Form.Item
              label={
                <span className="font-Karma mt-4 text-base">
                  शासन कार्य के लिए प्रवास करने की आपकी रूचि/अनुकूलता है?
                </span>
              }
              name="workTravelInterest"
              rules={[{ required: true, message: "कृपया एक विकल्प चुनें" }]}
            >
              <Radio.Group>
                <Radio value="yes">हाँ</Radio>
                <Radio value="no">ना</Radio>
              </Radio.Group>
            </Form.Item>
          </div>

          {/* Navigation */}
          <div className="flex mt-8 justify-between items-center">
            <button
              onClick={handlePrevious}
              type="button"
              className="flex items-center px-4 py-2 rounded-sm bg-blue-50 border-blue-200 border-2 text-gray-800 font-medium hover:bg-blue-100 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <FaArrowLeft className="mr-2" /> Previous
            </button>
            <button
              onClick={handleSubmit}
              type="button"
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

export default ServiceStep;
