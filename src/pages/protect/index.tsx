import { useState, useEffect } from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import CarIcon from './../../assets/icons/oto.svg';
import MotorcycleIcon from './../../assets/icons/motorcycle.svg';
import ArrowRight from './../../assets/icons/arow-line.svg';
import './index.scss';
import Header from 'src/componnents/Header';
import CustomModal from 'src/componnents/CustomModal';
import { navigateToPage } from 'src/utils/navigate';
import InsuranceListSkeleton from 'src/componnents/Skeletons/protect';

const insuranceProducts = [
    { id: 'car-material', title: 'Bảo hiểm Vật chất', subtitle: 'Xe ô tô', icon: CarIcon, url: '/pages/about-car-damage' },
    { id: 'motorcycle-liability', title: 'Bảo hiểm TNDS bắt buộc', subtitle: 'Xe máy', icon: MotorcycleIcon, url: '/pages/about-motorbike' },
    { id: 'car-liability', title: 'Bảo hiểm TNDS bắt buộc', subtitle: 'Xe ô tô', icon: CarIcon, url: '/pages/about-car' },
];

const ProtectPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState('');
    const [loading, setLoading] = useState(true);

    // Giả lập thời gian tải dữ liệu với setTimeout
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const handleNavigate = (url: string) => {
        navigateToPage(url);
    };

    const openModal = (productId: string) => {
        setIsModalOpen(true);
        setSelectedProductId(productId);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProductId('');
    };

    const handleSelectInsurance = (insuranceName: string) => {
        const product = insuranceProducts.find(p => p.id === selectedProductId);
        if (product) {
            console.log(`Đã chọn: ${insuranceName} cho ${product.title}`);
            handleNavigate(product.url);
        }
        closeModal();
    };

    return (
        <View className="flex flex-col min-h-screen">
            {/* Header fixed ở top */}
            <View
                className="fixed top-0 left-0 right-0 bg-white shadow-bottom"
                style={{ zIndex: 10 }}
            >
                <Header title="Sản phẩm bảo hiểm" />
            </View>

            {/* Nội dung chính với padding để tránh bị che bởi header */}
            <View className="pt-16">
                <View className="p-4">
                    {/* Tiêu đề "Danh sách sản phẩm" luôn hiển thị */}
                    <Text className="text-base">Danh sách sản phẩm</Text>
                    <View className="mt-4">
                        {loading ? (
                            <InsuranceListSkeleton /> // Hiển thị skeleton khi đang loading
                        ) : (
                            insuranceProducts.map(product => (
                                <View
                                    key={product.id}
                                    className="flex flex-row items-center justify-between bg-white p-4 mb-3 rounded-sm shadow"
                                    onClick={() => openModal(product.id)}
                                >
                                    <View className="flex flex-row items-center">
                                        <Image src={product.icon} className="w-10 h-10 mr-4" />
                                        <View className="flex flex-col">
                                            <Text className="text-xs text-gray-500 font-normal">{product.title}</Text>
                                            <Text className="text-sm">{product.subtitle}</Text>
                                        </View>
                                    </View>
                                    <Image src={ArrowRight} className="w-4 h-4" />
                                </View>
                            ))
                        )}
                    </View>
                </View>
            </View>

            {/* Modal */}
            <CustomModal isOpened={isModalOpen} onClose={closeModal} onSelect={handleSelectInsurance} />
        </View>
    );
};

export default ProtectPage;