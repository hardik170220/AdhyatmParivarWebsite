"use client";
import Providers from "@/app/providers";
import React, { useState } from "react";
import { Form, Input, DatePicker, Radio, Button, Checkbox, Select } from "antd";
import Nbsp from "@/app/_components/Nbsp";

const Page = () => {
  const [form] = Form.useForm();
  const [isOtherOrganizationMember, setIsOtherOrganizationMember] =
    useState(false);

  const handleSubmit = (values) => {
    console.log("Form Values:", values);
  };

  const handleOtherOrganizationChange = (e) => {
    setIsOtherOrganizationMember(e.target.value === "yes");
  };

  return (
    <Providers>
      <div className="relative w-full flex-col flex justify-center">
        <div className="text-center pt-10 font-Teko text-3xl underline underline-offset-8 text-gray-700 font-bold">
          -::&nbsp; आपकी विगत &nbsp;::-
        </div>

        <div className="w-full px-10 md:px-32 pb-6">
          <Nbsp />
          <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={{ job: 'select Option' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
              <Form.Item label="नाम" name="name">
                <Input className="!py-2" />
              </Form.Item>

              <Form.Item label="मध्यनाम" name="middleName">
                <Input className="!py-2" />
              </Form.Item>

              <Form.Item label="कुलनाम" name="surname">
                <Input className="!py-2" />
              </Form.Item>

              <Form.Item label="उपनाम" name="nickname">
                <Input className="!py-2" />
              </Form.Item>

              <Form.Item label="जन्म तिथि" name="birthName">
                <Input className="!py-2" />
              </Form.Item>

              <Form.Item label="जन्म तारीख" name="birthDate">
                <DatePicker className="!py-2" style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item label="लिंग" name="gender">
                <Radio.Group>
                  <Radio value="male">पुरुष</Radio>
                  <Radio value="female">स्त्री</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item label="जन्मस्थल" name="birthPlace">
                <Input className="!py-2" />
              </Form.Item>

              <Form.Item label="संपर्क नंबर" name="contact">
                <Input className="!py-2" />
              </Form.Item>

              <Form.Item label="ईमेल" name="email">
                <Input className="!py-2" />
              </Form.Item>

               <Form.Item label="धार्मिक अभ्यास" name="religiousPractice">
                <Input className="!py-2" />
              </Form.Item>

              <Form.Item label="व्यवहारिक अभ्यास" name="practicalPractice">
                <Input className="!py-2" />
              </Form.Item>

              <Form.Item label="जॉब/बिजनेस" name="job">
                <Select>
                  <Select.Option value="job1">जॉब</Select.Option>
                  <Select.Option value="job2">बिजनेस</Select.Option>
                  <Select.Option value="job3">अन्य</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="क्या आप अन्य किसी संस्था के सदस्य हो?"
                name="otherOrganizationMember"
                className="lg:col-span-2" // This ensures full width on larger screens
              >
                <Radio.Group onChange={handleOtherOrganizationChange}>
                  <Radio value="yes">हाँ</Radio>
                  <Radio value="no">ना</Radio>
                </Radio.Group>
              </Form.Item>

              {isOtherOrganizationMember && (
                <Form.Item
                  label="संस्था का नाम"
                  name="organizationName"
                  className="lg:col-span-2"
                >
                  <Input className="!py-2" />
                </Form.Item>
              )}

              <Form.Item
                label="क्या आप कोई जैन संघ के सदस्य हो?"
                name="jainOrganizationMember"
                className="lg:col-span-1" // This ensures full width on larger screens
              >
                <Radio.Group>
                  <Radio value="yes">हाँ</Radio>
                  <Radio value="no">ना</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                label="शासन कार्य के लिए प्रवास करने की आपकी रूचि अनुकूलता है"
                name="jainOrganizationMember"
                className="lg:col-span-1" // This ensures full width on larger screens
              >
                <Radio.Group>
                  <Radio value="yes">हाँ</Radio>
                  <Radio value="no">ना</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                label="क्या आप बिल्डिंग सोसाइटी की कोई कमिटी में हो?"
                name="jainOrganizationMember"
                className="lg:col-span-1" // This ensures full width on larger screens
              >
                <Radio.Group>
                  <Radio value="yes">हाँ</Radio>
                  <Radio value="no">ना</Radio>
                </Radio.Group>
              </Form.Item>


             
              <Form.Item label="आपको कौनसी भाषा का ज्ञान है?" name="languages" className="lg:col-span-2">
                <Checkbox.Group>
                  <Checkbox value="gujarati">गुजराती</Checkbox>
                  <Checkbox value="hindi">हिंदी</Checkbox>
                  <Checkbox value="sanskrit">संस्कृत</Checkbox>
                  <Checkbox value="prakrit">प्राकृत</Checkbox>
                  <Checkbox value="english">इंग्लिश</Checkbox>
                  <Checkbox value="marathi">मराठी </Checkbox>
                  <Checkbox value="other">अन्य</Checkbox>
                </Checkbox.Group>
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

export default Page;
