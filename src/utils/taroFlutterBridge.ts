import Taro from '@tarojs/taro';

const requestCallbacks = new Map<string, { resolve: (value: any) => void; reject: (reason: any) => void }>();
let callbackIdCounter = 0;
let isBridgeSetup = false;

export function setupTaroFlutterBridge() {
    if (isBridgeSetup) {
        console.log('Taro Flutter Bridge is already set up.');
        return;
    }
    isBridgeSetup = true;

    if (process.env.TARO_ENV !== 'h5') {
        console.warn('setupTaroFlutterBridge can only be used in H5 environment.');
        return;
    }

    const originalRequest = Taro.request;

    Taro.request_ = (action: string, options: any) => {
        if (!options || !options.url || !options.method) {
            return Promise.reject(new Error('Invalid options: url and method are required.'));
        }

        const callbackId = `req_${callbackIdCounter++}`;
        console.log('Setting callbackId:', callbackId);
        console.log('Options:', options);

        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                requestCallbacks.delete(callbackId);
                reject(new Error('Request timed out after 30 seconds.'));
            }, 30000);

            requestCallbacks.set(callbackId, {
                resolve: (value) => {
                    clearTimeout(timeout);
                    resolve(value);
                },
                reject: (reason) => {
                    clearTimeout(timeout);
                    reject(reason);
                },
            });

            const callApiDirectly = () => {
                console.log('Gọi API trực tiếp');
                originalRequest({
                    url: options.url,
                    method: options.method,
                    data: options.data,
                    header: options.headers,
                    success: (res) => {
                        const response = {
                            callbackId,
                            status: 'SUCCESS',
                            data: res.data,
                            code: res.statusCode,
                        };
                        window.onBridgeMessage(JSON.stringify(response));
                    },
                    fail: (err) => {
                        const response = {
                            callbackId,
                            status: 'ERROR',
                            code: 500,
                            message: err.errMsg,
                        };
                        window.onBridgeMessage(JSON.stringify(response));
                    },
                });
            };

            if (process.env.NODE_ENV === 'development') {
                console.log('Môi trường development: Gọi API trực tiếp');
                callApiDirectly();
            } else {
                console.log('Môi trường không phải development: Cố gắng gửi message lên Flutter');
                if (window.Sunshine || (window.webkit && window.webkit.messageHandlers)) {
                    try {
                        const message = JSON.stringify({ callbackId, BRIDGE_ACTION: action, options });
                        if (window.webkit && window.webkit.messageHandlers) {
                            if (window.webkit.messageHandlers.Sunshine) {
                                window.webkit.messageHandlers.Sunshine.postMessage(message);
                            } else {
                                throw new Error('Sunshine channel không tồn tại trong window.webkit.messageHandlers');
                            }
                        } else if (window.Sunshine) {
                            window.Sunshine.postMessage(message);
                        } else {
                            throw new Error('Sunshine bridge is not available.');
                        }
                    } catch (error) {
                        console.error('Lỗi khi gửi message tới Flutter:', error);
                        console.log('Gửi message lên Flutter thất bại, gọi API trực tiếp');
                        callApiDirectly();
                    }
                } else {
                    console.log('Không tìm thấy window.Sunshine, gọi API trực tiếp');
                    callApiDirectly();
                }
            }
        });
    };

    window.onBridgeMessage = (responseStr: string) => {
        try {
            const response = JSON.parse(responseStr);
            console.log('Response:', response);
            const { callbackId, status, code, message, data } = response;
            const callback = requestCallbacks.get(callbackId);

            if (!callback) {
                console.warn(`Callback for ID ${callbackId} not found.`);
                return;
            }

            requestCallbacks.delete(callbackId);

            if (status !== 'SUCCESS') {
                callback.reject({ message, code });
            } else {
                callback.resolve({ data, code, status });
            }
        } catch (err) {
            console.error('Failed to handle Flutter response:', err);
        }
    };
}