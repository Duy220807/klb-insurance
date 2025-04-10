import { View, Text, Image } from '@tarojs/components';

const AboutCustom = ({ title, items, icon }) => {
    return (
        <View className="p-2 pb-4 pt-4 bg-white bg-opacity-90 rounded-lg mx-4">
            <View className="flex flex-row items-center">
                <Image src={icon} className="w-6 h-6 mr-1" />
                <Text className="text-base">{title}</Text>
            </View>
            <View className="mt-2">
                {items.map((item: any, index: any) => {
                    const isSubItem = item.startsWith('•');
                    const displayText = item; // Keep the original text, including the bullet if present
                    return (
                        <View key={index} className="flex flex-row items-start">
                            {!isSubItem && (
                                <Image
                                    src={require('./../../assets/icons/bullet.svg')} // BulletIcon imported in parent
                                    className="w-4 h-4 mr-3 mt-1"
                                    style={{ minWidth: '0.8rem', minHeight: '0.8rem' }}
                                />
                            )}
                            <Text
                                className={`text-sm text-gray-800 font-normal ${isSubItem ? 'ml-9' : ''}`}
                            >
                                {displayText}
                            </Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

export default AboutCustom;