import Taro from "@tarojs/taro";

export const navigateToPage = (url: string) => {
    Taro.navigateTo({ url });
    // window.history.pushState({}, '', '#' + url);
};

