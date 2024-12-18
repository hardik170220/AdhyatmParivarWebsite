"use client";
import React from 'react';
import { Form, Button, Collapse, Checkbox } from 'antd';
import Providers from '@/app/providers';
import Nbsp from '@/app/_components/Nbsp';

const { Panel } = Collapse;
const CheckboxGroup = Checkbox.Group;

const page = () => {
  const options1 = ['जिनप्रतिमा सुरक्षा (लेप-धोप)', 'जिनप्रतिमा निर्माण - पाषाण (अध्यात्म शिल्पशाला)', 'जिनप्रतिमा निर्माण - धातु','प्राचीन जिनप्रतिमा संग्रहण','जिनप्रतिमा आशातरा निवारण (बिना अंजन वाली प्रतिमाओं की योग्य व्यवस्था)'];
  const options2 = ['जिनालय सुरक्षा (मरम्मत)', 'जिनालय शुद्धि - उपाश्रय शुद्धि', 'जिनालय नवनिर्माण तथा मार्गदर्शन','जिनालय और गृहजिनालय के लिए संगमरमर के पत्थर की घड़ाई','देव बगीचे का निर्माण'];
  const options3 = ['प्राचीन श्रुत सुरक्षा', 'अर्वाचीन श्रुत प्रकाशन-प्रचार', 'हरिभद्रसूरी शास्त्रसंग्रह (श्रीसंघ को श्रुत की उपलब्धि)','अध्यात्म ज्ञानतीर्थ (संग्रह-संशोधन-प्रकाशन)','गणीपिटक निर्माण प्रसार'];
  const options4 = ['Option 4.1', 'Option 4.2', 'Option 4.3'];
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values: ', values);
  };


  // Custom CheckboxGroup render for arranging options in rows
  const renderCheckboxGroup = (options) => (
    <div className="flex flex-col space-y-2">
      {options.map(option => (
        <Checkbox key={option} value={option}>
          {option}
        </Checkbox>
      ))}
    </div>
  );

  return (
    <Providers>
      <div className="relative w-full flex-col flex justify-center">
        <div className="text-center pt-10 font-Teko text-3xl px-5 pb-5 md:pb-0 leading-relaxed  underline underline-offset-8 text-gray-700 font-bold">
          -::&nbsp; अध्यात्म परिवार सदस्य विगत पत्रक &nbsp;::-
        </div>

        <div className="w-full px-10 md:px-32 pb-6">
          <Nbsp />
          <p className='font-Karma py-5'>शासन रक्षादि कार्यो में आपकी रूचि काबिलियत किस विषय में है :</p>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
          >
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-x-4">
              <Collapse accordion>
                <Panel header="1. जिनमूर्ति विभाग" key="1">
                  <Form.Item name="section1" >
                    <CheckboxGroup>
                      {renderCheckboxGroup(options1)}
                    </CheckboxGroup>
                  </Form.Item>
                </Panel>
                <Panel header="2. जिनमंदिर विभाग" key="2">
                  <Form.Item name="section2" >
                    <CheckboxGroup>
                      {renderCheckboxGroup(options2)}
                    </CheckboxGroup>
                  </Form.Item>
                </Panel>
                <Panel header="3. जिनागम विभाग" key="3">
                  <Form.Item name="section3" >
                    <CheckboxGroup>
                      {renderCheckboxGroup(options3)}
                    </CheckboxGroup>
                  </Form.Item>
                </Panel>
                <Panel header="4. अध्यात्म विभाग" key="4">
                  <Form.Item name="section4" >
                    <CheckboxGroup>
                      {renderCheckboxGroup(options4)}
                    </CheckboxGroup>
                  </Form.Item>
                </Panel>
              </Collapse>

              <div className="flex mt-5 justify-between items-center">
              <Button className="rounded-sm border-greenish bg-greenish text-white font-semibold" htmlType="submit">
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
            </div>
          </Form>
        </div>
      </div>
    </Providers>
  );
};

export default page;
