import { View, Image } from '@tarojs/components';
import LoadingIcon from '../../assets/icons/loading-icon.svg'; // Giả sử bạn có icon loading

interface LoadingOverlayProps {
    visible: boolean;
}

const LoadingOverlay = ({ visible }: LoadingOverlayProps) => {
    if (!visible) return null;

    return (
        <View className="fixed top-0 left-0 right-0 flex justify-center items-center py-2 z-50">
            <Image src={LoadingIcon} className="w-6 h-6 animate-spin" />
        </View>
    );
};

export default LoadingOverlay;