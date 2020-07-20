import React from 'react';
import { Search } from 'xtep';

function Demo1() {
  const columns: ProColumns[] = [
    // {
    //   title: '序号',
    //   dataIndex: 'index',
    //   valueType: 'indexBorder',
    //   width: 72,
    // },
    {
      title: '标题',
      dataIndex: 'name.first',
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
      title: 'phone',
      dataIndex: 'phone',
    },
    {
      title: '状态',
      dataIndex: 'state',
      initialValue: 'all',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
        },
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'name',
      dataIndex: 'name',
    },
  ];

  return <Search columns={columns} />;
}

export default Demo1;
