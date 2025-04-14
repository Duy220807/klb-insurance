import { View, Text, Input, Image, type InputProps } from '@tarojs/components'; // Thêm InputProps
import { useState, useEffect, useRef } from 'react';
import './index.scss';
import clearIcon from '../../assets/icons/clear.svg';

interface CustomInputProps {
    placeholder: string;
    value?: string;
    onChange?: (value: string) => void;
    required?: boolean;
    disabled?: boolean;
    type?: keyof InputProps.Type; // Sử dụng keyof InputProps.Type
}

const CustomInput = ({ placeholder, value = '', onChange, required, disabled = false, type = 'text' }: CustomInputProps) => {
    const [inputValue, setInputValue] = useState(value);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<any>(null);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleChange = (e: any) => {
        if (disabled) return;
        const newValue = e.detail.value;
        setInputValue(newValue);
        if (onChange) onChange(newValue);
    };

    const handleFocus = () => {
        if (!disabled) setIsFocused(true);
    };

    const handleBlur = () => {
        if (!inputValue) {
            setIsFocused(false);
        }
    };

    const handleContainerClick = () => {
        if (disabled) return;
        if (inputRef.current) {
            inputRef.current.focus();
            setIsFocused(true);
        }
    };

    const handleClear = () => {
        if (disabled) return;
        setInputValue('');
        if (onChange) onChange('');
        inputRef.current.focus();
    };

    return (
        <View className="relative w-full">
            <View
                className={`w-auto p-7/2 px-3 border border-gray-300 rounded-sm bg-white text-sm min-h-[56px] flex items-center relative transition-all duration-200 ease-in-out ${isFocused && !disabled ? 'shadow-primary' : 'shadow'} ${disabled ? 'bg-gray-100 opacity-70 cursor-not-allowed' : ''}`}
                onClick={handleContainerClick}
            >
                <View className="relative flex-1">
                    <Text
                        className={`absolute left-0 transition-[bottom,transform,font-size] duration-200 ease-in-out ${isFocused || inputValue
                            ? 'text-xs text-gray-500 bottom-1'
                            : 'text-gray-500 text-base font-normal bottom-1/2 translate-y-1/2'
                            } ${disabled ? 'text-gray-400' : ''}`}
                    >
                        {placeholder}
                        {required && <Text> (<span className="text-red-500"> * </span>)</Text>}
                    </Text>

                    <Input
                        type={type}
                        ref={inputRef}
                        value={inputValue}
                        onInput={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        disabled={disabled}
                        className={`w-full absolute left-0 -top-4 translate-y-1/2 text-base font-normal bg-transparent outline-none ${disabled ? 'text-gray-500' : ''}`}
                    />
                </View>

                {inputValue && !disabled && (
                    <View
                        className="ml-2 flex items-center justify-center w-5 h-5 cursor-pointer"
                        onClick={handleClear}
                    >
                        <Image
                            src={clearIcon}
                            className="w-full h-full"
                            mode="aspectFit"
                        />
                    </View>
                )}
            </View>
        </View>
    );
};

export default CustomInput;