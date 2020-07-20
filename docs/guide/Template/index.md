---
title: Template 模板
---

# 模板

## Empty Page

```tsx
import React from 'react';
import { Button } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

function index() {
  return (
    <PageHeaderWrapper
      extra={
        <Button type="primary" onClick={() => history.push('/activity/common/add')}>
          新增
        </Button>
      }
    >
      index
    </PageHeaderWrapper>
  );
}

export default index;
```

## Service.ts

```ts
import request from '@/utils/request';

interface TableListParams {
  pageSize: number;
  pageNumber: number;
}

export async function query(params: TableListParams) {
  return request('/apipc/activity/common/query', {
    method: 'post',
    data: params,
  });
}
```

## 码表

```ts
const conversionSysCodeToEnum = (sysCode: any[]) =>
  sysCode.reduce(
    (result: any, item: { id: any; name: any }) => ({
      ...result,
      [item.id]: item.name,
    }),
    {},
  );

// 查码表值
const { data: sysCodeData, run: runQuerySysCode } = useRequest(querySysCode, {
  defaultParams: [{ types: ['xrun_propery_type', 'xrun_runner_user'] }],
  initialData: { typeValueEnum: {}, fieldNameEnum: {} },
  manual: true,
  formatResult: (response) => {
    if (response.status) {
      const data = response.body;
      const typeValueEnum = conversionSysCodeToEnum(data['xrun_propery_type']);
      const fieldNameEnum = conversionSysCodeToEnum(data['xrun_runner_user']);
      return { typeValueEnum, fieldNameEnum };
    }
    return {};
  },
});
```
