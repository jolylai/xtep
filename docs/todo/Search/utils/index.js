import { Badge } from 'antd';

/**
 * 转化 text 和 valueEnum
 * @param text
 * @param valueEnum
 * 状态 Enum{ 'success', 'processing, 'default', 'error', 'warning' }
 *
 */
export const parsingText = (text, valueEnum, pure) => {
  if (!valueEnum) {
    return text;
  }
  const domText = valueEnum[text];
  if (!domText) {
    return text;
  }

  if (domText.status) {
    if (pure) {
      return domText.text;
    }
    const { status } = domText;
    return <Badge status={status} text={domText.text}></Badge>;
  }

  return domText.text || domText;
};

export /**
 * dataIndex 为数组 且 value 为日期范围
 *
 * @param {*} text 列的值
 * @param {*} item 列配置
 * @param {*} row  行数据
 * @returns ’string' | 'array'
 */
const parsingDataIndex = (text, item, row) => {
  const { dataIndex, valueType } = item;
  if (Array.isArray(dataIndex) && ['dateRange', 'dateTimeRange'].includes(valueType)) {
    return [row[dataIndex[0]], row[dataIndex[1]]];
  }
  return text;
};

/**
 *  获取进度条状态
 *
 * @param {*} text number 'success' | 'exception' | 'normal' | 'active'
 */
export function getProgressStatus(text) {
  if (typeof text !== 'number') {
    return 'exception';
  }
  if (text === 100) {
    return 'success';
  }
  if (text < 100) {
    return 'active';
  }

  // magic
  if (text < 0) {
    return 'exception';
  }
  return 'normal';
}

export /**
 *
 *
 * @param {*} valueEnum { all: { text: '全部', status: 'Default' } },
 *
 */
const parsingValueEnumToArray = (valueEnum) =>
  Object.keys(valueEnum).map((key) => {
    const value = valueEnum[key];
    return {
      text: value.text || value || '',
      value: key,
    };
  });

/**
 * 判断 DataType 是不是日期类型
 * @param type
 */
export const isDateValueType = (type) => {
  let valueType = type;
  if (typeof type === 'function') {
    // 如果是 object 说明是进度条，直接返回 false
    if (typeof type({}) === 'object') {
      return false;
    }
    valueType = type({});
  }
  const dateTypes = ['date', 'dateRange', 'dateTimeRange', 'dateTime', 'time'];
  return dateTypes.includes(valueType);
};

/**
 * 判断是否为图片地址
 * @param {String}    path
 */
export const isImageUrl = (path) => {
  const reg = /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i;
  return reg.test(path);
};
