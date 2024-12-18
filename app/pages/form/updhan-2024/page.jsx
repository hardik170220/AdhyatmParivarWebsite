"use client";
import React, { useState } from "react";
import {
  Form,
  Input,
  Radio,
  Upload,
  Button,
  DatePicker,
  Row,
  Col,
  message,
  Spin,
  Select,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import { useRouter } from "next/navigation";
import { states } from "../../../states";

// Firebase configuration
const firebaseConfig = {
  type: "service_account",
  project_id: "adhyatm-parivar-main",
  storageBucket: "gs://adhyatm-parivar-main.appspot.com",
  private_key_id: "2ac2410ec9ad2f402aafe3c3ef0ef7b2b5d308ce",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDdSLgBGdfjbeie\n8LJEwKvvdCzoc+1lOvG2yoNMLkIkYACwXgBiZnXXzhQzmuwmucYHisslVQ2GOlnm\nn7BtYYr2ywxANMV7RXwaC+motUbO1lneVMyIrM7k1dTyvZX9mfiX12S9QQ5ckL+9\ndQYEl1Cj7DfYPIu5tSVjLhU65taiTcEOT7FC7CCHrNjuKXdUQvC86k8RE1Xy0Ewh\nxfp+bV3BiZqgScuNFeSaibgqwJUJ/MSEJM4DesgCcCFiU/QCmjqcS1k9QKRYQnBr\nFNGVskHdJgj4MbfeDBYqzZNNJanv83LPxMHnyZCpDnXEJywj3cbfy5EU0OI8ScWS\niDXorPvTAgMBAAECggEAZsIJnI1FOTpFT2WjyxST4z8WSZ3n7F3qeEFjpmFG2sBw\nIXaNhCRjbeMnc21qY3NaeA8mVgBApwf6zoNyeODWmNNirYA0ApIaVrgYef0wVAWr\nNvk2//MLoq1/1XdfqyQwkkZ2ZAJNaoPXXmH0+PXRf0XHCxXWptbtdTilqDQhEL3g\ngG0L2HQQ6vptruu9os0IuT85Jzl6x9DWpYqCWcEf8M0KYLJQKw1aT98Beu0vBsZE\n9cX7ITHfjHKfYwFqHdaHXx7EiWhqAekN59hKh1qqWzKDlo0kUpyI6X61lAulzUce\nDEmdU9AbvZejl45ZUteINxK274/+Jdosaly40W9rwQKBgQD30vFUeXM/Pcx8Gwhj\nIlUKJnMprenjhQgBfctQHWEX/7N8+3vTyXIad/MX8i4l4ELEHj7QCf4Hy4wgX+tw\nEeZntkxqgpqXmJx5/0EuB2+tMuzPZ90KOS/VNxDq5+PxNCWnKZpi3+wBD0Dr33q2\nrDNIbMYgPtq5I40mA+sZI+ivQQKBgQDklaBq+1z7wpUkoHpx+CBVV+UScttvojZH\nt+0oOb58sfWVMKYbA9JP5bwgeMgvmHLJEbWmf7seMlJUf94Sv8lk4je/pIWX+Tjj\nd1Hb14iSyk6ieIYDs+stD+trFHSX2S7Gwzw6fID41JxVFi6ExnkWPB4+KkLHCZ49\n6sFXJSN6EwKBgCNNsYNPKdPAgfjMAQ3ePi8L+yvc0ozOzq0ntmbbSJGao38SdDlf\nYRnULJUkst5CbEBz7o7EXaPOo0+ZWnjElAYCOjCSGmOuIdxfOHHOLWKG9qU1Lo/e\nRaoiBg7wqdAalaKSkqOzMnOUMLNpSpnrPgL7O94sFgx5vAnGVR9ntiYBAoGAHpTm\nIWn/xq8BxSSzPQw1RzW7L/yt3wGUwYOZ9wfCtGwarxsTHgok2QujX7TJE5URxlTY\nOK5eGmwhF60DyP5fs1+QldMtDGgLdGNCUGdFnl3yp0n4pAYuMJkwpeLWtnoYB/+W\nzzxZBPFs+PU+xATJrm/cm/SLepWO1jnSJBaT6IECgYEAnLZbGRvR4VkskhWhyT6p\nyg1R6UQCEwpWvSIMTEQ7/eSG3uO+Jhvp2gTLSwVZuwYRvitEh9WzQnqusO0NxDsV\nAiQD88TZKg8B/mEr9xy96I7EsKzHH6rLNFRjmralHlfZ2ZcdHLWMUnzjBVHddsyE\nj6coUkrGZGrEBHVeTd9HZFo=\n-----END PRIVATE KEY-----\n",
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default function Form1() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      let imageUrl = null;
      if (values.photo && values.photo.length > 0) {
        const file = values.photo[0].originFileObj;
        const storageRef = ref(
          storage,
          `updhan-2024/${values.नाम}_${file.name}`
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

      const formData = { ...values, imageUrl };
      console.log("Form values: ", formData);

      const response = await axios.post(
        "https://form1-fahifz22ha-uc.a.run.app",
        formData
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
      message.error("Error submitting the form.");
    } finally {
      setLoading(false);
      router.push("/pages/success");
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const uploadProps = {
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

  return (
    <div className="pt-20 flex flex-col items-center justify-center">
      <h1 className="text-center font-Teko text-gray-500 text-xl font-bold">
        સુખનું ફરમાન-આધ્યાત્મિક ઉપધાન તપ(ભાવનાપત્ર)
      </h1>
      <div className="container mx-auto  p-5 my-10 bg-gray-100 max-w-xl font-Teko">
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

          <Form.Item
            label={
              <b>
                જેમાં પ્રવેશ કરવો હોય છે એ સિલેક્ટ કરવુ/जिसमें प्रवेश करना हो
                उसे सेलेक्ट करे
              </b>
            }
            name="जिसमें प्रवेश करना हो उसे सेलेक्ट करे"
            rules={[
              { required: true, message: "Please select an entry option" },
            ]}
          >
            <Radio.Group style={{ width: "100%" }}>
              <Row className="leading-8 tracking-wide" gutter={8}>
                <Col span={24}>
                  <Radio value="મોક્ષમાળ (પ્રથમ ઉપધાન)/मोक्षमाला (प्रथम उपधान)">
                    મોક્ષમાળ (પ્રથમ ઉપધાન)/मोक्षमाला (प्रथम उपधान)
                  </Radio>
                </Col>
                <Col span={24}>
                  <Radio value="પાંત્રિસુ/पांत्रीसा">પાંત્રિસુ/पांत्रीसा</Radio>
                </Col>
                <Col span={24}>
                  <Radio value="અટ્ઠાવીસું/अट्ठावीसा">
                    અટ્ઠાવીસું/अट्ठावीसा
                  </Radio>
                </Col>
                <Col span={24}>
                  <Radio value="અઢારિયું/अढारिया">અઢારિયું/अढारिया</Radio>
                </Col>
              </Row>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label={<b>મૂલવિધિથી કરશો?/मूलविधि से करेंगे?</b>}
            name="मूलविधि से करेंगे?"
            rules={[{ required: true, message: "Please select an option" }]}
          >
            <Radio.Group style={{ width: "100%" }}>
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

          <Form.Item
            label={<b>ફોટો અપલોડ કરવો/फोटो अपलोड करें</b>}
            name="photo"
            rules={[{ required: true, message: "Please uplod an image" }]}
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          >
            <Upload {...uploadProps} listType="picture">
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          <div className="flex mt-5 justify-between items-center">
            {loading ? (
              <Button
                className="rounded-sm border-greenish bg-white font-semibold"
                htmlType="submit"
              >
                <Spin
                  className="text-white"
                  spinning={loading}
                  tip="Submitting..."
                ></Spin>{" "}
                Submit
              </Button>
            ) : (
              <Button
                className="rounded-sm border-greenish font-semibold"
                htmlType="submit"
              >
                Submit
              </Button>
            )}
            <Button
              className="rounded-sm border-red-500 font-semibold"
              htmlType="button"
              onClick={onReset}
              style={{ marginLeft: "10px" }}
            >
              Reset
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
