import { View, Text, Switch } from '@tarojs/components';
import { useState, useEffect } from 'react';
import CustomDatePicker from 'src/componnents/CustomDatePicker';
import CustomPicker from 'src/componnents/CustomPicker';
import CustomInput from 'src/componnents/CustomInput';
import Header from 'src/componnents/Header';
import CustomButton from 'src/componnents/CustomButton';
import CustomRadio from 'src/componnents/RadioCustom';
import InfoList from 'src/componnents/InfoList';
import Taro from '@tarojs/taro';
import './index.scss';
import Step from 'src/componnents/Steps';
import { navigateToPage } from 'src/utils/navigate';

const InsuranceForm = () => {
    const [vehicleType, setVehicleType] = useState('');
    const [insuranceLevel, setInsuranceLevel] = useState('');
    const [participants, setParticipants] = useState(1);
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState('');
    const [duration, setDuration] = useState(1);
    const [referralCode, setReferralCode] = useState('');
    const [thirdPartyInsurance, setThirdPartyInsurance] = useState(true);
    const [purpose, setPurpose] = useState('Xe không kinh doanh');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [loadCapacity, setLoadCapacity] = useState('');
    const [seatingCapacity, setSeatingCapacity] = useState('');

    const [insuranceFees, setInsuranceFees] = useState([
        { label: 'Phí BH bắt buộc TNDS xe máy', value: '---' },
        { label: 'Thuế VAT', value: '---' },
        { label: 'Phí BH người ngồi trên xe', value: '---' },
        { label: 'Tổng phí chưa VAT', value: '---' },
        { label: 'Tổng thuế VAT', value: '---' },
        { label: 'Tổng phí BH', value: '0 VNĐ', isTotal: true },
    ]);

    const currentPage = Taro.getCurrentInstance();
    const type = currentPage?.router?.params?.type || '';

    const vehicleTypes = ['Xe máy', 'Ô tô', 'Xe tải'];
    const insuranceLevels = ['Mức bảo vệ 1', 'Mức bảo vệ 2', 'Mức bảo vệ 3'];
    const durationOptions = [
        { id: 'duration-1', value: 1, label: '1 năm' },
        { id: 'duration-2', value: 2, label: '2 năm' },
        { id: 'duration-3', value: 3, label: '3 năm' },
    ];
    const purposeOptions = [
        { id: 'purpose-1', value: 'Xe kinh doanh', label: 'Xe kinh doanh' },
        { id: 'purpose-2', value: 'Xe không kinh doanh', label: 'Xe không kinh doanh' },
    ];
    const brandOptions = ['Toyota', 'Honda', 'Ford', 'Hyundai', 'VinFast'];
    const modelOptions = ['Sedan', 'SUV', 'Pickup', 'Hatchback'];

    useEffect(() => {
        if (startDate) {
            const start = new Date(startDate);
            const end = new Date(start);
            end.setFullYear(start.getFullYear() + duration);
            setEndDate(end.toISOString().split('T')[0]);
        } else {
            setEndDate('');
        }
    }, [startDate, duration]);

    const handleParticipantsChange = (value) => {
        setParticipants(parseInt(value) || 1);
    };

    const handleDurationChange = (value) => {
        setDuration(value);
    };

    useEffect(() => {
        let baseFee = 0;
        let vat = 0;
        let thirdPartyFee = 0;

        if (vehicleType === 'Xe máy') baseFee = 66000;
        else if (vehicleType === 'Ô tô') baseFee = 480000;
        else if (vehicleType === 'Xe tải') baseFee = 750000;

        if (purpose === 'Xe kinh doanh') baseFee *= 1.2;

        vat = baseFee * 0.1;
        if (thirdPartyInsurance) thirdPartyFee = 20000 * participants;

        const totalFee = baseFee + vat + thirdPartyFee;

        setInsuranceFees([
            { label: 'Phí BH bắt buộc TNDS xe máy', value: `${baseFee.toLocaleString()} VNĐ` },
            { label: 'Thuế VAT', value: `${vat.toLocaleString()} VNĐ` },
            { label: 'Phí BH người ngồi trên xe', value: `${thirdPartyFee.toLocaleString()} VNĐ` },
            { label: 'Tổng phí chưa VAT', value: `${(baseFee + thirdPartyFee).toLocaleString()} VNĐ` },
            { label: 'Tổng thuế VAT', value: `${vat.toLocaleString()} VNĐ` },
            { label: 'Tổng phí BH', value: `${totalFee.toLocaleString()} VNĐ`, isTotal: true },
        ]);
    }, [vehicleType, thirdPartyInsurance, participants, purpose]);

    const handleContinue = () => {
        const formData = {
            vehicleType,
            insuranceLevel,
            participants,
            startDate,
            endDate,
            duration,
            referralCode,
            thirdPartyInsurance,
            purpose,
            brand,
            model,
            loadCapacity,
            seatingCapacity,
            insuranceFees,
            type,
        };

        Taro.setStorageSync('insuranceFormData', formData);
        navigateToPage(`/pages/vehicle-details?type=${type}`);
    };

    return (
        <View>
            {/* Header fixed ở top */}
            <View
                className="fixed top-0 left-0 right-0 bg-white shadow-bottom"
                style={{ zIndex: 20 }}
            >
                <Header title="Cài đặt thông tin bảo hiểm" />
                <View className="bg-[#F7F7F9]">
                    <Step totalSteps={4} currentStep={1} />
                </View>
            </View>

            {/* Nội dung chính với padding để tránh bị che */}
            <View className="pt-32 pb-20 min-h-screen">
                <View className="m-4">
                    <View className="border-left block mb-8">
                        <Text className="text-base mb-1 block">Thông tin bảo hiểm</Text>
                        <Text className="text-xs font-normal text-gray-500 block">
                            Nhập các thông tin bắt buộc (*) để bảo hiểm xe
                        </Text>
                    </View>
                    <CustomPicker
                        title={'Chọn loại xe'}
                        placeholder="Loại xe"
                        options={vehicleTypes}
                        onChange={setVehicleType}
                        required
                    />
                    {type === 'car' && (
                        <>
                            <View className="mt-4">
                                <Text className="text-base mb-2 block">Mục đích sử dụng</Text>
                                <CustomRadio
                                    options={purposeOptions}
                                    value={purpose}
                                    onChange={setPurpose}
                                    name="purpose"
                                />
                            </View>
                            <View className="mt-4">
                                <CustomPicker
                                    title={'Chọn hãng xe'}
                                    placeholder="Hãng xe"
                                    options={brandOptions}
                                    onChange={setBrand}
                                    required
                                />
                            </View>
                            <View className="mt-4">
                                <CustomPicker
                                    title={'Chọn dòng xe'}
                                    placeholder="Dòng xe"
                                    options={modelOptions}
                                    onChange={setModel}
                                    required
                                />
                            </View>
                            <View className="mt-4">
                                <CustomInput
                                    placeholder="Trọng tải (tấn)"
                                    value={loadCapacity}
                                    onChange={setLoadCapacity}
                                    required={vehicleType === 'Xe tải'}
                                />
                            </View>
                            <View className="mt-4">
                                <CustomInput
                                    placeholder="Số chỗ ngồi"
                                    value={seatingCapacity}
                                    onChange={setSeatingCapacity}
                                    required={vehicleType !== 'Xe tải'}
                                />
                            </View>
                        </>
                    )}
                    <View className="flex flex-row items-center justify-between mt-4">
                        <Text className="text-base block">Bảo hiểm tai nạn người ngồi trên xe</Text>
                        <Switch
                            checked={thirdPartyInsurance}
                            onChange={(e) => setThirdPartyInsurance(e.detail.value)}
                            color="#34C759"
                        />
                    </View>
                    <View className="mt-4">
                        <CustomPicker
                            title={'Chọn mức bảo vệ'}
                            placeholder="Mức bảo vệ"
                            options={insuranceLevels}
                            onChange={setInsuranceLevel}
                            required
                        />
                    </View>
                    <View className="mt-4">
                        <CustomInput
                            placeholder="Số người tham gia"
                            value={participants.toString()}
                            onChange={handleParticipantsChange}
                            required
                        />
                    </View>
                </View>
                <View className="m-4">
                    <Text className="text-base mb-4 block">Thời gian bảo hiểm</Text>
                    <CustomRadio
                        options={durationOptions}
                        value={duration}
                        onChange={handleDurationChange}
                        name="duration"
                    />
                    <View className="flex flex-row justify-between mt-4">
                        <View className="w-[48%]">
                            <CustomDatePicker
                                placeholder="Từ ngày"
                                onChange={setStartDate}
                                value={startDate}
                                required
                            />
                        </View>
                        <View className="w-[48%]">
                            <CustomDatePicker
                                placeholder="Đến ngày"
                                value={endDate}
                                disabled
                                required
                            />
                        </View>
                    </View>
                </View>
                <View className="m-4">
                    <Text className="text-base mb-4 block">Mã giới thiệu</Text>
                    <CustomInput
                        placeholder="Nhập mã giới thiệu"
                        value={referralCode}
                        onChange={(value) => setReferralCode(value)}
                    />
                </View>
                <View className="shadow-sm h-2" style={{ backgroundColor: '#3333331A' }} />
                <View className="m-4">
                    <View className="border-left block mb-8">
                        <Text className="text-base mb-1 block">Thông tin phí bảo hiểm</Text>
                        <Text className="text-xs font-normal text-gray-500 block">
                            Xác nhận các thông tin về phí mua bảo hiểm
                        </Text>
                    </View>
                    <InfoList data={insuranceFees} />
                </View>
            </View>

            {/* Button fixed ở bottom */}
            <View
                className="fixed bottom-0 left-0 right-0 p-4 pt-2 bg-white shadow-top"
                style={{ zIndex: 10 }}
            >
                <View className="flex flex-row gap-4">
                    <CustomButton title="Tiếp tục" onClick={handleContinue} />
                </View>
            </View>
        </View>
    );
};

export default InsuranceForm;