import { Component } from 'react';
import { View, Text } from '@tarojs/components';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { sendMessageToFlutter } from 'src/utils/flutterMessageSender';
import { color, message } from 'src/utils/flutterConstants';
import Taro from '@tarojs/taro';

// Định nghĩa kiểu cho props của Header
interface HeaderProps {
    title?: string;
}


export default class Header extends Component<HeaderProps> {


    // Hàm onClose gửi message lên Flutter
    handleClose = () => {
        console.log('Đã gửi yêu cầu CLOSE_APP tới Flutter');

        // Gửi message CLOSE_APP lên Flutter
        sendMessageToFlutter(message.closeApp, {});
        console.log('Đã gửi yêu cầu CLOSE_APP tới Flutter');

        // Gọi hàm onClose từ props (nếu có)

    };

    // Gọi API
    handleCallApi = () => {
        Taro.request_(message.apiProxy, {
            url: '/loyalty-service/api/portal/v1/program-rule/get-all-program-rules',
            method: 'GET',
        })
            .then((response) => {
                console.log('Phản hồi từ API:', response);
                Taro.showToast({
                    title: 'API Success: ' + JSON.stringify(response),
                    icon: 'success',
                });
            })
            .catch((error) => {
                console.error('Lỗi khi gọi API:', error);
                Taro.showToast({
                    title: 'API Error: ' + error.message,
                    icon: 'error',
                });
            });
    };

    render() {
        const { title } = this.props;
        return (
            <View
                className="flex items-center justify-between p-4 pb-0 bg-[#233E9B]"
            >
                <Text className="text-white text-base font-bold">{title || 'KLBCare'}</Text>
                {/* Outer container with additional border */}
                <View
                    className="rounded-full p-1" // Outer border and padding
                >
                    <View
                        className="flex flex-row items-center justify-center rounded-full bg-white/5 px-2 py-1 shadow-white"
                    >
                        {/* Three dots (menu icon) */}
                        <View
                            onClick={this.handleCallApi} // Call handleCallApi on click
                            className="flex flex-row items-center mr-2">
                            <View
                                className="w-1 h-1 bg-white rounded-full mr-0.5"
                            />
                            <View
                                className="w-1 h-1 bg-white rounded-full mr-0.5"
                            />
                            <View
                                className="w-1 h-1 bg-white rounded-full"
                            />
                        </View>
                        {/* Vertical separator */}
                        <View
                            className="w-px h-4 bg-white/30 mr-2"
                        />
                        {/* Close icon with circle from react-icons */}
                        <IoCloseCircleOutline
                            className="text-white"
                            size={24}
                            onClick={this.handleClose} // Call handleClose on click
                        />
                    </View>
                </View>
            </View>
        );
    }
}