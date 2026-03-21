import * as ImagePicker from 'expo-image-picker';
import { User } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { Image } from '@/components/ui';

import Pressable from '../Pressable';

type ProfilePhotoPickerProps = {
  imageUrl?: string;
  onChangeImage?: (uri: string) => void;
};

export const ProfilePhotoPicker = ({
  imageUrl,
  onChangeImage,
}: ProfilePhotoPickerProps) => {
  const handlePress = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      const imageUri = asset.base64
        ? `data:image/jpeg;base64,${asset.base64}`
        : asset.uri;
      onChangeImage?.(imageUri);
    }
  };

  return (
    <View className="items-center justify-center">
      <Pressable
        className="h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-neutral-800 bg-white"
        onPress={handlePress}
      >
        {imageUrl ? (
          <Image
            contentFit="cover"
            source={imageUrl}
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          <User color="#262626" size={48} strokeWidth={1.5} />
        )}
      </Pressable>

      <Text className="mt-3 text-base font-medium text-neutral-800">
        Foto de perfil
      </Text>
    </View>
  );
};
