/**
 * 拖拽 穿梭框
 * Api 参照 https://ant.design/components/transfer-cn/
 * eg: https://codesandbox.io/s/ql08j35j3q
 * https://github.com/ant-design/ant-design/blob/master/components/transfer/index.tsx
 *
 * 非受控组件 受控组件之后添加
 */

import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import List from './List';
import { move } from './utils';
import { TransferProps, TransferItem, ListStyle, TransferDirection } from 'antd/lib/transfer';

import 'antd/es/transfer/style/index.less';

interface DragTransferProps extends TransferProps {}

// 数据分类
const separateDataSource = (
  dataSource: TransferItem[],
  targetKeys: string[],
  rowKey?: (record: TransferItem) => string,
) => {
  const leftDataSource: TransferItem[] = [];
  const rightDataSource: TransferItem[] = new Array(targetKeys.length);
  dataSource.forEach((record) => {
    if (rowKey) {
      record.key = rowKey(record);
    }

    // rightDataSource should be ordered by targetKeys
    // leftDataSource should be ordered by dataSource
    const indexOfKey = targetKeys.indexOf(record.key);
    if (indexOfKey !== -1) {
      rightDataSource[indexOfKey] = record;
    } else {
      leftDataSource.push(record);
    }
  });

  return [leftDataSource, rightDataSource];
};

const handleListStyle = (
  listStyle: ((style: ListStyle) => React.CSSProperties) | React.CSSProperties,
  direction: TransferDirection,
) => {
  if (typeof listStyle === 'function') {
    return listStyle({ direction });
  }
  return listStyle;
};

const DragTransfer = (props: DragTransferProps) => {
  const {
    listStyle,
    dataSource = [],
    targetKeys = [],
    titles = [],
    render,
    onChange,
    rowKey,
  } = props;

  const [sourceTitle, targetTitle] = titles;

  const [sourceDataSource, targetDataSource] = separateDataSource(dataSource, targetKeys, rowKey);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }

    let newTargetKeys: string[] = [];
    let direction = '';
    let moveKeys: string[] = [];
    // 同框排序
    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === 'sourceContainer') {
        // sourceDynamicList.move(source.index, destination.index);
        // todo
        return;
      }
      if (source.droppableId === 'targetContainer') {
        newTargetKeys = move(targetKeys, source.index, destination.index);
        direction = 'same';
        moveKeys = [];
      }
    } else {
      // 从一个框拖拽到另一个框
      if (source.droppableId === 'sourceContainer') {
        // form source to target
        const key = sourceDataSource[source.index].key;
        const temp = [...targetKeys];
        temp.splice(destination.index, 0, key);
        newTargetKeys = temp;
        direction = 'right';
        moveKeys = [key];
      } else if (source.droppableId === 'targetContainer') {
        // from target to source
        newTargetKeys = targetKeys.filter((_, index: number) => index !== source.index);
        direction = 'left';
        moveKeys = [targetDataSource[source.index].key];
      }
    }
    onChange && onChange(newTargetKeys, direction, moveKeys);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="ant-transfer">
        <List
          droppableId="sourceContainer"
          dataSource={sourceDataSource}
          render={render}
          style={handleListStyle(listStyle, 'left')}
          titleText={sourceTitle}
        />
        <div className="ant-transfer-operation"></div>
        <List
          droppableId="targetContainer"
          dataSource={targetDataSource}
          render={render}
          style={handleListStyle(listStyle, 'right')}
          titleText={targetTitle}
        />
      </div>
    </DragDropContext>
  );
};

DragTransfer.defaultProps = {
  listStyle: () => {},
  dataSource: [],
};

export default DragTransfer;
