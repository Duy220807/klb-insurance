import { View, Text, Image } from '@tarojs/components';
import { useEffect, useState } from 'react';
import Header from 'src/componnents/Header';
import CustomButton from 'src/componnents/CustomButton';
import './index.scss';
import { navigateToPage } from 'src/utils/navigate';
import InfoList from 'src/componnents/InfoList';
import logo from './../../assets/icons/logo.svg';
import InsuranceIcon from './../../assets/icons/insurance-icon.svg';
import successBackground from './../../assets/backgrounds/bill-background.png';
import sampleImage from './../../assets/images/sample-image.png';
import saveIcon from './../../assets/icons/save-icon.svg';
import shareIcon from './../../assets/icons/share-icon.svg';

// Fake data (cập nhật với transactionTime)
const fakeData = {
    contractCode: "BH20230403-001",
    provider: "Bảo hiểm Bảo Việt",
    serviceType: "Bảo hiểm ô tô toàn diện",
    content: "Thanh toán phí bảo hiểm ô tô cho xe 51H-12345",
    insuranceFees: [
        { name: "Phí cơ bản", value: "10,000,000 VNĐ", isTotal: false },
        { name: "Phí bổ sung", value: "2,000,000 VNĐ", isTotal: false },
        { name: "Tổng phí", value: "12,000,000 VNĐ", isTotal: true }
    ],
    transactionCode: "TXN20230403-123456",
    transactionTime: "03/04/2025 14:30:00"
};

const PaymentSuccess = () => {
    const [formData, setFormData] = useState<any>(null);

    useEffect(() => {
        setFormData(fakeData);
    }, []);

    const handleBackToHome = () => {
        navigateToPage('/pages/home');
    };

    if (!formData) {
        return (
            <View>
                <Header title="Kết quả thanh toán" />
                <Text>Đang tải dữ liệu...</Text>
            </View>
        );
    }

    const paymentInfoData = [
        { label: "Mã Hợp đồng BH", value: formData.contractCode },
        { label: "Nhà cung cấp", value: formData.provider },
        { label: "Loại dịch vụ", value: formData.serviceType },
        {
            label: "Tổng phí BH",
            value: formData.insuranceFees?.find(fee => fee.isTotal)?.value,
            isBold: true
        },
        { label: "Thời gian giao dịch", value: formData.transactionTime }
    ];

    return (
        <View>
            <View className="min-h-screen pt-8">
                <View className="px-6 py-4 m-2" style={{ backgroundImage: `url(${successBackground})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                    {/* View mới: Thanh toán thành công với mã giao dịch */}
                    <View className="p-4 flex flex-col items-center">
                        <Text className="text-sm font-normal">Giao dịch thành công</Text>
                        <Text className="text-2xl font-bold text-primary">
                            {formData.insuranceFees?.find(fee => fee.isTotal)?.value || '12,000,000 VNĐ'}
                        </Text>
                        <Text className="text-sm font-normal text-gray-600 ">
                            Mã giao dịch: {formData.transactionCode}
                        </Text>
                    </View>
                    <View className="payment-divider" />
                    {/* View mới: Thông tin tài khoản */}
                    <View className='py-2'>
                        <View className="flex flex-row items-start">
                            <Image src={logo} className="w-10 h-10 mr-4" />
                            <View className="flex flex-1 flex-row items-center justify-between">
                                <View className="flex flex-col">
                                    <Text className="text-sm font-normal text-gray-600">Từ tài khoản</Text>
                                    <Text className="text-base">LE NAM NGUYEN</Text>
                                    <Text className="text-sm font-normal text-gray-600">33238322</Text>
                                </View>
                            </View>
                        </View>
                        <View className="shadow-sm my-3 mx-[-8px] h-px bg-gray-200" />
                        <View className="flex flex-row items-start">
                            <Image src={InsuranceIcon} className="w-10 h-10 mr-4" />
                            <View className="flex flex-1 flex-row items-center justify-between">
                                <View className="flex flex-col">
                                    <Text className="text-sm font-normal text-gray-600">Thanh toán cho</Text>
                                    <Text className="text-base">BAO HIEM BAO MINH</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* Thông tin thanh toán */}
                    <InfoList data={paymentInfoData} />
                </View>

                {/* View mới 1: Ảnh full width */}
                <View className="m-4 mt-0">
                    <Image src={sampleImage} className="w-full h-auto" mode="widthFix" />
                </View>

                <View className="shadow-sm h-2 mx-[-32px] mb-4" style={{ backgroundColor: '#3333331A' }} />

                {/* View mới 2: Icon lưu ảnh và chia sẻ */}
                <View className="flex flex-row justify-between p-8 pb-20">
                    <View className="flex flex-col items-center w-40 h-22">
                        <Image src={saveIcon} className="w-12 h-12 mb-1" />
                        <Text className="text-sm text-gray-600">Lưu ảnh</Text>
                    </View>
                    <View className="flex flex-col items-center w-40 h-22">
                        <Image src={shareIcon} className="w-12 h-12 mb-1" />
                        <Text className="text-sm text-gray-600">Chia sẻ</Text>
                    </View>
                </View>

                {/* Button fixed ở bottom */}
                <View
                    className="fixed bottom-0 left-0 right-0 p-4 pt-2 bg-white shadow-top"
                    style={{ zIndex: 10 }}
                >
                    <View className="flex flex-row gap-4">
                        <CustomButton title="Trang chủ" onClick={handleBackToHome} />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default PaymentSuccess;