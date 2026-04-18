import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { MoveLeft } from 'lucide-react-native';
import { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Pressable from '../Pressable';

type HeaderProps = {
  title?: string;
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
  showBackButton?: boolean;
  onBackPress?: () => void;
};

export const Header = ({
  title,
  leftComponent,
  rightComponent,
  showBackButton = false,
  onBackPress,
}: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <LinearGradient colors={['#006414', '#00A523']}>
      <View
        className="flex-row items-center justify-between px-4 pb-4"
        style={{ paddingTop: insets.top + 10 }}
      >
        <View className="flex-1 items-start">
          {showBackButton ? (
            <Pressable
              className="h-10 w-10 items-center justify-center rounded-full"
              onPress={handleBackPress}
            >
              <MoveLeft color="white" size={24} />
            </Pressable>
          ) : (
            leftComponent
          )}
        </View>

        {title && (
          <View className="flex-[2] items-center">
            <Text
              className="font-poppins_bold text-xl text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
          </View>
        )}

        <View className="flex-1 items-end">{rightComponent}</View>
      </View>
    </LinearGradient>
  );
};
