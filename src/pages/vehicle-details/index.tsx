import { View, Text } from '@tarojs/components';
import { useState, useEffect } from 'react';
import CustomInput from 'src/componnents/CustomInput';
import Header from 'src/componnents/Header';
import CustomButton from 'src/componnents/CustomButton';
import Taro from '@tarojs/taro';
import './index.scss';
import Step from 'src/componnents/Steps';
import { navigateToPage } from 'src/utils/navigate';

const VehicleDetails = () => {
    const [frameNumber, setFrameNumber] = useState('');
    const [engineNumber, setEngineNumber] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [address, setAddress] = useState('');

    const currentPage = Taro.getCurrentInstance();
    const type = currentPage?.router?.params?.type || '';

    useEffect(() => {
        const formData = Taro.getStorageSync('insuranceFormData') || {};
        console.log('Dữ liệu từ InsuranceForm:', formData);
    }, []);

    const handleSubmit = () => {
        if (!frameNumber || !engineNumber || !licensePlate || !ownerName || !address) {
            Taro.showToast({
                title: 'Vui lòng nhập đầy đủ các thông tin bắt buộc!',
                icon: 'error',
                duration: 2000,
            });
            return;
        }

        const formData = Taro.getStorageSync('insuranceFormData') || {};
        const combinedData = {
            frameNumber,
            engineNumber,
            licensePlate,
            ownerName,
            address,
            ...formData,
        };

        Taro.setStorageSync('combinedData', combinedData);
        navigateToPage(`/pages/buyer-info?type=${type}`);
    };

    return (
        <View>
            {/* Header fixed ở top */}
            <View
                className="fixed top-0 left-0 right-0 bg-white shadow-bottom"
                style={{ zIndex: 20 }}
            >
                <Header title="Thông tin chi tiết xe" />
                <View className="bg-[#F7F7F9]">
                    <Step totalSteps={4} currentStep={2} />
                </View>
            </View>

            {/* Nội dung chính với padding để tránh bị che */}
            <View className="pt-32 pb-20 min-h-screen">
                <View className="m-4">
                    <View className="border-left block mb-6">
                        <Text className="text-base mb-1 block">Thông tin chi tiết xe</Text>
                        <Text className="text-xs font-normal text-gray-500 block">
                            Nhập các thông tin bắt buộc (*) theo Giấy đăng ký của xe được bảo hiểm
                        </Text>
                    </View>
                    <View className="mt-4">
                        <CustomInput
                            placeholder="Số khung xe"
                            value={frameNumber}
                            onChange={setFrameNumber}
                            required
                        />
                    </View>
                    <View className="mt-4">
                        <CustomInput
                            placeholder="Số máy xe"
                            value={engineNumber}
                            onChange={setEngineNumber}
                            required
                        />
                    </View>
                    <View className="mt-4">
                        <CustomInput
                            placeholder="Biển số xe"
                            value={licensePlate}
                            onChange={setLicensePlate}
                            required
                        />
                    </View>
                    <View className="mt-4">
                        <CustomInput
                            placeholder="Tên chủ xe"
                            value={ownerName}
                            onChange={setOwnerName}
                            required
                        />
                    </View>
                    <View className="mt-4">
                        <CustomInput
                            placeholder="Địa chỉ"
                            value={address}
                            onChange={setAddress}
                            required
                        />
                    </View>
                </View>
            </View>

            {/* Button fixed ở bottom */}
            <View
                className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-top"
                style={{ zIndex: 10 }}
            >
                <View className="flex flex-row gap-4">
                    <CustomButton title="Tiếp tục" type="primary" onClick={handleSubmit} />
                </View>
            </View>
        </View>
    );
};

export default VehicleDetails;