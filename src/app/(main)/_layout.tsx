import { Slot } from 'expo-router';
import { View } from 'react-native';

import { OrderCollectionProvider } from '@/constants/OrderCollectionContext';

const MainLayout = () => {
  return (
    <OrderCollectionProvider>
      <View className="flex-1">
        <Slot />
      </View>
    </OrderCollectionProvider>
  );
};

export default MainLayout;
