import React, { useRef, Ref, useState } from 'react';
import Modal, { ModalProps } from 'antd/lib/modal';
import AMap from 'AMap';
import { AutoComplete, message } from 'antd';
import { useDebounceFn } from '@umijs/hooks';
import { autoCompleteSearch, getAddress } from './utils';

export interface MapModalProps extends ModalProps {}

function MapModal(props: MapModalProps) {
  const { visible, title, width = 800, onOk = () => {} } = props;

  const AMapContainerRef = useRef<HTMLDivElement | undefined>();
  const AMapInstanceRef = useRef<AMap>();

  //   初始化地图
  const initMap = (ref: HTMLDivElement) => {
    if (AMapContainerRef.current) {
      return;
    }
    AMapContainerRef.current = ref;
    console.log('ref: ', ref);
    try {
      //   初始化地图
      AMapInstanceRef.current = new AMap.Map(ref, {
        resizeEnable: true,
        zoom: 12,
        mapStyle: 'amap://styles/a90f1dbb0bf7401507d276ecedc134eb',
      });
      AMap.plugin('AMap.Geolocation', function () {
        const geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：5s
          buttonPosition: 'RB', //定位按钮的停靠位置
          buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: false, //定位成功后是否自动调整地图视野到定位点
        });
        AMapInstanceRef.current.addControl(geolocation);
      });
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const [value, setValue] = useState();
  const [position, setPosition] = useState({});

  const [selectData, setSelectData] = useState<any>();
  // console.log('selectData: ', selectData);
  const [options, setOptions] = useState([]);

  const queryOptions = async (searchText: string) => {
    const data = await autoCompleteSearch(searchText);
    // console.log('data: ', data);
    setOptions(
      data.tips.map((item, index) => ({ ...item, label: item.name, value: String(index) })),
    );
  };

  const { run } = useDebounceFn((searchText) => {
    queryOptions(searchText);
  }, 500);

  const onSearch = async (searchText: string) => {
    setValue(searchText);
    if (searchText) {
      run(searchText);
    } else {
      setOptions([]);
    }
  };

  const onSelect = async (value: string) => {
    const selectData = options.find((_, index) => String(index) === value);
    if (selectData) {
      const { name, location } = selectData;
      setValue(name);
      // console.log('selectData: ', selectData);
      const address = await getAddress([location.lng, location.lat]);
      // console.log('address: ', address);
      setSelectData({ ...selectData, ...address });
    }
  };

  const handleOk = (e) => {
    if (!selectData) {
      message.warning('请选择地点');
      return;
    }
    const { location, addressComponent, formattedAddress } = selectData;
    onOk({
      longitude: location.lng,
      latitude: location.lat,
      ...addressComponent,
      formattedAddress,
    });
  };

  return (
    <Modal visible={visible} title={title} width={width}>
      <AutoComplete
        value={value}
        options={options}
        style={{ marginBottom: 8, width: '100%' }}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder="请输入地址"
      />
      <div ref={initMap} style={{ height: 300 }}></div>
    </Modal>
  );
}

export default MapModal;
