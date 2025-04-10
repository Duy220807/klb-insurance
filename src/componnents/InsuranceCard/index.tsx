import { View, Text, Image } from '@tarojs/components';
import CardBG from './../../assets/images/card-background.png';
import CardBGExpired from './../../assets/images/card-background-expired.png';
import ArrowRight from './../../assets/icons/arow-line.svg';
import './index.scss';
import CustomButton from 'src/componnents/CustomButton';

interface InsuranceCardProps {
    name: string;
    contractNumber: string;
    brand: string;
    effectiveDate: string;
    dueDate: string;
    status?: string;
    icon: string;
    calculateDaysLeft: (dueDate: string) => number;
    onDelete?: (contractNumber: string) => void; // Thêm prop onDelete
}

const InsuranceCard = ({
    name,
    contractNumber,
    brand,
    effectiveDate,
    dueDate,
    status,
    icon,
    calculateDaysLeft,
    onDelete,
}: InsuranceCardProps) => {
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
        <View className="mb-4 shadow rounded-sm">
            <View
                className="bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
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
                        <View className="flex flex-row justify-between items-center">
                            <Text className="text-sm font-normal text-gray-600">{brand}</Text>
                            <Image src={ArrowRight} className="w-4 h-4" />
                        </View>
                    </View>
                </View>
            </View>
            <View className="flex flex-row justify-between items-start bg-white p-4 rounded-b-sm">
                <View className="flex flex-col">
                    <Text className="text-xs text-gray-600 font-normal">Ngày hiệu lực</Text>
                    <Text className="text-xs font-normal">{effectiveDate}</Text>
                </View>
                <View className="flex flex-col">
                    <Text className="text-xs text-gray-600 font-normal">Ngày kết thúc</Text>
                    <View className="flex flex-row items-center">
                        <Text className="text-xs font-normal">{dueDate}</Text>
                        {daysLeft <= 7 && daysLeft >= 0 && (
                            <Text className="text-xs font-normal ml-1">
                                (còn <span className="text-red-600 font-semibold">{daysLeft}</span> ngày)
                            </Text>
                        )}
                    </View>
                </View>
            </View>

            {/* Hiển thị nút Xóa nếu trạng thái là "Không thành công" */}
            {displayStatus === 'Không thành công' && (
                <CustomButton
                    title="Xóa"
                    type="tertiary"
                    onClick={(e) => {
                        e.stopPropagation(); // Ngăn sự kiện click cha (handleContractClick)
                        if (onDelete) {
                            onDelete(contractNumber);
                        }
                    }}
                />
            )}
        </View>
    );
};

export default InsuranceCard;