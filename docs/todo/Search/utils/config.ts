export const defaultColConfig = {
  lg: 8,
  md: 12,
  xxl: 6,
  xl: 8,
  sm: 12,
  xs: 24,
};

export const defaultFormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    xl: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    xl: { span: 18 },
  },
};

export const defaultSearch = {
  searchText: '查询',
  resetText: '重置',
  span: defaultColConfig,
  collapseRender: (collapsed) => (collapsed ? '展开' : '收起'),
};

export const defaultPagination = {
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total) => `共 ${total} 条`,
  current: 1,
  total: 0,
  pageSize: 10,
  pageSizeOptions: ['10', '20', '30'],
};
