// https://blog.csdn.net/u010081689/article/details/48274629
import React, { useRef, useCallback } from 'react';
import { Card } from 'antd';

const Watermark = () => {
  const canvasRef = useRef<HTMLCanvasElement>();

  const drawImage = (canvas: HTMLCanvasElement, imgUrl: string) => {
    const img = new Image();
    img.src = imgUrl;

    // 图片加载成功
    img.onload = () => {
      // 将canvas 宽高设置跟 img 宽高一致
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        //   清空画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage
        ctx.drawImage(img, 0, 0);

        // 设置字体
        ctx.font = '48px "PingFang SC"';
        // 字体颜色
        ctx.fillStyle = '#eee';
        // 文字对齐方式
        ctx.textBaseline = 'bottom';
        ctx.fillText('水印', canvas.width - 120, canvas.height - 20);
      }
    };
  };

  const callbackRef = useCallback(node => {
    if (node !== null) {
      canvasRef.current = node;
      drawImage(
        node,
        'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      );
    }
  }, []);

  return (
    <>
      <Card
        hoverable
        style={{ width: 240, display: 'inline-block' }}
        cover={
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <Card.Meta title="img" description="img 图片展示" />
      </Card>
      <Card
        hoverable
        style={{ width: 240, display: 'inline-block' }}
        cover={
          <canvas ref={callbackRef} id="canvas">
            您的浏览器尚不支持canvas
          </canvas>
        }
      >
        <Card.Meta title="canvas" description="canvas 渲染图片" />
      </Card>
    </>
  );
};

export default Watermark;
