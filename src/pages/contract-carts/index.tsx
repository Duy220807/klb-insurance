import { Component, PropsWithChildren } from 'react';
import { Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro'; // Import Taro để sử dụng API điều hướng

export default class ContractCarts extends Component<PropsWithChildren> {
    // Phương thức lifecycle: chạy ngay khi component được mount
    componentDidMount() {
        Taro.showLoading();
        // Điều hướng đến trang pages/maintenance
        Taro.redirectTo({
            url: '/pages/maintenance', // Đường dẫn đến trang maintenance
        });
        Taro.hideLoading();
    }

    render() {
        return (
            <View>
                {/* Để trống vì sẽ tự động điều hướng ngay lập tức */}
                {/* Có thể thêm nội dung tạm thời nếu cần */}
                <View className="min-h-screen flex items-center justify-center">
                    {/* <Text>Đang chuyển hướng...</Text> */}
                </View>
            </View>
        );
    }
}