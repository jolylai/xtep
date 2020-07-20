---
title: TableModal
nav:
  title: 组件
  path: /components
group:
  title: 数据录入
  path: /data-entry
---

## 单选

<code src="./demo/Demo1.tsx" />

## 多选

<code src="./demo/Demo2.tsx" />

## API

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | 是否显示 | `boolean` | - |
| title | 弹窗标题 | `string` | 新增 |
| width | 弹窗宽度 | `number` | 800 |
| onOk | 点击确定回调 | `(data)=> void` | - |
| onCancel | 点击遮罩层或右上角叉或取消按钮的回调 | `()=> void` | - |
| rowKey | 表格行 key 的取值 | `string` | - |
| multiple | 是否多选 | `boolean` | `true` |
| request | 一个获得 dataSource 的方法 | `(params?: {pageSize: number;current: number;[key: string]: any;}) => Promise<RequestData<T>>` | - |
| columns | 表格列的配置描述，具体项见下表 | [ProColumns](https://protable.ant.design/api) | - |
