import { Component, PropsWithChildren } from 'react';
import { View } from '@tarojs/components';

export default class Account extends Component<PropsWithChildren> {
    render() {
        return (
            <View className="text-[#acc855] text-[100px]">
                Tài khoản
            </View>
        );
    }
}