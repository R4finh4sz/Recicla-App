import { View } from 'react-native';

import { getTabBarIconName, isTabBarCenter } from '@/utils/getTabBarIcon';

import { IconComponent } from '../IconComponent';
import type { ITab } from '../TabBar';

type Props = {
  route: ITab;
  isFocused: boolean;
};

export const TabBarIcon = ({ route, isFocused }: Props) => {
  const isCenter = isTabBarCenter(route);
  const iconName = getTabBarIconName(route, isFocused);

  if (isCenter) {
    return (
      <View
        className="h-[72px] w-[72px] items-center justify-center rounded-full shadow-lg"
        style={{
          backgroundColor: isFocused ? '#81B660' : '#BDBDBD',
        }}
      >
        <IconComponent name={iconName} size={36} />
      </View>
    );
  }

  return (
    <View className="h-12 w-12 items-center justify-center">
      <IconComponent name={iconName} size={24} />
    </View>
  );
};
