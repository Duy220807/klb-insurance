import { Component } from 'react';
import { View } from '@tarojs/components'; // Thêm View để bao bọc AtActivityIndicator
import { AtActivityIndicator } from 'taro-ui'; // Import AtActivityIndicator

// Import hình ảnh từ local (giả định có ảnh cho ô tô)
import CarHeaderImage from './../../assets/images/about-car.png';
import MotorcycleInsuranceContent from 'src/componnents/MotorcycleInsuranceContent';

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

export default class CarLiabilityInsuranceDetail extends Component<{}, State> {
    // Khởi tạo state
    state: State = {
        loading: true,
    };

    // Dữ liệu tiêu đề chính
    headerData: HeaderData = {
        title: 'BẢO HIỂM TNDS BẮT BUỘC CHO Ô TÔ',
        subtitle: 'Bình an trên mọi hành trình – Bảo vệ toàn diện!',
    };

    // Dữ liệu giá bảo hiểm (giả định giá cho ô tô)
    priceData: PriceItem[] = [
        { price: '480.000 VNĐ/năm', description: 'Dành cho xe dưới 6 chỗ ngồi' },
        { price: '794.000 VNĐ/năm', description: 'Dành cho xe từ 6-11 chỗ ngồi' },
    ];

    // Dữ liệu đối tượng áp dụng
    applicableObjects: string[] = [
        'Tất cả chủ xe ô tô lưu thông trên lãnh thổ Việt Nam.',
        'Doanh nghiệp bảo hiểm, tái bảo hiểm và các tổ chức, cá nhân có liên quan.',
    ];

    // Dữ liệu quyền lợi bảo hiểm
    benefits: string[] = [
        'Bồi thường thiệt hại về sức khỏe, tính mạng và tài sản của bên thứ ba.',
        'Giới hạn bồi thường:',
        '• 150 triệu đồng/người/vụ (tai nạn về người).',
        '• 100 triệu đồng/vụ (tai nạn về tài sản).',
    ];

    // Dữ liệu loại trừ trách nhiệm
    exclusions: string[] = [
        'Lái xe không có giấy phép lái xe hợp lệ, uống rượu bia vượt quy định, sử dụng ma túy...',
        'Hành vi cố ý gây tai nạn, bỏ trốn không thực hiện trách nhiệm dân sự.',
        'Thiệt hại gián tiếp, tài sản đặc biệt (vàng, bạc, đồ quý...).',
        'Các trường hợp chiến tranh, khủng bố, đình công.',
    ];

    // Dữ liệu thời hạn bảo hiểm
    duration: string[] = [
        'Tối thiểu 1 năm, tối đa 3 năm',
        'Linh hoạt với xe mới đăng ký hoặc có thời hạn sử dụng đặc biệt.',
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
                background={CarHeaderImage}
            />
        );
    }
}