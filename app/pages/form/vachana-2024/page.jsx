"use client"
import React, { useState } from 'react';
import { Form, Input, Radio, Button, Row, Col, message, Spin, Select, DatePicker } from 'antd';
import axios from "axios";
import { useRouter } from 'next/navigation';
import { states } from '../../../states';

export default function Form2() {

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const onFinish = async (values) => {
    console.log("Form values: ", values);

    try {
      setLoading(true);
      const response = await axios.post('https://form2-fahifz22ha-uc.a.run.app', values);

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
      message.error("Error submitting the form.");
    }finally {
      setLoading(false); 
      router.push("/pages/success")

    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className='pt-20 flex flex-col items-center justify-center'>
    <h1 className='text-center font-Teko text-gray-500 text-xl font-bold'>શ્રી શત્રુંજય મહાતીર્થે 'વાચનાશ્રેણી'</h1>
    <div className="container my-10 bg-gray-100 mx-auto p-5 max-w-xl font-Teko">
      <Form form={form} layout="vertical" onFinish={onFinish}>
      <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={<b>નામ/नाम</b>}
                name="नाम"
                rules={[{ required: true, message: "First Name is required" }]}
              >
                <Input placeholder="નામ/नाम" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={<b>મધ્ય નામ/मध्य नाम</b>} name="मध्य नाम">
                <Input placeholder="મધ્ય નામ/मध्य नाम" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={<b>અટક/उपनाम</b>}
                name="उपनाम"
                rules={[{ required: true, message: "અટક/उपनाम is required" }]}
              >
                <Input placeholder="અટક/उपनाम" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<b>જન્મ તારીખ/जन्म तारीख</b>}
                name="जन्म तारीख"
                rules={[
                  {
                    required: true,
                    message: "જન્મ તારીખ/जन्म तारीख is required",
                  },
                ]}
              >
                <DatePicker
                  format="DD-MM-YYYY"
                  placeholder="જન્મ તારીખ/जન્મ तारीख"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={<b>મોબાઇલ નંબર/मोबाइल नंबर</b>}
                name="मोबाइल नंबर"
                rules={[
                  {
                    required: true,
                    message: "મોબાઇલ નંબર/मोबाइल नंबर is required",
                  },
                ]}
              >
                <Input placeholder="મોબાઇલ નંબર/मोबाइल नंबर" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={<b>મોબાઇલ નંબર-2/मोबाइल नंबर-2</b>}
                name="मोबाइल नंबर-2"
                rules={[
                  {
                    required: true,
                    message: "મોબાઇલ નંબર-2/मोबाइल नंबर-2 is required",
                  },
                ]}
              >
                <Input placeholder="મોબાઇલ નંબર-2/मोबाइल नंबर-2" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={<b>જાતિ/जाति</b>}
                name="जाति"
                rules={[{ required: true, message: "જાતિ/जाति is required" }]}
              >
                <Radio.Group style={{ width: "100%" }}>
                  <Row gutter={8}>
                    <Col span={12}>
                      <Radio value="પુરુષ/पुरुष">પુરુષ/पुरुष</Radio>
                    </Col>
                    <Col span={12}>
                      <Radio value="સ્ત્રી/स्त्री">સ્ત્રી/स्त्री</Radio>
                    </Col>
                  </Row>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<b>શહેર/शहर</b>}
                name="शहर"
                rules={[{ required: true, message: "Please enter your city" }]}
              >
                <Input placeholder="શહેર/शहर" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label={<b>ફ્લેટ નંબર/फ्लैट नंबर</b>} name="फ्लैट नंबर">
                <Input placeholder="ફ્લેટ નંબર/फ्लैट नंबर" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<b>બિલ્ડીંગનું નામ/बिल्डिंग का नाम</b>}
                name="बिल्डिंग का नाम"
                rules={[
                  {
                    required: true,
                    message: "બિલ્ડીંગનું નામ/बिल्डिंग का नाम is required",
                  },
                ]}
              >
                <Input placeholder="બિલ્ડીંગનું નામ/बिल्डिंग का नाम" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={<b>રોડ-સ્ટ્રીટ/रोड-स्ट्रीट</b>}
                name="रोड-स्ट्रीट"
                rules={[
                  {
                    required: true,
                    message: "રોડ-સ્ટ્રીટ/रोड-स्ट्रीट is required",
                  },
                ]}
              >
                <Input placeholder="રોડ-સ્ટ્રીટ/रोड-स्ट्रीट" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={<b>લેન્ડમાર્ક/लैंडमार्क</b>} name="लैंडमार्क">
                <Input placeholder="લેન્ડમાર્ક/लैंडमार्क" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={<b>એરિયા/एरिया</b>}
                name="एरिया"
                rules={[{ required: true, message: "એરિયા/एरिया is required" }]}
              >
                <Input placeholder="એરિયા/एरिया" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<b>રાજ્ય/राज्य</b>}
                name="राज्य"
                rules={[{ required: true, message: "રાજ્ય/राज्य is required" }]}
              >
                <Select placeholder="રાજ્ય/राज्य" style={{ width: "100%" }}>
                  {states.map((state) => (
                    <Select.Option key={state.value} value={state.value}>
                      {state.label} / {state.value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={<b>પિનકોડ/पिनकोड</b>}
                name="पिनकोड"
                rules={[
                  { required: true, message: "પિનકોડ/पिनकोड is required" },
                ]}
              >
                <Input placeholder="પિનકોડ/पिनकोड" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<b>મૂલવતન/मूलवतन</b>}
                name="मूलवतन"
                rules={[
                  { required: true, message: "મૂલવતન/मूलवतन is required" },
                ]}
              >
                <Input placeholder="મૂલવતન/मूलवतन" />
              </Form.Item>
            </Col>
          </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item>
              <p className='font-bold mb-2'>
                ગ્રુપના મુખ્ય વ્યક્તિનો નંબર / ग्रुप के मुख्य व्यक्ति का नंबर
              </p>
              <p className='font-semibold text-gray-500 text-xs leading-6 tracking-wide'>
                જો તમારે ગ્રુપમાં ફોર્મ ભરવું હોય, તો તમારા ગ્રુપના મુખ્ય વ્યક્તિનો નંબર અહીં લખવો. 
                તમારા ગ્રુપના બીજા જેટલા પણ ફોર્મ ભરાય તેમાં પણ આ જ મોબાઈલ નંબર લખવા વિનંતી. 
                જેથી અમને તમારા ગ્રુપનો ખ્યાલ આવી શકે, જો તમે તમારા એકલાનું જ ફોર્મ ભરી રહ્યા હોવ 
                તો તમારો નંબર અહીં લખવો.
                <br /><br />
                यदि आपको ग्रुप में फॉर्म भरना हो तो अपने ग्रुप के मुख्य व्यक्ति का नंबर यहां लिखें। 
                कृपया अपने ग्रुप के अन्य सभी फॉर्म में भी यही मोबाईल नंबर लिखें। ताकि हमें आपके ग्रुप का 
                अंदाजा मिल सके। यदि आप अपने अकेले का ही फॉर्म भर रहे है तो आपका नंबर यहां लिखे।
              </p>
            </Form.Item>
            <Form.Item 
              name="मुख्य व्यक्ति का नंबर लिखें"
              rules={[{ required: true, message: 'Please enter the group leader\'s number' }]}
            >
              <Input type='tel' placeholder="મુખ્ય વ્યક્તિનો નંબર લખો/मुख्य व्यक्ति का नंबर लिखें" rows={4} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item 
          label={<b>શું અધ્યાત્મ પરિવાર આયોજિત આ આપની પેહલી વાયનાશ્રેણી છે?/क्या यह आपकी प्रथम वाचनाश्रेणी है?</b>} 
          name="क्या यह आपकी प्रथम वाचनाश्रेणी है"
          rules={[{ required: true, message: 'Please select an option' }]}
        >
          <Radio.Group style={{ width: '100%' }}>
            <Row gutter={8}>
              <Col span={12}>
                <Radio value="હા/हाँ">હા/हाँ</Radio>
              </Col>
              <Col span={12}>
                <Radio value="ના/नहीं">ના/नहीं</Radio>
              </Col>
            </Row>
          </Radio.Group>
        </Form.Item>

        <div className='flex mt-5 justify-between items-center'>
          {loading?<Button className='rounded-sm border-greenish font-semibold' htmlType="submit">
            <Spin  className='text-white'  spinning={loading} tip="Submitting..."></Spin> Submit 
          </Button>:<Button className='rounded-sm border-greenish font-semibold' htmlType="submit">Submit</Button>}
          <Button className='rounded-sm  border-red-500 font-semibold' htmlType="button" onClick={onReset} style={{ marginLeft: '10px' }}>
            Reset
          </Button>
        </div>
      </Form>
    </div>
    </div>
  );
}
