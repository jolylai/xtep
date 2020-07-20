import React from 'react';
import { Form, Button, Space } from 'antd';
import { useRequest } from '@umijs/hooks';
import PicUpload from '../index';
import { Store } from 'antd/es/form/interface';
import { ValidateErrorEntity } from 'rc-field-form/es/interface';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

function Demo2() {
  const [form] = Form.useForm();
  const { data = {} } = useRequest(
    'https://jsonplaceholder.typicode.com/photos',
    {
      formatResult: res => {
        const imgs = res.slice(0, 2).map((item: any) => item.url);
        console.log('imgs: ', imgs);
        return {
          imgs,
        };
      },
      onSuccess: res => {
        console.log('res: ', res);
        // form.resetFields();
        form.setFieldsValue(res);
      },
    },
  );

  const onFinish = (values: Store) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      layout="vertical"
      // {...formItemLayout}
      // initialValues={data}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="照片墙"
        name="imgs"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <PicUpload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button type="primary" htmlType="reset">
            Reset
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export default Demo2;
