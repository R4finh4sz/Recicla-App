import { View } from 'react-native';

import { Image } from '@/components/ui';

export const HomeBanner = () => {
  return (
    <View className="pb-4">
      <Image
        className="h-44 w-full"
        contentFit="cover"
        source={require('@/assets/images/HomeImage.png')}
      />
    </View>
  );
};
