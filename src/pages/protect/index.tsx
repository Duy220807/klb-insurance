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
import InsuranceService from 'src/services/InsuranceService';

// Mock data tạm thời, sẽ thay bằng dữ liệu từ API
const insuranceProducts = [
    { id: 'car-material', title: 'Bảo hiểm Vật chất', subtitle: 'Xe ô tô', icon: CarIcon, url: '/pages/about-car-damage' },
    { id: 'motorcycle-liability', title: 'Bảo hiểm TNDS bắt buộc', subtitle: 'Xe máy', icon: MotorcycleIcon, url: '/pages/about-motorbike' },
    { id: 'car-liability', title: 'Bảo hiểm TNDS bắt buộc', subtitle: 'Xe ô tô', icon: CarIcon, url: '/pages/about-car' },
];

const ProtectPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState('');
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState(insuranceProducts);

    // Lấy providerId từ URL và gọi API
    useEffect(() => {
        // Lấy query parameters từ URL
        const instance = Taro.getCurrentInstance();
        const query = instance?.router?.params || {};
        let providerId = query.providerId as string; // Lấy providerId từ query params

        // Nếu không có providerId, sử dụng giá trị mặc định
        if (!providerId) {
            console.warn('Không tìm thấy providerId trong URL, sử dụng giá trị mặc định');
            providerId = '123e4567-e89b-12d3-a456-426614174000';
        }

        // Gọi API với providerId
        InsuranceService.getProviderProducts(providerId)
            .then((response) => {
                console.log('Dữ liệu từ API:', response.providerProducts);
                const fetchedProducts = response?.providerProducts?.map((product: any) => {
                    // Lưu productType đã chuyển thành chữ thường
                    const type = product.productType.toLowerCase();
                    return {
                        id: product.id,
                        title: product.name,
                        subtitle: product.description,
                        icon: type === 'moto' ? MotorcycleIcon : CarIcon,
                        url: `/pages/about-${type === 'moto'
                            ? 'motorbike'
                            : type === 'car'
                                ? 'car'
                                : 'car-damage'
                            }?providerId=${providerId}`,
                    };
                });

                setProducts(fetchedProducts);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Lỗi khi lấy danh sách sản phẩm:', error);
                Taro.showToast({
                    title: 'Lỗi: ' + error.message,
                    icon: 'error',
                });
                setLoading(false);
            });
    }, []);

    const handleNavigate = (url: string) => {
        console.log('Điều hướng đến:', url); // Thêm log để kiểm tra URL
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
        const product = products.find(p => p.id === selectedProductId);
        if (product) {
            console.log(`Đã chọn: ${insuranceName} cho ${product.title}, URL: ${product.url}`);
            handleNavigate(product.url);
        }
        closeModal();
    };

    return (
        <View className="flex flex-col min-h-screen">
            <View
                className="fixed top-0 left-0 right-0 bg-white shadow-bottom"
                style={{ zIndex: 10 }}
            >
                <Header title="Sản phẩm bảo hiểm" />
            </View>

            <View className="pt-16">
                <View className="p-4">
                    <Text className="text-base">Danh sách sản phẩm</Text>
                    <View className="mt-4">
                        {loading ? (
                            <InsuranceListSkeleton />
                        ) : (
                            products.map(product => (
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

            <CustomModal isOpened={isModalOpen} onClose={closeModal} onSelect={handleSelectInsurance} />
        </View>
    );
};

export default ProtectPage;