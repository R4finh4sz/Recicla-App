import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import Button from '@/components/ui/Button';
import Image from '@/components/ui/Image';
import { useAuth } from '@/contexts/useAuth';
import { useDefaultModal } from '@/store/defaultModalStore';

const Home = () => {
  const { user, logout } = useAuth();
  const { openModal } = useDefaultModal();
  const router = useRouter();

  const handlePress = () => {
    openModal({
      message: 'Você deseja sair?',
      cancelText: 'Cancelar',
      confirmText: 'Sair',
      onConfirm: () => {
        logout();
        router.replace('/(auth)/login');
      },
      title: 'teste',
    });
  };

  return (
    <View className="flex-1 items-center justify-center gap-20 p-6">
      <Image
        source="https://placehold.co/800x800"
        style={{ width: 200, height: 200 }}
      />

      <View className="w-full">
        <Text className="text-base text-neutral-60">Bem Vindo</Text>

        <Text className="text-lg">{user?.name}</Text>
      </View>

      <Button text="Sair" onPress={handlePress} />
    </View>
  );
};

export default Home;
