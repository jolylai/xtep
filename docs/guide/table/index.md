---
title: table
---

## Todo

- [ ] 分页参数
- [ ] 文件导出
- [ ] 默认参数

## Demo

<code src="./demo/ProTable.tsx" />

### 默认参数

```js
const defaultPagination = {
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number) => `共 ${total} 条`,
  current: 1,
  pageSize: 10,
  pageSizeOptions: ['10', '20', '30'],
};

const defaultProTableParams = {
  pagination: defaultPagination,
};
```

### request

ProTable 可以同过 request 中响应的数据格式

```json
{
  "data": [],
  "total": 10,
  "success": true
}
```

## 导出

安装`file-saver`

```bash
yarn add file-saver
```

封装一些常用的文件类型导出

```js
import { saveAs } from 'file-saver';

export function exportAsExcel(data: Blob, fileName: string) {
  const blobData = new Blob([data], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
  });
  saveAs(blobData, fileName);
}

export function exportAsPDF(data: Blob, fileName: string) {
  const blobData = new Blob([data], {
    type: 'application/pdf',
  });
  saveAs(blobData, fileName);
}

export function exportAsCsv(data: Blob, fileName: string) {
  const blobData = new File([data], {
    type: 'text/csv;charset=utf-8',
  });
  saveAs(blobData, `${fileName}.csv`);
}
```

`serve.js` 这里需要把 responseType 设置为 blob

```ts | pure
import { request } from 'umi';

export async function exportExcel(data) {
  return request('/apipc/common/form/export', {
    method: 'post',
    data,
    responseType: 'blob',
  });
}
```

```ts
import React from 'react';
import { Button, Avatar } from 'antd';
import { useRequest } from '@umijs/hooks';
import { history } from 'umi';
import moment from 'moment';
import Protable from '@ant-design/pro-table';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import omit from 'omit.js';

import { ProColumns } from '@ant-design/pro-table/lib/Table';
import { query, queryRunClub } from './service';
import { MemberListItem, RunClubListItem } from './data';
import { exportExcel } from '@/services/common';
import { exportAsExcel } from '@/utils/utils';

export default function () {
  const { run: runQuery, params } = useRequest<ResponseList<MemberListItem>>(query, {
    defaultParams: [{ current: 1, pageSize: 2 }],
    formatResult: (response) => {
      if (!response.status) {
        return {
          success: false,
        };
      }
      return {
        success: true,
        data: response.body.list,
        total: response.body.total,
      };
    },
  });

  const columns: ProColumns<MemberListItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      fixed: 'left',
      width: 60,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      width: 160,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      width: 80,
      render: (text, record, _, action) => [
        <a key={1} onClick={() => handleView(record)}>
          查看
        </a>,
      ],
    },
  ];

  //   导出
  const exportExcelRequest = useRequest(exportExcel, {
    manual: true,
    onSuccess: (data) => {
      exportAsExcel(data, '文件名');
    },
  });

  const handleExportExcel = () => {
    exportExcelRequest.run({
      // 导出需要的参数
    });
  };

  return (
    <PageHeaderWrapper
      extra={
        <Button type="primary" onClick={handleExportExcel} loading={exportExcelRequest.loading}>
          导出
        </Button>
      }
    >
      <Protable rowKey="userId" columns={columns} request={runQuery} />
    </PageHeaderWrapper>
  );
}
```
