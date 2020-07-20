import AMap from 'AMap';
// import {
//   GeocoderOptions,
//   ReGeocodeResult,
//   GeocodeResult,
//   AutocompleteOptions,
//   AutocompleteResult,
// } from './data';

// 获取输入提示信息
export const autoCompleteSearch = (
  keywords: string,
  opts?: AutocompleteOptions,
): Promise<AutocompleteResult> => {
  return new Promise((resolve, reject) => {
    AMap.plugin('AMap.Autocomplete', function () {
      // 实例化Autocomplete
      const autoComplete = new AMap.Autocomplete(opts);
      autoComplete.search(keywords, function (status: string, result: AutocompleteResult) {
        if (status === 'complete' && result.info === 'OK') {
          // result中对应详细地理坐标信息
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  });
};

export interface AutoCompleteData<T> {
  info: string;
  count: number;
  tips: T[];
}
// 获取输入提示信息
export const placeSearch = <T>(keywords: string): Promise<AutoCompleteData<T>> => {
  return new Promise((resolve, reject) => {
    AMap.service(['AMap.PlaceSearch'], function () {
      //构造地点查询类
      var placeSearch = new AMap.PlaceSearch({
        pageSize: 5, // 单页显示结果条数
        pageIndex: 1, // 页码
        city: '010', // 兴趣点城市
        citylimit: true, //是否强制限制在设置的城市内搜索
        // map: map, // 展现结果的地图实例
        panel: 'panel', // 结果列表将在此容器中进行展示。
        autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
      });
      placeSearch.search(keywords, function (status: string, result: any) {
        console.log('result: ', result);
        // 搜索成功时，result即是对应的匹配数据
        if (status === 'complete' && result.info === 'OK') {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
    // var placeSearch = new AMap.PlaceSearch({
    //   city: 'beijing', // 兴趣点城市
    //   citylimit: true, //是否强制限制在设置的城市内搜索
    //   pageSize: 10, // 单页显示结果条数
    //   children: 0, //不展示子节点数据
    //   pageIndex: 1, //页码
    //   extensions: 'base', //返回基本地址信息
    // });
    // //详情查询
    // placeSearch.getDetails('B000A83U0P', function(status, result) {
    //   if (status === 'complete' && result.info === 'OK') {
    //     resolve(result);
    //   } else {
    //     reject(result);
    //   }
    // });
  });
};

export interface AutoCompleteData<T> {
  info: string;
  count: number;
  tips: T[];
}
// 获取输入提示信息
export const getAutoComplete = <T>(keywords: string): Promise<AutoCompleteData<T>> => {
  return new Promise((resolve, reject) => {
    AMap.plugin('AMap.Autocomplete', function () {
      const autoOptions = {
        city: '全国',
      };
      // 实例化Autocomplete
      const autoComplete = new AMap.Autocomplete(autoOptions);
      autoComplete.search(keywords, function (status: string, result: AutoCompleteData<T>) {
        if (status === 'complete') {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  });
};

interface Position {
  lng: number;
  lat: number;
}

interface CurrentPosition {
  position: Position;
}

// https://lbs.amap.com/api/javascript-api/example/location/browser-location
// 获取当前用户地理位置
export const getCurrentPosition = (opts) => {
  return new Promise<CurrentPosition>((resolve, reject) => {
    AMap.plugin('AMap.Geolocation', function () {
      const geolocation = new AMap.Geolocation(opts);

      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, 'complete', resolve);
      AMap.event.addListener(geolocation, 'error', reject);
    });
  });
};

// https://lbs.amap.com/api/javascript-api/reference/lnglat-to-address#m_GeocodeResult

// 正向地理编码方法
export const getLocation = (address: string, opts: GeocoderOptions): Promise<ReGeocodeResult> => {
  return new Promise((resolve, reject) => {
    AMap.plugin('AMap.Geocoder', function () {
      const geocoder = new AMap.Geocoder(opts);

      geocoder.getLocation(address, function (status: string, result: ReGeocodeResult) {
        if (status === 'complete' && result.info === 'OK') {
          // result中对应详细地理坐标信息
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
  });
};

type Location = [number, number];

// 正向地理编码方法
export const getAddress = (
  location: Location | Location[],
  opts?: GeocoderOptions,
): Promise<GeocodeResult> => {
  return new Promise((resolve, reject) => {
    AMap.plugin('AMap.Geocoder', function () {
      var geocoder = new AMap.Geocoder(opts);

      geocoder.getAddress(location, function (status: string, result: ReGeocodeResult) {
        if (status === 'complete' && result.info === 'OK') {
          // result中对应详细地理坐标信息
          resolve(result.regeocode);
        } else {
          reject(result);
        }
      });
    });
  });
};
