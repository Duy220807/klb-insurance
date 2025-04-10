// src/types/window.d.ts
export { };

declare global {
    interface Window {
        onBridgeMessage: (responseStr: string) => void;
        Sunshine?: {
            postMessage: (message: string) => void;
        };
        webkit?: {
            messageHandlers: {
                Sunshine?: {
                    postMessage: (message: string) => void;
                };
            };
        };
    }
}