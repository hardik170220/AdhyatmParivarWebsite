"use client";
import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Radio,
  Button,
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
import { BorderBeam} from "../../../_components/magicui/border-beam";

const ImageCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const images = [
    "/Mahabharat1.png",
    "/Mahabharat2.png",
    "/Mahabharat3.png",
    "/Mahabharat4.png",
    "/Mahabharat5.png",
  ];

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

export default function MahabharatForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values) => {
    console.log("Form values: ", values);

    try {
      setLoading(true);
      const response = await axios.post(
        "https://mahabharatform-fahifz22ha-uc.a.run.app",
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
      message.error(error.response.data.message);
    } finally {
      setLoading(false);
      router.push("/pages/success");
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className=" sm:w-[100vw]  lg:h-[100vh] pt-4 sm:p-4  md:border   flex flex-col justify-center">
      <h1 className=" text-center sm:mb-8 mb-3 font-Anek text-gray-700 text-lg sm:text-xl font-bold ">
        મહાભારત - જૈન ગ્રંથોના આલોકમાં (ભાગ ૧ થી ૫) (ગુજરાતી)
      </h1>
      <div className="container mx-auto max-w-[80rem] w-full grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
        {/* Image Section - Hidden on small screens */}
        {/* <div className="hidden lg:block">
          <img
            src="/Mahabharat.jpg"
            alt="Mahabharat"
            className="w-full h-full object-cover "
          />
        </div> */}

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
                <Form.Item
                  label={
                    <b>
                      આપને મહાભારત પુસ્તક ના ૫ ભાગનો આખો સેટ જરૂર છે કે પછી ફક્ત
                      પહેલો ભાગ?
                    </b>
                  }
                  name="set/part-1"
                  rules={[
                    {
                      required: true,
                      message: (
                        <span style={{ fontSize: "12px" }}>
                          Please select an option!
                        </span>
                      ),
                    },
                  ]}
                >
                  <Radio.Group>
                    <div className="space-y-0">
                      <Radio value="ભાગ ૧ થી ૫ નો સેટ" className="block">
                        <span className="font-Anek">ભાગ ૧ થી ૫ નો સેટ</span>
                      </Radio>
                      <Radio value="ફક્ત ભાગ - ૧" className="block">
                        <span className="font-Anek">ફક્ત ભાગ - ૧</span>
                      </Radio>
                    </div>
                  </Radio.Group>
                </Form.Item>
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
          <BorderBeam duration={8} size={300} />
        </div>
      
      </div>
    </div>
  );
}
