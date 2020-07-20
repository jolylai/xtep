import { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'antd';
import { useBoolean } from '@umijs/hooks';
import useMediaQuery from 'use-media-antd-query';
import { StepBackwardOutlined } from '@ant-design/icons';
import FormOption from './FormOption';
import { isDateValueType } from './utils/';
import moment from 'moment';
import { defaultColConfig, defaultFormItemLayout, defaultSearch } from './utils/config';
import React from 'react';
import { ProColumns } from '@ant-design/pro-table';

const getOffset = (length, span = 8) => {
  const cols = 24 / span;
  return (cols - 1 - (length % cols)) * span;
};

const getColumnList = (columns) =>
  columns
    .filter((item) => {
      const { valueType } = item;
      if (item.hideInSearch) {
        return false;
      }
      if (
        valueType !== 'index' &&
        valueType !== 'indexBorder' &&
        valueType !== 'option' &&
        (item.key || item.dataIndex)
      ) {
        return true;
      }
      return false;
    })
    .sort((a, b) => {
      if (a && b) {
        return (b.order || 0) - (a.order || 0);
      }
      if (a && a.order) {
        return -1;
      }
      if (b && b.order) {
        return 1;
      }
      return 0;
    });

const renderColItem = ({ columns }) => {
  return (
    columns
      // .filter((_, index) => (collapse && type !== 'form' ? index < (rowNumber - 1 || 1) : true))
      .map((item) => {
        const { valueType, dataIndex, initialValue, ...rest } = item;
        const key = dataIndex;
        return (
          <Col {...defaultColConfig} key={key}>
            <Form.Item labelAlign="right" label={rest.title} name={key} {...rest}>
              <FormOption item={item} />
            </Form.Item>
          </Col>
        );
      })
  );
};

const dateFormatterMap = {
  time: 'HH:mm:ss',
  date: 'YYYY-MM-DD',
  dateTime: 'YYYY-MM-DD HH:mm:ss',
};

/**
 * 这里主要是来转化一下数据
 * 将 moment 转化为 string
 * 将 all 默认删除
 * @param value 表单值
 * @param dateFormatter  'string' | 'number'
 * @param columnsMap dataIndex columns 映射
 */
const conversionValue = (value, dateFormatter, columnsMap) => {
  const tmpValue = {};

  Object.keys(value).forEach((key) => {
    const column = columnsMap[key || 'null'] || {};
    const valueType = column.valueType || 'text';
    const itemValue = value[key];

    // 如果值是 "all"，或者不存在直接删除
    // 下拉框里选 all，会删除
    if (!itemValue || (itemValue === 'all' && column.valueEnum)) {
      return;
    }

    // 如果是日期，再处理这些
    if (!isDateValueType(valueType)) {
      tmpValue[key] = itemValue;
      return;
    }

    // 如果是 moment 的对象的处理方式
    // 如果执行到这里，肯定是 ['date', 'dateRange', 'dateTimeRange', 'dateTime', 'time'] 之一
    if (moment.isMoment(itemValue) && dateFormatter) {
      if (dateFormatter === 'string') {
        const formatString = dateFormatterMap[valueType];
        tmpValue[key] = itemValue.format(formatString || 'YYYY-MM-DD HH:mm:ss');
        return;
      }
      if (dateFormatter === 'number') {
        tmpValue[key] = itemValue.valueOf();
        return;
      }
    }

    // 这里是日期数组
    if (Array.isArray(itemValue) && itemValue.length === 2 && dateFormatter) {
      if (dateFormatter === 'string') {
        const formatString = dateFormatterMap[valueType];
        if (Array.isArray(column.dataIndex)) {
          tmpValue[column.dataIndex[0]] = moment(itemValue[0]).format(
            formatString || 'YYYY-MM-DD HH:mm:ss',
          );
          tmpValue[column.dataIndex[1]] = moment(itemValue[1]).format(
            formatString || 'YYYY-MM-DD HH:mm:ss',
          );
        } else {
          tmpValue[key] = [
            moment(itemValue[0]).format(formatString || 'YYYY-MM-DD HH:mm:ss'),
            moment(itemValue[1]).format(formatString || 'YYYY-MM-DD HH:mm:ss'),
          ];
        }

        return;
      }
      if (dateFormatter === 'number') {
        tmpValue[key] = [moment(itemValue[0]).valueOf(), moment(itemValue[1]).valueOf()];
      }
    }
  });
  return tmpValue;
};

export interface SearchProps {
  columns: ProColumns;
  type: 'simple' | 'advance';
  changeType: () => void;
  submit: () => void;
  reset: () => void;
}

const Search = (props: SearchProps) => {
  const { columns, onSearch = () => {}, onReset = () => {}, ...restProps } = props;
  const { state: collapsed, toggle: toggleCollapsed } = useBoolean(true);

  const windowSize = useMediaQuery();
  const [colSize, setColSize] = useState(defaultColConfig[windowSize]);

  const columnsList = getColumnList(columns);
  const showColumns = !collapsed ? columnsList : columnsList.slice(0, 24 / colSize - 1);

  const [columnsMap, setColumnsMap] = useState({});
  useEffect(() => {
    const tempMap = {};
    columns.forEach((item) => {
      const key = item.key || item.dataIndex || null;
      tempMap[key] = item;
    });
    setColumnsMap(tempMap);
  }, columns);

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = getFieldsValue();
    onSearch(conversionValue(values, 'string', columnsMap));
  };

  const showCollapseBtn = 24 / colSize - 1 < columnsList.length;

  return (
    <Form {...defaultFormItemLayout} {...restProps} onFinish={handleSubmit}>
      <Row gutter={16} justify="end">
        {renderColItem({ columns: showColumns })}
        <Col span={colSize} offset={getOffset(showColumns.length, colSize)}>
          <Form.Item label=" " colon={false}>
            <Button type="primary" htmlType="submit">
              {defaultSearch.searchText}
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={() => resetFields()}>
              {defaultSearch.resetText}
            </Button>
            {showCollapseBtn && (
              <a onClick={() => toggleCollapsed()} style={{ marginLeft: 8, whiteSpace: 'nowrap' }}>
                {defaultSearch.collapseRender(collapsed)}
                {/* <StepBackwardOutlined /> */}
              </a>
            )}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Search;
