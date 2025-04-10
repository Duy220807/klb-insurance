import { View, Text, Checkbox, CheckboxGroup, Switch } from '@tarojs/components';
import { useState, useEffect } from 'react';
import CustomInput from 'src/componnents/CustomInput';
import CustomPicker from 'src/componnents/CustomPicker';
import CustomRadio from 'src/componnents/RadioCustom';
import Header from 'src/componnents/Header';
import CustomButton from 'src/componnents/CustomButton';
import Taro from '@tarojs/taro';
import './index.scss';
import Step from 'src/componnents/Steps';
import { navigateToPage } from 'src/utils/navigate';

const BuyerInfo = () => {
    const [buyerType, setBuyerType] = useState('Cá nhân');
    const [individualName, setIndividualName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [gender, setGender] = useState('');
    const [organizationName, setOrganizationName] = useState('');
    const [taxCode, setTaxCode] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [address, setAddress] = useState('');
    const [contactAddress, setContactAddress] = useState('');
    const [issueVatInvoice, setIssueVatInvoice] = useState(false);
    const [isBuyerOwner, setIsBuyerOwner] = useState(true);

    const currentPage = Taro.getCurrentInstance();
    const type = currentPage?.router?.params?.type || '';

    const buyerTypeOptions = [
        { id: 'individual', value: 'Cá nhân', label: 'Cá nhân' },
        { id: 'enterprise', value: 'Tổ chức', label: 'Tổ chức' },
    ];
    const genderOptions = ['Nam', 'Nữ', 'Khác'];
    const provinceOptions = ['Hà Nội', 'TP.HCM', 'Đà Nẵng'];
    const districtOptions = ['Quận 1', 'Quận 2', 'Quận 3'];
    const wardOptions = ['Phường 1', 'Phường 2', 'Phường 3'];

    useEffect(() => {
        const combinedData = Taro.getStorageSync('combinedData') || {};
        console.log('Dữ liệu từ VehicleDetails và InsuranceForm:', combinedData);

        if (isBuyerOwner && combinedData.ownerName) {
            if (buyerType === 'Cá nhân') {
                setIndividualName(combinedData.ownerName || 'Nguyễn Văn A');
                setBirthDate(combinedData.birthDate || '01/01/1990');
                setIdNumber(combinedData.idNumber || '123456789');
                setGender(combinedData.gender || 'Nam');
                setContactAddress(combinedData.address || '123 Đường Láng, Đống Đa, Hà Nội');
            } else if (buyerType === 'Tổ chức') {
                setOrganizationName(combinedData.ownerName || 'Công ty TNHH ABC');
                setTaxCode(combinedData.taxCode || '0123456789');
                setContactAddress(combinedData.address || '456 Đường Nguyễn Trãi, Thanh Xuân, Hà Nội');
            }
        }
    }, [isBuyerOwner, buyerType]);

    const handleSwitchChange = (e) => {
        const isChecked = e.detail.value;
        setIsBuyerOwner(isChecked);

        if (!isChecked) {
            if (buyerType === 'Cá nhân') {
                setIndividualName('');
                setBirthDate('');
                setIdNumber('');
                setGender('');
                setContactAddress('');
            } else if (buyerType === 'Tổ chức') {
                setOrganizationName('');
                setTaxCode('');
                setContactAddress('');
            }
        } else {
            const combinedData = Taro.getStorageSync('combinedData') || {};
            if (buyerType === 'Cá nhân') {
                setIndividualName(combinedData.ownerName || 'Nguyễn Văn A');
                setBirthDate(combinedData.birthDate || '01/01/1990');
                setIdNumber(combinedData.idNumber || '123456789');
                setGender(combinedData.gender || 'Nam');
                setContactAddress(combinedData.address || '123 Đường Láng, Đống Đa, Hà Nội');
            } else if (buyerType === 'Tổ chức') {
                setOrganizationName(combinedData.ownerName || 'Công ty TNHH ABC');
                setTaxCode(combinedData.taxCode || '0123456789');
                setContactAddress(combinedData.address || '456 Đường Nguyễn Trãi, Thanh Xuân, Hà Nội');
            }
        }
    };

    const handleSubmit = () => {
        const commonFields = [phone, email, province, district, ward, address, contactAddress];
        const individualFields = [individualName, birthDate, idNumber, gender];
        const enterpriseFields = [organizationName, taxCode];

        const isCommonValid = commonFields.every((field) => field !== '');
        let isSpecificValid = false;

        if (buyerType === 'Cá nhân') {
            isSpecificValid = individualFields.every((field) => field !== '');
        } else if (buyerType === 'Tổ chức') {
            isSpecificValid = enterpriseFields.every((field) => field !== '');
        }

        if (!isCommonValid || !isSpecificValid) {
            Taro.showToast({
                title: 'Vui lòng nhập đầy đủ các thông tin bắt buộc!',
                icon: 'error',
                duration: 2000,
            });
            return;
        }

        const combinedData = Taro.getStorageSync('combinedData') || {};
        const buyerData = {
            buyerType,
            individualName: buyerType === 'Cá nhân' ? individualName : '',
            birthDate: buyerType === 'Cá nhân' ? birthDate : '',
            idNumber: buyerType === 'Cá nhân' ? idNumber : '',
            gender: buyerType === 'Cá nhân' ? gender : '',
            organizationName: buyerType === 'Tổ chức' ? organizationName : '',
            taxCode: buyerType === 'Tổ chức' ? taxCode : '',
            phone,
            email,
            province,
            district,
            ward,
            address,
            contactAddress,
            issueVatInvoice,
            isBuyerOwner,
            ...combinedData,
        };

        Taro.setStorageSync('finalData', buyerData);
        navigateToPage(`/pages/confirm?type=${type}`);
    };

    return (
        <View>
            {/* Header fixed ở top */}
            <View
                className="fixed top-0 left-0 right-0 bg-white shadow-bottom"
                style={{ zIndex: 20 }}
            >
                <Header title="Thông tin bên mua và chủ xe" />
                <View className="bg-[#F7F7F9]">
                    <Step totalSteps={4} currentStep={3} />
                </View>
            </View>

            {/* Nội dung chính với padding để tránh bị che */}
            <View className="pt-32 pb-20 min-h-screen">
                <View className="m-4">
                    <View className="border-left block mb-8">
                        <Text className="text-base mb-1 block">Thông tin bên mua bảo hiểm</Text>
                        <Text className="text-xs font-normal text-gray-500 block">
                            Nhập các thông tin bắt buộc (*) của bên mua bảo hiểm
                        </Text>
                        <View className="w-[88%] mt-2">
                            <CustomRadio
                                options={buyerTypeOptions}
                                value={buyerType}
                                onChange={setBuyerType}
                                name="buyerType"
                            />
                        </View>
                    </View>

                    <View className="flex flex-row items-center justify-between mt-4">
                        <Text className="text-base block">Là chủ xe</Text>
                        <Switch
                            checked={isBuyerOwner}
                            onChange={handleSwitchChange}
                            color="#34C759"
                        />
                    </View>

                    {buyerType === 'Cá nhân' && (
                        <>
                            <View className="mt-4">
                                <CustomInput
                                    placeholder="Tên người mua"
                                    value={individualName}
                                    onChange={setIndividualName}
                                    required
                                    disabled={isBuyerOwner}
                                />
                            </View>
                            <View className="mt-4">
                                <CustomInput
                                    placeholder="Ngày sinh (DD/MM/YYYY)"
                                    value={birthDate}
                                    onChange={setBirthDate}
                                    required
                                    disabled={isBuyerOwner}
                                />
                            </View>
                            <View className="mt-4">
                                <CustomInput
                                    placeholder="Số giấy tờ tùy thân"
                                    value={idNumber}
                                    onChange={setIdNumber}
                                    required
                                    disabled={isBuyerOwner}
                                />
                            </View>
                            <View className="mt-4">
                                <CustomPicker
                                    title="Giới tính"
                                    placeholder="Chọn giới tính"
                                    options={genderOptions}
                                    onChange={setGender}
                                    required
                                    disabled={isBuyerOwner}
                                />
                            </View>
                        </>
                    )}

                    {buyerType === 'Tổ chức' && (
                        <>
                            <View className="mt-4">
                                <CustomInput
                                    placeholder="Tên tổ chức"
                                    value={organizationName}
                                    onChange={setOrganizationName}
                                    required
                                    disabled={isBuyerOwner}
                                />
                            </View>
                            <View className="mt-4">
                                <CustomInput
                                    placeholder="Mã số thuế"
                                    value={taxCode}
                                    onChange={setTaxCode}
                                    required
                                    disabled={isBuyerOwner}
                                />
                            </View>
                        </>
                    )}

                    <View className="mt-4">
                        <CustomInput
                            placeholder="Số điện thoại"
                            value={phone}
                            onChange={setPhone}
                            required
                        />
                    </View>
                    <View className="mt-4">
                        <CustomInput
                            placeholder="Email"
                            value={email}
                            onChange={setEmail}
                            required
                        />
                    </View>
                    <View className="mt-4 flex flex-row justify-between">
                        <View className="w-[48%]">
                            <CustomPicker
                                title="Tỉnh/Thành phố"
                                placeholder="Tỉnh/TP"
                                options={provinceOptions}
                                onChange={setProvince}
                                required
                            />
                        </View>
                        <View className="w-[48%]">
                            <CustomPicker
                                title="Quận/Huyện"
                                placeholder="Quận/Huyện"
                                options={districtOptions}
                                onChange={setDistrict}
                                required
                            />
                        </View>
                    </View>
                    <View className="mt-4 flex flex-row justify-between">
                        <View className="w-[48%]">
                            <CustomPicker
                                title="Phường/Xã"
                                placeholder="Phường/Xã"
                                options={wardOptions}
                                onChange={setWard}
                                required
                            />
                        </View>
                        <View className="w-[48%]">
                            <CustomInput
                                placeholder="Địa chỉ"
                                value={address}
                                onChange={setAddress}
                                required
                            />
                        </View>
                    </View>
                    <View className="mt-4">
                        <CustomInput
                            placeholder="Địa chỉ liên lạc"
                            value={contactAddress}
                            onChange={setContactAddress}
                            required
                            disabled={isBuyerOwner}
                        />
                    </View>

                    {buyerType === 'Tổ chức' && (
                        <View className="mt-4 flex flex-row items-center">
                            <CheckboxGroup
                                onChange={(e) => setIssueVatInvoice(e.detail.value.length > 0)}
                            >
                                <Checkbox
                                    value="issueVat"
                                    checked={issueVatInvoice}
                                    className="custom-checkbox"
                                />
                            </CheckboxGroup>
                            <Text className="ml-2 text-sm font-normal">Xuất hóa đơn VAT</Text>
                        </View>
                    )}

                    <View className="mt-8 p-2 bg-[#F4F4F7] rounded-sm">
                        <Text
                            className="text-sm font-normal text-gray-600"
                            style={{ lineHeight: '1rem', display: 'block' }}
                        >
                            Vui lòng nhập đúng và đầy đủ thông tin để đảm bảo quyền lợi.{' '}
                            <span className="text-red-600">Giấy CNBH</span> sẽ được gửi thông báo qua tin nhắn và
                            email của người mua bảo hiểm. Hóa đơn VAT (nếu có) sẽ được gửi về theo địa chỉ liên lạc
                            đã cung cấp.
                        </Text>
                    </View>
                </View>
            </View>

            {/* Button fixed ở bottom */}
            <View
                className="fixed bottom-0 left-0 right-0 p-4 pt-2 bg-white shadow-top"
                style={{ zIndex: 10 }}
            >
                <CustomButton title="Đồng ý" type="primary" onClick={handleSubmit} />
            </View>
        </View>
    );
};

export default BuyerInfo;