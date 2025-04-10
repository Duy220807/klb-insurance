import { View, Text } from '@tarojs/components';
import ProductCardSkeleton from '../product';

const HomeSkeleton = () => {
    return (
        <View className="flex flex-col min-h-screen bg-white">
            {/* Header */}
            <View className="bg-white p-4 flex flex-row items-center justify-between">
                <View className="h-8 w-32 bg-gray-300 rounded animate-pulse" />
                <View className="h-6 w-12 bg-gray-300 rounded-full animate-pulse" />
            </View>

            <View className='p-4 pt-0'>
                <View className="h-32 w-full bg-gray-300 rounded-lg animate-pulse mb-4" />
            </View>

            {/* Navigation Bar */}
            <View className="bg-white p-4 pt-0 flex flex-row justify-around">
                <View className="flex flex-col items-center">
                    <View className="h-12 w-12 bg-gray-300 rounded-full animate-pulse" />
                    <View className="h-4 w-16 bg-gray-300 rounded mt-2 animate-pulse" />
                </View>
                <View className="flex flex-col items-center">
                    <View className="h-12 w-12 bg-gray-300 rounded-full animate-pulse" />
                    <View className="h-4 w-16 bg-gray-300 rounded mt-2 animate-pulse" />
                </View>
                <View className="flex flex-col items-center">
                    <View className="h-12 w-12 bg-gray-300 rounded-full animate-pulse" />
                    <View className="h-4 w-16 bg-gray-300 rounded mt-2 animate-pulse" />
                </View>
            </View>

            {/* Section "Sản phẩm nổi bật" */}
            <View className="p-4">
                {/* Tiêu đề "Sản phẩm nổi bật" */}
                <View className="h-6 w-32 bg-gray-300 rounded mb-4 animate-pulse" />

                {/* Banner quảng cáo */}
                <View className="h-40 w-full bg-gray-300 rounded-lg animate-pulse mb-4" />

                {/* 2 dòng thông tin chi phí */}
                <View className="flex flex-row justify-between mb-4">
                    <View className="h-8 w-28 bg-gray-300 rounded animate-pulse" />
                </View>

                {/* 2 nút "Thanh toán phí bảo hiểm" và "Xem thêm" */}
                <View className="flex flex-row justify-between mb-4">
                    <View className="h-6 w-40 bg-gray-300 rounded animate-pulse" />
                </View>

                {/* Card sản phẩm */}
                {/* Sử dụng ProductCardSkeleton với count={1} */}

                <ProductCardSkeleton count={1} />

                {/* Tiêu đề "Đơn vị Bảo Hiểm" và logo */}
                <View className="bg-white p-4 flex flex-row justify-around">
                    <View className="flex flex-col items-center">
                        <View className="h-12 w-12 bg-gray-300 rounded-full animate-pulse" />
                        <View className="h-4 w-16 bg-gray-300 rounded mt-2 animate-pulse" />
                    </View>
                    <View className="flex flex-col items-center">
                        <View className="h-12 w-12 bg-gray-300 rounded-full animate-pulse" />
                        <View className="h-4 w-16 bg-gray-300 rounded mt-2 animate-pulse" />
                    </View>
                    <View className="flex flex-col items-center">
                        <View className="h-12 w-12 bg-gray-300 rounded-full animate-pulse" />
                        <View className="h-4 w-16 bg-gray-300 rounded mt-2 animate-pulse" />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default HomeSkeleton;