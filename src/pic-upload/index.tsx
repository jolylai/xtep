import React, { useState, useEffect, useMemo } from 'react';
import { Upload, Modal, message } from 'antd';
import { CloudUploadOutlined, StopOutlined } from '@ant-design/icons';

import { UploadChangeParam, UploadProps, RcFile } from 'antd/lib/upload';
import { UploadFile } from 'antd/es/upload/interface';
import { usePrevious, useControllableValue } from 'ahooks';

function getBase64(file: Blob): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export interface UploadButtonProps {
  disabled: boolean;
}

function UploadButton(props: UploadButtonProps) {
  const { disabled } = props;

  if (disabled) {
    return <StopOutlined style={{ fontSize: 26 }} />;
  }
  return <CloudUploadOutlined style={{ fontSize: 26 }} />;
}

const normalizeValue = (value: any): any[] => {
  if (Array.isArray(value)) {
    return value.map((item: string) => ({
      uid: item,
      // name: 'image.png',
      status: 'done',
      url: item,
    }));
  }
  return [];
};

export interface PicUploadProps extends UploadProps {
  action: string;
  disabled?: boolean;
  value?: string[] | undefined | null;
  onChange?: (data: any) => void;
  limit?: number;
  acceptSize?: number;
}

function PicUpload(props: PicUploadProps) {
  const {
    action,
    disabled = false,
    // value,
    // onChange = () => {},
    limit = Infinity,
    acceptSize,
  } = props;
  console.log('props: ', props);

  const [value, setValue] = useControllableValue(props);

  const initialFileList = useMemo(() => {
    return normalizeValue(value);
  }, [value]);

  const [fileList, setFileList] = useState<UploadFile[]>(initialFileList);

  const previousValue = usePrevious(value);

  useEffect(() => {
    if (previousValue === undefined) {
      setFileList(initialFileList);
    }
  }, [value]);

  /**
   *  效验文件(文件类型 文件大小)
   *
   *
   * 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。
   * 支持返回一个 Promise 对象，Promise 对象 reject 时则停止上传，
   * resolve 时开始上传（ resolve 传入 File 或 Blob 对象则上传 resolve 传入对象）。
   * 注意：IE9 不支持该方法。
   *
   * 如果返回的是布尔值则还是会调用 onChange 事件
   * 返回Promise.reject() 则不会触发 onChange 事件
   */
  const handleBeforeUpload = (file: RcFile): PromiseLike<void> => {
    // TODO 更多图片格式支持
    const acceptImageType = ['image/jpeg', 'image/png', 'image/svg+xml'];

    const isImageType = acceptImageType.includes(file.type);
    if (!isImageType) {
      message.error('只能上传 .jpg .png .jpeg 格式的图片!');
      return Promise.reject();
    }

    // 文件大小限制 默认不限制
    if (acceptSize && file.size < acceptSize) {
      message.error(`图片大小不能大于${acceptSize / 1024}K!`);
      return Promise.reject();
    }

    return Promise.resolve();
  };

  const handleFileChange = (info: UploadChangeParam) => {
    // 获取服务器响应的文件URL
    const newFileList = info.fileList.map((file) => {
      if (file.response && file.response.status) {
        file.url = file.response.url;
      }
      return file;
    });

    if (info.file.status === 'done') {
      message.success(`${info.file.name} 文件上传成功`);
      const newValue = info.fileList.map((item) => item.url);
      setValue(newValue);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败`);
    } else if (info.file.status === 'removed') {
      const newValue = info.fileList.map((item) => item.url);
      setValue(newValue);
    }

    setFileList(newFileList);
  };

  //   图片预览
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState();

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as Blob);
    }

    setPreviewVisible(true);
    setPreviewImage(file.url || file.preview);
  };

  return (
    <>
      <Upload
        multiple
        disabled={disabled}
        accept=".jpg, .jpeg, .png, .svg"
        fileList={fileList}
        listType="picture-card"
        action={action}
        onChange={handleFileChange}
        onPreview={handlePreview}
        beforeUpload={handleBeforeUpload}
      >
        {fileList.length < limit ? <UploadButton disabled={disabled} /> : null}
      </Upload>
      <Modal visible={previewVisible} footer={null} onCancel={() => setPreviewVisible(false)}>
        <img alt="img" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
}

export default React.memo(PicUpload);
