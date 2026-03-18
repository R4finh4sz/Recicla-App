import { Slot } from 'expo-router';

import { OrderCollectionProvider } from '@/constants/OrderCollectionContext';

const MainLayout = () => {
  return (
    <OrderCollectionProvider>
      <Slot />
    </OrderCollectionProvider>
  );
};

export default MainLayout;
