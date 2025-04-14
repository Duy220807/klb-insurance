import { Button, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import PropTypes from 'prop-types';
import './index.scss';

// Define the CustomButton with props for title, onClick, type, and disabled
const CustomButton = ({ title, onClick, type = 'primary', disabled = false }) => {
    // Handle the click event
    const handleClick = (e) => {
        if (disabled) return; // Không thực hiện onClick nếu button bị disabled
        if (onClick) {
            onClick(e); // Truyền event object vào onClick
        }
    };

    // Determine the button styles based on the type and disabled state
    const buttonStyles = {
        primary: `bg-primary text-white py-1/2 rounded-sm text-center text-base font-medium ${disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`,
        secondary: `bg-gray-200 text-primary py-1/2 rounded-sm text-center text-base font-bold shadow-none border-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`,
        tertiary: `bg-gray-200 text-gray-600 py-1/2 rounded-none text-center text-base font-normal shadow-none border-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`,
    };

    // Select the appropriate style based on the type prop
    const buttonClass = buttonStyles[type] || buttonStyles.primary;

    return (
        <View className="flex-1">
            <Button className={buttonClass} onClick={handleClick}>
                {title}
            </Button>
        </View>
    );
};

// Define prop types for better type checking
CustomButton.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
    disabled: PropTypes.bool,
};

// Default props in case they aren't provided
CustomButton.defaultProps = {
    onClick: () => {
        Taro.showToast({
            title: 'Sự kiện đã được kích hoạt !',
            icon: 'success',
            duration: 2000,
        });
    },
    type: 'primary',
    disabled: false,
};

export default CustomButton;