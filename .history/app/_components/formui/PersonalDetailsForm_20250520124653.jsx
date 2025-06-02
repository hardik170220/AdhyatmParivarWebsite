"use client";
import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  DatePicker,
  Radio,
  Button,
  Checkbox,
  Select,
  Upload,
  message,
  Tooltip,
} from "antd";
import {
  CloudUploadOutlined,
  UploadOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { MhahPanchang } from "mhah-panchang";
import { FaArrowRight } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import axios from "axios";

const { Dragger } = Upload;
const { Option } = Select;

// You should create a separate states.js file with this data or obtain it from your source
const states = [
  { value: "Andhra Pradesh", label: "आंध्र प्रदेश" },
  { value: "Arunachal Pradesh", label: "अरुणाचल प्रदेश" },
  { value: "Assam", label: "असम" },
  { value: "Bihar", label: "बिहार" },
  { value: "Chhattisgarh", label: "छत्तीसगढ़" },
  { value: "Goa", label: "गोवा" },
  { value: "Gujarat", label: "गुजरात" },
  { value: "Haryana", label: "हरियाणा" },
  { value: "Himachal Pradesh", label: "हिमाचल प्रदेश" },
  { value: "Jharkhand", label: "झारखंड" },
  { value: "Karnataka", label: "कर्नाटक" },
  { value: "Kerala", label: "केरल" },
  { value: "Madhya Pradesh", label: "मध्य प्रदेश" },
  { value: "Maharashtra", label: "महाराष्ट्र" },
  { value: "Manipur", label: "मणिपुर" },
  { value: "Meghalaya", label: "मेघालय" },
  { value: "Mizoram", label: "मिजोरम" },
  { value: "Nagaland", label: "नागालैंड" },
  { value: "Odisha", label: "ओडिशा" },
  { value: "Punjab", label: "पंजाब" },
  { value: "Rajasthan", label: "राजस्थान" },
  { value: "Sikkim", label: "सिक्किम" },
  { value: "Tamil Nadu", label: "तमिलनाडु" },
  { value: "Telangana", label: "तेलंगाना" },
  { value: "Tripura", label: "त्रिपुरा" },
  { value: "Uttar Pradesh", label: "उत्तर प्रदेश" },
  { value: "Uttarakhand", label: "उत्तराखंड" },
  { value: "West Bengal", label: "पश्चिम बंगाल" },
  { value: "Delhi", label: "दिल्ली" },
];

const PersonalDetailsForm = ({ formData, updateFormData, nextStep }) => {
  const [form] = Form.useForm();
  const [isOtherOrganizationMember, setIsOtherOrganizationMember] = useState(
    formData?.otherOrganizationMember === "yes"
  );
  const [isOtherSanghMember, setIsOtherSanghMember] = useState(
    formData?.otherSanghMember === "yes"
  );
  const [messageApi, contextHolder] = message.useMessage();
  const [hinduDate, setHinduDate] = useState(formData?.birthName || "");
  const [loading, setLoading] = useState(false);
  const GOOGLE_API_KEY = "AIzaSyDkbpb6Cy4mt1xpJDDB-OQ80ilPSK_A3Is";

  // Maps for Hindi translations
  const mapMonth = {
    Chaitra: "चैत्र",
    Vaisakha: "वैशाख",
    Jyestha: "ज्येष्ठ",
    Ashadha: "आषाढ़",
    Asadha: "आषाढ़",
    Shravana: "श्रावण",
    Bhadra: "भाद्रपद",
    Ashwina: "अश्विन्",
    Kartika: "कार्तिक",
    Margashirsha: "अग्रहायण",
    Pausha: "पौष",
    Magha: "माघ",
    Phalguna: "फाल्गुन",
  };

  // Complete mapping of tithi names in Hindi
  const tithiNames = {
    Pratipada: "प्रतिपदा",
    Vidhiya: "द्वितीया",
    Tritiya: "तृतीया",
    Thadiya: "तृतीया",
    Chaviti: "चतुर्थी",
    Chavithi: "चतुर्थी",
    Chaturthi: "चतुर्थी",
    Panchami: "पंचमी",
    Shasti: "षष्ठी",
    Sapthami: "सप्तमी",
    Ashtami: "अष्टमी",
    Navami: "नवमी",
    Dasami: "दशमी",
    Ekadasi: "एकादशी",
    Dvadasi: "द्वादशी",
    Trayodasi: "त्रयोदशी",
    Chaturdasi: "चतुर्दशी",
    Purnima: "पूर्णिमा",
    Amavasya: "अमावस्या",
  };

  // Initialize form with existing data
  useEffect(() => {
    if (formData) {
      form.setFieldsValue(formData);
      setIsOtherOrganizationMember(formData.otherOrganizationMember === "yes");
      setIsOtherSanghMember(formData.otherSanghMember === "yes");
      setHinduDate(formData.birthName || "");
    }
  }, [formData, form]);

  const parseAddressComponents = (components) => {
    let address = {
      city: "",
      state: "",
      country: "",
      pincode: "",
      sublocality: "",
      locality: "",
      formattedAddress: "",
    };

    components.forEach((component) => {
      const types = component.types;
      if (
        types.includes("sublocality_level_1") ||
        types.includes("sublocality")
      ) {
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
        throw new Error(
          response.data.error_message || "Location data not found"
        );
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
      message.error(
        error.message || "पता प्राप्त करने में असमर्थ। कृपया पुन: प्रयास करें।"
      );
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

  const handleDateChange = (date) => {
    if (date) {
      try {
        // Set the selected date value in the form
        form.setFieldsValue({ birthDate: date });

        var obj = new MhahPanchang();
        let mhahCal = obj.calendar(
          date.toDate(),
          12.972, // latitude (default for India)
          77.594 // longitude (default for India)
        );

        // Format the Hindu date and set it to the birthName field
        let formattedDate = formatHinduDate(mhahCal);
        setHinduDate(formattedDate);
        form.setFieldsValue({ birthName: formattedDate });
      } catch (error) {
        console.error("Error calculating Hindu date:", error);
        messageApi.error("तिथि परिवर्तन में त्रुटि!");
      }
    }
  };

  // Function to format the Hindu date in the desired format
  const formatHinduDate = (panchangObj) => {
    if (!panchangObj) return "";

    try {
      // Get the month name in Hindi
      const month_name =
        panchangObj.MoonMasa?.name_en_IN || panchangObj.Masa?.name_en_IN || "";
      const monthHindi = mapMonth[month_name] || month_name;

      // Get Paksha (Krishna/Shukla) in Hindi
      const pakshaEng = panchangObj.Paksha?.name_en_IN || "";
      let pakshaHindi = pakshaEng === "Shukla" ? "सूद" : "वद";

      // Get Tithi in Hindi using direct mapping
      const tithiName = panchangObj.Tithi?.name_en_IN || "";
      const tithiHindi = tithiNames[tithiName] || tithiName;

      // Format: Month + Paksha + Tithi (e.g., "कार्तिक सूद द्वितीया")
      return `${monthHindi} ${pakshaHindi} ${tithiHindi}`;
    } catch (error) {
      console.error("Error formatting Hindu date:", error);
      return "";
    }
  };

  const handleOtherOrganizationChange = (e) => {
    setIsOtherOrganizationMember(e.target.value === "yes");
  };

  const handleOtherSanghChange = (e) => {
    setIsOtherSanghMember(e.target.value === "yes");
  };

  // Configuration for photo upload
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  // Photo upload props
  const photoUploadProps = {
    name: "photo",
    multiple: false,
    maxCount: 1,
    listType: "picture",
    beforeUpload: (file) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        messageApi.error("केवल JPG/PNG फ़ाइलें अपलोड करें!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        messageApi.error("छवि 2MB से कम होनी चाहिए!");
      }
      return false;
    },
  };

  const requiredField = (message) => [{ required: true, message }];

  const phoneValidation = [
    { required: true, message: "कृपया संपर्क नंबर दर्ज करें!" },
    {
      pattern: /^[0-9]{10}$/,
      message: "कृपया 10 अंकों का वैध फोन नंबर दर्ज करें!",
    },
  ];

  const aadhaarValidation = [
    { required: true, message: "कृपया आधार कार्ड नंबर दर्ज करें!" },
    {
      pattern: /^[0-9]{12}$/,
      message: "कृपया 12 अंकों का वैध आधार कार्ड नंबर दर्ज करें!",
    },
  ];

  const pincodeValidation = [
    { required: true, message: "कृपया पिन कोड दर्ज करें!" },
    {
      pattern: /^[0-9]{6}$/,
      message: "कृपया 6 अंकों का वैध पिन कोड दर्ज करें!",
    },
  ];

  const checkAndProceed = async () => {
    try {
      // Validate all fields in the form
      const values = await form.validateFields();

      // Special validation for conditional fields
      if (isOtherOrganizationMember && !values.organizationName) {
        messageApi.error("कृपया संस्था का नाम दर्ज करें!");
        return;
      }

      if (isOtherSanghMember && !values.sanghName) {
        messageApi.error("कृपया संघ का नाम दर्ज करें!");
        return;
      }

      // Update parent component with form data
      updateFormData(values);

      // Proceed to next step
      nextStep();
    } catch (errorInfo) {
      // Form validation failed
      console.log("Validation failed:", errorInfo);
      messageApi.error("कृपया सभी आवश्यक फ़ील्ड भरें!");

      // Scroll to the first error field
      const errorField = document.querySelector(".ant-form-item-has-error");
      if (errorField) {
        errorField.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  return (
    <div className="relative w-full flex-col flex justify-center">
      {contextHolder}
      <div className="w-full px-4 md:px-20 pb-6">
        <Form
          form={form}
          layout="vertical"
          initialValues={formData}
          className="w-full"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            {/* Personal Information Fields */}
            <Form.Item
              className="!font-Karma"
              label={<span className="font-Karma text-base">प्रथम नाम</span>}
              name="name"
              rules={requiredField("कृपया अपना प्रथम नाम दर्ज करें!")}
            >
              <Input className="!py-2" placeholder="आपका प्रथम नाम दर्ज करें" />
            </Form.Item>

            <Form.Item
              label={<span className="font-Karma text-base">मध्यनाम</span>}
              name="middleName"
            >
              <Input className="!py-2" placeholder="आपका मध्यनाम दर्ज करें" />
            </Form.Item>

            <Form.Item
              label={<span className="font-Karma text-base">अटक/सरनेम </span>}
              name="surname"
              rules={requiredField("कृपया अपना अटक/सरनेम  दर्ज करें!")}
            >
              <Input className="!py-2" placeholder="आपका अटक/सरनेम दर्ज करें" />
            </Form.Item>

            <Form.Item
              label={
                <div className="flex items-center">
                  <span className="font-Karma text-base">प्रचलित नाम</span>
                  <Tooltip
                    title="वह नाम जिससे आप आमतौर पर जाने जाते हैं, आपका उपनाम या प्यार से बुलाया जाने वाला नाम। (लोकप्रिय नाम जिससे आप परिवार या दोस्तों में जाने जाते हैं।)"
                    placement="topRight"
                  >
                    <InfoCircleOutlined className="ml-2 -mt-1 text-blue-500" />
                  </Tooltip>
                </div>
              }
              name="nickname"
            >
              <Input
                className="!py-2"
                placeholder="आपका प्रचलित नाम दर्ज करें"
              />
            </Form.Item>

            <Form.Item
              label={<span className="font-Karma text-base">संपर्क नंबर</span>}
              name="contact"
              rules={phoneValidation}
            >
              <Input
                className="!py-2"
                placeholder="आपका संपर्क नंबर दर्ज करें"
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="font-Karma text-base">
                  वैकल्पिक संपर्क नंबर
                </span>
              }
              name="alternatecontact"
              rules={[
                {
                  pattern: /^[0-9]{10}$/,
                  message: "कृपया 10 अंकों का वैध फोन नंबर दर्ज करें!",
                },
              ]}
            >
              <Input
                className="!py-2"
                placeholder="वैकल्पिक संपर्क नंबर दर्ज करें"
              />
            </Form.Item>

            <Form.Item
              label={<span className="font-Karma text-base">ईमेल</span>}
              name="email"
              className="sm:col-span-2"
            >
              <Input
                className="!py-2 sm:col-span-2"
                placeholder="आपका ईमेल पता दर्ज करें"
              />
            </Form.Item>

            <Form.Item
              label={<span className="font-Karma text-base">जन्म तारीख</span>}
              name="birthDate"
              rules={requiredField("कृपया अपनी जन्म तारीख चुनें!")}
            >
              <DatePicker
                className="!py-2 w-full"
                placeholder="जन्म तारीख चुनें"
                onChange={handleDateChange}
              />
            </Form.Item>

            <Form.Item
              label={<span className="font-Karma text-base">जन्म तिथि</span>}
              name="birthName"
            >
              <Input
                className="!py-2"
                placeholder="जन्म तिथि दर्ज करें"
                value={hinduDate}
                readOnly
              />
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

            <Form.Item
              rules={requiredField("कृपया घर का पता दर्ज करें!")}
              label={<span className="font-Karma text-base">घर का पता</span>}
              name="homeAddress"
            >
              <Input className="!py-2" placeholder="घर का पता भरे" />
            </Form.Item>

            <Form.Item
              label={<span className="font-Karma text-base">एरिया</span>}
              name="area"
            >
              <Input className="!py-2" placeholder="एरिया भरे" />
            </Form.Item>

            <Form.Item
              label={<span className="font-Karma text-base">लैंडमार्क</span>}
              name="landmark"
            >
              <Input className="!py-2" placeholder="लैंडमार्क भरे" />
            </Form.Item>

            <Form.Item
              rules={requiredField("कृपया शहर दर्ज करें!")}
              label={<span className="font-Karma text-base">शहर</span>}
              name="city"
            >
              <Input className="!py-2" placeholder="शहर चुनें" />
            </Form.Item>

            <Form.Item
              rules={requiredField("कृपया राज्य दर्ज करें!")}
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
              rules={requiredField("कृपया देश दर्ज करें!")}
              label={<span className="font-Karma text-base">देश</span>}
              name="country"
              initialValue="India"
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
              className="sm:col-span-2"
            >
              <Input className="!py-2 sm:col-span-2" placeholder="पिनकोड भरे" />
            </Form.Item>

            {/* Continue with the rest of the personal form fields */}
            <Form.Item
              label={
                <span className="font-Karma text-base">व्यवहारिक अभ्यास</span>
              }
              name="practicalPractice"
              rules={requiredField("कृपया व्यवहारिक अभ्यास दर्ज करें!")}
            >
              <Input
                className="!py-2"
                placeholder="व्यवहारिक अभ्यास दर्ज करें"
              />
            </Form.Item>

            <Form.Item
              label={<span className="font-Karma text-base">जॉब/बिजनेस</span>}
              name="job"
              rules={requiredField("कृपया अपना व्यवसाय चुनें!")}
            >
              <Select className="w-full" placeholder="अपना व्यवसाय चुनें">
                <Select.Option value="job1">जॉब</Select.Option>
                <Select.Option value="job2">बिजनेस</Select.Option>
                <Select.Option value="job3">अन्य</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={
                <span className="font-Karma text-base">धार्मिक अभ्यास</span>
              }
              name="religiousPractice"
              className="sm:col-span-2"
            >
              <Input className="!py-2" placeholder="धार्मिक अभ्यास दर्ज करें" />
            </Form.Item>

            <Form.Item
              rules={requiredField("कृपया अपना परिवार का नाम दर्ज करें!")}
              label={
                <span className="font-Karma text-base">परिवार का नाम</span>
              }
              name="familyName"
            >
              <Input className="!py-2" placeholder="परिवार का नाम भरे" />
            </Form.Item>

            <Form.Item
              label={<span className="font-Karma text-base">समाज</span>}
              name="society"
            >
              <Input placeholder="समाज का नाम भरे" className="!py-2" />
            </Form.Item>

            <Form.Item
              rules={requiredField("कृपया मूलवतन दर्ज करें!")}
              label={<span className="font-Karma text-base">मूलवतन</span>}
              name="hometown"
            >
              <Input className="!py-2" placeholder="मूलवतन भरे" />
            </Form.Item>

            {/* Yes/No Questions section */}
            <Form.Item
              label={
                <span className="font-Karma text-base">
                  क्या आप अन्य किसी संस्था के सदस्य हो?
                </span>
              }
              name="otherOrganizationMember"
              className="sm:col-span-2"
              rules={requiredField("कृपया एक विकल्प चुनें!")}
            >
              <Radio.Group
                onChange={handleOtherOrganizationChange}
                className="flex flex-wrap"
              >
                <Radio value="yes">हाँ</Radio>
                <Radio value="no">ना</Radio>
              </Radio.Group>
            </Form.Item>

            {isOtherOrganizationMember && (
              <Form.Item
                label={
                  <span className="font-Karma text-base">संस्था का नाम</span>
                }
                name="organizationName"
                className="sm:col-span-2"
                rules={requiredField("कृपया संस्था का नाम दर्ज करें!")}
              >
                <Input
                  className="!py-2"
                  placeholder="संस्था का नाम दर्ज करें"
                />
              </Form.Item>
            )}

            <Form.Item
              label={
                <span className="font-Karma text-base">
                  क्या आप कोई जैन संघ के सदस्य हो?
                </span>
              }
              name="otherSanghMember"
              className="sm:col-span-2"
              rules={requiredField("कृपया एक विकल्प चुनें!")}
            >
              <Radio.Group
                onChange={handleOtherSanghChange}
                className="flex flex-wrap"
              >
                <Radio value="yes">हाँ</Radio>
                <Radio value="no">ना</Radio>
              </Radio.Group>
            </Form.Item>

            {isOtherSanghMember && (
              <Form.Item
                label={<span className="font-Karma text-base">संघ का नाम</span>}
                name="sanghName"
                className="sm:col-span-2"
                rules={requiredField("कृपया संघ का नाम दर्ज करें!")}
              >
                <Input className="!py-2" placeholder="संघ का नाम दर्ज करें" />
              </Form.Item>
            )}

            <Form.Item
              label={
                <span className="font-Karma text-base">
                  क्या आप बिल्डिंग सोसाइटी की कोई कमिटी में हो?
                </span>
              }
              name="buildingSocietyMember"
              className="sm:col-span-2"
              rules={requiredField("कृपया एक विकल्प चुनें!")}
            >
              <Radio.Group className="flex flex-wrap">
                <Radio value="yes">हाँ</Radio>
                <Radio value="no">ना</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label={
                <span className="font-Karma text-base">
                  आपको कौनसी भाषा का ज्ञान है?
                </span>
              }
              name="languages"
              className="sm:col-span-2"
              rules={requiredField("कृपया कम से कम एक भाषा चुनें!")}
            >
              <Checkbox.Group className="flex flex-wrap gap-x-4 gap-y-2">
                <Checkbox value="gujarati">गुजराती</Checkbox>
                <Checkbox value="hindi">हिंदी</Checkbox>
                <Checkbox value="marathi">मराठी</Checkbox>
                <Checkbox value="english">इंग्लिश</Checkbox>
                <Checkbox value="sanskrit">संस्कृत</Checkbox>
                <Checkbox value="prakrit">प्राकृत</Checkbox>
                <Checkbox value="other">अन्य</Checkbox>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item
              label={
                <span className="font-Karma text-base">फोटो अपलोड करें</span>
              }
              name="photo"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              className="sm:col-span-2"
              rules={requiredField("कृपया अपना फोटो अपलोड करें!")}
            >
              <Dragger {...photoUploadProps} className="p-4">
                <p className="ant-upload-drag-icon">
                  <CloudUploadOutlined style={{ color: "#6366f1" }} />
                </p>
                <p className="ant-upload-text font-Karma text-base">
                  फाइल ड्रैग करें या{" "}
                  <a className="text-indigo-600">ब्राउज़ करें</a>
                </p>
                <p className="ant-upload-hint text-xs text-gray-500">
                  समर्थित प्रारूप: JPEG, PNG
                </p>
              </Dragger>
            </Form.Item>

            <Form.Item
              label={
                <span className="font-Karma text-base">आधार कार्ड नंबर</span>
              }
              name="aadhaarNumber"
              rules={aadhaarValidation}
            >
              <Input
                className="!py-2"
                maxLength={12}
                placeholder="12 अंकों का आधार कार्ड नंबर दर्ज करें"
              />
            </Form.Item>
          </div>

          <div className="flex mt-8 justify-end items-center">
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

export default PersonalDetailsForm;
