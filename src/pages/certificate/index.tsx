import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import Header from 'src/componnents/Header';
import CustomButton from 'src/componnents/CustomButton';
import { AtActivityIndicator } from 'taro-ui';

// Giả sử bạn đã có hình ảnh EmptyImage
import EmptyImage from './../../assets/icons/empty_.png';

const CertificatePage = () => {
    const [contractNumber, setContractNumber] = useState<string>('');
    const [pdfUrl, setPdfUrl] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    // Lấy contractNumber từ query string và kiểm tra PDF URL
    useEffect(() => {
        const instance = Taro.getCurrentInstance();
        const contractNum = instance.router?.params.contractNumber || '';
        setContractNumber(contractNum);

        // URL PDF sẽ do đối tác cung cấp
        const samplePdfUrl = 'https://cnbhuat.baominh.vn:8082/datasite//0300446973/Contracts/2025/20250307/uo7U14474949154491_zy4.pdf';
        setPdfUrl(samplePdfUrl);

        // Giả lập thời gian tải PDF (hoặc gọi API thực tế)
        setTimeout(() => {
            if (!samplePdfUrl) {
                setLoading(false);
            } else {
                // Kiểm tra URL có hợp lệ không (giả lập)
                // Ở đây bạn có thể gọi API để kiểm tra PDF
                setLoading(false);
            }
        }, 1000); // Giả lập 2 giây để thấy AtActivityIndicator
    }, []);

    // Xử lý tải xuống PDF
    const handleDownloadPDF = () => {
        if (pdfUrl) {
            if (process.env.TARO_ENV === 'h5') {
                // Trong H5, sử dụng thẻ <a> để tải xuống
                const link = document.createElement('a');
                link.href = pdfUrl;
                link.download = `certificate-${contractNumber}.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                // Trong Mini Program, sử dụng Taro.downloadFile
                Taro.downloadFile({
                    url: pdfUrl,
                    success: (res) => {
                        const filePath = res.tempFilePath;
                        Taro.openDocument({
                            filePath,
                            fileType: 'pdf',
                            success: () => {
                                console.log('Mở file PDF thành công');
                            },
                            fail: (err) => {
                                Taro.showToast({
                                    title: 'Không thể mở file PDF',
                                    icon: 'error',
                                    duration: 2000,
                                });
                            },
                        });
                    },
                    fail: (err) => {
                        Taro.showToast({
                            title: 'Tải file PDF thất bại',
                            icon: 'error',
                            duration: 2000,
                        });
                    },
                });
            }
        } else {
            Taro.showToast({
                title: 'Không có PDF để tải xuống',
                icon: 'error',
                duration: 2000,
            });
        }
    };

    return (
        <View className="flex flex-col min-h-screen bg-white">
            {/* Header cố định ở top */}
            <View
                className="fixed top-0 left-0 right-0 bg-white shadow-bottom"
                style={{ zIndex: 10 }}
            >
                <Header title="Giấy chứng nhận bảo hiểm" />
            </View>

            {/* Nội dung chính với padding để tránh bị che bởi header và button */}
            <View className="pt-24 pb-20 flex flex-col flex-1 p-4">
                {/* Thay loading bằng icon */}
                {loading && (
                    <View className="flex justify-center items-center flex-1">
                        <AtActivityIndicator mode="center" content="Đang tải..." />
                    </View>
                )}

                {/* Khi pdfUrl rỗng, hiển thị thông báo căn giữa */}
                {!loading && !pdfUrl && (
                    <View className="flex flex-col flex-1 justify-center items-center px-2">
                        <Image src={EmptyImage} className="w-40 h-auto" />
                        <Text className="text-base font-normal text-gray-600 mt-4 text-center">
                            Giấy chứng nhận chưa được phát hành. Quý khách vui lòng quay lại sau.
                        </Text>
                    </View>
                )}

                {/* Khi có pdfUrl, hiển thị iframe */}
                {!loading && pdfUrl && (
                    <iframe
                        src={pdfUrl}
                        style={{
                            width: '100%',
                            height: '100vh', // Chiều cao tùy chỉnh
                            border: 'none',
                        }}
                        title="Giấy chứng nhận bảo hiểm"
                        onError={() => {
                            Taro.showToast({
                                title: 'Không thể hiển thị PDF. Vui lòng kiểm tra URL.',
                                icon: 'error',
                                duration: 3000,
                            });
                        }}
                    />
                )}
            </View>

            {/* Button tải xuống, luôn hiển thị nhưng disable khi không có pdfUrl */}
            <View
                className="fixed bottom-0 left-0 right-0 p-4 pt-2 bg-white shadow-top"
                style={{ zIndex: 10 }}
            >
                <View className="flex flex-row gap-4 justify-center">
                    <CustomButton
                        title="Tải xuống file PDF"
                        type="primary"
                        onClick={handleDownloadPDF}
                        disabled={!pdfUrl} // Disable button khi pdfUrl rỗng
                    />
                </View>
            </View>
        </View>
    );
};

export default CertificatePage;