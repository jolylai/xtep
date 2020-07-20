---
title: 网络请求
---

> [plugin-request](https://umijs.org/zh-CN/plugins/plugin-request#errorconfigadaptor)

## 约定

前端：小姐姐（后端）接口返回数据的时候按照下面的格式返回来

```js
interface ErrorInfoStructure {
  // 请求成功还是失败
  success: boolean;
  // 响应的数据
  data?: any;
  // 错误类型code
  errorCode?: string;
  // 展示给用户的错误信息
  errorMessage?: string;
  // error display type： 0 silent; 1 message.warn; 2 message.error; 4 notification; 9 page
  showType?: number;
  // Convenient for back-end Troubleshooting: unique request ID
  traceId?: string;
  // onvenient for backend Troubleshooting: host of current access server
  host?: string;
}
```

后端：好的，我已经按照上面这个格式给你返回了,[http://www.mocky.io/v2/5ed7139c320000df0f2744cd](http://www.mocky.io/v2/5ed7139c320000df0f2744cd),这接口你拿去试下，返回数据如下

```json
{
  "data": "hello",
  "success": true
}
```

前端： 我来试试，先创建个 `service.js`

```ts | pure
import { request } from 'umi';

export async function query() {
  return request('http://www.mocky.io/v2/5ed7139c320000df0f2744cd');
}
```

再来个 Demo 试下

```js
import { useRequest } from '@umijs/hooks';
import { query } from './service';

const RequestDemo = () => {
  const { data } = useReuest(query, {
    formatResult: (res) => res?.data,
  });
  console.log('data: ', data); // hello
};

export default RequestDemo;
```

调通了，但是还不够完美，每次使用 `useRequest` 都要写`formatResult: (res) => res?.data,`太麻烦了

```js
import { useRequest } from 'umi';
import { query } from './service';

const RequestDemo = () => {
  const { data } = useReuest(query);
  console.log('data: ', data); // hello
};

export default RequestDemo;
```

按照我们约定的返回数据格式，`import { useRequest } from 'umi'` 内置了 `formatResult: res => res?.data`，当然你也可以自己配置 formatResult 来覆盖内置的这个逻辑。

## 错误处理

```json
{
  "data": any,
  "success": boolean,
  "message": string
}
```

- `data`：存放我们需要是数据
- `success`：接口是否成功的调用
- `message`： 错误时候提示的信息

## 配置

由于不可描述的原因后端返回的数据格式并没有按照我们约定的格式来，比如后端返回的格式为

```json
{
  "status": true,
  "body": {},
  "message": "success"
}
```

这是我们就需要将返回的数据格式化成我们约定的格式

### 构建时配置

只能做些简单的配置

```js
// config.ts
export default {
  request: {
    dataField: 'body',
  },
};
```

`dataField: 'body'`的时候 `uesRequest`默认`formatResult: res => res?.body`处理。

`dataField: ''`的时候 `uesRequest`不做`formatResult: res => res?.data`处理。

### 运行时配置

```ts | pure
// app.ts
import { RequestConfig } from 'umi';

export const request: RequestConfig = {
  errorConfig: {
    adaptor: (resData) => {
      const { body, status, message } = resData;
      return {
        data: body,
        success: status,
        errorMessage: message,
      };
    },
  },
};
```

简单的配置就转换成我们想要的数据格式，再也不用求着后端同学按照我们约定的格式返回了
