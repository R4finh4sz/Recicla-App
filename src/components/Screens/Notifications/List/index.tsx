import { Trash2 } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { Image, Pressable } from '@/components/ui';
import { NotificationItem as NotificationItemType } from '@/types/notifications';

import { NotificationItem } from '../Item';

type ListProps = {
  notifications: Record<string, NotificationItemType[]>;
  onDelete: (section: string, id: string) => void;
  onClearAll: () => void;
};

export const NotificationList = ({
  notifications,
  onDelete,
  onClearAll,
}: ListProps) => {
  const hasNotifications = Object.keys(notifications).length > 0;

  if (!hasNotifications) {
    return (
      <View className="mt-20 items-center justify-center gap-4 px-10">
        <Text className="text-center font-poppins_medium text-base text-neutral-100">
          Você não tem notificações no momento.
        </Text>

        <Image
          className="h-80 w-80"
          contentFit="contain"
          source={require('@/assets/images/EmptyNotification.png')}
        />
      </View>
    );
  }

  return (
    <View>
      {Object.entries(notifications).map(([section, items]) => (
        <View key={section} className="mt-4 px-4">
          <Text className="mb-3 font-poppins_medium text-sm text-neutral-60">
            {section}
          </Text>

          <View className="gap-3">
            {items.map(item => (
              <NotificationItem
                key={item.id}
                item={item}
                onDelete={id => onDelete(section, id)}
              />
            ))}
          </View>
        </View>
      ))}

      <View className="mt-8 px-4">
        <Pressable
          className="flex-row items-center justify-center gap-2 rounded-2xl border border-red-500 bg-white py-4"
          onPress={onClearAll}
        >
          <Trash2 color="#E14232" size={20} />

          <Text className="font-poppins_bold text-sm text-red-500">
            Limpar Todas as Notificações
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
