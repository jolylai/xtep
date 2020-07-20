import React, { Fragment } from 'react';
import ProLayout, {
  PageHeaderWrapper,
  PageLoading,
  MenuDataItem,
  RouteContext,
} from '@ant-design/pro-layout';
import { SmileOutlined, HeartOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Descriptions, Statistic } from 'antd';

const IconMap = {
  smile: <SmileOutlined />,
  heart: <HeartOutlined />,
};

const defaultMenus = [
  {
    path: '/',
    name: 'welcome',
    icon: 'smile',
    children: [
      {
        path: '/welcome',
        name: 'one',
        icon: 'smile',
        children: [
          {
            path: '/welcome/welcome',
            name: 'two',
            icon: 'smile',
            exact: true,
          },
        ],
      },
    ],
  },
  {
    path: '/demo',
    name: 'demo',
    icon: 'heart',
  },
];

const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] =>
  menus.map(({ icon, children, ...item }) => ({
    ...item,
    icon: icon && IconMap[icon as string],
    children: children && loopMenuItem(children),
  }));

const mobileMenu = (
  <Menu>
    <Menu.Item key="1">操作一</Menu.Item>
    <Menu.Item key="2">操作二</Menu.Item>
    <Menu.Item key="3">选项一</Menu.Item>
    <Menu.Item key="4">选项二</Menu.Item>
    <Menu.Item key="">选项三</Menu.Item>
  </Menu>
);

const menu = (
  <Menu>
    <Menu.Item key="1">选项一</Menu.Item>
    <Menu.Item key="2">选项二</Menu.Item>
    <Menu.Item key="3">选项三</Menu.Item>
  </Menu>
);

const action = (
  <RouteContext.Consumer>
    {({ isMobile }) => {
      if (isMobile) {
        return (
          <Dropdown.Button
            type="primary"
            icon={<SmileOutlined />}
            overlay={mobileMenu}
            placement="bottomRight"
          >
            主操作
          </Dropdown.Button>
        );
      }
      return (
        <Fragment>
          <Button.Group>
            <Button>操作一</Button>
            <Button>操作二</Button>
            <Dropdown overlay={menu} placement="bottomRight">
              <Button>
                <SmileOutlined />
              </Button>
            </Dropdown>
          </Button.Group>
          <Button type="primary">主操作</Button>
        </Fragment>
      );
    }}
  </RouteContext.Consumer>
);

const description = (
  <RouteContext.Consumer>
    {({ isMobile }) => (
      <Descriptions size="small" column={isMobile ? 1 : 2}>
        <Descriptions.Item label="创建人">曲丽丽</Descriptions.Item>
        <Descriptions.Item label="订购产品">XX 服务</Descriptions.Item>
        <Descriptions.Item label="创建时间">2017-07-07</Descriptions.Item>
        <Descriptions.Item label="关联单据">
          <a href="">12421</a>
        </Descriptions.Item>
        <Descriptions.Item label="生效日期">
          2017-07-07 ~ 2017-08-08
        </Descriptions.Item>
        <Descriptions.Item label="备注">请于两个工作日内确认</Descriptions.Item>
      </Descriptions>
    )}
  </RouteContext.Consumer>
);

const extra = (
  <div>
    <Statistic title="订单金额" value={568.08} prefix="¥" />
  </div>
);

export default () => {
  return (
    <ProLayout menuDataRender={() => loopMenuItem(defaultMenus)}>
      <PageHeaderWrapper
        title="欢迎使用"
        extra={action}
        content={description}
        extraContent={extra}
      >
        Hello World
        <PageLoading />
      </PageHeaderWrapper>
    </ProLayout>
  );
};
