import React, { useState } from 'react';
import { Button } from 'antd';
import { TableModal } from 'xtep';
import { useRequest } from '@umijs/hooks';
import { ProColumns } from '@ant-design/pro-table/lib/Table';

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

  const [visible, setVisible] = useState(false);

  const columns: ProColumns<User>[] = [
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

  const handleOk = (data: User | User[]) => {
    console.log('data: ', data);
  };

  return (
    <>
      <TableModal<User>
        title="新增"
        rowKey="id"
        multiple={false}
        visible={visible}
        request={run}
        onCancel={() => setVisible(false)}
        columns={columns}
        onOk={handleOk}
      />
      <Button type="primary" onClick={() => setVisible(true)}>
        单选
      </Button>
    </>
  );
};
