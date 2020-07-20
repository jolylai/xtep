import { Droppable, Draggable } from 'react-beautiful-dnd';
import React from 'react';
import { TransferItem, RenderResult } from 'antd/lib/transfer';

const grid = 8;
const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'white',
  padding: grid,
  minHeight: '100%',
});

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'white',
  border: 'solid 1px #eee',

  // styles we need to apply on draggables
  ...draggableStyle,
});

interface ListProps {
  droppableId: string;
  titleText: string;
  dataSource: TransferItem[];
  filterOption?: (filterText: string, item: TransferItem) => boolean;
  style?: React.CSSProperties;
  render?: (item: TransferItem) => RenderResult;
}

const defaultRender = () => null;

const List = (props: ListProps) => {
  const { dataSource, render = defaultRender, droppableId, style, titleText } = props;
  return (
    <div className="ant-transfer-list" style={{ width: 260, height: 300, ...style }}>
      <div className="ant-transfer-list-header">
        <span className="ant-transfer-list-header-selected">{dataSource.length}项</span>
        <span className="ant-transfer-list-header-title">{titleText}</span>
      </div>
      <div className="ant-transfer-list-content">
        <Droppable droppableId={droppableId}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
              {dataSource.map((item, index) => (
                <Draggable key={item['key']} draggableId={String(item['key'])} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                    >
                      {render(item)}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default List;
