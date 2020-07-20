import React from 'react';
import { Form, Divider, Popconfirm } from 'antd';
import { TableForm } from 'xtep';
import { useRequest } from '@umijs/hooks';
import { ProColumns } from '@ant-design/pro-table/lib/Table';

interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
}

function Demo1() {
  const [form] = Form.useForm();

  // const { data, loading } = useRequest(`https://jsonplaceholder.typicode.com/users`, {
  //   onSuccess: (res) => {
  //     console.log('res: ', res);
  //     form.setFieldsValue({ users: res });
  //   },
  // });

  const dataSource = [
    {
      id: 1,
      name: 'nakc',
      phone: '12312412',
      email: '1134@qq.com',
    },
  ];

  const columns: ProColumns<User>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 72,
      render: (text, reocrd, index) => index + 1,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      copyable: true,
      ellipsis: true,
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
      width: 200,
      hideInSearch: true,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      valueType: 'money',
    },
    // {
    //   title: '操作',
    //   dataIndex: 'option',
    //   valueType: 'option',
    //   width: 180,
    //   render: (text: any, record: any, index: number, action: any) => {
    //     console.log('action: ', action);
    //     return (
    //       <>
    //         <a key={3} onClick={() => action.copy(record)}>
    //           复制
    //         </a>
    //         <Divider type="vertical" />
    //         <a key={4} onClick={() => action.edit(record)}>
    //           编辑
    //         </a>
    //         <Divider type="vertical" />
    //         <Popconfirm title="是否要删除此行？" onConfirm={() => action.remove(index)}>
    //           <a>删除</a>
    //         </Popconfirm>
    //       </>
    //     );
    //   },
    // },
  ];

  return (
    <Form.Provider
      onFormFinish={(name, { values, forms }) => {
        // if (name === 'userForm') {
        //   const { basicForm } = forms;
        //   const users = basicForm.getFieldValue('users') || [];
        //   basicForm.setFieldsValue({ users: [...users, values] });
        //   setVisible(false);
        // }
      }}
    >
      <Form form={form} initialValues={{ users: dataSource }}>
        <Form.Item name="users">
          <TableForm<User>
            name="formTable"
            rowKey="id"
            columns={columns}
            dataSource={dataSource}
            // loading={loading}
          />
        </Form.Item>
      </Form>
    </Form.Provider>
  );
}

export default Demo1;
