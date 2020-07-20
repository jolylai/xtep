---
title: PicUpload 图片上传
nav:
  title: 组件
  path: /components
group:
  title: 数据录入
  path: /data-entry
---

# PicUpload 图片上传

## Todo

- [ ] 文件效验
- [ ] Value 初始化
- [ ] 上传文件件个数

## Demo

<code src="./demo/Demo1.tsx" />

## 文件效验

`beforeUpload`上传文件之前的钩子，参数为上传的文件

```js
const beforeUpload = (file, fileList) => boolean | Promise;
```

若返回 `false` 则停止上传，但**还是会调用`onChange({ file ,fileList})`**, `file`中没有`status`字段，。

支持返回一个 `Promise` `对象，Promise` 对象 `reject` 时则停止上传，**不会调用 `onChange({ file ,fileList})`**,`resolve` 时开始上传（ resolve 传入 File 或 Blob 对象则上传 resolve 传入对象）。注意：IE9 不支持该方法。

## 表单上传

<code src="./demo/Demo2.tsx" />

## API

| 属性       | 描述         | 类型     | 默认值                                       |
| ---------- | ------------ | -------- | -------------------------------------------- |
| acceptSize | 上传文件大小 | `number` | -                                            |
| acceptType | 上传文件类型 | `array`  | ['image/jpeg', 'image/png', 'image/svg+xml'] |
| limit      | 上传文件个数 | `number` | -                                            |
