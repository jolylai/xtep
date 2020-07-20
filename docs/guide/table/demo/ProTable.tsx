import React from 'react';
import { Button, Avatar } from 'antd';
import { useRequest } from '@umijs/hooks';
import { ProColumns } from '@ant-design/pro-table/lib/Table';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';

interface User {
  name: string;
  email: string;
  phone: string;
  websit: string;
  createTime: string[];
}

export default () => {
  // 当需要用到上次请求参数的时候可以通多 params 拿到
  const { run, params } = useRequest(`https://jsonplaceholder.typicode.com/users`, {
    manual: true,
    formatResult: (res) => {
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
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
  ];

  return (
    <>
      <ProTable<User>
        rowKey="id"
        request={run}
        columns={columns}
        dateFormatter="string"
        headerTitle="查询 Table"
        // 搜索之前进行对查询参数进行一些修改修改
        beforeSearchSubmit={(params) => {
          const { createTime, ...restParams } = params;
          if (createTime) {
            const startTime = moment(createTime[0]).format('YYYY-MM-DD 00:00:00');
            const endTime = moment(createTime[1]).format('YYYY-MM-DD 23:59:59');

            return { ...restParams, startTime, endTime };
          }
          return params;
        }}
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
