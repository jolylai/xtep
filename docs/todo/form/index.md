---
title: Form 表单
nav:
  title: Pomelo
  path: /pomelo
group:
  title: 数据录入
  path: /data-entry
---

# 表单

- For first render: use initialValues on Form
- For async set: use form.setFieldsValue
- For Form.List add: use add(initValue)

## 嵌套数据

<code src="./demo/nest.tsx" />

## 展现

文件上传时可以通过 getValueFromEvent 转行成需要的值

<code src="./demo/basic.tsx" />

要不要把 request 放到 Modal 中处理

## 效验信息

效验输入字段的值

<code src="./demo/message.tsx" />

## 动态

<code src="./demo/dynamic.tsx" />

## 格栅布局

<code src="./demo/grid-form.tsx" />

## 弹窗表单

<code src="./demo/form-in-modal.tsx" />

### 使用场景

Table 我们经常通过弹窗去新增或者修改一条数据

### FQA

Q: request 要放在 Modal 中处理吗

A: 对于业务组件还是放在 Modal 中进行处理这样 Modal 复用更加的舒服，不信是可以试下

Q: **表单为何不更新**

Q: 我点击编辑弹窗，并且已经传入了详情数据，但为何表单不更新到最新的数据

A: initialValues 只有初始化以及重置时生效 所以我们需要重置一下表单

```js
//   弹窗开启是重置表单到 initialValues
useEffect(() => {
  if (visible) {
    form.resetFields();
  }
}, [visible]);
```

我通过以上代码重置表单，但却收到一个警告

![](https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/use-form-warning.png)

这是因为

这是因为 Modal 首次是不渲染 Modal 中的内容，所以首次打开弹窗的时候表带还没初始化好就调用了重置表单的方法， 这时我们只需强制渲染表单中的内容就可以了

```
<Modal forceRender></Modal>
```
