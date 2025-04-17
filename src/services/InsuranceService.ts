import Taro from "@tarojs/taro";
import { message } from "src/utils/flutterConstants";

const getProviders = () => {
    return Taro.request_(message.apiProxy, {
        url: '/api/providers',
        method: 'GET',
    })
        .then((response) => {
            console.log('Danh sách nhà cung cấp:', response);
            return response.data;
        })
        .catch((error) => {
            console.error('Lỗi khi lấy nhà cung cấp:', error);
            Taro.showToast({
                title: 'Lỗi: ' + error.message,
                icon: 'error',
            });
            throw error;
        });
};

const getProviderProducts = (providerId) => {
    return Taro.request_(message.apiProxy, {
        url: `/api/products?providerId=${providerId}`,
        method: 'GET',
    })
        .then((response) => {
            console.log('Danh sách sản phẩm:', response);

            return response.data;
        })
        .catch((error) => {
            console.error('Lỗi khi lấy sản phẩm:', error);
            Taro.showToast({
                title: 'Lỗi: ' + error.message,
                icon: 'error',
            });
            throw error;
        });
};

const getSuggestingProducts = () => {
    return Taro.request_(message.apiProxy, {
        url: '/api/suggesting-products',
        method: 'GET',
    })
        .then((response) => {
            console.log('Danh sách sản phẩm đề xuất:', response);

            return response.data;
        })
        .catch((error) => {
            console.error('Lỗi khi lấy sản phẩm đề xuất:', error);
            Taro.showToast({
                title: 'Lỗi: ' + error.message,
                icon: 'error',
            });
            throw error;
        });
};

const getVehicleTypes = (providerId, type, purpose) => {
    return Taro.request_(message.apiProxy, {
        url: `/api/vehicle-types?providerId=${providerId}&type=${type}&purpose=${purpose}`,
        method: 'GET',
    })
        .then((response) => {
            console.log('Danh sách loại xe:', response);

            return response.data;
        })
        .catch((error) => {
            console.error('Lỗi khi lấy loại xe:', error);
            Taro.showToast({
                title: 'Lỗi: ' + error.message,
                icon: 'error',
            });
            throw error;
        });
};

const getVehicleManufactures = (providerId, vehicleTypeCode) => {
    return Taro.request_(message.apiProxy, {
        url: `/api/vehicle-manufacturers?providerId=${providerId}&vehicleTypeCode=${vehicleTypeCode}`,
        method: 'GET',
    })
        .then((response) => {
            console.log('Danh sách hãng xe:', response);

            return response.data;
        })
        .catch((error) => {
            console.error('Lỗi khi lấy hãng xe:', error);
            Taro.showToast({
                title: 'Lỗi: ' + error.message,
                icon: 'error',
            });
            throw error;
        });
};

const getVehicleBrands = (manufactureId, vehicleTypeCode) => {
    return Taro.request_(message.apiProxy, {
        url: `/api/vehicleBrands?manufactureId=${manufactureId}&vehicleTypeCode=${vehicleTypeCode}`,
        method: 'POST',
    })
        .then((response) => {
            console.log('Danh sách hiệu xe:', response);

            return response.data;
        })
        .catch((error) => {
            console.error('Lỗi khi lấy hiệu xe:', error);
            Taro.showToast({
                title: 'Lỗi: ' + error.message,
                icon: 'error',
            });
            throw error;
        });
};

const calculateInsurance = (payload) => {
    return Taro.request_(message.apiProxy, {
        url: '/api/calculate',
        method: 'POST',
        data: payload,
    })
        .then((response) => {
            console.log('Kết quả tính phí:', response);

            return response.data;
        })
        .catch((error) => {
            console.error('Lỗi khi tính phí:', error);
            Taro.showToast({
                title: 'Lỗi: ' + error.message,
                icon: 'error',
            });
            throw error;
        });
};

const uploadVehicleImages = (payload) => {
    return Taro.request_(message.apiProxy, {
        url: '/api/upload',
        method: 'POST',
        data: payload,
    })
        .then((response) => {
            console.log('Upload hình ảnh:', response);

            return response.data;
        })
        .catch((error) => {
            console.error('Lỗi khi upload hình ảnh:', error);
            Taro.showToast({
                title: 'Lỗi: ' + error.message,
                icon: 'error',
            });
            throw error;
        });
};

