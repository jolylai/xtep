import React, { useState } from 'react';
import { MapModal } from 'xtep';
import { Button } from 'antd';

function Demo1() {
  const [visible, setVisible] = useState<boolean>(true);
  const toggleVisible = () => {
    setVisible((visible) => !visible);
  };

  return (
    <>
      <MapModal visible={visible} title="地图" />
      <Button onClick={toggleVisible}>Toggle</Button>
    </>
  );
}

export default Demo1;
