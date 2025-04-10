import { View, Text, Image } from '@tarojs/components';
import { AtFloatLayout } from 'taro-ui';
import icon from './../../assets/icons/icon.svg';
import './index.scss';

interface CustomModalProps {
    isOpened: boolean;
    onClose: () => void;
    onSelect: (insuranceName: string) => void;
}

const insuranceProviders = [
    { id: 'bao-minh', name: 'Bảo Hiểm Bảo Minh', description: 'Tổng Công ty Cổ Phần Bảo Minh' },
    { id: 'bao-viet', name: 'Bảo Hiểm Bảo Việt', description: 'Tập đoàn Bảo Việt' }, // Thêm dữ liệu khác nhau
];

const CustomModal = ({ isOpened, onClose, onSelect }: CustomModalProps) => {
    return (
        <AtFloatLayout isOpened={isOpened} onClose={onClose} title="Chọn đơn vị Bảo Hiểm">
            <View className="flex flex-col">
                {insuranceProviders.map(provider => (
                    <View
                        key={provider.id}
                        className="flex flex-row items-center p-4 bg-white m-2 rounded-sm border-b border-gray-200 last:border-b-0"
                        onClick={() => onSelect(provider.name)}
                    >
                        <View className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                            <Image src={icon} className="w-full h-full" />
                        </View>
                        <View className="flex flex-col">
                            <Text className="text-sm font-semibold">{provider.name}</Text>
                            <Text className="text-xs text-gray-500 font-normal">{provider.description}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </AtFloatLayout>
    );
};

export default CustomModal;