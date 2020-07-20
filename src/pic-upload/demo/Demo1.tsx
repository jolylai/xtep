import React, { useState } from 'react';
import { PicUpload } from 'xtep';

function Demo1() {
  const [value, setValue] = useState<string[]>([
    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  ]);
  console.log('value: ', value);

  return (
    <div>
      <PicUpload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        value={value}
        onChange={setValue}
      />
    </div>
  );
}

export default Demo1;
