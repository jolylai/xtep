import React, { useEffect } from 'react';
import { Modal, Form } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import { ProColumns } from '@ant-design/pro-table/lib/Table';
import TableInputRender from './TableInputRender';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

export interface CreateModalProps<T> extends Omit<ModalProps, 'onOk'> {
  columns: ProColumns<any>[];
  onOk: (values: T) => void;
  data: T;
}

function CreateModal<T>(props: CreateModalProps<T>) {
  const { visible, onOk, columns, title = '新增', onCancel, data } = props;
  const [form] = Form.useForm();

  //   弹窗开启是重置表单到 initialValues
  useEffect(() => {
    if (visible) {
      form.resetFields();
    }
  }, [visible]);

  const genFormItem = columns
    .filter((column) => (typeof column.hideInForm === 'boolean' ? !column.hideInForm : true))
    .filter((column) => !['option', 'index', 'indexBorder'].includes(column.valueType as string))
    .map((column) => (
      <Form.Item
        key={column.dataIndex as string}
        name={column.dataIndex}
        label={column.title}
        rules={column.rules}
      >
        <TableInputRender item={column} />
      </Form.Item>
    ));

  const handleOk = async () => {
    const values = await form.validateFields();
    onOk({ ...data, ...values });
  };

  return (
    <Modal forceRender visible={visible} title={title} onCancel={onCancel} onOk={handleOk}>
      <Form {...formItemLayout} form={form} initialValues={data}>
        {genFormItem}
      </Form>
    </Modal>
  );
}

export default CreateModal;
