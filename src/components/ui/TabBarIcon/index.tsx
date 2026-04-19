import { Home, ShoppingCart, Settings } from 'lucide-react-native';
import { View } from 'react-native';

import type { ITab } from '../TabBar';

type Props = {
  route: ITab;
  isFocused: boolean;
};

export const TabBarIcon = ({ route, isFocused }: Props) => {
  const getIcon = () => {
    switch (route) {
      case 'Home':
        return Home;
      case 'Shop':
        return ShoppingCart;
      case 'Profile':
        return Settings;
      default:
        return Home;
    }
  };

  const LucideIcon = getIcon();

  return (
    <View
      className={`h-14 w-14 items-center justify-center rounded-full ${isFocused ? 'bg-white/20' : ''}`}
    >
      <LucideIcon color="white" size={28} strokeWidth={2} />
    </View>
  );
};
