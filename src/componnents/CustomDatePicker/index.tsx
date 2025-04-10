import { View, Text, Image } from '@tarojs/components';
import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import calendarIcon from '../../assets/icons/calendar.svg';

// Define props interface
interface CustomDatePickerProps {
    placeholder: string;
    onChange?: Dispatch<SetStateAction<string>>; // Type for setState function
    required?: boolean;
    value?: string;
    disabled?: boolean; // Make disabled optional
}

const CustomDatePicker = ({ placeholder, onChange, required, value, disabled = false }: CustomDatePickerProps) => {
    const [selectedDate, setSelectedDate] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // Sync internal state with external value prop
    useEffect(() => {
        if (value) {
            const formattedDate = value.split('-').reverse().join('/'); // Convert YYYY-MM-DD to DD/MM/YYYY
            setSelectedDate(formattedDate);
        } else {
            setSelectedDate('');
        }
    }, [value]);

    const handleChange = (e) => {
        if (disabled) return; // Prevent changes if disabled
        const date = e.target.value;
        if (date) {
            const formattedDate = date.split('-').reverse().join('/');
            setSelectedDate(formattedDate);
            if (onChange) onChange(date);
        } else {
            setSelectedDate('');
        }
    };

    const handleContainerClick = () => {
        if (disabled) return; // Prevent opening if disabled
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.showPicker();
        }
    };

    return (
        <View className="relative w-full">
            <View
                className={`w-auto p-7/2 px-3 border border-gray-300 rounded-sm bg-white text-sm min-h-[56px] flex items-center shadow relative ${disabled ? 'bg-gray-100' : 'cursor-pointer'}`}
                onClick={handleContainerClick}
            >
                <View className="relative flex-1">
                    <input
                        ref={inputRef}
                        type="date"
                        value={selectedDate ? selectedDate.split('/').reverse().join('-') : ''} // Convert back to YYYY-MM-DD for input
                        onChange={handleChange}
                        disabled={disabled} // Disable the input
                        className="absolute opacity-0"
                        style={{
                            width: '100%',
                            height: '100%',
                            top: 0,
                            left: 0,
                            cursor: disabled ? 'not-allowed' : 'pointer',
                        }}
                    />

                    {/* Floating label */}
                    <Text
                        className={`absolute left-0 transition-[bottom,transform,font-size] duration-200 ease-in-out pointer-events-none ${selectedDate
                            ? 'text-xs text-gray-500 bottom-1'
                            : 'text-base font-normal text-gray-500 bottom-1/2 translate-y-1/2'
                            }`}
                        style={{ paddingLeft: '2px' }}
                    >
                        {placeholder}
                        {required && <Text> (<span className="text-red-500"> * </span>)</Text>}
                    </Text>

                    {/* Selected date display */}
                    {selectedDate && (
                        <Text
                            className="absolute left-0 -top-4 translate-y-1/2 text-base font-normal pointer-events-none"
                            style={{ paddingLeft: '2px', color: disabled ? '#999' : '#000' }}
                        >
                            {selectedDate}
                        </Text>
                    )}
                </View>

                {!disabled && (
                    <Image
                        src={calendarIcon}
                        className="w-6 h-6 absolute right-3 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out z-10"
                    />
                )}
            </View>
        </View>
    );
};

export default CustomDatePicker;