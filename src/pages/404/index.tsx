import { View, Text, Image } from '@tarojs/components';
import { navigateTo } from '@tarojs/taro';
import CustomButton from 'src/componnents/CustomButton';
import NotFoundImage from './../../assets/icons/waiting.jpg'; // Giả sử bạn có một hình ảnh 404

const NotFoundPage = () => {
    const handleBackToHome = () => {
        navigateTo({ url: '/pages/index' }); // Chuyển hướng về trang chủ
    };

    return (
        <View className="flex flex-col min-h-screen bg-white">
            {/* Nội dung chính: ảnh, tiêu đề, mô tả */}
            <View className="flex flex-col items-center justify-center flex-1 p-4 pb-20">
                {/* Hình ảnh 404 */}
                <View className="mb-8 p-24 pt-0 pb-4 flex items-center justify-center">
                    <Image src={NotFoundImage} className="w-full h-full object-contain" />
                </View>

                {/* Tiêu đề */}
                <Text className="text-xl font-semibold text-primary mb-1 text-center">
                    Chức năng đang triển khai
                </Text>

                {/* Mô tả */}
                <Text className="text-sm font-normal text-gray-600 mb-8 text-center px-4">
                    Vui lòng quay lại trang chủ để tiếp tục trải nghiệm.
                </Text>
            </View>

            {/* Nút quay lại trang chủ */}
            <View className="fixed bottom-0 left-0 right-0 p-4 pt-2 bg-white shadow-top">
                <View className="flex flex-row gap-4">
                    <CustomButton title="Trang chủ" onClick={handleBackToHome} />
                </View>
            </View>
        </View>
    );
};

export default NotFoundPage;