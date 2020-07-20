import React from 'react';
import { Form, Button } from 'antd';
import { useRequest } from '@umijs/hooks';
import DragTransfer from '../index';
import { Store } from '@umijs/hooks/lib/useFormTable';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';

const fetchData = () => {
  return fetch(`https://randomuser.me/api?results=10`)
    .then((res) => res.json())
    .then((res) => res.results);
};

function FormDemo() {
  const onFinish = (values: Store) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };

  const { data } = useRequest(fetchData, {
    cacheKey: 'dragTranferData',
    initialData: [],
    formatResult: (res) => {
      return res.map((item: any, index: number) => ({
        key: String(index),
        title: item.name.first,
      }));
    },
  });

  return (
    <Form
      layout="vertical"
      initialValues={{
        username: ['1', '2', '3'],
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        valuePropName="targetKeys"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <DragTransfer dataSource={data} render={(item) => item.title || null} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FormDemo;
