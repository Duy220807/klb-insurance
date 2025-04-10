// components/Step.jsx
import { View, Image } from '@tarojs/components';
import checkIcon from '../../assets/icons/check.svg'; // Icon cho bước đã hoàn thành
import activeIcon from '../../assets/icons/active.svg'; // Icon cho bước đang chọn
import pendingIcon from '../../assets/icons/pending.svg'; // Icon cho bước chưa chọn (bạn cần thêm icon này)

const Step = ({ totalSteps = 4, currentStep = 1 }) => {
    // Đảm bảo currentStep không vượt quá totalSteps
    const normalizedCurrentStep = Math.min(Math.max(currentStep, 1), totalSteps);

    return (
        <View className="flex flex-row items-center p-4">
            {Array.from({ length: totalSteps }, (_, index) => {
                const stepNumber = index + 1;
                const isCompleted = stepNumber < normalizedCurrentStep;
                const isActive = stepNumber === normalizedCurrentStep;
                const isPending = stepNumber > normalizedCurrentStep;
                const isLastStep = stepNumber === totalSteps;

                return (
                    <View key={index} className="flex flex-row items-center">
                        {/* Step Circle */}
                        <View
                            className={`w-5 h-5 rounded-sm flex items-center justify-center shadow ${isCompleted ? 'bg-[#73D13D]' :
                                isActive ? 'bg-[#73D13D]' : // Có thể đổi màu cho active
                                    'bg-white border-gray-300' // Chưa chọn
                                }`}
                        >
                            {isCompleted && (
                                <Image
                                    src={checkIcon}
                                    className="w-5/2 h-5/2"
                                    style={{ color: 'white' }}
                                />
                            )}
                            {isActive && (
                                <Image
                                    src={activeIcon}
                                    className="w-5/2 h-5/2"
                                    style={{ color: 'white' }}
                                />
                            )}
                            {isPending && (
                                <Image
                                    src={pendingIcon}
                                    className="w-5/2 h-5/2"
                                    style={{ color: 'gray' }} // Có thể đổi màu cho pending
                                />
                            )}
                        </View>

                        {/* Connecting Line (không hiển thị cho bước cuối) */}
                        {!isLastStep && (
                            <View className="relative h-0.5 m-1" style={{ minWidth: '48px' }}>
                                <View
                                    className={`absolute top-0 left-0 h-full ${isCompleted ? 'bg-[#73D13D]' : 'bg-gray-300'
                                        }`}
                                    style={{ width: '100%' }}
                                />
                                {isActive && (
                                    <View
                                        className="absolute top-0 left-0 h-full bg-[#73D13D]"
                                        style={{ width: '50%' }} // Connecting Line chạy 50% khi active
                                    />
                                )}
                            </View>
                        )}
                    </View>
                );
            })}
        </View>
    );
};

export default Step;