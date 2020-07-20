import React from 'react';
import Photoswipe from 'photoswipe';
import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';
import { PhotoSwipeGallery } from 'react-photoswipe';

function Demo1() {
  let items = [
    {
      src: 'https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/flex-none.png',
      w: 1200,
      h: 900,
      title: 'Image 1',
    },
    {
      src: 'https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/flex-none.png',
      w: 1200,
      h: 900,
      title: 'Image 2',
    },
  ];
  const refCreate = (ref) => {
    const instance = new Photoswipe(ref, PhotoswipeUIDefault, items);
    instance.init();
  };

  const getThumbnailContent = (item) => {
    return <img src={item.thumbnail} width={120} height={90} />;
  };

  return <PhotoSwipeGallery items={items} options={{}} thumbnailContent={getThumbnailContent} />;

  return (
    <div
      // id={id}
      // className={className}
      // tabIndex="-1"
      role="dialog"
      aria-hidden="true"
      ref={refCreate}
    >
      <div className="pswp__bg" />
      <div className="pswp__scroll-wrap">
        <div className="pswp__container">
          <div className="pswp__item" />
          <div className="pswp__item" />
          <div className="pswp__item" />
        </div>
        <div className="pswp__ui pswp__ui--hidden">
          <div className="pswp__top-bar">
            <div className="pswp__counter" />
            <button className="pswp__button pswp__button--close" title="Close (Esc)" />
            <button className="pswp__button pswp__button--share" title="Share" />
            <button className="pswp__button pswp__button--fs" title="Toggle fullscreen" />
            <button className="pswp__button pswp__button--zoom" title="Zoom in/out" />
            <div className="pswp__preloader">
              <div className="pswp__preloader__icn">
                <div className="pswp__preloader__cut">
                  <div className="pswp__preloader__donut" />
                </div>
              </div>
            </div>
          </div>
          <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
            <div className="pswp__share-tooltip" />
          </div>
          <button
            className="pswp__button pswp__button--arrow--left"
            title="Previous (arrow left)"
          />
          <button className="pswp__button pswp__button--arrow--right" title="Next (arrow right)" />
          <div className="pswp__caption">
            <div className="pswp__caption__center" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Demo1;
