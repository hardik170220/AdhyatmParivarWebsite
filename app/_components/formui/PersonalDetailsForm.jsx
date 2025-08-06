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
import { FaArrowRight } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
  type: "service_account",
  project_id: "adhyatm-parivar-main",
  storageBucket: "gs://adhyatm-parivar-main.appspot.com",
  private_key_id: "2ac2410ec9ad2f402aafe3c3ef0ef7b2b5d308ce",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDdSLgBGdfjbeie\n8LJEwKvvdCzoc+1lOvG2yoNMLkIkYACwXgBiZnXXzhQzmuwmucYHisslVQ2GOlnm\n7BtYYr2ywxANMV7RXwaC+motUbO1lneVMyIrM7k1dTyvZX9mfiX12S9QQ5ckL+9\ndQYEl1Cj7DfYPIu5tSVjLhU65taiTcEOT7FC7CCHrNjuKXdUQvC86k8RE1Xy0Ewh\nxfp+bV3BiZqgScuNFeSaibgqwJUJ/MSEJM4DesgCcCFiU/QCmjqcS1k9QKRYQnBr\nFNGVskHdJgj4MbfeDBYqzZNNJanv83LPxMHnyZCpDnXEJywj3cbfy5EU0OI8ScWS\niDXorPvTAgMBAAECggEAZsIJnI1FOTpFT2WjyxST4z8WSZ3n7F3qeEFjpmFG2sBw\nIXaNhCRjbeMnc21qY3NaeA8mVgBApwf6zoNyeODWmNNirYA0ApIaVrgYef0wVAWr\nNvk2//MLoq1/1XdfqyQwkkZ2ZAJNaoPXXmH0+PXRf0XHCxXWptbtdTilqDQhEL3g\ngG0L2HQQ6vptruu9os0IuT85Jzl6x9DWpYqCWcEf8M0KYLJQKw1aT98Beu0vBsZE\n9cX7ITHfjHKfYwFqHdaHXx7EiWhqAekN59hKh1qqWzKDlo0kUpyI6X61lAulzUce\nDEmdU9AbvZejl45ZUteINxK274/+Jdosaly40W9rwQKBgQD30vFUeXM/Pcx8Gwhj\nIlUKJnMprenjhQgBfctQHWEX/7N8+3vTyXIad/MX8i4l4ELEHj7QCf4Hy4wgX+tw\nEeZntkxqgpqXmJx5/0EuB2+tMuzPZ90KOS/VNxDq5+PxNCWnKZpi3+wBD0Dr33q2\nrDNIbMYgPtq5I40mA+sZI+ivQQKBgQDklaBq+1z7wpUkoHpx+CBVV+UScttvojZH\nt+0oOb58sfWVMKYbA9JP5bwgeMgvmHLJEbWmf7seMlJUf94Sv8lk4je/pIWX+Tjj\nd1Hb14iSyk6ieIYDs+stD+trFHSX2S7Gwzw6fID41JxVFi6ExnkWPB4+KkLHCZ49\n6sFXJSN6EwKBgCNNsYNPKdPAgfjMAQ3ePi8L+yvc0ozOzq0ntmbbSJGao38SdDlf\nYRnULJUkst5CbEBz7o7EXaPOo0+ZWnjElAYCOjCSGmOuIdxfOHHOLWKG9qU1Lo/e\nRaoiBg7wqdAalaKSkqOzMnOUMLNpSpnrPgL7O94sFgx5vAnGVR9ntiYBAoGAHpTm\nIWn/xq8BxSSzPQw1RzW7L/yt3wGUwYOZ9wfCtGwarxsTHgok2QujX7TJE5URxlTY\nOK5eGmwhF60DyP5fs1+QldMtDGgLdGNCUGdFnl3yp0n4pAYuMJkwpeLWtnoYB/+W\nzzxZBPFs+PU+xATJrm/cm/SLepWO1jnSJBaT6IECgYEAnLZbGRvR4VkskhWhyT6p\nyg1R6UQCEwpWvSIMTEQ7/eSG3uO+Jhvp2gTLSwVZuwYRvitEh9WzQnqusO0NxDsV\nAiQD88TZKg8B/mEr9xy96I7EsKzHH6rLNFRjmralHlfZ2ZcdHLWMUnzjBVHddsyE\nj6coUkrGZGrEBHVeTd9HZFo=\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-q6nrx@adhyatm-parivar-main.iam.gserviceaccount.com",
  client_id: "101764921044907033245",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-q6nrx%40adhyatm-parivar-main.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const { Dragger } = Upload;
