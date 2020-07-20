import React from 'react';
import ProTable from '@ant-design/pro-table';
import { ProTableProps } from '@ant-design/pro-table/lib/Table';

const defaultPagination = {
  pageSize: 10,
  // pageSizeOptions: [5, 10, 20],
};

export interface TableProps<T, U> extends ProTableProps<T, U> {}

const Table = <
  T,
  U extends {
    [key: string]: any;
  } = {}
>(
  props: ProTableProps<T, U>,
) => {
  const { request, columns, rowKey, headerTitle, pagination = {}, toolBarRender } = props;

  return (
    <ProTable<T>
      columns={columns}
      request={request}
      rowKey={rowKey}
      headerTitle={headerTitle}
      pagination={{ ...defaultPagination, ...pagination }}
      toolBarRender={toolBarRender}
    />
  );
};
export default Table;
