import { View, Text, Image } from '@tarojs/components';
import CardBG from './../../assets/images/card-background.png';
import CardBGExpired from './../../assets/images/card-background-expired.png'; // Import background mới
import './index.scss';

interface SimpleInsuranceCardProps {
    name: string;
    contractNumber: string;
    brand: string;
    status?: string;
    icon: string;
    calculateDaysLeft: (dueDate: string) => number;
    dueDate: string;
}

const SimpleInsuranceCard = ({
    name,
    contractNumber,
    brand,
    status,
    icon,
    calculateDaysLeft,
    dueDate,
}: SimpleInsuranceCardProps) => {
    const daysLeft = calculateDaysLeft(dueDate);

    // Xác định trạng thái hiển thị
    let displayStatus = status;
    if (daysLeft <= 7 && daysLeft >= 0) {
        displayStatus = 'Tái tục';
    }

    // Xác định class màu dựa trên trạng thái
    const statusStyles: { [key: string]: string } = {
        'Đang hiệu lực': 'status-active',
        'Hết hiệu lực': 'status-expired',
        'Không thành công': 'status-failed',
        'Đang xử lý': 'status-processing',
        'Đã hủy': 'status-canceled',
        'Tái tục': 'status-renew',
    };

    // Giá trị mặc định nếu status không khớp
    const statusClass = displayStatus && statusStyles[displayStatus]
        ? statusStyles[displayStatus]
        : 'status-default';

    // Chọn background dựa trên trạng thái
    const backgroundImage = displayStatus === 'Hết hiệu lực' ? CardBGExpired : CardBG;

    return (
        <View
            className="rounded-sm bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url(${backgroundImage})`, // Sử dụng background động
            }}
        >
            <View className="flex flex-row p-4">
                <Image src={icon} className="w-10 h-10 mr-4" />
                <View className="flex flex-col flex-1">
                    <View className="flex flex-row justify-between items-center">
                        <Text className="text-xs">
                            <span className="font text-gray-600">{contractNumber}</span>
                        </Text>
                        {displayStatus && (
                            <Text
                                className={`text-xs font-normal px-2 rounded-full bg-white ${statusClass}`}
                            >
                                {displayStatus}
                            </Text>
                        )}
                    </View>
                    <Text className="text-sm">{name}</Text>
                    <Text className="text-sm font-normal text-gray-600">{brand}</Text>
                </View>
            </View>
        </View>
    );
};

export default SimpleInsuranceCard;