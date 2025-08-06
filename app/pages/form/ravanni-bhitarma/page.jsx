"use client";
import React, { useState, useEffect } from "react";
import { Form, Input, Row, Col, message, Spin, Select } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { states } from "../../../states";
import TextArea from "antd/es/input/TextArea";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BorderBeam } from "../../../_components/magicui/border-beam";

const ImageCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const images = ["/ravanni-bhitarma.jpg"];

  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        setCurrentSlide((prevSlide) =>
          prevSlide === images.length - 1 ? 0 : prevSlide + 1
        );
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [images.length, isHovered]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? images.length - 1 : prevSlide - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === images.length - 1 ? 0 : prevSlide + 1
    );
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center justify-center w-full h-full"
    >
      {/* Slides */}
      <div className="relative h-full bg-gray-200 w-full flex items-center justify-center">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full flex items-center justify-center transition-opacity duration-500 ease-in-out
              ${currentSlide === index ? "opacity-100" : "opacity-0"}`}
          >
            <div className="relative h-full  border-2 border-[#371A22] shadow-2xl max-h-[26rem] w-auto max-w-full overflow-hidden">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="object-contain h-full w-auto max-w-full mx-auto"
                style={{ aspectRatio: "2/3" }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {/* <button
        onClick={goToPrevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
      >
        <IoIosArrowBack />
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
      >
        <IoIosArrowForward />
      </button> */}

      {/* Dots Navigation */}
      {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 
              ${
                currentSlide === index ? "bg-white" : "bg-white bg-opacity-50"
              }`}
          />
        ))}
      </div> */}
    </div>
  );
};

const CopySelector = ({
  label = "તમે આ પુસ્તકની કેટલી નકલો ઓર્ડર કરવા માંગો છો?",
  value,
  onChange,
}) => {
  const handleDecrement = () => {
    const newCopies = Math.max(1, value - 1);
    onChange?.(newCopies);
  };

  const handleIncrement = () => {
    const newCopies = value + 1;
    onChange?.(newCopies);
  };

  return (
    <div className="w-full space-y-3 my-[1.31rem]">
      <Form.Item label={<b>{label}</b>} name="નકલ">
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={value === 1}
            className="
              p-[.4rem] rounded-full bg-gray-100 text-gray-600 
              hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200 ease-in-out
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>

          <span className="text-base font-semibold min-w-[40px] text-center">
            {value}
          </span>

          <button
            type="button"
            onClick={handleIncrement}
            disabled={value === 5}
            className="
              p-[.4rem] rounded-full bg-blue-100 text-blue-600 
              hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200 ease-in-out
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
      </Form.Item>
    </div>
  );
};

