export default {
  title: 'Xtep',
  mode: 'site',
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
    ],
  ],
  // externals: {
  //   // QMap: 'qq.maps',
  //   AMap: 'AMap',
  // },
  // scripts: [
  //   // 'https://map.qq.com/api/js?v=2.exp&key=DSABZ-2CNK4-VP6U7-DLBHZ-KNLBS-H3BXB',
  //   'https://webapi.amap.com/maps?v=1.4.15&key=d2b94f8c9ec90eb77fa8514bd3f56323',
  // ],
  hash: true,
};
