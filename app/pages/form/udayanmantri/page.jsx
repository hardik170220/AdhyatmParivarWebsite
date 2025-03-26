"use client";
import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  message,
  Spin,
  Select,
} from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { states } from "../../../states";
import TextArea from "antd/es/input/TextArea";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BorderBeam } from "../../../_components/magicui/border-beam";

const ImageCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const images = ["/udayanmantri-book.jpg"];

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
      className="relative w-full h-[15rem] sm:h-[28.7rem] overflow-hidden "
    >
      {/* Slides */}
      <div className="relative h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-500 ease-in-out
              ${currentSlide === index ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-CONTAIN"
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
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
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
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
      </div>
    </div>
  );
};

const CopySelector = ({
  label = "તમે આ પુસ્તકની કેટલી નકલો ઓર્ડર કરવા માંગો છો?",
  value,
  onChange,
}) => {
  const handleDecrement = () => {
    const newCopies = Math.max(0, value - 1);
    onChange?.(newCopies);
  };

  const handleIncrement = () => {
    const newCopies = value + 1;
    onChange?.(newCopies);
  };

  return (
    <div className="w-full space-y-3 my-[1.31rem]">
      <Form.Item
        label={<b>{label}</b>}
        name="નકલ"
        // rules={[
        //   {
        //     required: true,
        //     message: <span style={{ fontSize: "12px" }}>Copies are required</span>,
        //   },
        // ]}
      >
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
            disabled={value === 10}
            className="
              p-[.4rem] rounded-full bg-blue-100 text-blue-600 
              hover:bg-blue-200disabled:opacity-50 disabled:cursor-not-allowed
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

export default function UdayanmantriForm() {
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
        "https://udayanmantriform-fahifz22ha-uc.a.run.app",
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
    setCopies(0);
  };

  return (
    <div className=" sm:w-[100vw]  lg:h-[100vh] pt-4 sm:p-4  md:border flex flex-col justify-center">
       <div className="flex flex-col font-Anek items-center justify-center text-center p-4">
      <span className="text-base text-gray-600 font-semibold ">તાસકમાં મસ્તક</span>
      <h1 className="text-5xl font-bold text-gray-800">ઉદયનમંત્રી</h1>
    </div>
      <div className="container mx-auto max-w-[80rem] w-full grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
        <div className="relative">
          <ImageCarousel />
        </div>

        {/* Form Section */}
        <div className="relative p-4 bg-[#fffa] md:overflow-hidden mx-2 sm:border sm:p-4">
          <Form
            style={{ width: "" }}
            form={form}
            layout="vertical"
            onFinish={onFinish}
          >
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
                    style={{ borderRadius: "0px" }}
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
                  <Input
                    style={{ borderRadius: "0px" }}
                    className="custom-placeholder"
                    placeholder="નામ/नाम"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
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
                  <Input
                    style={{ borderRadius: "0px" }}
                    placeholder="શહેર/शहर"
                  />
                </Form.Item>
              </Col>
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
                    style={{ borderRadius: "0px" }}
                    placeholder="એડ્રેસ/एड्रेस"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
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
                    style={{ borderRadius: "0px" }}
                    placeholder="પિનકોડ/पिनकोड"
                  />
                </Form.Item>
              </Col>
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
                  <Select
                    placeholder="રાજ્ય/राज्य"
                    style={{ borderRadius: "0px", width: "100%" }}
                  >
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
            </Row>

            <Row>
              <Col xs={24}>
                <CopySelector
                  label="તમે આ પુસ્તકની કેટલી નકલો ઓર્ડર કરવા માંગો છો?"
                  value={copies}
                  onChange={setCopies}
                />
              </Col>
            </Row>

            <div className="flex mt-0  justify-between items-center">
              <button
                className="uppercase text-sm !rounded-sm px-4 py-[.4rem] !bg-red-500 !text-gray-100"
                htmlType="button"
                onClick={onReset}
              >
                Reset
              </button>
              {loading ? (
                <button
                  className="uppercase text-sm rounded-sm border border-greenish px-4 py-[.4rem] "
                  htmlType="submit"
                >
                  <Spin
                    className="text-white"
                    spinning={loading}
                    tip="Submitting..."
                  ></Spin>{" "}
                  Submit
                </button>
              ) : (
                <button
                  className="!rounded-sm text-sm uppercase !bg-greenish px-4 py-[.4rem] !text-gray-100 "
                  htmlType="submit"
                >
                  Submit
                </button>
              )}
            </div>
          </Form>
          <BorderBeam className="hidden md:block" duration={8} size={300} />
        </div>
      </div>
    </div>
  );
}