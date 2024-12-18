"use client";
import React, { useState } from "react";
import { Form, Input, Select, Button, message } from "antd";
import Providers from "@/app/providers";
import axios from "axios"; // For API calls
import { CiLocationOn } from "react-icons/ci";
import Nbsp from "@/app/_components/Nbsp";
import { states } from "../../../states";

const { Option } = Select;

const FamilyDetailsForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const relations = [
    { label: "पुत्र", value: "पुत्र" },
    { label: "पुत्री", value: "पुत्री" },
    { label: "पिता", value: "पिता" },
    { label: "माता", value: "माता" },
    { label: "भाई", value: "भाई" },
    { label: "बहन", value: "बहन" },
    { label: "दादा", value: "दादा" },
    { label: "दादी", value: "दादी" },
    { label: "नाना", value: "नाना" },
    { label: "नानी", value: "नानी" },
    { label: "पोता", value: "पोता" },
    { label: "पोती", value: "पोती" },
    { label: "भतीजा", value: "भतीजा" },
    { label: "भतीजी", value: "भतीजी" },
    { label: "भांजा", value: "भांजा" },
    { label: "भांजी", value: "भांजी" },
    { label: "चाचा", value: "चाचा" },
    { label: "चाची", value: "चाची" },
    { label: "ताऊ", value: "ताऊ" },
    { label: "ताई", value: "ताई" },
    { label: "मामा", value: "मामा" },
    { label: "मामी", value: "मामी" },
    { label: "बुआ", value: "बुआ" },
    { label: "फूफा", value: "फूफा" },
    { label: "मौसी", value: "मौसी" },
    { label: "मौसा", value: "मौसा" },
    { label: "ससुर", value: "ससुर" },
    { label: "सास", value: "सास" },
    { label: "देवर", value: "देवर" },
    { label: "ननद", value: "ननद" },
    { label: "जेठ", value: "जेठ" },
    { label: "जेठानी", value: "जेठानी" },
    { label: "देवरानी", value: "देवरानी" },
    { label: "साला", value: "साला" },
    { label: "साली", value: "साली" },
    { label: "जीजा", value: "जीजा" },
  ];

  // Function to handle reverse geocoding and fill address fields only
  const fillAddressFromLocation = async (lat, lng) => {
    try {
      // Replace with your reverse geocoding API of choice
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=2d7280f35a7248a996ec4d0b08809878`
      );
      const { city, state, country, postcode, suburb } =
        response.data.results[0].components;

      console.log(response.data.results[0].components);
      // Set only the address-related fields
      form.setFieldsValue({
        homeAddress: suburb || "",
        city: city || "",
        state: state || "",
        country: country || "",
        pincode: postcode || "",
      });
      message.success("Location fetched successfully!");
    } catch (error) {
      message.error("Unable to fetch address. Try again.");
    }
  };

  // Function to get the current location
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fillAddressFromLocation(latitude, longitude);
          setLoading(false);
        },
        (error) => {
          message.error(
            "Unable to get location. Please allow location access."
          );
          setLoading(false);
        }
      );
    } else {
      message.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = (values) => {
    console.log("Form Values:", values);
  };

  return (
    <Providers>
      <div className="relative w-full flex-col flex justify-center">
        <div className="text-center font-Teko pt-10 md:my-0 underline underline-offset-8 text-3xl text-gray-700 font-bold">
          -::&nbsp; परिवार की विगत &nbsp;::-
        </div>

        <div className="w-full px-10 md:px-32 pb-6 ">
          <Nbsp />
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
              {/* Other form fields */}
              <Form.Item
                label="मुख्य सदस्य का संपर्क नं"
                name="mainMemberContact"
              >
                <Input className="!py-2" placeholder="फ़ोन नंबर भरे" />
              </Form.Item>

              <Form.Item label="परिवार का नाम" name="familyName">
                <Input className="!py-2" placeholder="परिवार का नाम भरे" />
              </Form.Item>

              <Form.Item label="समाज" name="society">
                <Input placeholder="समाज का नाम भरे" className="!py-2" />
              </Form.Item>

              <Form.Item label="मुख्य सदस्य के साथ रिश्ता" name="relation">
                <Select placeholder="रिश्ता चुनें">
                  {relations.map((relation) => (
                    <Select.Option key={relation.value} value={relation.value}>
                      {relation.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="मूलवतन" name="hometown">
                <Input className="!py-2" placeholder="मूलवतन भरे" />
              </Form.Item>

              <div className="col-span-2  mb-4">
                <Button
                  type="default"
                  icon={<CiLocationOn size={26} />}
                  loading={loading}
                  onClick={handleGetLocation}
                  className="w-full border-blue-400 bg-blue-50 !py-5 !rounded-sm"
                >
                  Get Location
                </Button>
              </div>

              {/* Address-related fields */}
              <Form.Item label="घर का पता" name="homeAddress">
                <Input className="!py-2" placeholder="घर का पता भरे" />
              </Form.Item>

              <Form.Item label="एरिया" name="area">
                <Input className="!py-2" placeholder="एरिया भरे" />
              </Form.Item>

              <Form.Item label="देश" name="country">
                <Select placeholder="देश चुनें">
                  <Option value="india">India</Option>
                  {/* Add more countries as needed */}
                </Select>
              </Form.Item>

              <Form.Item label="राज्य" name="state">
                <Select placeholder="राज्य चुनें" style={{ width: "100%" }}>
                  {states.map((state) => (
                    <Select.Option key={state.value} value={state.value}>
                      {state.label} / {state.value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="शहर" name="city">
                <Select placeholder="शहर चुनें">
                  {/* Add city options */}
                </Select>
              </Form.Item>

              <Form.Item label="पिनकोड" name="pincode">
                <Input className="!py-2" placeholder="पिनकोड भरे" />
              </Form.Item>
            </div>

            <div className="flex mt-5 justify-between items-center">
              <Button
                className="rounded-sm border-greenish bg-greenish text-white font-semibold"
                htmlType="submit"
              >
                Submit
              </Button>
              <Button
                className="rounded-sm border-red-500 bg-red-600 text-white font-semibold"
                htmlType="button"
                onClick={() => form.resetFields()}
                style={{ marginLeft: "10px" }}
              >
                Reset
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Providers>
  );
};

export default FamilyDetailsForm;
