import { Component } from 'react';
import { View } from '@tarojs/components'; // Thêm View để bao bọc AtActivityIndicator

// Import hình ảnh từ local
import HeaderImage from './../../assets/images/about-motorbike.png';
import MotorcycleInsuranceContent from 'src/componnents/MotorcycleInsuranceContent';
import { AtActivityIndicator } from 'taro-ui';

// Define TypeScript interfaces for data
interface HeaderData {
    title: string;
    subtitle: string;
}

interface PriceItem {
    price: string;
    description: string;
}

interface State {
    loading: boolean; // Thêm state để kiểm soát loading
}

export default class MotorcycleLiabilityInsuranceDetail extends Component<{}, State> {
    // Khởi tạo state
    state: State = {
        loading: true,
    };

    // Dữ liệu tiêu đề chính
    headerData: HeaderData = {
        title: 'BẢO HIỂM TNDS BẮT BUỘC CHO XE MÁY',
        subtitle: 'An tâm sau tay lái – Tự tin mọi phương thức!',
    };

    // Dữ liệu giá bảo hiểm
    priceData: PriceItem[] = [
        { price: '60.500 VNĐ/năm', description: 'Dành cho xe máy dưới 50cc' },
        { price: '66.000 VNĐ/năm', description: 'Dành cho xe máy trên 50cc' },
    ];

    // Dữ liệu đối tượng áp dụng
    applicableObjects: string[] = [
        'Tất cả chủ xe cơ giới lưu thông trên lãnh thổ Việt Nam.',
        'Doanh nghiệp bảo hiểm, tái bảo hiểm và các tổ chức, cá nhân có liên quan.',
    ];

    // Dữ liệu quyền lợi bảo hiểm
    benefits: string[] = [
        'Bồi thường thiệt hại về sức khỏe, tính mạng và tài sản của bên thứ ba.',
        'Giới hạn bồi thường:',
        '• 150 triệu đồng/người/vụ (tai nạn về người).',
        '• 50 triệu đồng/vụ (xe máy, mô tô 2-3 bánh, xe điện).',
    ];

    // Dữ liệu loại trừ trách nhiệm
    exclusions: string[] = [
        'Lái xe không đủ điều kiện pháp lý, uống rượu bia vượt quy định, sử dụng ma túy...',
        'Hành vi cố ý gây tai nạn, bỏ trốn không thực hiện trách nhiệm.',
        'Thiệt hại gián tiếp, tài sản đặc biệt (vàng, bạc, tranh quý...).',
        'Các trường hợp chiến tranh, khủng bố, đóng cửa.',
    ];

    // Dữ liệu thời hạn bảo hiểm
    duration: string[] = [
        'Tối thiểu 1 năm, tối đa 3 năm',
        'Linh hoạt với xe có niên hạn dưới 1 năm hoặc đăng ký tạm thời.',
    ];

    // Giả lập thời gian tải dữ liệu với setTimeout
    componentDidMount() {
        setTimeout(() => {
            this.setState({ loading: false });
        }, 1000);
    }

    render() {
        const { loading } = this.state;

        // Hiển thị AtActivityIndicator khi đang loading
        if (loading) {
            return (
                <View className="flex flex-col min-h-screen justify-center items-center">
                    <AtActivityIndicator className='text-sm font-normal'
                        mode="center" size={32} content='Đang tải...' color='#1F1A5B' />
                </View>
            );
        }

        // Hiển thị nội dung thực tế khi loading hoàn tất
        return (
            <MotorcycleInsuranceContent
                headerData={this.headerData}
                priceData={this.priceData}
                applicableObjects={this.applicableObjects}
                benefits={this.benefits}
                exclusions={this.exclusions}
                duration={this.duration}
                background={HeaderImage}
            />
        );
    }
}