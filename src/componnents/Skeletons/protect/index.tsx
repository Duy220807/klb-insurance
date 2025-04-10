import { View } from '@tarojs/components';

const InsuranceListSkeleton = () => {
    return (
        <View className="flex flex-col bg-white">

            {/* Mỗi mục bảo hiểm */}
            {[...Array(3)].map((_, index) => (
                <View
                    key={index}
                    className="flex flex-row items-center p-4 border-b border-gray-200"
                >
                    {/* Icon bên trái */}
                    <View className="h-12 w-12 bg-gray-300 rounded animate-pulse mr-4" />

                    {/* Tiêu đề và mô tả */}
                    <View className="flex-1">
                        <View className="h-5 w-3/4 bg-gray-300 rounded mb-2 animate-pulse" />
                        <View className="h-4 w-1/3 bg-gray-300 rounded animate-pulse" />
                    </View>

                    {/* Mũi tên bên phải */}
                    <View className="h-6 w-6 bg-gray-300 rounded-full animate-pulse" />
                </View>
            ))}
        </View>
    );
};

export default InsuranceListSkeleton;