const { Option } = Select;
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
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [isOtherSanghMember, setIsOtherSanghMember] = useState(
    formData?.otherSanghMember === "yes"
  );
  const [isDesignatedSansthaMember, setIsDesignatedSansthaMember] =
    useState(false);
  const [isDesignatedSanghMember, setIsDesignatedSanghMember] = useState(false);

  // Fixed: Initialize state properly from formData
  const [isFamilyInGovtService, setIsFamilyInGovtService] = useState(
    formData?.familyInGovtService === "yes"
  );

  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const GOOGLE_API_KEY = "AIzaSyDkbpb6Cy4mt1xpJDDB-OQ80ilPSK_A3Is";

  useEffect(() => {
    if (formData) {
      form.setFieldsValue(formData);
      console.log(formData, "formData1");

      // Fixed: Properly initialize all states from formData
      setIsOtherOrganizationMember(formData.otherOrganizationMember === "yes");
      setIsOtherSanghMember(formData.otherSanghMember === "yes");
      setIsFamilyInGovtService(formData.familyInGovtService === "yes");
      setIsDesignatedSansthaMember(formData.designatedSansthaMember === "yes");
      setIsDesignatedSanghMember(formData.designatedSanghMember === "yes");

      // Fixed: Initialize languages properly
      if (formData.languages) {
        // Handle both array and nested object structure
        let languages = [];
        if (Array.isArray(formData.languages)) {
          languages = formData.languages;
        } else if (
          formData.languages?.languages &&
          Array.isArray(formData.languages.languages)
        ) {
          languages = formData.languages.languages;
        }
        setSelectedLanguages(languages);
      }
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
      message.error(error.message || "please try again");
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      message.error("Geolocation is not supported!");
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
            ? "PERMISSION_DENIED"
            : "error finding the place"
        );
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  const handleOtherOrganizationChange = (e) => {
    setIsOtherOrganizationMember(e.target.value === "yes");
  };

  const handleOtherSanghChange = (e) => {
    setIsOtherSanghMember(e.target.value === "yes");
  };

  // Fixed: Proper handler function
  const handleFamilyGovtChange = (e) => {
    const value = e.target.value === "yes";
    setIsFamilyInGovtService(value);

    // If "no" is selected, clear the related fields
    if (!value) {
      form.setFieldsValue({
        govtMemberName: undefined,
        govtMemberDesignation: undefined,
      });
    }
  };

  const onCheckboxChange = (checkedValues) => {
    setSelectedLanguages(checkedValues);
  };

  const handleDesignatedSansthaMemberChange = (e) => {
    const value = e.target.value === "yes";
    setIsDesignatedSansthaMember(value);

    // If "no" is selected, clear the designation name
    if (!value) {
      form.setFieldsValue({
        sansthaDesignationName: undefined,
      });
    }
  };

  const handleDesignatedSanghMemberChange = (e) => {
    const value = e.target.value === "yes";
    setIsDesignatedSanghMember(value);

    // If "no" is selected, clear the designation name
    if (!value) {
      form.setFieldsValue({
        sanghDesignationName: undefined,
      });
    }
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
        message.error("You can only upload JPG/PNG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must be smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    onChange: (info) => {
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
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

      let imageUrl = null;
      if (values.photo && values.photo.length > 0) {
        const file = values.photo[0].originFileObj;
        const storageRef = ref(
          storage,
          `apmemebershipform/${values.name}_${file.name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, file);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => {
              message.error("Image upload failed.");
              reject(error);
            },
            async () => {
              imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      }
      // Special validation for conditional fields
      if (isOtherOrganizationMember && !values.organizationName) {
        messageApi.error("कृपया संस्था का नाम दर्ज करें!");
        return;
      }

      if (isOtherSanghMember && !values.sanghName) {
        messageApi.error("कृपया संघ का नाम दर्ज करें!");
        return;
      }

      // Format languages
      let finalLanguages = [...(values.languages || [])];
      if (finalLanguages.includes("other")) {
        const index = finalLanguages.indexOf("other");
        finalLanguages[index] = values.otherLanguage?.trim();
      }

      // Get photo URL from uploaded file
      const photoURL = imageUrl;

      const structuredData = {
        // Personal Information
        personalInfo: {
          firstName: values.name,
          middleName: values.middleName,
          lastName: values.surname,
          nickName: values.nickname,
          phone1: values.contact,
          phone2: values.alternatecontact,
          email: values.email,
          janmaTithi: values.birthTithi,
          birthDate: values.birthDate,
          maritialStatus: values.maritialStatus,
          familyName: values.familyName,
          samaaj: values.samaj,
          nativePlace: values.hometown,
          religiousEducation: values.religiousPractice,
          education: values.practicalPractice,
          occupation: values.job,
          aadhaar: values.aadhaarNumber,
          photo: photoURL,
        },

        // Address Information
        address: {
          street: values.homeAddress,
          area: values.area,
          landmark: values.landmark,
          city: values.city,
          state: values.state,
          country: values.country,
          pincode: values.pincode,
        },

        // Language Information
        languages: {
          languages: finalLanguages,
          otherLanguages: values.otherLanguage || null,
        },

        // Organization Membership
        sansthaMember: {
          isSansthaMember: values.otherOrganizationMember === "yes",
          sansthaDetails:
            values.otherOrganizationMember === "yes"
              ? {
                  sansthaName: values.organizationName,
                  sansthaAddress: values.sansthaAddress,
                  sansthaIsDesignation:
                    values.designatedSansthaMember === "yes",
                  sansthaDesignationTitle:
                    values.designatedSansthaMember === "yes"
                      ? values.sansthaDesignationName
                      : null,
                }
              : null,
        },

        // Sangh Membership
        sanghMember: {
          isSanghMember: values.otherSanghMember === "yes",
          sanghDetails:
            values.otherSanghMember === "yes"
              ? {
                  sanghName: values.sanghName,
                  sanghAddress: values.sanghAddress,
                  sanghIsDesignation: values.designatedSanghMember === "yes",
                  sanghDesignationTitle:
                    values.designatedSanghMember === "yes"
                      ? values.sanghDesignationName
                      : null,
                }
              : null,
        },

        governmentOfficial: {
          isGovernmentOfficial: values.familyInGovtService === "yes",
          governmentOfficialDetails:
            values.familyInGovtService === "yes"
              ? {
                  governmentOfficialName: values.govtMemberName,
                  governmentOfficialDesignationTitle:
                    values.govtMemberDesignation,
                }
              : null,
        },

        // Building Society Membership
        isSocietyMember: values.buildingSocietyMember,

        ...values,

        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Save to Firestore (optional - if you want to save immediately)
      // await addDoc(collection(db, "users"), structuredData);

      // Update parent component with structured data
      updateFormData(structuredData);
      console.log(structuredData, "personal step data");
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
              label={<span className="font-Karma text-base">मध्य नाम</span>}
              name="middleName"
            >
              <Input className="!py-2" placeholder="आपका मध्य नाम दर्ज करें" />
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
                    title="वह नाम जिससे आप आमतौर पर जाने जाते हैं, आपका उपनाम"
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
              label={<span className="font-Karma text-base">जन्म तिथि</span>}
              name="birthTithi"
              rules={requiredField("कृपया अपनी जन्म तिथि दर्ज करें!")}
            >
              <Input
                className="!py-2 w-full"
                placeholder="जन्म तिथि दर्ज करें"
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
              label={<span className="font-Karma text-base">शहर/गाँव</span>}
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
              className=""
            >
              <Input className="!py-2 sm:col-span-2" placeholder="पिनकोड भरे" />
            </Form.Item>

            <Form.Item
              rules={requiredField("कृपया मूलवतन दर्ज करें!")}
              label={<span className="font-Karma text-base">मूलवतन</span>}
              name="hometown"
            >
              <Input className="!py-2" placeholder="मूलवतन भरे" />
            </Form.Item>

            {/* Continue with the rest of the personal form fields */}

            <Form.Item
              label={
                <span className="font-Karma text-base">धार्मिक अभ्यास</span>
              }
              name="religiousPractice"
              className=""
            >
              <Input className="!py-2" placeholder="धार्मिक अभ्यास दर्ज करें" />
            </Form.Item>

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
              label={
                <span className="font-Karma text-base">निवृत्त/जॉब/बिजनेस</span>
              }
              name="job"
              rules={requiredField("कृपया अपना व्यवसाय चुनें!")}
            >
              <Select className="w-full" placeholder="अपना व्यवसाय चुनें">
                <Select.Option value="retire">निवृत्त</Select.Option>
                <Select.Option value="job">जॉब</Select.Option>
                <Select.Option value="bussiness">बिजनेस</Select.Option>
                {/* <Select.Option value="other">अन्य</Select.Option> */}
              </Select>
            </Form.Item>

            <Form.Item
              label={
                <span className="font-Karma text-base">वैवाहिक स्थिति</span>
              }
              name="maritialStatus"
              className="sm:col-span-1"
              rules={requiredField("कृपया एक विकल्प चुनें!")}
            >
              <Radio.Group className="flex flex-wrap">
                <Radio value="married">विवाहित</Radio>
                <Radio value="unmarried">अविवाहित</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              rules={requiredField("कृपया अपना परिवार का नाम दर्ज करें!")}
              label={
                <div className="flex items-center">
                  <span className="font-Karma text-base">
                    परिवार का पूरा नाम
                  </span>
                  <Tooltip
                    title="आपके परिवार का संपूर्ण नाम जिससे आपका परिवार पहचाना जाता है।"
                    placement="topRight"
                  >
                    <InfoCircleOutlined className="ml-2 -mt-1 text-blue-500" />
                  </Tooltip>
                </div>
              }
              name="familyName"
            >
              <Input
                className="!py-2"
                placeholder="उदाहरण: रमेशजी मोतीलाल शाह परिवार"
              />
            </Form.Item>

            <Form.Item
              label={<span className="font-Karma text-base">समाज</span>}
              name="samaj"
              rules={requiredField("कृपया समाज का नाम दर्ज करें!")}
            >
              <Input placeholder="समाज का नाम भरे" className="!py-2" />
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
              <div className="border mb-6 bg-gray-50 p-6 border-gray-200">
                {isOtherOrganizationMember && (
                  <Form.Item
                    label={
                      <span className="font-Karma text-base">
                        संस्था का नाम
                      </span>
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

                {isOtherOrganizationMember && (
                  <Form.Item
                    label={
                      <span className="font-Karma text-base">
                        संस्था का पता
                      </span>
                    }
                    name="sansthaAddress"
                    className="sm:col-span-2"
                    rules={requiredField("कृपया संस्था का पता दर्ज करें!")}
                  >
                    <Input
                      className="!py-2"
                      placeholder="संस्था का पता दर्ज करें"
                    />
                  </Form.Item>
                )}

                {isOtherOrganizationMember && (
                  <Form.Item
                    label={
                      <span className="font-Karma text-base">
                        आप संस्था में किसी विशेष पद पर हो ?
                      </span>
                    }
                    name="designatedSansthaMember"
                    className="sm:col-span-2"
                    rules={requiredField("कृपया एक विकल्प चुनें!")}
                  >
                    <Radio.Group
                      onChange={handleDesignatedSansthaMemberChange}
                      className="flex flex-wrap"
                    >
                      <Radio value="yes">हाँ</Radio>
                      <Radio value="no">ना</Radio>
                    </Radio.Group>
                  </Form.Item>
                )}
                {isDesignatedSansthaMember && (
                  <Form.Item
                    label={
                      <span className="font-Karma text-base">पद का नाम</span>
                    }
                    name="sansthaDesignationName"
                    className="sm:col-span-2"
                    rules={requiredField("कृपया पद का नाम दर्ज करें!")}
                  >
                    <Input
                      className="!py-2"
                      placeholder="पद का नाम दर्ज करें"
                    />
                  </Form.Item>
                )}
              </div>
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
              <div className="border bg-gray-50 p-6 mb-6 border-gray-200">
                {isOtherSanghMember && (
                  <Form.Item
                    label={
                      <span className="font-Karma text-base">संघ का नाम</span>
                    }
                    name="sanghName"
                    className="sm:col-span-2"
                    rules={requiredField("कृपया संघ का नाम दर्ज करें!")}
                  >
                    <Input
                      className="!py-2"
                      placeholder="संघ का नाम दर्ज करें"
                    />
                  </Form.Item>
                )}

                {isOtherSanghMember && (
                  <Form.Item
                    label={
                      <span className="font-Karma text-base">संघ का पता</span>
                    }
                    name="sanghAddress"
                    className="sm:col-span-2"
                    rules={requiredField("कृपया संघ का पता दर्ज करें!")}
                  >
                    <Input
                      className="!py-2"
                      placeholder="संघ का पता दर्ज करें"
                    />
                  </Form.Item>
                )}

                {isOtherSanghMember && (
                  <Form.Item
                    label={
                      <span className="font-Karma text-base">
                        आप संघ में किसी विशेष पद पर हो ?
                      </span>
                    }
                    name="designatedSanghMember"
                    className="sm:col-span-2"
                    rules={requiredField("कृपया एक विकल्प चुनें!")}
                  >
                    <Radio.Group
                      onChange={handleDesignatedSanghMemberChange}
                      className="flex flex-wrap"
                    >
                      <Radio value="yes">हाँ</Radio>
                      <Radio value="no">ना</Radio>
                    </Radio.Group>
                  </Form.Item>
                )}
                {isDesignatedSanghMember && (
                  <Form.Item
                    label={
                      <span className="font-Karma text-base">पद का नाम</span>
                    }
                    name="sanghDesignationName"
                    className="sm:col-span-2"
                    rules={requiredField("कृपया पद का नाम दर्ज करें!")}
                  >
                    <Input
                      className="!py-2"
                      placeholder="पद का नाम दर्ज करें"
                    />
                  </Form.Item>
                )}
              </div>
            )}

            {/* government official */}
            <Form.Item
              label={
                <span className="font-Karma text-base">
                  क्या आपके परिचित कोई सरकारी अधिकारी / राजकारणी है ?
                </span>
              }
              name="familyInGovtService"
              className="sm:col-span-2"
              rules={requiredField("कृपया एक विकल्प चुनें!")}
            >
              <Radio.Group
                onChange={handleFamilyGovtChange}
                className="flex flex-wrap"
              >
                <Radio value="yes">हाँ</Radio>
                <Radio value="no">ना</Radio>
              </Radio.Group>
            </Form.Item>

            {isFamilyInGovtService && (
              <div className="border bg-gray-50 p-6 mb-6 border-gray-200">
                <Form.Item
                  label={
                    <span className="font-Karma text-base">सदस्य का नाम</span>
                  }
                  name="govtMemberName"
                  className="sm:col-span-2"
                  rules={requiredField("कृपया सदस्य का नाम दर्ज करें!")}
                >
                  <Input
                    className="!py-2"
                    placeholder="सदस्य का नाम दर्ज करें"
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="font-Karma text-base">
                      उनकी वर्तमान पोस्ट
                    </span>
                  }
                  name="govtMemberDesignation"
                  className="sm:col-span-2"
                  rules={requiredField("कृपया पदनाम दर्ज करें!")}
                >
                  <Input
                    className="!py-2"
                    placeholder="उनकी वर्तमान पोस्ट दर्ज करें"
                  />
                </Form.Item>
              </div>
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
              rules={[
                {
                  required: true,
                  message: "कृपया कम से कम एक भाषा चुनें!",
                },
              ]}
            >
              <Checkbox.Group
                className="flex flex-wrap gap-x-4 gap-y-2"
                onChange={onCheckboxChange}
              >
                <Checkbox value="gujarati">गुजराती</Checkbox>
                <Checkbox value="hindi">हिंदी</Checkbox>
                <Checkbox value="marathi">मराठी</Checkbox>
                <Checkbox value="english">इंग्लिश</Checkbox>
                <Checkbox value="sanskrit">संस्कृत</Checkbox>
                <Checkbox value="prakrit">प्राकृत</Checkbox>
                <Checkbox value="other">अन्य</Checkbox>
              </Checkbox.Group>
            </Form.Item>

            {/* Conditional input if "अन्य" is selected */}
            {selectedLanguages.includes("other") && (
              <Form.Item
                name="otherLanguage"
                label={
                  <span className="font-Karma text-base">
                    अन्य भाषा दर्ज करें
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: "कृपया अन्य भाषा दर्ज करें!",
                  },
                ]}
              >
                <Input placeholder="यहाँ अन्य भाषा लिखें" />
              </Form.Item>
            )}
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
