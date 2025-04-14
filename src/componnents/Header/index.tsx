import { Component, PropsWithChildren } from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';

// Hình ảnh nền và icon back
import HeaderBackground from './../../assets/backgrounds/header-bg.png';
import BackIcon from './../../assets/icons/back-icon.svg';

import './index.scss';
import { sendMessageToFlutter } from 'src/utils/flutterMessageSender';
import { color, message } from 'src/utils/flutterConstants';

interface HeaderProps {
    title: string;
}

export default class Header extends Component<PropsWithChildren<HeaderProps>> {
    handleBack = () => {
        // window.history.go(-2);
        Taro.navigateBack();
    };

    componentDidMount() {
        // Gửi message showAppBar lên Flutter khi ứng dụng hiển thị
        console.log('Gửi message showAppBar lên Flutter');
        sendMessageToFlutter(message.showAppBar, { color: color.colorShowAppBarOther });
    }


    render() {
        const { title } = this.props;

        return (
            <View
                className="relative flex items-end justify-center h-16 pb-2" // Thay items-center thành items-end và thêm pb-2
                style={{
                    backgroundImage: `url(${HeaderBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Icon Back */}
                <View className="absolute left-4 bottom-1" onClick={this.handleBack}> {/* Thêm bottom-2 để căn icon back xuống dưới */}
                    <Image src={BackIcon} className="w-6 h-6" />
                </View>

                {/* Title */}
                <Text className="text-white text-base font-semibold">{title}</Text>
            </View>
        );
    }
}