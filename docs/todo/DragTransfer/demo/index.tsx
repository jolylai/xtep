import React, { useState } from 'react';
import { useRequest } from '@umijs/hooks';
import DragTransfer from '../index';

const fetchData = () => {
  return fetch(`https://randomuser.me/api?results=10`)
    .then((res) => res.json())
    .then((res) => res.results);
};

function index() {
  const { data } = useRequest(fetchData, {
    cacheKey: 'dragTranferData',
    initialData: [],
    formatResult: (res) => {
      return res.map((item: any, index: number) => ({
        key: String(index),
        title: item.name.first,
      }));
    },
  });

  const [targetKeys, setTargetKeys] = useState(['1', '2', '3']);

  const handleChange = (targetKeys: string[]) => {
    setTargetKeys(targetKeys);
  };

  return (
    <DragTransfer
      dataSource={data}
      targetKeys={targetKeys}
      render={(item) => item.title || null}
      onChange={handleChange}
    />
  );
}

export default index;
