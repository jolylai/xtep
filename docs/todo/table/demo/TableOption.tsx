import React from 'react';
import ProTable, {
  ProColumns,
  TableDropdown,
  ActionType,
} from '@ant-design/pro-table';
import { Modal } from 'antd';

interface TableListItem {
  recId: number;
  [key: string]: any;
}
type TableActionType = 'edit' | 'del';

const TableOption = () => {
  const handleAction = (
    key: TableActionType,
    record: TableListItem,
    action: ActionType,
  ) => {
    if (key === 'del') {
      Modal.confirm({
        title: '删除',
        content: '是否删除当前活动',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {},
      });
    }
    action.reload();
  };

  const handleEdit = (record: TableListItem) => {
    console.log('record: ', record);
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      //   fixed: 'left',
      width: 80,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      hideInSearch: true,
      fixed: 'right',
      width: 100,
      render: (text, record, _, action) => [
        <a key={1} onClick={() => handleEdit(record)}>
          编辑
        </a>,
        <TableDropdown
          onSelect={key => handleAction(key as TableActionType, record, action)}
          menus={[{ key: 'del', name: '删除' }]}
        />,
      ],
    },
  ];
  return (
    <ProTable<TableListItem>
      columns={columns}
      dataSource={[{ recId: 1 }]}
      search={false}
      options={false}
    />
  );
};

export default TableOption;
