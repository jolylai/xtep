---
title: Table
nav:
  title: 组件
  path: /components
group:
  title: 数据展现
  path: /data-display
---

## Todo

- 头像
- 列表图片集预览
- 列表字段过多时候滚动展示
- 操作列
- 序号
- [ ] 默认分页
- [ ] 请求封装

## Table

<code src="./demo/Demo2.tsx" />
<code src="./demo/Demo3.tsx" />

<!-- <code src="./demo/Demo1.tsx" /> -->

## 默认分页信息

```ts
const defaultPagination = {
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number) => `共 ${total} 条`,
  current: 1,
  pageSize: 10,
  pageSizeOptions: ['10', '20', '30'],
};
```

## 数据请求

```ts
interface RequestParams {
    current?: number;
    pageSize?: number;
    [key:string]: any;
}

 interface RequestData {
    data: [];
    success?: boolean;
    total?: number;
}
 (params:RequestParams) => Promise<RequestData>;
```

reqest 返回的数据

```json
{
  "data": [],
  "page": 1,
  "success": true,
  "total": 5713
}
```

### Opitons

table 的默认操作，设置为 false 可以关闭它

```js
options={{
    density: true,
    reload: () => {
        setLoading(true);
        setTimeout(() => {
        setLoading(false);
        }, 1000);
    },
    fullScreen: true,
    setting: true,
}}
```

## 操作列

<code src="./demo/TableOption.tsx" />

## 表单

这只是一个简单的表单封装，类似于 table 上的搜索栏，没有必填效验配置，等表单处理，所以需要完整的表单功能还是用 Form 组件

<code src="./demo/TableForm.tsx" />
