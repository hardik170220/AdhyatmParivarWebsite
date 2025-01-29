"use client";
import React from "react";
import { Layout, Input, Button, Form, Typography, message } from "antd";

const { TextArea } = Input;
const { Title } = Typography;

const FormTemplate = ({ formData }) => {
  const onFinish = (values) => {
    message.success("Form submitted successfully!");
    console.log("Form Values:", values);
  };
  return (
    <Layout className="w-[50rem]" style={{ padding: "30px" }}>
      <Title>{formData.name}</Title>
      <Form onFinish={onFinish} layout="vertical">
        {formData.fields.map((field) => (
          <Form.Item
            key={field.id}
            label={field.label}
            name={field.id}
            rules={[
              {
                required: field.required,
                message: `${field.label} is required`,
              },
            ]}
          >
            {field.type === "textarea" ? (
              <TextArea rows={4} />
            ) : (
              <Input type={field.type} />
            )}
          </Form.Item>
        ))}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default FormTemplate;
