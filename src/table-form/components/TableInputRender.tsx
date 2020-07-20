import React, { ReactNode } from 'react';
import { Input, TimePicker, InputNumber, DatePicker, Select } from 'antd';
import { StatusType } from '@ant-design/pro-table/lib/component/status';
import { ProColumns } from '@ant-design/pro-table/lib/Table';

/**
 * 把 value 的枚举转化为 数组
 * @param valueEnum
 */
export const parsingValueEnumToArray = (
  valueEnum: {
    [key: string]:
      | {
          text: ReactNode;
          type: StatusType;
        }
      | ReactNode;
  } = {},
): {
  value: string;
  text: string;
}[] =>
  Object.keys(valueEnum).map((key) => {
    const value =
      (valueEnum[key] as {
        text: string;
      }) || '';
    return {
      text: ((value.text || value || '') as unknown) as string,
      value: key,
    };
  });

export const TableInputRender: React.FC<{
  item: ProColumns<any>;
  value?: any;
  onChange?: (value: any) => void;
}> = React.forwardRef(({ item, ...rest }, ref: any) => {
  const { valueType } = item;

  /**
   * 自定义 render
   */
  if (item.renderFormItem) {
    return item.renderFormItem(item, rest) as any;
  }

  if (!valueType || valueType === 'text') {
    const { valueEnum } = item;
    if (valueEnum) {
      return (
        <Select ref={ref} {...rest} {...item.formItemProps}>
          {parsingValueEnumToArray(valueEnum).map(({ value, text }) => (
            <Select.Option key={value} value={value}>
              {text}
            </Select.Option>
          ))}
        </Select>
      );
    }
    return <Input {...rest} {...item.formItemProps} />;
  }
  if (valueType === 'date') {
    return (
      <DatePicker
        ref={ref}
        style={{
          width: '100%',
        }}
        {...rest}
        {...item.formItemProps}
      />
    );
  }

  if (valueType === 'dateTime') {
    return (
      <DatePicker
        showTime
        ref={ref}
        style={{
          width: '100%',
        }}
        {...rest}
        {...item.formItemProps}
      />
    );
  }

  if (valueType === 'dateRange') {
    return (
      <DatePicker.RangePicker
        ref={ref}
        style={{
          width: '100%',
        }}
        {...rest}
        {...item.formItemProps}
      />
    );
  }
  if (valueType === 'dateTimeRange') {
    return (
      <DatePicker.RangePicker
        ref={ref}
        showTime
        style={{
          width: '100%',
        }}
        {...rest}
        {...item.formItemProps}
      />
    );
  }

  if (valueType === 'time') {
    return (
      <TimePicker
        ref={ref}
        style={{
          width: '100%',
        }}
        {...rest}
        {...item.formItemProps}
      />
    );
  }
  if (valueType === 'digit') {
    return (
      <InputNumber
        ref={ref}
        style={{
          width: '100%',
        }}
        {...rest}
        {...item.formItemProps}
      />
    );
  }
  if (valueType === 'money') {
    return (
      <InputNumber
        ref={ref}
        min={0}
        precision={2}
        formatter={(value) => {
          if (value) {
            return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          }
          return '';
        }}
        parser={(value) => (value ? value.replace(/\$\s?|(,*)/g, '') : '')}
        style={{
          width: '100%',
        }}
        {...rest}
        {...item.formItemProps}
      />
    );
  }
  if (valueType === 'textarea') {
    return <Input.TextArea ref={ref} {...rest} {...item.formItemProps} />;
  }
  return <Input ref={ref} {...rest} {...item.formItemProps} />;
});

export default TableInputRender;
