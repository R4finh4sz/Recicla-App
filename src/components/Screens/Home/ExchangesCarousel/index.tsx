import { FlatList, Text, View } from 'react-native';

import { Image, Pressable } from '@/components/ui';

const MOCK_DATA = [
  {
    id: '1',
    title: 'Arroz branco',
    price: '300',
    image: 'https://picsum.photos/seed/arroz/400/400',
  },
  {
    id: '2',
    title: 'Feijão carioca',
    price: '250',
    image: 'https://picsum.photos/seed/feijao/400/400',
  },
  {
    id: '3',
    title: 'Óleo de soja',
    price: '500',
    image: 'https://picsum.photos/seed/oleo/400/400',
  },
  {
    id: '4',
    title: 'Macarrão',
    price: '150',
    image: 'https://picsum.photos/seed/macarrao/400/400',
  },
];

export const ExchangesCarousel = () => {
  const renderItem = ({ item }: { item: (typeof MOCK_DATA)[0] }) => (
    <View className="mr-4 w-[160px] overflow-hidden rounded-2xl border border-neutral-20 bg-white">
      <View className="relative h-[120px] w-full items-center justify-center bg-orange-100">
        <Image
          contentFit="cover"
          source={item.image}
          style={{ width: '100%', height: '100%' }}
        />

        <View className="absolute right-0 top-2 rounded-l-md bg-red-500 px-2 py-1">
          <Text className="font-roboto_bold text-[10px] uppercase text-white">
            Promoção
          </Text>
        </View>
      </View>

      <View className="p-3">
        <Text
          className="font-poppins_medium text-sm text-[#FBAC09]"
          numberOfLines={1}
        >
          {item.title}
        </Text>

        <View className="mt-1 flex-row items-center gap-1">
          <Text className="font-poppins_medium text-lg text-primary-100">
            ◈
          </Text>

          <Text className="font-poppins_medium text-base text-primary-100">
            {item.price} EcoCoins
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View>
      <View className="mb-2 flex-row items-center justify-between px-4">
        <Text className="font-poppins_medium text-base text-primary-100">
          Possíveis trocas
        </Text>

        <Pressable>
          <Text className="font-poppins_medium text-base text-primary-100">
            Ver mais
          </Text>
        </Pressable>
      </View>

      <View className="mb-4 h-px w-full bg-primary-100" />

      <FlatList
        horizontal
        contentContainerStyle={{ paddingHorizontal: 16 }}
        data={MOCK_DATA}
        decelerationRate="fast"
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        snapToInterval={176}
      />
    </View>
  );
};
