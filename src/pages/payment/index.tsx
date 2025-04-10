import { View, Text, Image } from '@tarojs/components';
import { useEffect, useState } from 'react';
import Header from 'src/componnents/Header';
import CustomButton from 'src/componnents/CustomButton';
import './index.scss';
import { navigateToPage } from 'src/utils/navigate';
import InfoList from 'src/componnents/InfoList';
import logo from './../../assets/icons/logo.svg';
import InsuranceIcon from './../../assets/icons/insurance-icon.svg';

// Data giả
const fakeData = {
    contractCode: "BH20230403-001",
    provider: "Bảo hiểm Bảo Việt",
    serviceType: "Bảo hiểm ô tô toàn diện",
    content: "Thanh toán phí bảo hiểm ô tô cho xe 51H-12345",
    insuranceFees: [
        { name: "Phí cơ bản", value: "10,000,000 VNĐ", isTotal: false },
        { name: "Phí bổ sung", value: "2,000,000 VNĐ", isTotal: false },
        { name: "Tổng phí", value: "12,000,000 VNĐ", isTotal: true }
    ]
};

const PaymentInfo = () => {
    const [formData, setFormData] = useState<any>(null);

    useEffect(() => {
        setFormData(fakeData);
    }, []);

    const handlePayment = () => {
        navigateToPage('/pages/payment-success');
    };

    if (!formData) {
        return (
            <View>
                <Header title="Thanh toán phí bảo hiểm" />
                <Text>Đang tải dữ liệu...</Text>
            </View>
        );
    }

    const paymentInfoData = [
        { label: "Mã Hợp đồng BH", value: formData.contractCode },
        { label: "Nhà cung cấp", value: formData.provider },
        { label: "Loại dịch vụ", value: formData.serviceType },
        { label: "Nội dung", value: formData.content },
    ];

    const insuranceFees = [
        {
            label: "Tổng phí BH",
            value: formData.insuranceFees?.find(fee => fee.isTotal)?.value,
            isBold: true
        }
    ];

    return (
        <View>
            {/* Header fixed ở top */}
            <View
                className="fixed top-0 left-0 right-0 bg-white shadow-bottom"
                style={{ zIndex: 10 }}
            >
                <Header title="Thanh toán phí bảo hiểm" />
            </View>

            {/* Nội dung chính với padding để tránh bị che */}
            <View className="pt-16 pb-24 min-h-screen">
                <View className="p-4">
                    {/* View mới: Số tiền giao dịch, căn trái */}
                    <View className="bg-[#F4F4F7] m-[-32px] p-4 flex flex-col items-start">
                        <Text className="text-base font-normal">Số tiền giao dịch</Text>
                        <Text className="text-3xl mt-2">
                            {formData.insuranceFees?.find(fee => fee.isTotal)?.value || '12,000,000 VNĐ'}
                        </Text>
                    </View>
                    <View className='py-8'>
                        <View className="flex flex-row items-start">
                            <Image src={logo} className="w-10 h-10 mr-4" />
                            <View className="flex flex-1 flex-row items-center justify-between">
                                <View className="flex flex-col">
                                    <Text className="text-sm font-normal text-gray-600">Từ tài khoản</Text>
                                    <Text className="text-base">LE NAM NGUYEN</Text>
                                    <Text className="text-sm font-normal text-gray-600">33238322</Text>
                                    <Text className="text-sm font-normal text-gray-600">KienlongBank - NH TMCP Kiên Long</Text>
                                </View>
                            </View>
                        </View>
                        <View className="shadow-sm my-4 h-px bg-gray-200" />
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
                    <View className="shadow-sm h-2 mx-[-32px] mb-4" style={{ backgroundColor: '#3333331A' }} />
                    {/* Thông tin thanh toán */}
                    <Text className="text-base mb-1 block">Thông tin thanh toán</Text>
                    <InfoList data={paymentInfoData} />
                </View>
            </View>

            {/* Button fixed ở bottom */}
            <View
                className="fixed bottom-0 left-0 right-0 p-4 pt-2 bg-white shadow-top"
                style={{ zIndex: 10 }}
            >
                <InfoList data={insuranceFees} />
                <View className="flex flex-row gap-4">
                    <CustomButton title="Tiếp tục" onClick={handlePayment} />
                </View>
            </View>
        </View>
    );
};

export default PaymentInfo;