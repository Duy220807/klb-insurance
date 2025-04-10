import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';

// Import icons
import ShieldIcon from './../../assets/icons/motorcycle.svg';
import BenefitIcon from './../../assets/icons/benefit.svg';
import WarningIcon from './../../assets/icons/warning.svg';
import ClockIcon from './../../assets/icons/clock.svg';
import PriceIcon from './../../assets/icons/price-tag.svg';
import CustomButton from 'src/componnents/CustomButton';
import AboutCustom from 'src/componnents/AboutCustom';
import { navigateToPage } from 'src/utils/navigate';

// Define TypeScript interfaces for props
interface HeaderData {
    title: string;
    subtitle: string;
}

interface PriceItem {
    price: string;
    description: string;
}

interface MotorcycleInsuranceContentProps {
    headerData: HeaderData;
    priceData: PriceItem[];
    applicableObjects: string[];
    benefits: string[];
    exclusions: string[];
    duration: string[];
    background: string;
}

const MotorcycleInsuranceContent: React.FC<MotorcycleInsuranceContentProps> = ({
    headerData,
    priceData,
    applicableObjects,
    benefits,
    exclusions,
    duration,
    background,
}) => {
    const handleRegister = () => {
        const currentPage = Taro.getCurrentInstance();
        const currentPath = currentPage?.router?.path || '';
        const [pathWithoutQuery] = currentPath.split('?');
        const pathParts = pathWithoutQuery.split('/');
        const pageName = pathParts[pathParts.length - 1];
        const type = pageName.replace('about-', '');
        const registerUrl = `/pages/register?type=${type}`;
        console.log('Register URL:', registerUrl);
        navigateToPage(registerUrl);
    };

    const handleBack = () => {
        Taro.navigateBack();
    };

    const { title, subtitle } = headerData;

    return (
        <View
            className="flex flex-col bg-gray-100 w-full"
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: '100% auto',
                backgroundPosition: 'center top',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Tiêu đề chính từ biến */}
            <View className="p-4 rounded-lg mx-4 mt-58 text-center">
                <Text className="text-base font-semibold text-secondary">{title}</Text>
                <br />
                <Text className="text-sm text-secondary mt-1">{subtitle}</Text>
            </View>

            {/* Giá bảo hiểm */}
            <View className="flex flex-row justify-around p-4 pt-2 bg-white bg-opacity-90 rounded-lg mx-4">
                {priceData.map((item, index) => (
                    <View key={index} className="flex flex-col items-center">
                        <Image src={PriceIcon} className="w-6 h-6 mb-2" />
                        <Text className="text-sm font-semibold text-orange">{item.price}</Text>
                        <Text className="text-xs font-normal text-gray-600 text-center max-w-[180px]">
                            {item.description}
                        </Text>
                    </View>
                ))}
            </View>

            {/* Các section sử dụng AboutCustom */}
            <AboutCustom title="Đối tượng áp dụng:" items={applicableObjects} icon={ShieldIcon} />
            <View className="shadow-sm h-2" style={{ backgroundColor: '#3333331A' }} />

            <AboutCustom title="Quyền lợi bảo hiểm:" items={benefits} icon={BenefitIcon} />
            <View className="shadow-sm h-2" style={{ backgroundColor: '#3333331A' }} />

            <AboutCustom title="Loại trừ trách nhiệm bảo hiểm:" items={exclusions} icon={WarningIcon} />
            <View className="shadow-sm h-2" style={{ backgroundColor: '#3333331A' }} />

            <AboutCustom title="Thời hạn bảo hiểm:" items={duration} icon={ClockIcon} />
            <View className='pb-20' />
            {/* Nút đăng ký mua - Fixed ở bottom */}
            <View className="fixed bottom-0 left-0 right-0 p-4 pt-2 bg-white shadow-top"
                style={{ zIndex: 10 }}>
                <View className="flex flex-row gap-4 justify-center">
                    <CustomButton title="Để sau" type="secondary" onClick={handleBack} />
                    <CustomButton title="Đăng ký mua" type="primary" onClick={handleRegister} />
                </View>
            </View>
        </View>
    );
};

export default MotorcycleInsuranceContent;