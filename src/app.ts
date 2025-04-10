import { Component, PropsWithChildren } from 'react'

import './app.scss'
import './global.scss'
import './styles/overwrite.scss'
import Taro from '@tarojs/taro';
import { setupTaroFlutterBridge } from './utils/taroFlutterBridge';

// Gọi setupTaroFlutterBridge ngay đầu file hoặc trong componentDidMount
if (process.env.TARO_ENV === 'h5') {
  setupTaroFlutterBridge();
}

class App extends Component<PropsWithChildren> {

  componentDidMount() {
    console.log(process.env.NODE_ENV);
    // Lắng nghe sự kiện onPageNotFound
    Taro.onPageNotFound((res) => {
      console.log('Page not found:', res); // Log thông tin để debug
      // Chuyển hướng đến trang 404
      Taro.navigateTo({
        url: '/pages/404',
      });
    });
  }

  componentDidHide() { }

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children
  }
}


export default App
