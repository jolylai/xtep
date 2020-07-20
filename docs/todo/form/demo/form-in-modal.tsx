import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { ModalProps } from 'antd/lib/modal';

interface Data {
  [key: string]: any;
}

interface ModalFormProps extends Omit<ModalProps, 'onOk'> {
  onOk: (data: Data) => void;
  data: Data;
}

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

// 新增时的默认数据
const defaultValue = {};

const ModalForm = (props: ModalFormProps) => {
  const { onOk, ...restProps } = props;

  const [form] = Form.useForm();

  const [visible, setVisible] = useState(false);

  //   模拟传入的数据
  const [data, setData] = useState({});

  //   弹窗开启是重置表单到 initialValues
  useEffect(() => {
    if (visible) {
      form.resetFields();
    }
  }, [visible]);

  const handleOk = async () => {
    const fieldsValue = await form.validateFields();
    console.log('fieldsValue: ', fieldsValue);
    onOk(fieldsValue);
  };

  return (
    <>
      <Button
        type="primary"
        style={{ marginRight: 8 }}
        onClick={() => {
          setData({});
          setVisible(true);
        }}
      >
        新增
      </Button>
      <Button
        type="primary"
        onClick={() => {
          setData({ input: 'input' });
          setVisible(true);
        }}
      >
        编辑
      </Button>
      <Modal
        forceRender
        title={'新增'}
        bodyStyle={{ paddingBottom: 0 }}
        visible={visible} // delete
        onCancel={() => setVisible(false)}
        {...restProps}
        onOk={() => handleOk()}
      >
        <Form
          {...formItemLayout}
          form={form}
          initialValues={{ ...defaultValue, ...data }}
        >
          <Form.Item label="Input" name="input">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalForm;
