import { useRouter } from 'expo-router';
import { Text } from 'react-native';

import { BackIcon } from '@/assets/icons';

import Pressable from '../Pressable';

type BackButtonProps = {
  Title: string;
  Onpress?: () => void;
};

export const BackButton = ({ Title, Onpress }: BackButtonProps) => {
  const router = useRouter();

  return (
    <Pressable
      className="flex-row items-center gap-1 self-start"
      onPress={Onpress ?? (() => router.back())}
    >
      <BackIcon />

      <Text className="font-poppins_medium text-base text-primary-100">
        {Title}
      </Text>
    </Pressable>
  );
};
