
// Quản lý callback
let callbackIdCounter = 0;

export const sendMessageToFlutter = (BRIDGE_ACTION, options) => {
    // tạo callbackId
    const callbackId = `req_${callbackIdCounter++}`;
    if (window.Sunshine) {
        try {
            if (window.webkit && window.webkit.messageHandlers) {
                // Kiểm tra xem Sunshine có tồn tại không
                if (window.webkit.messageHandlers.Sunshine) {
                    return window.webkit.messageHandlers.Sunshine.postMessage(JSON.stringify({ callbackId, BRIDGE_ACTION, options }));
                } else {
                    console.error('Sunshine channel không tồn tại trong window.webkit.messageHandlers');
                    return;
                }
            }
            window.Sunshine.postMessage(JSON.stringify({ callbackId, BRIDGE_ACTION, options }));
        } catch (error) {
            console.error('Lỗi khi gửi message tới Flutter (inappwebview):', error);
            return
        }
    } else {
        console.warn('Không tìm thấy API để gửi message tới Flutter.');
        return
    }
};