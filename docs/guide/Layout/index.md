---
title: Layout 布局
---

## Umi 3 菜单配置

> [Pro Layout Plugin](https://github.com/umijs/plugin-layout)

### 编译时配置

config.ts

```ts
import { defineConfig, utils } from 'umi';

export default defineConfig({
  routes: route,
  layout: {
    name: 'Xtep Run',
    locale: true,
    // logo: 'https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/hero-flutter.jpg',
  },
});
```

| 属性   | 描述           | 类型      | 默认值                             |
| ------ | -------------- | --------- | ---------------------------------- |
| name   | 项目名称       | `string`  | packageName 产品名，默认值为包名。 |
| logo   | logo           | `url`     | 金融科技小蚂蚁 LOGO 产品 logo      |
| locale | 是否开启国际化 | `boolean` | `false`                            |

路由配置

todo 隐藏菜单

```ts
//config/route.ts
export const routes = [
  {
    path: '/welcome',
    component: 'IndexPage',
    menu: {
      name: '欢迎', // 兼容此写法
      icon: 'testicon',
    },
    layout: {
      hideNav: true,
    },
    // 没生效
    access: 'canRead',
  },
];
```

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 菜单上显示的名称，没有则不显示。 | `string` |  |
| menu | SideMenu 相关配置。默认为 false，表示在菜单中隐藏此项包括子项。 | `false \|IRouteMenuConfig` | `false` |
| layout | Layout 相关配置。 默认为 false， 默认展示选择的 layout 主题。 | `false \| IRouteLayoutConfig` | `false` |

SideMenu 相关配置。默认为 false，表示在菜单中隐藏此项包括子项。

| 属性         | 描述                                                       | 类型      | 默认值 |
| ------------ | ---------------------------------------------------------- | --------- | ------ |
| name         | 菜单上显示的名称，没有则不显示。                           | `string`  |        |
| icon         | 当前菜单的左侧 icon，可选 antd 的 icon name 和 url，可选。 | `string`  |        |
| hideChildren | 在菜单中隐藏他的子项，只展示自己。                         | `boolean` |        |
| flatMenu     | 默认为 false 在菜单中只隐藏此项，子项往上提，仍旧展示。    | `boolean` |        |

Layout 相关配置。 默认为 false， 默认展示选择的 layout 主题。

| 属性     | 描述                               | 类型      | 默认值  |
| -------- | ---------------------------------- | --------- | ------- |
| hideMenu | 当前路由隐藏左侧菜单，默认不隐藏。 | `boolean` | `false` |
| hideNav  | 当前路由隐藏导航头，默认不隐藏。   | `boolean` | `false` |

### 运行时配置

app.ts

```ts
export async function getInitialState() {
    // 请求用户信息
  const { userId, fole } = await getCurrentRole();
  return {
    name, // 默认 layout 导航右上角展示的用户名字段
    avatar,  // 默认 layout 导航右上角展示的用户头像字段
    ...
  };
}

export const layout = {
  logout: () => {
    alert('退出登陆成功');
  },
  rightRender:(initInfo)=> { return 'hahah'; },// return string || ReactNode;
  patchMenus: (menus: any) => {
    //   menu 是config中配置的routers
    return [
      ...menus,
      {
        name: '自定义',
        path: 'https://bigfish.alipay.com/',
      },
    ];
  },
};
```

<code src="./demo/layout.tsx" />