export default function RavanniBhitarmaForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [copies, setCopies] = useState(1);
  const router = useRouter();

  const onFinish = async (values) => {
    // Add copies to the values object
    values.નકલ = copies;

    console.log("Form values: ", values);

    try {
      setLoading(true);
      const response = await axios.post(
        "https://us-central1-adhyatm-parivar-main.cloudfunctions.net/ravanniBhitarmaForm",
        values
      );

      if (response.status === 200) {
        console.log("Response sent successfully:", response.data);
        message.success("Form submitted successfully!");
        form.resetFields();
      } else {
        console.log("Unexpected response status:", response.status);
        message.error("There was an issue submitting the form.");
      }
    } catch (error) {
      console.log("Error sending response:", error);
      message.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
      router.push("/pages/success");
    }
  };

  const onReset = () => {
    form.resetFields();
    setCopies(1);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-0 md:py-8 bg-gray-100">
      {/* <div className="flex flex-col font-Anek items-center justify-center text-center p-4 mb-6">
        <span className="text-base text-gray-600 font-semibold">તાસકમાં મસ્તક</span>
        <h1 className="text-5xl font-bold text-gray-800">ઉદયનમંત્રી</h1>
      </div> */}

      <div className="container mx-auto max-w-6xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1  gap-12 sm:gap-0 lg:grid-cols-2">
            {/* Image Section */}
            <div className=" pb-6 flex items-center justify-center h-[30rem]">
              <div className="h-full w-full">
                <div className="flex flex-col bg-gray-300 font-Anek items-center py-2 justify-center text-center">
                  <h1 className="text-2xl font-bold text-gray-800">
                    રાવણની ભીતરમાં
                  </h1>
                </div>
                <ImageCarousel />
              </div>
            </div>

            {/* Form Section */}
            <div className="relative p-6 bg-white">
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<b>મોબાઇલ નંબર/मोबाइल नंबर</b>}
                      name="मोबाइल नंबर"
                      rules={[
                        {
                          required: true,
                          message: (
                            <span style={{ fontSize: "12px" }}>
                              Mobile no. is required
                            </span>
                          ),
                        },
                        {
                          pattern: /^[0-9]{10}$/,
                          message: (
                            <span style={{ fontSize: "12px" }}>
                              Mobile no. must be exactly 10 digits
                            </span>
                          ),
                        },
                      ]}
                    >
                      <Input
                        className="rounded-md"
                        placeholder="મોબાઇલ નંબર/मोबाइल नंबर"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<b>નામ/नाम</b>}
                      name="नाम"
                      rules={[
                        {
                          required: true,
                          message: (
                            <span style={{ fontSize: "12px" }}>
                              Name is required
                            </span>
                          ),
                        },
                      ]}
                    >
                      <Input className="rounded-md" placeholder="નામ/नाम" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<b>અટક/उपनाम</b>}
                      name="उपनाम"
                      rules={[
                        {
                          required: true,
                          message: (
                            <span style={{ fontSize: "12px" }}>
                              Please enter your surname
                            </span>
                          ),
                        },
                      ]}
                    >
                      <Input className="rounded-md" placeholder="અટક/उपनाम" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<b>પિનકોડ/पिनकोड</b>}
                      name="पिनकोड"
                      rules={[
                        {
                          required: true,
                          message: (
                            <span style={{ fontSize: "12px" }}>
                              Pincode is required
                            </span>
                          ),
                        },
                        {
                          pattern: /^[0-9]{6}$/,
                          message: (
                            <span style={{ fontSize: "12px" }}>
                              Pincode must be exactly 6 digits
                            </span>
                          ),
                        },
                      ]}
                    >
                      <Input
                        className="rounded-md"
                        placeholder="પિનકોડ/पिनकोड"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<b>રાજ્ય/राज्य</b>}
                      name="राज्य"
                      rules={[
                        {
                          required: true,
                          message: (
                            <span style={{ fontSize: "12px" }}>
                              State is required
                            </span>
                          ),
                        },
                      ]}
                    >
                      <Select placeholder="રાજ્ય/राज्य" className="rounded-md">
                        {states.map((state) => (
                          <Select.Option key={state.value} value={state.value}>
                            <span className="font-Anek">
                              {state.label} / {state.value}
                            </span>
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<b>શહેર/शहर</b>}
                      name="शहर"
                      rules={[
                        {
                          required: true,
                          message: (
                            <span style={{ fontSize: "12px" }}>
                              Please enter your city
                            </span>
                          ),
                        },
                      ]}
                    >
                      <Input className="rounded-md" placeholder="શહેર/शहर" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                <Col xs={24} md={12}>
                    <Form.Item
                      label={<b>એડ્રેસ/एड्रेस</b>}
                      name="એડ્રેસ/एड्रेस"
                      rules={[
                        {
                          required: true,
                          message: (
                            <span style={{ fontSize: "12px" }}>
                              Address is required
                            </span>
                          ),
                        },
                      ]}
                    >
                      <TextArea
                        className="rounded-md"
                        placeholder="એડ્રેસ/एड्रेस"
                        rows={3}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <CopySelector
                      label="આપને આ પુસ્તકની કેટલી નકલની આવશ્યકતા છે?"
                      value={copies}
                      onChange={setCopies}
                    />
                  </Col>
                  
                </Row>

                <div className="flex mt-6 justify-between items-center">
                  <button
                    className="rounded-sm text-sm font-medium px-5 py-2 bg-red-500 text-white hover:bg-red-600 transition-colors"
                    htmlType="button"
                    onClick={onReset}
                  >
                    Reset
                  </button>

                  <button
                    className="rounded-sm text-sm font-medium px-5 py-2 bg-greenish text-white hover:bg-green-600 transition-colors"
                    htmlType="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spin size="small" /> Submitting...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </Form>
              <BorderBeam className="hidden md:block" duration={8} size={300} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
