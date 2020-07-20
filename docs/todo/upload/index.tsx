import React, { useRef } from 'react';

import { Button } from 'xtep';
import upload from './request';
import './index.less';

function Upload() {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.MouseEvent) => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const uploadFiles = (files: FileList) => {
    // 将类数组 FileList 转为 数组
    const postFiles = [...files];
    upload({
      method: 'post',
      // data: postFiles,
      action: 'https://www.mocky.io/v2/5185415ba171ea3a00704eed',
      file: postFiles,
      filename: 'file',
      withCredentials: true,
      onProgress: (e) => {
        console.log('e: ', e);
      },
      onError: (e) => {
        console.log('e: ', e);
      },
      onSuccess: (res) => {
        console.log('res: ', res);
      },
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('e: ', e.target.files);
    const fileList = e.target.files;
    if (!fileList) {
      return;
    }

    uploadFiles(fileList);

    if (fileRef.current) {
      fileRef.current.value = '';
    }
  };

  return (
    <div className="pomelo-upload">
      <input type="file" name="file" ref={fileRef} onChange={handleFileChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default Upload;
