import { Component } from 'react';
import { View, Text, Input, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import Header from 'src/componnents/Header';
import Contract from './../../assets/icons/BH-icon.svg';
import NotificationIcon from './../../assets/icons/notification-icon.svg';
import SearchIcon from './../../assets/icons/search.svg';
import EmptyImage from './../../assets/icons/empty.png';
import './index.scss';
import InsuranceCard from 'src/componnents/InsuranceCard';
import { navigateToPage } from 'src/utils/navigate';
import CustomButton from 'src/componnents/CustomButton';
import ProductCardSkeleton from 'src/componnents/Skeletons/product';

interface State {
    searchQuery: string;
    contracts: Array<{
        name: string;
        contractNumber: string;
        brand: string;
        effectiveDate: string;
        dueDate: string;
        status: string;
        icon: string;
    }>;
    loading: boolean;
}

export default class Contracts extends Component<{}, State> {
    state: State = {
        searchQuery: '',
        loading: true,
        contracts: [
            {
                name: 'BH VCX xe máy',
                contractNumber: '000052***',
                brand: 'Bảo Hiểm Bảo Minh',
                effectiveDate: '14/2/2025',
                dueDate: '29/3/2025',
                status: 'Đang hiệu lực',
                icon: Contract,
            },
            {
                name: 'BH ô tô toàn diện',
                contractNumber: 'BH20230403-001',
                brand: 'Bảo Hiểm Bảo Việt',
                effectiveDate: '01/1/2025',
                dueDate: '01/1/2026',
                status: 'Đang hiệu lực',
                icon: Contract,
            },
            {
                name: 'BH sức khỏe',
                contractNumber: 'SK20230101-002',
                brand: 'Prudential',
                effectiveDate: '01/1/2023',
                dueDate: '01/1/2024',
                status: 'Hết hiệu lực',
                icon: Contract,
            },
            {
                name: 'BH tai nạn',
                contractNumber: 'TN20231010-003',
                brand: 'Bảo Hiểm Bảo Minh',
                effectiveDate: '10/10/2023',
                dueDate: '10/10/2024',
                status: 'Không thành công',
                icon: Contract,
            },
            {
                name: 'BH du lịch',
                contractNumber: 'DL20240315-004',
                brand: 'Bảo Hiểm Bảo Việt',
                effectiveDate: '15/3/2024',
                dueDate: '15/3/2025',
                status: 'Đang xử lý',
                icon: Contract,
            },
            {
                name: 'BH nhà ở',
                contractNumber: 'NH20230220-005',
                brand: 'Bảo Minh',
                effectiveDate: '20/2/2023',
                dueDate: '20/2/2024',
                status: 'Đã hủy',
                icon: Contract,
            },
            {
                name: 'BH xe đạp',
                contractNumber: 'XD20240101-006',
                brand: 'Bảo Hiểm Bảo Việt',
                effectiveDate: '01/1/2024',
                dueDate: '05/4/2025',
                status: 'Đang hiệu lực',
                icon: Contract,
            },
            {
                name: 'BH y tế',
                contractNumber: 'YT20231201-007',
                brand: 'Prudential',
                effectiveDate: '01/12/2023',
                dueDate: '01/12/2024',
                status: 'Đang hiệu lực',
                icon: Contract,
            },
            {
                name: 'BH hàng hóa',
                contractNumber: 'HH20231115-008',
                brand: 'Bảo Minh',
                effectiveDate: '15/11/2023',
                dueDate: '15/11/2024',
                status: 'Đang xử lý',
                icon: Contract,
            },
            {
                name: 'BH tài sản',
                contractNumber: 'TS20240210-009',
                brand: 'Bảo Hiểm Bảo Việt',
                effectiveDate: '10/2/2024',
                dueDate: '10/2/2025',
                status: 'Đã hủy',
                icon: Contract,
            },
        ],
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loading: false });
        }, 1000);
    }

    calculateDaysLeft = (dueDate: string) => {
        const [day, month, year] = dueDate.split('/').map(Number);
        const due = new Date(year, month - 1, day);
        const currentDate = new Date();
        due.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);
        const timeDiff = due.getTime() - currentDate.getTime();
        const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        return daysLeft;
    };

    handleSearch = (e: any) => {
        const query = e.detail.value.toLowerCase();
        this.setState({ searchQuery: query });
    };

    handleRenew = (contractNumber: string) => {
        navigateToPage('/pages/renew/index');
    };

    handleContractClick = (contractNumber: string) => {
        navigateToPage(`/pages/contract-detail?contractNumber=${contractNumber}`);
    };

    handleProtectNow = () => {
        navigateToPage('/pages/home');
    };

    handleDelete = (contractNumber: string) => {
        Taro.showModal({
            title: 'Xác nhận xóa',
            content: 'Bạn có chắc chắn muốn xóa hợp đồng này không?',
            confirmText: 'Đồng ý', // Rút ngắn từ "Xác nhận" thành "Đồng ý" (4 ký tự)
            cancelText: 'Hủy',
            success: (res) => {
                if (res.confirm) {
                    this.setState((prevState) => ({
                        contracts: prevState.contracts.filter(
                            (contract) => contract.contractNumber !== contractNumber
                        ),
                    }));
                    Taro.showToast({
                        title: 'Xóa hợp đồng thành công',
                        icon: 'success',
                        duration: 2000,
                    });
                } else if (res.cancel) {
                    console.log('Người dùng đã hủy xóa hợp đồng');
                }
            },
        });
    };

    render() {
        const { searchQuery, contracts, loading } = this.state;
        const filteredContracts = contracts.filter(
            (contract) =>
                contract.name.toLowerCase().includes(searchQuery) ||
                contract.contractNumber.toLowerCase().includes(searchQuery) ||
                contract.brand.toLowerCase().includes(searchQuery)
        );

        const contractToRenew = filteredContracts.find((contract) => {
            const daysLeft = this.calculateDaysLeft(contract.dueDate);
            console.log(`Contract: ${contract.contractNumber}, Days Left: ${daysLeft}`);
            return daysLeft <= 7 && daysLeft >= 0;
        });

        console.log('Contract to Renew:', contractToRenew);

        return (
            <View className="flex flex-col min-h-screen bg-white">
                {/* Header và ô tìm kiếm fixed ở top */}
                <View
                    className="fixed top-0 left-0 right-0 bg-white shadow-bottom"
                    style={{ zIndex: 10 }}
                >
                    <Header title="Hợp đồng của tôi" />
                    {contracts.length > 0 && (
                        <View className="flex flex-row items-center p-4">
                            <View className="flex flex-row items-center flex-1 p-2 bg-[#3333330D] rounded-sm">
                                <Image src={SearchIcon} className="w-5 h-5 mr-2" />
                                <Input
                                    type="text"
                                    placeholder="Tìm kiếm"
                                    value={searchQuery}
                                    onInput={this.handleSearch}
                                    className="flex-1 bg-transparent text-base font-normal"
                                />
                            </View>
                        </View>
                    )}
                </View>

                {/* Nội dung chính với padding để tránh bị che */}
                <View className={`${contracts.length > 0 ? 'pt-36' : 'pt-24'} pb-20 flex flex-col flex-1`}>
                    {contracts.length > 0 ? (
                        filteredContracts.length > 0 ? (
                            <View className="p-4 pt-0">
                                {contractToRenew && !loading && (
                                    <View className="flex flex-row items-center p-3 mb-8 bg-[#F4F4F7] rounded-sm notification">
                                        <Image src={NotificationIcon} className="w-12 h-12 mr-2" />
                                        <View className="flex flex-col flex-1">
                                            <Text className="text-base text-primary">Hợp đồng sắp hết hạn</Text>
                                            <Text className="text-sm font-normal text-gray-600 mt-1">
                                                Hợp đồng {contractToRenew.contractNumber} sắp hết hạn. Quý khách có thể thực hiện mua lại hợp đồng ngay từ lúc này.
                                            </Text>
                                            <Text
                                                className="text-skyblue text-sm font-normal mt-1 cursor-pointer"
                                                onClick={() => this.handleRenew(contractToRenew.contractNumber)}
                                            >
                                                Tái tục
                                            </Text>
                                        </View>
                                    </View>
                                )}

                                <Text className="text-base block mb-4">Danh sách Hợp đồng</Text>
                                {loading ? (
                                    <ProductCardSkeleton count={3} />
                                ) : (
                                    filteredContracts.map((contract, index) => (
                                        <View
                                            key={index}
                                            onClick={() => this.handleContractClick(contract.contractNumber)}
                                            className="cursor-pointer"
                                        >
                                            <InsuranceCard
                                                name={contract.name}
                                                contractNumber={contract.contractNumber}
                                                brand={contract.brand}
                                                effectiveDate={contract.effectiveDate}
                                                dueDate={contract.dueDate}
                                                status={contract.status}
                                                icon={contract.icon}
                                                calculateDaysLeft={this.calculateDaysLeft}
                                                onDelete={this.handleDelete}
                                            />
                                        </View>
                                    ))
                                )}
                            </View>
                        ) : (
                            <View className="flex flex-col flex-1 justify-center items-center px-2">
                                <Image src={EmptyImage} className="w-full h-auto" />
                                <Text className="text-base font-normal text-gray-600 mt-4">Không tìm thấy hợp đồng nào khớp với từ khóa.</Text>
                            </View>
                        )
                    ) : (
                        <View className="flex flex-col flex-1 justify-center items-center px-2">
                            <Image src={EmptyImage} className="w-full h-auto" />
                            <Text className="text-base font-normal text-gray-600 mt-4">Quý khách chưa có sản phẩm bảo hiểm nào.</Text>
                        </View>
                    )}
                </View>

                {/* Button fixed ở bottom */}
                {contracts.length === 0 && (
                    <View
                        className="fixed bottom-0 left-0 right-0 p-4 pt-2 bg-white shadow-top"
                        style={{ zIndex: 10 }}
                    >
                        <View className="flex flex-row gap-4">
                            <CustomButton title="Bảo vệ ngay" onClick={this.handleProtectNow} />
                        </View>
                    </View>
                )}
            </View>
        );
    }
}