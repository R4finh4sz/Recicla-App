import { Gift, Send, ShoppingCart } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { Pressable } from '@/components/ui';

const TRANSACTIONS = [
  {
    id: '1',
    title: 'Troca de Item Premium',
    date: 'Hoje, 14:32',
    value: '+250',
    type: 'gain',
    icon: ShoppingCart,
  },
  {
    id: '2',
    title: 'Enviado para Maria',
    date: 'Ontem, 18:45',
    value: '-50',
    type: 'loss',
    icon: Send,
  },
  {
    id: '3',
    title: 'Bônus Diário',
    date: 'Ontem, 09:00',
    value: '+100',
    type: 'gain',
    icon: Gift,
  },
];

export const RecentTransactions = () => {
  return (
    <View>
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="font-poppins_bold text-lg text-neutral-100">
          Transações Recentes
        </Text>

        <Pressable>
          <Text className="font-poppins_medium text-sm text-primary-100">
            Ver Tudo
          </Text>
        </Pressable>
      </View>

      <View className="gap-3">
        {TRANSACTIONS.map(item => (
          <View
            key={item.id}
            className="flex-row items-center rounded-2xl border border-neutral-20 bg-white p-4"
          >
            <View className="h-12 w-12 items-center justify-center rounded-xl bg-neutral-whiteGray">
              <item.icon
                color={item.type === 'gain' ? '#006414' : '#E14232'}
                size={24}
              />
            </View>

            <View className="ml-3 flex-1">
              <Text className="font-poppins_bold text-sm text-neutral-100">
                {item.title}
              </Text>

              <Text className="font-poppins_regular text-xs text-neutral-60">
                {item.date}
              </Text>
            </View>

            <View className="flex-row items-center gap-1">
              <Text
                className={`font-poppins_bold text-base ${item.type === 'gain' ? 'text-green-700' : 'text-red-500'
                  }`}
              >
                {item.value}
              </Text>

              <Text
                className={`text-sm ${item.type === 'gain' ? 'text-green-700' : 'text-red-500'}`}
              >
                ◈
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
