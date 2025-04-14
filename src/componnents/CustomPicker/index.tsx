import { View, Text, Image } from '@tarojs/components';
import { AtFloatLayout } from 'taro-ui';
import { useState, useEffect } from 'react'; // Thêm useEffect
import downArrow from '../../assets/icons/arrow-down.svg';
import checkIcon from '../../assets/icons/check_.svg';
import './index.scss';

const CustomPicker = ({ placeholder, title, options, value = '', onChange, required, disabled = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value || ''); // Khởi tạo selectedValue từ prop value

    // Đồng bộ selectedValue với prop value
    useEffect(() => {
        setSelectedValue(value || ''); // Cập nhật selectedValue khi value thay đổi
    }, [value]);

    const handleSelect = (option) => {
        if (disabled) return;
        setSelectedValue(option);
        setIsOpen(false);
        if (onChange) onChange(option);
    };

    const handleOpen = () => {
        if (!disabled) setIsOpen(true);
    };

    return (
        <View className="relative w-full">
            <View
                className={`w-auto p-4 px-3 border border-gray-300 rounded-sm bg-white shadow text-sm min-h-[48px] flex items-center relative ${disabled ? 'bg-gray-100 opacity-70 cursor-not-allowed' : ''}`}
                onClick={handleOpen}
            >
                <View className="relative flex-1">
                    <Text
                        className={`absolute left-0 transition-[bottom,transform,font-size] duration-200 ease-in-out ${selectedValue
                            ? 'text-xs font-normal text-gray-500 bottom-1'
                            : 'text-gray-500 text-base font-normal bottom-1/2 translate-y-1/2'
                            } ${disabled ? 'text-gray-400' : ''}`}
                    >
                        {placeholder}
                        {required && <Text> (<span className="text-red-500"> * </span>)</Text>}
                    </Text>
                    {selectedValue && (
                        <Text
                            className={`text-base font-normal absolute left-0 -top-4 translate-y-1/2 ${disabled ? 'text-gray-500' : ''}`}
                        >
                            {selectedValue}
                        </Text>
                    )}
                </View>
                <Image
                    src={downArrow}
                    className={`w-6 h-6 absolute right-3 transition-all duration-200 ease-in-out -translate-y-1/2'}`}
                />
            </View>
            <AtFloatLayout
                isOpened={isOpen}
                title={title}
                onClose={() => setIsOpen(false)}
            >
                <View className="max-h-64 overflow-y-auto">
                    {options.map((option, index) => (
                        <View
                            key={index}
                            className={`flex items-center justify-between py-3 px-4 border-b border-gray-200 ${selectedValue === option ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                            onClick={() => handleSelect(option)}
                        >
                            <Text className="text-sm font-normal">{option}</Text>
                            {selectedValue === option && (
                                <Image className={`w-6 h-6`} src={checkIcon} />
                            )}
                        </View>
                    ))}
                </View>
            </AtFloatLayout>
        </View>
    );
};

export default CustomPicker;