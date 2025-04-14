
export default {
  pages: [
    'pages/index',
    'pages/vouchers',
    'pages/contract-carts',
    'pages/protect',
    // 'pages/extras', // Thêm trang extras
    'pages/about-motorbike',
    'pages/about-car',
    'pages/about-car-damage',
    'pages/register',
    'pages/vehicle-details',
    'pages/buyer-info',
    'pages/confirm',
    'pages/payment',
    'pages/payment-success',
    'pages/contracts',
    'pages/contract-detail',
    'pages/404',
    'pages/maintenance',
    'pages/certificate',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'My Taro App',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    color: '#666', // Màu chữ/icon khi không được chọn
    selectedColor: '#292663', // Màu chữ/icon khi được chọn
    backgroundColor: '#fff', // Màu nền của TabBar
    borderStyle: 'black', // Màu viền trên của TabBar (black/white)
    list: [
      {
        pagePath: 'pages/index', // Đường dẫn đến trang
        text: 'Trang chủ', // Tên tab
        iconPath: 'assets/icons/home.svg', // Icon khi không được chọn
        selectedIconPath: 'assets/icons/home-active.svg', // Icon khi được chọn

      },
      {
        pagePath: 'pages/vouchers',
        text: 'Túi voucher',
        iconPath: 'assets/icons/voucher.svg',
        selectedIconPath: 'assets/icons/voucher-active.svg',
      },
      {
        pagePath: 'pages/extras',
        text: 'Tiện ích',
        iconPath: 'assets/icons/triangle-round-rectangle.svg',
        selectedIconPath: 'assets/icons/triangle-round-rectangle-active.svg',
      },
      {
        pagePath: 'pages/contract-carts',
        text: 'Giỏ hợp đồng',
        iconPath: 'assets/icons/doc-search-two.svg',
        selectedIconPath: 'assets/icons/doc-search-two-active.svg',
      },
    ],
  },
  // Thêm cấu hình cho trang 404
};