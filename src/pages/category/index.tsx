import { Component, PropsWithChildren } from 'react';
import { View } from '@tarojs/components';

export default class Category extends Component<PropsWithChildren> {
    render() {
        return (
            <View className="text-[#acc855] text-[100px]">
                Danh mục
            </View>
        );
    }
}