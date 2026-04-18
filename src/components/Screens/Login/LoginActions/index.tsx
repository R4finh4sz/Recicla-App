import { useRouter } from 'expo-router';
import { UseFormReturn } from 'react-hook-form';
import { Text, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

import { Checkbox, Pressable } from '@/components/ui';
import { LoginForm } from '@/validation/login.validation';

type Props = {
  control: UseFormReturn<LoginForm>['control'];
};

export const LoginActions = ({ control }: Props) => {
  const router = useRouter();

  return (
    <Animated.View
      className="mb-4 mt-[-12px] w-full flex-row items-center justify-between"
      layout={LinearTransition}
    >
      <View className="flex-row items-center">
        <Checkbox control={control} name="rememberMe">
          <Text className="ml-[-2] mr-4 mt-1 font-poppins_regular text-sm text-neutral-80">
            Manter conectado
          </Text>
        </Checkbox>
      </View>

      <Pressable onPress={() => router.push('/(auth)/forgotpassword')}>
        <Text className="mt-1 font-poppins_regular text-sm text-primary-100">
          Esqueceu a senha?
        </Text>
      </Pressable>
    </Animated.View>
  );
};
