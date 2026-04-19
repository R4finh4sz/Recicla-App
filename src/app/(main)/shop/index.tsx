import { Text, View } from 'react-native';

import { Container, Header } from '@/components/ui';

const Shop = () => {
  return (
    <Container className="bg-white" withPadding={false}>
      <Header title="Loja" />

      <View className="flex-1 items-center justify-center p-4">
        <Text className="font-poppins_bold text-2xl text-neutral-100">
          Loja em breve!
        </Text>

        <Text className="mt-2 text-center font-poppins_regular text-neutral-60">
          Estamos preparando as melhores opções de troca para você.
        </Text>
      </View>
    </Container>
  );
};

export default Shop;
