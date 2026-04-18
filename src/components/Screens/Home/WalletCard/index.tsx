import { Eye, EyeOff } from 'lucide-react-native';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { Pressable } from '@/components/ui';

export const WalletCard = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View className="rounded-[24px] bg-primary-100 p-6 shadow-sm shadow-black/20">
      <View className="flex-row items-center justify-between">
        <Text className="font-poppins_medium text-base text-white/80">
          Saldo Disponível
        </Text>

        <Pressable onPress={() => setIsVisible(!isVisible)}>
          {isVisible ? (
            <EyeOff color="white" size={24} />
          ) : (
            <Eye color="white" size={24} />
          )}
        </Pressable>
      </View>

      <View className="mt-4 flex-row items-center gap-2">
        <Text className="text-4xl text-white">◈</Text>

        <Text className="font-poppins_bold text-3xl text-white">
          {isVisible ? '1,847.50' : '••••••'}
        </Text>
      </View>
    </View>
  );
};
