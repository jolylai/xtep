---
title: Authority 权鉴
---

# 权限

路由配置格式

```json
{
  "path": "/",
  "component": "../layouts/BasicLayout",
  "Routes": ["src/pages/Authorized"],
  "authority": ["admin", "user"],
  "routes": [
    // forms
    {
      "path": "/form",
      "icon": "form",
      "name": "form",
      "routes": [
        {
          "path": "/form/basic-form",
          "name": "basicform",
          "component": "./Forms/BasicForm"
        },
        {
          "path": "/form/advanced-form",
          "name": "advancedform",
          "authority": ["admin"], //配置准入权限,可以配置多个角色
          "component": "./Forms/AdvancedForm"
        }
      ]
    }
  ]
}
```

```jsx | pure

/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */
export const getAuthorityFromRouter = <T extends Route>(
  router: T[] = [],
  pathname: string,
): T | undefined => {
  const authority = router.find(
    ({ routes, path = '/' }) =>
      (path && pathRegexp(path).exec(pathname)) ||
      (routes && getAuthorityFromRouter(routes, pathname)),
  );
  if (authority) return authority;
  return undefined;
};

// props.route.routes 约定试生成的路由 或者 请求返回的路由配置
const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: undefined,
  };
 <Authorized authority={authorized!.authority} noMatch={noMatch}>
    {children}
</Authorized>
```

## 权限检查

```tsx | pure
import React from 'react';
import { CURRENT } from './renderAuthorize';
// eslint-disable-next-line import/no-cycle
import PromiseRender from './PromiseRender';

export type IAuthorityType =
  | undefined
  | string
  | string[]
  | Promise<boolean>
  | ((currentAuthority: string | string[]) => IAuthorityType);

/**
 * 通用权限检查方法
 * Common check permissions method
 * @param { 权限判定 | Permission judgment } authority
 * @param { 你的权限 | Your permission description } currentAuthority
 * @param { 通过的组件 | Passing components } target
 * @param { 未通过的组件 | no pass components } Exception
 */
const checkPermissions = <T, K>(
  authority: IAuthorityType,
  currentAuthority: string | string[],
  target: T,
  Exception: K,
): T | K | React.ReactNode => {
  // 没有判定权限.默认查看所有
  // Retirement authority, return target;
  if (!authority) {
    return target;
  }
  // 数组处理
  if (Array.isArray(authority)) {
    if (Array.isArray(currentAuthority)) {
      if (currentAuthority.some((item) => authority.includes(item))) {
        return target;
      }
    } else if (authority.includes(currentAuthority)) {
      return target;
    }
    return Exception;
  }
  // string 处理
  if (typeof authority === 'string') {
    if (Array.isArray(currentAuthority)) {
      if (currentAuthority.some((item) => authority === item)) {
        return target;
      }
    } else if (authority === currentAuthority) {
      return target;
    }
    return Exception;
  }
  // Promise 处理
  if (authority instanceof Promise) {
    return <PromiseRender<T, K> ok={target} error={Exception} promise={authority} />;
  }
  // Function 处理
  if (typeof authority === 'function') {
    try {
      const bool = authority(currentAuthority);
      // 函数执行后返回值是 Promise
      if (bool instanceof Promise) {
        return <PromiseRender<T, K> ok={target} error={Exception} promise={bool} />;
      }
      if (bool) {
        return target;
      }
      return Exception;
    } catch (error) {
      throw error;
    }
  }
  throw new Error('unsupported parameters');
};

export { checkPermissions };

function check<T, K>(authority: IAuthorityType, target: T, Exception: K): T | K | React.ReactNode {
  return checkPermissions<T, K>(authority, CURRENT, target, Exception);
}

export default check;
```

layout/index

```tsx | pure
import React from 'react';
import { BasicLayoutProps } from '@ant-design/pro-layout';
import BasicLayout from './BasicLayout';
import UserLayout from './UserLayout';

const index: React.FC<BasicLayoutProps> = (props) => {
  const { location } = props;
  const { pathname } = location;
  if (/\/user/i.test(pathname)) {
    return <UserLayout {...props} />;
  }
  return <BasicLayout {...props} />;
};

export default index;
```
