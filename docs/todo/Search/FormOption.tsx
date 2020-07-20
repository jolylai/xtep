import { Input, TimePicker, InputNumber, DatePicker, Select } from 'antd';

import { parsingValueEnumToArray } from './utils';

const FromInputRender = ({ item, forwardref, ...rest }) => {
  const { valueType } = item;
  /**
   * 自定义 render
   */
  if (item.renderFormItem) {
    return item.renderFormItem(item, rest);
  }
  if (!valueType || valueType === 'text') {
    const { valueEnum } = item;
    if (valueEnum) {
      return (
        <Select ref={forwardref} {...rest} {...item.formItemProps}>
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
        ref={forwardref}
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
        ref={forwardref}
        showTime
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
        ref={forwardref}
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
        showTime
        ref={forwardref}
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
        ref={forwardref}
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
        ref={forwardref}
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
        ref={forwardref}
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
  if (valueType === 'textarea' && rest.type === 'form') {
    return <Input.TextArea {...rest} {...item.formItemProps} ref={forwardref} />;
  }
  return <Input {...rest} {...item.formItemProps} ref={forwardref} />;
};

// export default FromInputRender;
export default React.forwardRef((props, ref) => <FromInputRender {...props} forwardref={ref} />);
