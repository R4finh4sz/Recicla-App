import { Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { colors } from '@/global/colors';
import { useDimensions } from '@/hooks/common';

type Props = {
  visible?: boolean;
  onClose: () => void;
};

const DownloadSuccessModal = ({ visible = false, onClose }: Props) => {
  const { height, width } = useDimensions();

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      className="absolute h-full w-screen items-center justify-center bg-black/70"
      entering={FadeIn}
      exiting={FadeOut}
      style={{ height, width }}
    >
      <View className="w-[85%] max-w-md overflow-hidden rounded-xl bg-white px-6 py-8">
        <View className="items-center">
          <View
            className="h-12 w-12 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.semantic.success }}
          >
            <Icon name="SuccessIconModal" size={24} />
          </View>

          <Text className="font-poppins_semibold mt-6 text-center text-xl text-black">
            Sucesso!
          </Text>

          <Text className="font-inter_regular mt-3 text-center text-sm text-neutral-600">
            Download concluído com sucesso
          </Text>

          <View className="mt-6 w-full">
            <Button
              color={colors.primary[100]}
              text="Fechar"
              textClassName="font-semibold text-base"
              textColor={colors.white}
              onPress={onClose}
            />
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default DownloadSuccessModal;
