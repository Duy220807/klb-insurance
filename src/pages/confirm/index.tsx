import { View, Text, Image, CheckboxGroup, Checkbox } from '@tarojs/components';
import { useEffect, useState } from 'react';
import Header from 'src/componnents/Header';
import CustomButton from 'src/componnents/CustomButton';
import Step from 'src/componnents/Steps';
import Taro from '@tarojs/taro';
import './index.scss';
import { navigateToPage } from 'src/utils/navigate';
import ArrowRight from './../../assets/icons/arrow-line-none.svg';
import MoneyIcon from './../../assets/icons/money-icon.svg';
import logo from './../../assets/icons/logo.svg';
import InfoList from 'src/componnents/InfoList';

const InsuranceConfirmation = () => {
    const [formData, setFormData] = useState<any>(null);

    useEffect(() => {
        const storedData = Taro.getStorageSync('finalData');
        if (storedData) {
            setFormData(storedData);
        }
    }, []);

    const handleContinue = () => {
        navigateToPage('/pages/payment');
    };

    const handleBack = () => {
        Taro.navigateBack();
    };

    if (!formData) {
        return (
            <View>
                <Header title="Thông tin đơn bảo hiểm" />
                <Text>Đang tải dữ liệu...</Text>
            </View>
        );
    }

    const commonBuyerInfo = [
        { label: "Số điện thoại", value: formData.phone },
        { label: "Email", value: formData.email },
        { label: "Địa chỉ liên lạc", value: formData.contactAddress }
    ];

    const buyerInfoData = formData.buyerType === 'Tổ chức'
        ? [
            { label: "Tên tổ chức", value: formData.organizationName },
            { label: "Mã số thuế", value: formData.taxCode }
        ].concat(commonBuyerInfo)
        : [
            { label: "Họ và tên", value: formData.individualName },
            { label: "Ngày sinh", value: formData.birthDate },
            { label: "Giới tính", value: formData.gender },
            { label: "Số GTTT", value: formData.idNumber }
        ].concat(commonBuyerInfo);

    const insuranceInfoData = [
        { label: "Gói bảo hiểm", value: formData.insuranceLevel },
        { label: "Ngày bắt đầu", value: formData.startDate },
        { label: "Ngày kết thúc", value: formData.endDate },
        { label: "Mức bảo hiểm người ngồi trên xe", value: formData.insuranceLevel },
        { label: "Số người tham gia", value: formData.participants },
        {
            label: "Tổng phí bảo hiểm",
            value: formData.insuranceFees?.find(fee => fee.isTotal)?.value || '0 VNĐ',
            isBold: true
        }
    ];

    const vehicleInfoData = [
        { label: "Loại xe", value: formData.vehicleType },
        { label: "Số khung", value: formData.frameNumber },
        { label: "Số máy", value: formData.engineNumber },
        { label: "Biển số", value: formData.licensePlate },
        { label: "Tên chủ xe", value: formData.ownerName },
        { label: "Địa chỉ", value: formData.address }
    ];

    return (
        <View>
            {/* Header fixed ở top với zIndex 20 */}
            <View
                className="fixed top-0 left-0 right-0 bg-white shadow-bottom"
                style={{ zIndex: 20 }}
            >
                <Header title="Thông tin đơn bảo hiểm" />
                <View className="bg-[#F7F7F9]">
                    <Step totalSteps={4} currentStep={4} />
                </View>
            </View>

            {/* Nội dung chính với padding để tránh bị che */}
            <View className="pt-32 pb-20 min-h-screen">
                <View className="m-4">
                    {/* Thông tin bên mua bảo hiểm */}
                    <View className="border-left block mb-6">
                        <Text className="text-base mb-1 block">Thông tin bên mua bảo hiểm</Text>
                        <Text className="text-xs font-normal text-gray-500 block">
                            Xác nhận các thông tin của bên mua bảo hiểm
                        </Text>
                    </View>
                    <View className="bg-white rounded-md mb-8">
                        <Text className="text-base mb-4 block">Chọn tài khoản nguồn</Text>
                        <View className="mb-4 p-4 shadow rounded-sm bg-cover bg-center bg-no-repeat">
                            <View className="flex flex-row items-center">
                                <Image src={logo} className="w-10 h-10 mr-4" />
                                <View className="flex flex-1 flex-row items-center justify-between">
                                    <View className="flex flex-col">
                                        <Text className="text-base">LE NAM NGUYEN</Text>
                                        <Text className="text-sm font-normal text-gray-600">33238322</Text>
                                    </View>
                                    <View className="flex items-center justify-center">
                                        <Image src={ArrowRight} className="w-6 h-6" />
                                    </View>
                                </View>
                            </View>
                            <View className="shadow-sm mt-4 h-px bg-gray-200" />
                            <View className="flex flex-row justify-between items-start bg-white rounded-b-sm pt-4">
                                <View className="flex flex-row items-center">
                                    <Image src={MoneyIcon} className="w-6 h-6 mr-2" />
                                    <Text className="text-sm text-gray-600 font-normal">Số dư</Text>
                                </View>
                                <View className="flex flex-col">
                                    <Text className="text-base text-gray-600 font-bold">14,444,990,000 VNĐ</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className="bg-white rounded-md mb-8">
                        <Text className="text-base mb-4 block">Thông tin bên mua</Text>
                        <InfoList data={buyerInfoData} />
                    </View>
                    <View className="shadow-sm h-2 mx-[-32px]" style={{ backgroundColor: '#3333331A' }} />
                    {/* Thông tin đơn bảo hiểm */}
                    <View className="border-left block mb-8 mt-4">
                        <Text className="text-base mb-1 block">Thông tin đơn bảo hiểm</Text>
                        <Text className="text-xs font-normal text-gray-500 block">
                            Xác nhận các thông tin của đơn bảo hiểm
                        </Text>
                    </View>
                    <View className="bg-white rounded-md mb-8">
                        <Text className="text-base mb-4 block">Thông tin gói bảo hiểm</Text>
                        <InfoList data={insuranceInfoData} />
                    </View>

                    {/* Thông tin xe được bảo hiểm */}
                    <View className="bg-white rounded-md mb-4">
                        <Text className="text-base mb-4 block">Thông tin xe được bảo hiểm</Text>
                        <InfoList data={vehicleInfoData} />
                        {formData?.buyerType === 'Tổ chức' && (
                            <View className="mt-4 flex flex-row items-center">
                                <CheckboxGroup>
                                    <Checkbox
                                        checked={formData.issueVatInvoice}
                                        value="issueVat"
                                        className="custom-checkbox"
                                        disabled
                                    />
                                </CheckboxGroup>
                                <Text className="ml-2 text-sm font-normal">Xuất hóa đơn VAT</Text>
                            </View>
                        )}
                        <View className="shadow-sm mt-4 mx-[-32px] h-px bg-gray-200" />
                        <View className="mt-4 bg-[#fff] rounded-sm">
                            <Text
                                className="text-sm font-normal text-gray-600"
                                style={{ lineHeight: '1rem', display: 'block' }}
                            >
                                Bằng việc bấm Thanh toán, quý khách đã xác nhận đồng ý <span className="text-red-600">Điều kiện và điều khoản</span> của chúng tôi.
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Button fixed ở bottom */}
            <View
                className="fixed bottom-0 left-0 right-0 p-4 pt-2 bg-white shadow-top"
                style={{ zIndex: 10 }}
            >
                <View className="flex flex-row gap-4">
                    <CustomButton title="Trang chủ" onClick={handleBack} type="secondary" />
                    <CustomButton title="Thanh toán" onClick={handleContinue} />
                </View>
            </View>
        </View>
    );
};

export default InsuranceConfirmation;