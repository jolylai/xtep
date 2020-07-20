import React from 'react';
import { Form, Row, Col, Input, Card, DatePicker } from 'antd';

const colLayout = {
  xl: { span: 6, offset: 2 },
  lg: { span: 8 },
  md: { span: 12 },
  sm: 24,
};

const GridForm = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Card title={<div>基本信息</div>}>
        <Row gutter={16}>
          <Col lg={6} md={12} sm={24}>
            <Form.Item
              label="名称"
              name="title"
              rules={[{ required: true, message: '请输入活动名称!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col
            xl={{ span: 6, offset: 2 }}
            lg={{ span: 8 }}
            md={{ span: 12 }}
            sm={24}
          >
            <Form.Item
              label="活动时间"
              name="activeTime"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <DatePicker.RangePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col
            xl={{ span: 8, offset: 2 }}
            lg={{ span: 10 }}
            md={{ span: 24 }}
            sm={24}
          >
            <Form.Item
              label="报名时间"
              name="entryTime"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <DatePicker.RangePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default GridForm;
