import React from 'react';
import { Table } from 'xtep';
import { Button, Avatar } from 'antd';
import { useRequest } from '@umijs/hooks';
import { ProColumns } from '@ant-design/pro-table/lib/Table';
import { PlusOutlined } from '@ant-design/icons';

interface User {
  name: string;
  email: string;
  phone: string;
  websit: string;
}

// interface Result {
//   total: number;
//   data: User[];
//   success: boolean;
// }

export default () => {
  const { run } = useRequest(`https://jsonplaceholder.typicode.com/users`, {
    manual: true,
    formatResult: (res) => {
      console.log('res: ', res);
      return {
        data: res,
        total: res.length,
        success: true,
      };
    },
  });

  const columns: ProColumns<User>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      width: 72,
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      hideInSearch: true,
      render: (text) => <Avatar />,
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },

    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '联系方式',
      dataIndex: 'phone',
    },
  ];

  return (
    <>
      <Table<User>
        rowKey="id"
        request={run}
        columns={columns}
        dateFormatter="string"
        headerTitle="查询 Table"
        toolBarRender={() => [
          <Button key="3" type="primary">
            <PlusOutlined />
            新建
          </Button>,
        ]}
      />
    </>
  );
};
