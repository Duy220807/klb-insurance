import { Component, PropsWithChildren } from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import HeroBanner from './../../assets/banners/hero-banner.png';
import BackgroundImage from './../../assets/backgrounds/top.png';
import './index.scss';
import Header from './components/Header';
import ContractIcon from './../../assets/icons/contract-icon.svg';
import ProtectIcon from './../../assets/icons/protect-icon.svg';
import SearchIcon from './../../assets/icons/search-icon.svg';
import Contract from './../../assets/icons/contract.svg';
import BaoHiemXeMay from './../../assets/products/bao-hiem-xe-may.png';
import BaoHiemOto from './../../assets/products/bao-hiem-xe-oto.png';
import icon from './../../assets/icons/icon.svg';
import { navigateToPage } from 'src/utils/navigate';
import InsuranceCard from 'src/componnents/InsuranceCard';
import HomeSkeleton from 'src/componnents/Skeletons/home';
// import { sendMessageToFlutter } from 'src/utils/flutterMessageSender';
// import { color, message } from 'src/utils/flutterConstants';

export default class Index extends Component<PropsWithChildren> {
  state = {
    loading: true,
  };

  componentDidMount() {
    // // Gửi message showAppBar lên Flutter khi ứng dụng hiển thị
    // console.log('Gửi message showAppBar lên Flutter');
    // sendMessageToFlutter(message.showAppBar, { color: color.colorShowAppBarHome });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  quickActions = [
    {
      title: 'Hợp đồng của tôi',
      icon: ContractIcon,
      url: '/pages/contracts',
      badge: 2,
    },
    {
      title: 'Bảo vệ ngay',
      icon: ProtectIcon,
      url: '/pages/protect',
      badge: null,
    },
    {
      title: 'Tra cứu dịch vụ',
      icon: SearchIcon,
      url: '/pages/search',
      badge: null,
    },
  ];

  featuredProducts = [
    {
      title: 'Chỉ từ ',
      price: '65.000 VNĐ',
      image: BaoHiemXeMay,
      url: '/pages/about-motorbike', // Thêm url cho sản phẩm xe máy
    },
    {
      title: 'Chỉ từ ',
      price: '120.000 VNĐ',
      image: BaoHiemOto,
      url: '/pages/about-car', // Thêm url cho sản phẩm ô tô
    },
  ];

  pendingPayments = [
    {
      id: 'payment-001', // Thêm id
      name: 'BH VCX xe máy',
      contractNumber: '000052***',
      brand: 'Bảo Hiểm Bảo Minh',
      effectiveDate: '14/2/2025',
      dueDate: '29/3/2025',
      icon: Contract,
    },
  ];

  insuranceProviders = [
    {
      name: 'Bảo Minh',
      logo: icon,
      url: '/pages/protect?provider=BaoMinh', // Thêm url cho nhà cung cấp
    },
    // {
    //   name: 'Bảo Việt',
    //   logo: icon,
    //   url: '/pages/provider-detail?provider=BaoViet', // Thêm url (đã comment)
    // },
    // {
    //   name: 'Prudential',
    //   logo: icon,
    //   url: '/pages/provider-detail?provider=Prudential', // Thêm url (đã comment)
    // },
  ];

  calculateDaysLeft(dueDate: any) {
    const currentDate = new Date() as any;
    const due = new Date(dueDate.split('/').reverse().join('-')) as any;
    const timeDiff = due - currentDate;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysLeft;
  }

  handleConsult = () => {
    Taro.showToast({
      title: 'Đang liên hệ tư vấn...',
      icon: 'success',
      duration: 2000,
    });
  };

  handlePendingPaymentClick = (contractNumber: string) => {
    navigateToPage(`/pages/contract-detail?contractNumber=${contractNumber}`); // Điều hướng với id
  };

  render() {
    const { loading } = this.state;

    if (loading) {
      return <HomeSkeleton />;
    }

    return (
      <View className="flex flex-col min-h-screen">
        <Header title="KLBCare" />
        {/* Banner */}
        <View
          className="relative flex justify-center bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${BackgroundImage})`,
          }}
        >
          <Image src={HeroBanner} className="w-auto h-27 m-3" />
        </View>

        {/* Phần Hợp đồng, Bảo vệ, Tra cứu */}
        <View className="flex flex-row justify-between items-center p-6 pb-4 bg-white">
          {this.quickActions.map((action, index) => (
            <View
              key={index}
              className="flex flex-col items-center w-1/3"
              onClick={() => navigateToPage(action.url)}
            >
              <View className="relative flex items-center justify-center">
                <Image src={action.icon} className="w-12 h-12" />
                {action.badge && (
                  <View className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <Text className="text-white text-xs">{action.badge}</Text>
                  </View>
                )}
              </View>
              <Text className="text-xs text-gray-800 mt-2 text-center w-14">{action.title}</Text>
            </View>
          ))}
        </View>

        {/* Phần Sản phẩm nổi bật */}
        <View className="p-4 pr-0 bg-white">
          <Text className="text-base ">Sản phẩm nổi bật</Text>
          <View className="flex flex-row overflow-x-scroll mt-4 hide-scrollbar">
            {this.featuredProducts.map((product, index) => (
              <View
                key={index}
                className="flex flex-col items-center w-75 bg-white mr-2"
                onClick={() => navigateToPage(product.url)} // Sử dụng url để điều hướng
              >
                <Image src={product.image} className="w-75 h-30" />
                <View className="w-full text-left px-2 pl-4">
                  <Text className="block text-xs text-gray-600 mt-2 font-normal">{product.title}</Text>
                  <Text className="block text-base font-bold">
                    {product.price}
                    <span className="text-gray-600 font-medium">/ năm</span>
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <View className="shadow-sm h-2" style={{ backgroundColor: '#3333331A' }} />

        {/* Phần Thanh toán phí bảo hiểm */}
        <View>
          <View className="p-4 pb-0 bg-white">
            <View className="flex flex-row justify-between items-center mb-4">
              <Text className="text-base ">Thanh toán phí bảo hiểm</Text>
              <Text
                className="text-skyblue text-sm"
                onClick={() => navigateToPage('/pages/contracts')}
              >
                Xem thêm
              </Text>
            </View>
            {this.pendingPayments.map((payment, index) => (
              <View
                key={index}
                onClick={() => this.handlePendingPaymentClick(payment.contractNumber)} // Thêm sự kiện onClick
              >
                <InsuranceCard
                  name={payment.name}
                  contractNumber={payment.contractNumber}
                  brand={payment.brand}
                  effectiveDate={payment.effectiveDate}
                  dueDate={payment.dueDate}
                  status="Tái tục"
                  icon={payment.icon}
                  calculateDaysLeft={this.calculateDaysLeft}
                />
              </View>
            ))}
          </View>

          {/* Phần Đơn vị bảo hiểm */}
          <View className="p-4 bg-white mb-4">
            <Text className="text-base ">Đơn vị bảo hiểm</Text>
            <View className="flex flex-row overflow-x-scroll mt-4 hide-scrollbar">
              {this.insuranceProviders.map((provider, index) => (
                <View
                  key={index}
                  className="flex flex-col items-center w-24 mr-4 bg-white"
                  onClick={() => navigateToPage(provider.url)} // Sử dụng url để điều hướng
                >
                  <Image src={provider.logo} className="w-12 h-12" />
                  <Text className="text-xs text-gray-800 mt-2 text-center">{provider.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    );
  }
}