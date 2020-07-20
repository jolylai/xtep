import React from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import { Store } from 'antd/lib/form/interface';

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const defaultValues = {
  user: { name: 'jack', email: '123@qq.com' },
  question: [
    {
      title: '问题11',
      options: [
        {
          title: '答案一',
        },
      ],
    },
    {
      title: '问题12',
      options: [
        {
          title: '答案一2',
        },
      ],
    },
  ],
};

const Nest = () => {
  const onFinish = (values: Store) => {
    console.log(values);
  };

  return (
    <Form
      {...layout}
      initialValues={defaultValues}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={['question', '1', 'options', '0', 'title']}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['question']}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Form.Item
          name={['0', 'title']}
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form.Item>
      <Form.Item
        name={['user', 'name']}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'email']}
        label="Email"
        rules={[
          {
            type: 'email',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'age']}
        label="Age"
        rules={[
          {
            type: 'number',
            min: 0,
            max: 99,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item name={['user', 'website']} label="Website">
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

export default Nest;
