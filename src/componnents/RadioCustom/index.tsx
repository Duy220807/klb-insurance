// src/components/CustomRadio.jsx
import { View, Text } from '@tarojs/components';
import './index.scss'; // Nếu bạn muốn thêm style riêng

const CustomRadio = ({ options, value, onChange, name }) => {

    // Debug
    console.log('Name: ', name);

    return (
        <View className="flex flex-row justify-between">
            {options.map((option) => (
                <View
                    key={option.id}
                    className="flex flex-row items-center mx-2"
                    onClick={() => onChange(option.value)}
                >
                    <View
                        className={`w-9/2 h-9/2 rounded-full border flex items-center justify-center mr-2 ${value === option.value ? 'border-blue' : 'border-gray'
                            }`}
                    >
                        {value === option.value && (
                            <View className="w-3 h-3 rounded-full bg-secondary" />
                        )}
                    </View>
                    <Text className="text-sm font-normal text-gray-600">{option.label}</Text>
                </View>
            ))}
        </View>
    );
};

export default CustomRadio;