import { Component } from 'react';
import { View } from '@tarojs/components'; // Thêm View để bao bọc AtActivityIndicator
import { AtActivityIndicator } from 'taro-ui'; // Import AtActivityIndicator

// Import hình ảnh từ local (giả định có ảnh cho bảo hiểm thiệt hại vật chất)
import CarDamageHeaderImage from './../../assets/images/about-car-damage.png';
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

export default class CarPhysicalDamageInsuranceDetail extends Component<{}, State> {
    // Khởi tạo state
    state: State = {
        loading: true,
    };

    // Dữ liệu tiêu đề chính
    headerData: HeaderData = {
        title: 'BẢO HIỂM THIỆT HẠI VẬT CHẤT XE Ô TÔ',
        subtitle: 'Bảo vệ tài sản – Yên tâm mọi cung đường!',
    };

    // Dữ liệu giá bảo hiểm (giả định giá cho bảo hiểm thiệt hại vật chất)
    priceData: PriceItem[] = [
        { price: '1.500.000 VNĐ/năm', description: 'Xe dưới 6 chỗ, giá trị dưới 1 tỷ' },
    ];

    // Dữ liệu đối tượng áp dụng
    applicableObjects: string[] = [
        'Chủ sở hữu xe ô tô muốn bảo vệ xe trước các rủi ro vật chất.',
        'Các cá nhân, tổ chức sử dụng xe ô tô trên lãnh thổ Việt Nam.',
    ];

    // Dữ liệu quyền lợi bảo hiểm
    benefits: string[] = [
        'Bồi thường thiệt hại vật chất do tai nạn, va chạm, lật đổ.',
        'Bồi thường mất cắp toàn bộ xe hoặc bộ phận xe.',
        'Chi trả chi phí sửa chữa, thay thế do:',
        '• Hỏa hoạn, cháy nổ.',
        '• Thiên tai (bão, lũ, sạt lở...).',
        'Hỗ trợ cứu hộ, kéo xe khi xảy ra sự cố.',
    ];

    // Dữ liệu loại trừ trách nhiệm
    exclusions: string[] = [
        'Hao mòn tự nhiên, hư hỏng do lỗi kỹ thuật hoặc sử dụng sai mục đích.',
        'Thiệt hại do cố ý gây ra bởi chủ xe hoặc người được ủy quyền.',
        'Mất mát phụ kiện không gắn liền với xe (đồ trang trí, thiết bị cá nhân...).',
        'Thiệt hại xảy ra ngoài lãnh thổ Việt Nam hoặc trong trường hợp chiến tranh, khủng bố.',
    ];

    // Dữ liệu thời hạn bảo hiểm
    duration: string[] = [
        'Thời hạn 1 năm, có thể gia hạn theo nhu cầu.',
        'Áp dụng linh hoạt với xe mới mua hoặc xe đã qua sử dụng.',
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
                    <AtActivityIndicator
                        className="text-sm font-normal"
                        mode="center"
                        size={32}
                        content="Đang tải..."
                        color="#1F1A5B"
                    />
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
                background={CarDamageHeaderImage}
            />
        );
    }
}