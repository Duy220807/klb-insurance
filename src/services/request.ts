import axios from 'axios';

const request = axios.create({
    baseURL: process.env.TARO_APP_API, // Biến này sẽ được thay thế bằng giá trị tương ứng với mode
});

export default request;