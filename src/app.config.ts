
export default {
  pages: [
    'pages/index', // Trang chủ
    'pages/category', // Danh mục
    'pages/account', // Tài khoản
    'pages/protect', // Tài khoản
    '/pages/about-motorbike', // Trang chi tiết bảo hiểm TNDS xe máy
    '/pages/about-car', // Trang chi tiết bảo hiểm TNDS ô tô
    '/pages/about-car-damage', // Trang chi tiết bảo hiểm THVC ô tô
    '/pages/register', // Trang đăng ký mua bảo hiểm
    '/pages/vehicle-details', // Trang chi tiết xe
    '/pages/buyer-info', // Trang thông tin bên mua và chủ xe
    '/pages/confirm', // Trang thông tin final
    '/pages/payment', // Trang thông tin thanh toán
    '/pages/payment-success', // Trang thanh toán thành công
    '/pages/contracts', // Trang hợp đồng của tôi
    '/pages/contract-detail', // Trang chi tiết hợp đồng
    'pages/404', // Trang 404
    'pages/certificate', // Trang chi tiết giấy chứng nhận bảo hiểm
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
        pagePath: 'pages/category',
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
        pagePath: 'pages/account',
        text: 'Giỏ hợp đồng',
        iconPath: 'assets/icons/doc-search-two.svg',
        selectedIconPath: 'assets/icons/doc-search-two-active.svg',
      },
    ],
  },
  // Thêm cấu hình cho trang 404
};