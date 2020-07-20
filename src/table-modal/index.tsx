import React, { useEffect } from 'react';
import { Modal, message } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import { ProColumns } from '@ant-design/pro-table/lib/Table';
import { useDynamicList } from '@umijs/hooks';
import { RequestData } from '@ant-design/pro-table/lib/useFetchData';
import ProTable from '@ant-design/pro-table';
import { TablePaginationConfig } from 'antd/es/table';

export interface TableModalProps<T> extends Omit<ModalProps, 'onOk'> {
  rowKey: string;
  multiple?: boolean;
  columns: ProColumns<T>[];
  request?: (
    params?: any & {
      pageSize?: number;
      current?: number;
    },
  ) => Promise<RequestData<T>>;
  onOk?: (data: T | T[]) => void;
}

const defaultPagination: TablePaginationConfig = {
  pageSize: 5,
  pageSizeOptions: ['5', '10', '20'],
};

function TableModal<T>(props: TableModalProps<T>) {
  const {
    request,
    columns,
    visible,
    onOk,
    onCancel,
    width = 800,
    title,
    multiple = true,
    rowKey = 'id',
  } = props;

  const { list, push, remove, merge, resetList } = useDynamicList<T>([]);

  const selectedRowKeys = list.map((item: any) => item[rowKey]).filter(Boolean);

  // 弹窗关闭时清空已选
  useEffect(() => {
    if (!props.visible) {
      resetList([]);
    }
  }, [props.visible]);

  const getIndex = (record: any) => {
    return list.findIndex((item: any) => item[rowKey] === record[rowKey]);
  };

  // 单行选择
  const handleSelect = (record: any, selected: boolean) => {
    //   单选
    if (!multiple) {
      resetList([record]);
      return;
    }

    //   多选
    if (selected) {
      push(record);
    } else {
      const index = getIndex(record);
      remove(index);
    }
  };

  // 全选
  const handleSelectAll = (selected: boolean, selectedRows: T[], changeRows: T[]) => {
    console.log('selectedRows: ', selectedRows);
    console.log('changeRows: ', changeRows);

    if (selected) {
      // changeRows antd 存在bug
      changeRows = changeRows.filter((row: any) => !selectedRowKeys.includes(row[rowKey]));

      merge(list.length, changeRows);
    } else {
      // changeRows antd 存在bug
      changeRows = changeRows.filter((row: any) => selectedRowKeys.includes(row[rowKey]));

      const removekeys = changeRows.map((row: any) => row[rowKey]);
      const restList = list.filter((item: any) => !removekeys.includes(item[rowKey]));
      resetList(restList);
    }
  };

  const handleOk = () => {
    if (!list.length) {
      message.warning('请选择数据');
      return;
    }
    if (typeof onOk !== 'function') {
      return;
    }
    if (multiple) {
      onOk(list);
    } else {
      onOk(list[0]);
    }
  };

  return (
    <Modal visible={visible} onCancel={onCancel} onOk={handleOk} width={width} title={title}>
      <ProTable<T>
        rowKey={rowKey}
        options={false}
        toolBarRender={false}
        pagination={defaultPagination}
        request={request}
        columns={columns}
        rowSelection={{
          type: multiple ? 'checkbox' : 'radio',
          selectedRowKeys: selectedRowKeys,
          onSelect: handleSelect,
          onSelectAll: handleSelectAll,
        }}
        tableAlertRender={() => `当前共选中${list.length} 项`}
        tableAlertOptionRender={() => [
          <a key={1} onClick={() => resetList([])}>
            清空
          </a>,
        ]}
      />
    </Modal>
  );
}

export default TableModal;
