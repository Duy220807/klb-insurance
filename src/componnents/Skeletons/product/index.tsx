import { View } from '@tarojs/components';

interface ProductCardSkeletonProps {
    count: number; // Số lượng card skeleton cần hiển thị
}

const ProductCardSkeleton = ({ count }: ProductCardSkeletonProps) => {
    return (
        <>
            {[...Array(count)].map((_, index) => (
                <View
                    key={index}
                    className="bg-white p-4 rounded-lg shadow mb-4"
                >
                    <View className="flex flex-row items-start w-full h-24">
                        <View className="h-12 w-12 bg-gray-300 rounded animate-pulse mr-4" />
                        <View className="flex-1">
                            <View className="h-5 w-3/4 bg-gray-300 rounded mb-2 animate-pulse" />
                            <View className="h-4 w-1/2 bg-gray-300 rounded mb-1 animate-pulse" />
                            <View className="flex flex-row justify-between">
                                <View className="h-4 w-1/3 bg-gray-300 rounded animate-pulse" />
                            </View>
                        </View>
                        <View className="h-8 w-16 bg-gray-300 rounded animate-pulse ml-4" />
                    </View>
                    {/* Row với 2 phần tử và space-between */}
                    <View className="flex flex-row justify-between w-full mt-2">
                        <View className="h-8 w-1/3 bg-gray-300 rounded animate-pulse" />
                        <View className="h-8 w-1/3 bg-gray-300 rounded animate-pulse" />
                    </View>
                </View>
            ))}
        </>
    );
};

export default ProductCardSkeleton;