import { View, Text, Image } from '@tarojs/components';
import { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import SimpleInsuranceCard from 'src/componnents/SimpleInsuranceCard';
import Header from 'src/componnents/Header';
import Contract from './../../assets/icons/BH-icon.svg';
import InfoList from 'src/componnents/InfoList';
import ArrowRight from './../../assets/icons/arrow-line-none.svg';
import CustomButton from 'src/componnents/CustomButton';
import { navigateToPage } from 'src/utils/navigate';

interface Contract {
    name: string;
    contractNumber: string;
    certificateNumber?: string;
    brand: string;
    effectiveDate: string;
    dueDate: string;
    status: string;
    icon: string;
    insuranceType?: string;
    coverage?: string;
    participants?: string;
    premium?: string;
    startDate?: string;
    endDate?: string;
    renewalCount?: string;
    vehicleType?: string | null;
    purpose?: string;
    carType?: string;
    carBrand?: string;
    engine?: string;
    seats?: string;
    loadCapacity?: string;
    frameNumber?: string;
    engineNumber?: string;
    licensePlate?: string;
    ownerName?: string;
    address?: string;
}

const contracts: Contract[] = [
    {
        name: 'BH VCX xe máy',
        contractNumber: '000052***',
        brand: 'Bảo Hiểm Bảo Minh',
        effectiveDate: '14/2/2025',
        dueDate: '29/3/2025',
        status: 'Đang hiệu lực',
        icon: Contract,
        vehicleType: 'Xe máy Honda Wave Alpha',
    },
    {
        name: 'BH ô tô toàn diện',
        contractNumber: 'BH20230403-001',
        brand: 'Bảo Hiểm Bảo Việt',
        effectiveDate: '01/1/2025',
        dueDate: '01/1/2026',
        status: 'Đang hiệu lực',
        icon: Contract,
        vehicleType: 'Ô tô Toyota Camry',
    },
    {
        name: 'BH sức khỏe',
        contractNumber: 'SK20230101-002',
        brand: 'Prudential',
        effectiveDate: '01/1/2023',
        dueDate: '01/1/2024',
        status: 'Hết hiệu lực',
        icon: Contract,
        vehicleType: null,
    },
    {
        name: 'BH tai nạn',
        contractNumber: 'TN20231010-003',
        brand: 'Bảo Hiểm Bảo Minh',
        effectiveDate: '10/10/2023',
        dueDate: '10/10/2024',
        status: 'Không thành công',
        icon: Contract,
        vehicleType: null,
    },
    {
        name: 'BH du lịch',
        contractNumber: 'DL20240315-004',
        brand: 'Bảo Hiểm Bảo Việt',
        effectiveDate: '15/3/2024',
        dueDate: '15/3/2025',
        status: 'Đang xử lý',
        icon: Contract,
        vehicleType: null,
    },
    {
        name: 'BH nhà ở',
        contractNumber: 'NH20230220-005',
        brand: 'Bảo Minh',
        effectiveDate: '20/2/2023',
        dueDate: '20/2/2024',
        status: 'Đã hủy',
        icon: Contract,
        vehicleType: null,
    },
    {
        name: 'BH xe đạp',
        contractNumber: 'XD20240101-006',
        brand: 'Bảo Hiểm Bảo Việt',
        effectiveDate: '01/1/2024',
        dueDate: '05/4/2025',
        status: 'Đang hiệu lực',
        icon: Contract,
        vehicleType: 'Xe đạp',
    },
    {
        name: 'BH y tế',
        contractNumber: 'YT20231201-007',
        brand: 'Prudential',
        effectiveDate: '01/12/2023',
        dueDate: '01/12/2024',
        status: 'Đang hiệu lực',
        icon: Contract,
        vehicleType: null,
    },
    {
        name: 'BH hàng hóa',
        contractNumber: 'HH20231115-008',
        brand: 'Bảo Minh',
        effectiveDate: '15/11/2023',
        dueDate: '15/11/2024',
        status: 'Đang xử lý',
        icon: Contract,
        vehicleType: null,
    },
    {
        name: 'BH tài sản',
        contractNumber: 'TS20240210-009',
        brand: 'Bảo Hiểm Bảo Việt',
        effectiveDate: '10/2/2024',
        dueDate: '10/2/2025',
        status: 'Đã hủy',
        icon: Contract,
        vehicleType: null,
    },
];

const ContractDetail = () => {
    const [contract, setContract] = useState<Contract | null>(null);

    // Lấy contractNumber từ query string
    useEffect(() => {
        const instance = Taro.getCurrentInstance();
        const contractNumber = instance.router?.params.contractNumber || '';

        // Tìm hợp đồng trong mảng contracts
        const foundContract = contracts.find(c => c.contractNumber === contractNumber);
        if (foundContract) {
            setContract({
                ...foundContract,
                certificateNumber: foundContract.certificateNumber || 'GCN123456',
                insuranceType: foundContract.insuranceType || foundContract.name,
                coverage: foundContract.coverage || 'N/A',
                participants: foundContract.participants || 'N/A',
                premium: foundContract.premium || 'N/A',
                startDate: foundContract.effectiveDate,
                endDate: foundContract.dueDate,
                renewalCount: foundContract.renewalCount || '0 lần',
                purpose: foundContract.purpose || 'Kinh doanh',
                carType: foundContract.carType || 'Sedan',
                carBrand: foundContract.carBrand || 'Toyota',
                engine: foundContract.engine || '2.5L',
                seats: foundContract.seats || '5 chỗ',
                loadCapacity: foundContract.loadCapacity || 'Không áp dụng',
                frameNumber: foundContract.frameNumber || 'RLHHC123456789',
                engineNumber: foundContract.engineNumber || 'HC12E987654',
                licensePlate: foundContract.licensePlate || '29H1-12345',
                ownerName: foundContract.ownerName || 'Nguyễn Văn A',
                address: foundContract.address || '123 Đường Láng, Đống Đa, Hà Nội',
            });
        } else {
            Taro.showToast({
                title: 'Không tìm thấy hợp đồng',
                icon: 'error',
                duration: 2000,
            });
            navigateToPage('/pages/contracts');
        }
    }, []);

    const calculateDaysLeft = (dueDate: string): number => {
        const [day, month, year] = dueDate.split('/').map(Number);
        const due = new Date(year, month - 1, day);
        const currentDate = new Date();
        due.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);
        const timeDiff = due.getTime() - currentDate.getTime();
        const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        return daysLeft;
    };

    const [isBuyerInfoExpanded, setIsBuyerInfoExpanded] = useState(true);
    const [isInsuranceInfoExpanded, setIsInsuranceInfoExpanded] = useState(true);
    const [isVehicleInfoExpanded, setIsVehicleInfoExpanded] = useState(true);

    if (!contract) {
        return <View>Đang tải...</View>;
    }

    const buyerInfoData = [
        { label: 'Số hợp đồng', value: contract.contractNumber },
        { label: 'Số giấy chứng nhận', value: contract.certificateNumber },
    ];

    const insuranceInfoData = [
        { label: 'Gói bảo hiểm', value: contract.insuranceType },
        { label: 'Mức bảo hiểm người ngồi trên xe', value: contract.coverage },
        { label: 'Số người tham gia', value: contract.participants },
        { label: 'Phí bảo hiểm', value: contract.premium },
        { label: 'Ngày bắt đầu', value: contract.startDate },
        { label: 'Ngày kết thúc', value: contract.endDate },
        { label: 'Số lần tái tục', value: contract.renewalCount },
    ];

    const motorcycleInfoData = [
        { label: 'Loại xe', value: contract.vehicleType },
        { label: 'Số khung', value: contract.frameNumber },
        { label: 'Số máy', value: contract.engineNumber },
        { label: 'Biển số', value: contract.licensePlate },
        { label: 'Tên chủ xe', value: contract.ownerName },
        { label: 'Địa chỉ', value: contract.address },
    ];

    const carInfoData = [
        { label: 'Mục đích sử dụng', value: contract.purpose },
        { label: 'Loại xe', value: contract.carType },
        { label: 'Hãng xe', value: contract.carBrand },
        { label: 'Động cơ', value: contract.engine },
        { label: 'Số chỗ ngồi', value: contract.seats },
        { label: 'Trọng tải', value: contract.loadCapacity },
        { label: 'Số khung', value: contract.frameNumber },
        { label: 'Số máy', value: contract.engineNumber },
        { label: 'Biển số', value: contract.licensePlate },
        { label: 'Tên chủ xe', value: contract.ownerName },
        { label: 'Địa chỉ', value: contract.address },
    ];

    const isCar = contract.vehicleType && contract.vehicleType.toLowerCase().includes('ô tô');

    // Logic hiển thị button dựa trên trạng thái
    const renderButtons = () => {
        const status = contract.status;
        const handleGoHome = () => navigateToPage('/pages/home');
        const handleViewCertificate = () =>
            navigateToPage(`/pages/certificate?contractNumber=${contract.contractNumber}`);

        if (['Đang xử lý', 'Không thành công', 'Đã hủy'].includes(status)) {
            return (
                <View className="flex flex-row gap-4">
                    <CustomButton title="Trang chủ" onClick={handleGoHome} />
                </View>
            );
        } else if (status === 'Hết hiệu lực') {
            return (
                <View className="flex flex-row gap-4">
                    <CustomButton title="Xem GCN" onClick={handleViewCertificate} />
                    <CustomButton title="Trang chủ" type="secondary" onClick={handleGoHome} />
                </View>
            );
        } else {
            // Đang hiệu lực
            return (
                <View className="flex flex-row gap-4">
                    <CustomButton title="Cấp lại GCN" type="secondary" />
                    <CustomButton title="Xem GCN" onClick={handleViewCertificate} />
                </View>
            );
        }
    };

    return (
        <View className="flex flex-col min-h-screen bg-white">
            {/* Header và SimpleInsuranceCard fixed ở top */}
            <View
                className="fixed top-0 left-0 right-0 bg-white shadow-bottom"
                style={{ zIndex: 10 }}
            >
                <Header title="Chi tiết hợp đồng" />
                <View className="p-4">
                    <SimpleInsuranceCard
                        name={contract.name}
                        contractNumber={contract.contractNumber}
                        brand={contract.brand}
                        status={contract.status}
                        icon={contract.icon}
                        dueDate={contract.dueDate}
                        calculateDaysLeft={calculateDaysLeft}
                    />
                </View>
            </View>

            {/* Nội dung chính với padding để tránh bị che bởi header và button */}
            <View className="pt-54 pb-20">
                <View className="mx-4">
                    {/* Thông tin đơn bảo hiểm */}
                    <View className={`bg-white rounded-md mt-0 ${isBuyerInfoExpanded ? 'mb-8' : 'mb-4'}`}>
                        <View
                            className="flex flex-row justify-between items-center cursor-pointer"
                            onClick={() => setIsBuyerInfoExpanded(!isBuyerInfoExpanded)}
                        >
                            <Text className="text-base">Thông tin đơn bảo hiểm</Text>
                            <Image
                                src={ArrowRight}
                                className={`w-6 h-6 transition-transform duration-300 ${isBuyerInfoExpanded ? 'rotate-90' : ''}`}
                            />
                        </View>
                        {isBuyerInfoExpanded && <InfoList data={buyerInfoData} />}
                    </View>
                    <View
                        className={`shadow-sm -mx-8 bg-[#3333331A] ${isBuyerInfoExpanded ? 'h-2' : 'h-px'}`}
                    />

                    {/* Thông tin gói bảo hiểm */}
                    <View className={`bg-white rounded-md mt-4 ${isInsuranceInfoExpanded ? 'mb-8' : 'mb-4'}`}>
                        <View
                            className="flex flex-row justify-between items-center cursor-pointer"
                            onClick={() => setIsInsuranceInfoExpanded(!isInsuranceInfoExpanded)}
                        >
                            <Text className="text-base">Thông tin gói bảo hiểm</Text>
                            <Image
                                src={ArrowRight}
                                className={`w-6 h-6 transition-transform duration-300 ${isInsuranceInfoExpanded ? 'rotate-90' : ''}`}
                            />
                        </View>
                        {isInsuranceInfoExpanded && <InfoList data={insuranceInfoData} />}
                    </View>
                    <View
                        className={`shadow-sm -mx-8 bg-[#3333331A] ${isInsuranceInfoExpanded ? 'h-2' : 'h-px'}`}
                    />

                    {/* Thông tin xe (ô tô hoặc xe máy) - chỉ hiển thị nếu có vehicleType */}
                    {contract.vehicleType && (
                        <View className={`bg-white rounded-md mt-4 ${isVehicleInfoExpanded ? 'mb-8' : 'mb-4'}`}>
                            <View
                                className="flex flex-row justify-between items-center cursor-pointer"
                                onClick={() => setIsVehicleInfoExpanded(!isVehicleInfoExpanded)}
                            >
                                <Text className="text-base">{isCar ? 'Thông tin xe ô tô' : 'Thông tin xe máy'}</Text>
                                <Image
                                    src={ArrowRight}
                                    className={`w-6 h-6 transition-transform duration-300 ${isVehicleInfoExpanded ? 'rotate-90' : ''}`}
                                />
                            </View>
                            {isVehicleInfoExpanded && (
                                <InfoList data={isCar ? carInfoData : motorcycleInfoData} />
                            )}
                        </View>
                    )}
                </View>
            </View>

            {/* Phần button fixed ở cuối */}
            <View
                className="fixed bottom-0 left-0 right-0 p-4 pt-2 bg-white shadow-top"
                style={{ zIndex: 10 }}
            >
                {renderButtons()}
            </View>
        </View>
    );
};

export default ContractDetail;