const createContract = (payload) => {
    return Taro.request_(message.apiProxy, {
        url: '/api/create',
        method: 'POST',
        data: payload,
    })
        .then((response) => {
            console.log('Lưu hợp đồng:', response);

            return response.data;
        })
        .catch((error) => {
            console.error('Lỗi khi lưu hợp đồng:', error);
            Taro.showToast({
                title: 'Lỗi: ' + error.message,
                icon: 'error',
            });
            throw error;
        });
};

const updateContract = (code, payload) => {
    return Taro.request_(message.apiProxy, {
        url: `/api/contracts/${code}/update`,
        method: 'PUT',
        data: payload,
    })
        .then((response) => {
            console.log('Cập nhật hợp đồng:', response);

            return response.data;
        })
        .catch((error) => {
            console.error('Lỗi khi cập nhật hợp đồng:', error);
            Taro.showToast({
                title: 'Lỗi: ' + error.message,
                icon: 'error',
            });
            throw error;
        });
};

const deleteContract = (code) => {
    return Taro.request_(message.apiProxy, {
        url: `/api/contracts/${code}/delete`,
        method: 'DELETE',
    })
        .then((response) => {
            console.log('Xóa hợp đồng:', response);

            return response.data;
        })
        .catch((error) => {
            console.error('Lỗi khi xóa hợp đồng:', error);
            Taro.showToast({
                title: 'Lỗi: ' + error.message,
                icon: 'error',
            });
            throw error;
        });
};

const getContract = (code) => {
    return Taro.request_(message.apiProxy, {
        url: `/api/insurance/${code}`,
        method: 'GET',
    })
        .then((response) => {
            console.log('Thông tin hợp đồng:', response);

            return response.data;
        })
        .catch((error) => {
            console.error('Lỗi khi lấy hợp đồng:', error);
            Taro.showToast({
                title: 'Lỗi: ' + error.message,
                icon: 'error',
            });
            throw error;
        });
};

const payContract = (payload) => {
    return Taro.request_(message.apiProxy, {
        url: '/api/payment',
        method: 'POST',
        data: payload,
    })
        .then((response) => {
            console.log('Thanh toán hợp đồng:', response);

            return response.data;
        })
        .catch((error) => {
            console.error('Lỗi khi thanh toán:', error);
            Taro.showToast({
                title: 'Lỗi: ' + error.message,
                icon: 'error',
            });
            throw error;
        });
};

const issueCertificate = (code, payload) => {
    return Taro.request_(message.apiProxy, {
        url: `/api/issue/${code}`,
        method: 'POST',
        data: payload,
    })
        .then((response) => {
            console.log('Phát hành chứng nhận:', response);

            return response.data;
        })
        .catch((error) => {
            console.error('Lỗi khi phát hành:', error);
            Taro.showToast({
                title: 'Lỗi: ' + error.message,
                icon: 'error',
            });
            throw error;
        });
};

const getProvinces = (providerId) => {
    return Taro.request_(message.apiProxy, {
        url: `/api/provinces?providerId=${providerId}`,
        method: 'GET',
    })
        .then((response) => {
            console.log('Danh sách tỉnh thành:', response);

            return response.data;
        })
        .catch((error) => {
            console.error('Lỗi khi lấy tỉnh thành:', error);
            Taro.showToast({
                title: 'Lỗi: ' + error.message,
                icon: 'error',
            });
            throw error;
        });
};

const getDistricts = (provinceId) => {
    return Taro.request_(message.apiProxy, {
        url: `/api/districts/${provinceId}`,
        method: 'GET',
    })
        .then((response) => {
            console.log('Danh sách quận huyện:', response);

            return response.data;
        })
        .catch((error) => {
            console.error('Lỗi khi lấy quận huyện:', error);
            Taro.showToast({
                title: 'Lỗi: ' + error.message,
                icon: 'error',
            });
            throw error;
        });
};

const getWards = (districtId) => {
    return Taro.request_(message.apiProxy, {
        url: `/api/wards/${districtId}`,
        method: 'GET',
    })
        .then((response) => {
            console.log('Danh sách phường xã:', response);

            return response.data;
        })
        .catch((error) => {
            console.error('Lỗi khi lấy phường xã:', error);
            Taro.showToast({
                title: 'Lỗi: ' + error.message,
                icon: 'error',
            });
            throw error;
        });
};

export default {
    getProviders,
    getProviderProducts,
    getSuggestingProducts,
    getVehicleTypes,
    getVehicleManufactures,
    getVehicleBrands,
    calculateInsurance,
    uploadVehicleImages,
    createContract,
    updateContract,
    deleteContract,
    getContract,
    payContract,
    issueCertificate,
    getProvinces,
    getDistricts,
    getWards,
};