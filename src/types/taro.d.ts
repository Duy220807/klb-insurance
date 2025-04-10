// src/types/taro.d.ts
import Taro from '@tarojs/taro';

declare module '@tarojs/taro' {
    interface TaroStatic {
        request_: (action: string, options: any) => Promise<any>;
    }
}