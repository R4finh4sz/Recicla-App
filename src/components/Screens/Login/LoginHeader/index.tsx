import { View } from 'react-native';

import { Image } from '@/components/ui';

export const LoginHeader = () => {
  return (
    <View className="relative h-[150px] w-full overflow-hidden">
      <View className="absolute inset-0 top-3 items-center justify-center">
        <Image
          contentFit="contain"
          source={require('@/assets/images/LogoImage.png')}
          style={{ width: 141, height: 130 }}
        />
      </View>
    </View>
  );
};
