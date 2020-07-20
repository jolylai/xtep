import React, { useRef, useState } from 'react';

import { Button, Popconfirm, Table, Divider } from 'antd';

import ProTable from '@ant-design/pro-table';
import { ProColumns } from '@ant-design/pro-table/lib/Table';
import { ColumnsType } from 'antd/es/table';
import { PlusOutlined } from '@ant-design/icons';
import CreateModal from './components/CreateModal';
import { PaginationConfig } from 'antd/es/pagination';

const defaultPagination = {
  // showSizeChanger: true,
  // showQuickJumper: true,
  showTotal: (total: number) => `共 ${total} 条`,
  current: 1,
  pageSize: 5,
  pageSizeOptions: ['5', '10', '20', '30'],
};

type getRowKey<T> = (data: T) => string;

interface TableFormProps<T> {
  rowKey: string | getRowKey<T>;
  columns: ColumnsType;
  value?: T[];
  onChange?: (value: T[]) => void;
}

interface ActionType {
  remove: () => void;
  edit: () => void;
  copy: () => void;
}

const FormTable = <T extends { key: string; [key: string]: any }>(props: TableFormProps<T>) => {
  const keyRef = useRef(-1);
  const { columns = [], value = [], onChange = () => {}, rowKey } = props;

  // 为数据赋值一个默认的 key
  const dataSource = (value || []).map((item, index) => {
    if (typeof rowKey === 'string') {
      return { key: item[rowKey], ...item };
    }

    if (typeof rowKey === 'function') {
      return { key: rowKey(item), ...item };
    }

    return { key: index, ...item };
  });
  console.log('dataSource: ', dataSource);

  // 新增弹窗
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [createModalData, setCreateModalData] = useState<T | {}>({});

  const handleCreateModalOk = (fieldsValue: T) => {
    keyRef.current += 1;

    if (typeof rowKey === 'string' && createModalData[rowKey]) {
      // 编辑

      const temp = dataSource.map((item) => {
        if (item[rowKey] === createModalData[rowKey]) {
          return {
            ...createModalData,
            ...fieldsValue,
          };
        }
        return item;
      });
      onChange(temp);
      setCreateModalData({});
    } else {
      // 新增

      onChange(dataSource.concat(fieldsValue));
    }
    setCreateModalVisible(false);
  };

  const handleCreateModalCancel = () => {
    setCreateModalVisible(false);
  };

  //   新增
  const handleAdd = () => {
    setCreateModalVisible(true);
  };

  //   复制
  const handleCopy = (record: T) => {
    if (typeof rowKey === 'string') {
      delete record[rowKey];
    }
    keyRef.current += 1;
    record.key = `KEY_COPY_${keyRef.current}`;
    onChange(dataSource.concat(record));
  };

  //   编辑
  const handleEdit = (record: T) => {
    setCreateModalData(record);
    setCreateModalVisible(true);
  };

  //   删除
  const handleDel = (index: number) => {
    const temp = value.filter((_, i: number) => index !== i);
    onChange(temp);
  };

  // 分页
  const [pagination, setPagination] = useState<PaginationConfig>(defaultPagination);

  const handleChange = (pagination: PaginationConfig) => {
    setPagination(pagination);
  };

  const optionColumn: ProColumns<T> = {
    title: '操作',
    dataIndex: 'option',
    valueType: 'option',
    width: 180,
    render: (text: any, record: any, index: number, action: any) => {
      return (
        <>
          <a key={3} onClick={() => handleCopy(record)}>
            复制
          </a>
          <Divider type="vertical" />
          <a key={4} onClick={() => handleEdit(record)}>
            编辑
          </a>
          <Divider type="vertical" />
          <Popconfirm title="是否要删除此行？" onConfirm={() => handleDel(index)}>
            <a>删除</a>
          </Popconfirm>
        </>
      );
    },
  };

  // const genColumnList = (columns: ProColumns<T>[]) =>
  //   columns.map((column) => {
  //     return {
  //       ...column,
  //       render: (text, record, index) => {
  //         if (column.render) {
  //           const action: ActionType = {
  //             remove: () => handleDel(index),
  //             copy: () => handleCopy(record),
  //             edit: () => handleEdit(record),
  //           };
  //           return column.render(text, record, index, action);
  //         }
  //         return text;
  //       },
  //     };
  //   });

  return (
    <>
      <CreateModal<T>
        data={createModalData}
        columns={columns}
        visible={createModalVisible}
        onOk={handleCreateModalOk}
        onCancel={handleCreateModalCancel}
      />
      <ProTable<T>
        rowKey="key"
        size="small"
        columns={columns.concat(optionColumn)}
        dataSource={dataSource}
        pagination={pagination}
        onChange={handleChange}
        footer={() => (
          <Button block type="primary" onClick={handleAdd} style={{ marginTop: 8 }}>
            <PlusOutlined />
            新建
          </Button>
        )}
      />
    </>
  );
};

export default React.memo(FormTable);
