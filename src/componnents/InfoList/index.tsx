import { View, Text } from '@tarojs/components';
import './index.scss'; // Nếu cần style riêng

const InfoList = ({ data }) => {
    // Kiểm tra nếu data không phải mảng hoặc rỗng
    if (!Array.isArray(data) || data.length === 0) {
        return <Text>Không có dữ liệu để hiển thị</Text>;
    }

    return (
        <View className="rounded-md mb-4">
            {data.map((item, index) => (
                <View key={index}>
                    <View className="flex flex-row justify-between m-4 ml-0">
                        {/* Bọc label trong View để giới hạn chiều rộng */}
                        <View className="label-container">
                            <Text
                                className="text-sm font-normal text-gray-600"
                                style={{ lineHeight: '1rem', display: 'block' }}
                            >
                                {item.label}
                            </Text>
                        </View>
                        {/* Bọc value trong View để giới hạn chiều rộng */}
                        <View className="value-container">
                            <Text
                                className={`text-base font-normal text-gray-600 text-right ${item.isBold ? 'font-semibold' : ''}`}
                                style={{ lineHeight: '1rem', display: 'block' }}
                            >
                                {item.value || 'N/A'}
                            </Text>
                        </View>
                    </View>
                    {index < data.length - 1 && (
                        <View className="shadow-sm mt-4 h-px bg-gray-200" />
                    )}
                </View>
            ))}
        </View>
    );
};

export default InfoList;