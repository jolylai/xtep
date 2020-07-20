import React from 'react';
import { Form, Input, InputNumber, Button } from 'antd';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: 'This field is required!',
  types: {
    email: 'Not a validate email!',
    number: 'Not a validate number!',
  },
  number: {
    range: 'Must be between ${min} and ${max}',
  },
};

const ValidateMessage = () => {
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish}>
      <Form.Item
        name={['user', 'name']}
        label="Name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'email']}
        label="Email"
        rules={[{ type: 'email' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'age']}
        label="Age"
        rules={[{ type: 'number', min: 0, max: 99 }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name={['user', 'website']}
        label="Website"
        rules={[{ type: 'url', message: 'URL' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Introduction">
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ValidateMessage;
