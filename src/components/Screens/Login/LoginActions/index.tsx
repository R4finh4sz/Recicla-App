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
        <Checkbox control={control} name="requestRefresh">
          <Text className="mt-1 mr-4 ml-[-2] font-montserrat_regular text-sm text-neutral-80">
            Manter conectado
          </Text>
        </Checkbox>
      </View>

      <Pressable onPress={() => router.push('/(auth)/forgotpassword')}>
        <Text className="font-montserrat_regular mt-1 text-sm text-primary-100">
          Esqueceu a senha?
        </Text>
      </Pressable>
    </Animated.View>
  );
};
