"use client"
import Providers from '@/app/providers'
import React from 'react'
import { Form, Input, DatePicker, Radio, Button } from 'antd';

const page = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('Form Values:', values);
  };

  return (
    <Providers>
      <div className="relative w-full flex-col flex justify-center">
      <div className='text-center pt-10 font-Teko text-3xl text-gray-700 font-bold'>-::&nbsp; आपकी विगत &nbsp;::-</div>

        {/* Wrapper div with max width for larger screens */}
        <div className="w-full px-10 md:px-32  pb-6 ">
          <h2 className="hidden md:block text-center font-Teko text-3xl text-gray-700 font-bold">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            
            </h2>  
          
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className=''
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
              {/* Each Form Item will be inside a grid column */}
              <Form.Item label="नाम" name="name">
                <Input className='!py-2' />
              </Form.Item>

              <Form.Item label="मध्यनाम" name="middleName">
                <Input className='!py-2' />
              </Form.Item>

              <Form.Item label="कुलनाम" name="surname">
                <Input className='!py-2' />
              </Form.Item>

              <Form.Item label="उपनाम" name="nickname">
                <Input className='!py-2' />
              </Form.Item>

              <Form.Item label="जन्म तिथि" name="birthName">
                <Input className='!py-2' />
              </Form.Item>

              <Form.Item label="जन्म तारीख" name="birthDate">
                <DatePicker className='!py-2' style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item label="लिंग" name="gender">
                <Radio.Group>
                  <Radio value="male">पुरुष</Radio>
                  <Radio value="female">स्त्री</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item label="जन्मस्थल" name="birthPlace">
                <Input className='!py-2' />
              </Form.Item>

              <Form.Item label="संपर्क नंबर" name="contact">
                <Input className='!py-2' />
              </Form.Item>

              <Form.Item label="ईमेल" name="email">
                <Input className='!py-2' />
              </Form.Item>
            </div>

            <Form.Item>
              <Button htmlType="submit" className='w-full text-white !py-5 !rounded bg-gray-700'>
                Next
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Providers>
  );
};

export default page;
