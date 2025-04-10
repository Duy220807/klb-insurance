/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{html,js,ts,jsx,tsx}', // Đảm bảo Tailwind quét tất cả file trong src
    ],
    theme: {
        extend: {
            borderRadius: {
                'none': '0',
                'sm': '0.2rem',    // Starting at 0.2rem
                'DEFAULT': '0.3rem', // Default rounded (replacing the original rounded)
                'md': '0.4rem',
                'lg': '0.6rem',
                'xl': '0.8rem',
                '2xl': '1rem',
                '3xl': '1.2rem',
                'full': '9999px',
            },
            spacing: {
                // Ghi đè toàn bộ hệ thống spacing
                0: '0rem',
                '1/2': '0.1rem',
                1: '0.2rem',
                2: '0.4rem',
                '5/2': '0.5rem',
                3: '0.6rem',
                '7/2': '0.7rem',
                4: '0.8rem',
                '9/2': '0.9rem',
                5: '1.0rem',
                6: '1.2rem',
                7: '1.4rem',
                8: '1.6rem',
                9: '1.8rem',
                10: '2.0rem',
                11: '2.2rem',
                12: '2.4rem',
                13: '2.6rem',
                14: '2.8rem',
                15: '3.0rem',
                16: '3.2rem',
                17: '3.4rem',
                18: '3.6rem',
                19: '3.8rem',
                20: '4.0rem',
                21: '4.2rem',
                22: '4.4rem',
                23: '4.6rem',
                24: '4.8rem',
                25: '5.0rem',
                26: '5.2rem',
                27: '5.4rem',
                28: '5.6rem',
                29: '5.8rem',
                30: '6.0rem',
                31: '6.2rem',
                32: '6.4rem',
                33: '6.6rem',
                34: '6.8rem',
                35: '7.0rem',
                36: '7.2rem',
                37: '7.4rem',
                38: '7.6rem',
                39: '7.8rem',
                40: '8.0rem',
                41: '8.2rem',
                42: '8.4rem',
                43: '8.6rem',
                44: '8.8rem',
                45: '9.0rem',
                46: '9.2rem',
                47: '9.4rem',
                48: '9.6rem',
                49: '9.8rem',
                50: '10.0rem',
                51: '10.2rem',
                52: '10.4rem',
                53: '10.6rem',
                54: '10.8rem',
                55: '11.0rem',
                56: '11.2rem',
                57: '11.4rem',
                58: '11.6rem',
                59: '11.8rem',
                60: '12.0rem',
                61: '12.2rem',
                62: '12.4rem',
                63: '12.6rem',
                64: '12.8rem',
                65: '13.0rem',
                66: '13.2rem',
                67: '13.4rem',
                68: '13.6rem',
                69: '13.8rem',
                70: '14.0rem',
                71: '14.2rem',
                72: '14.4rem',
                73: '14.6rem',
                74: '14.8rem',
                75: '15.0rem',
                76: '15.2rem',
                77: '15.4rem',
                78: '15.6rem',
                79: '15.8rem',
                80: '16.0rem',
                81: '16.2rem',
                82: '16.4rem',
                83: '16.6rem',
                84: '16.8rem',
                85: '17.0rem',
                86: '17.2rem',
                87: '17.4rem',
                88: '17.6rem',
                89: '17.8rem',
                90: '18.0rem',
                91: '18.2rem',
                92: '18.4rem',
                93: '18.6rem',
                94: '18.8rem',
                95: '19.0rem',
                96: '19.2rem',
                97: '19.4rem',
                98: '19.6rem',
                99: '19.8rem',
                100: '20.0rem',
            },
            // Tùy chỉnh font-size
            fontSize: {
                '2xs': '0.5rem',   // 10px ÷ 20 = 0.5rem (Thêm mới)
                'xs': '0.6rem',    // 12px ÷ 20 = 0.6rem
                'sm': '0.7rem',    // 14px ÷ 20 = 0.7rem
                'base': '0.8rem',  // 16px ÷ 20 = 0.8rem
                'lg': '0.9rem',    // 18px ÷ 20 = 0.9rem
                'xl': '1rem',      // 20px ÷ 20 = 1rem
                '2xl': '1.2rem',   // 24px ÷ 20 = 1.2rem
                '3xl': '1.5rem',   // 30px ÷ 20 = 1.5rem
                '4xl': '1.8rem',   // 36px ÷ 20 = 1.8rem
                '5xl': '2.4rem',   // 48px ÷ 20 = 2.4rem
            },
            // Tùy chỉnh font-weight
            fontWeight: {
                light: 300,
                normal: 400,
                medium: 500,
                semibold: 600,
                bold: 700,
                DEFAULT: 500, // Đặt font-medium (500) làm mặc định
            },
            // Tùy chỉnh font-family
            fontFamily: {
                sans: ['SF-Pro-Display', 'sans-serif'], // Đặt SF-Pro-Display làm font mặc định
                serif: ['Georgia', 'serif'],
                custom: ['YourCustomFont', 'sans-serif'], // Font tùy chỉnh (nếu có)
            },
            // Tùy chỉnh màu sắc (để đồng bộ với giao diện của bạn)
            colors: {
                primary: '#1F1A5B', // Màu chủ đạo
                secondary: '#545182',
                skyblue: '#228BCC',
                green: {
                    500: '#22c55e', // Đang hiệu lực
                },
                gray: {
                    500: '#6b7280', // Hết hiệu lực
                    700: '#374151', // Đã hủy
                },
                red: {
                    500: '#ef4444', // Không thành công
                },
                yellow: {
                    500: '#eab308', // Đang xử lý
                },
                blue: {
                    500: '#3b82f6', // Tái tục
                },
            },

            boxShadow: {
                'DEFAULT': '0 0 0 2px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                'xl': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
                'none': 'none',
                'top': '0 0 4px 0 #0000001A', // Custom shadow-top utility
                'primary': '0 0 0 3px rgba(41, 38, 99, 1)', // Thêm shadow-primary
                'white': '0 0 0 2px rgba(255, 255, 255, 0.4h)', // Thêm shadow-white
            },

            borderWidth: {
                DEFAULT: '1px', // Giá trị mặc định
                '0.5': '0.5px', // Thêm độ dày tùy chỉnh
                '2': '2px',
                '3': '3px',
                '4': '4px',
            },
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false, // Tắt preflight để tránh xung đột với Taro
    },
};