import { Trash2 } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { Pressable } from '@/components/ui';
import { NotificationItem as NotificationItemType } from '@/types/notifications';

type ItemProps = {
  item: NotificationItemType;
  onDelete: (id: string) => void;
};

export const NotificationItem = ({ item, onDelete }: ItemProps) => {
  return (
    <View className="relative flex-row items-start rounded-2xl border border-neutral-20 bg-white p-4">
      <View
        className={`h-12 w-12 items-center justify-center rounded-xl ${item.iconBg}`}
      >
        <item.icon color="white" size={24} />
      </View>

      <View className="ml-3 flex-1 pr-8">
        <Text className="font-poppins_bold text-sm text-neutral-100">
          {item.title}
        </Text>

        <Text className="mt-1 font-poppins_regular text-xs text-neutral-80">
          {item.description}
        </Text>

        <Text className="mt-2 font-poppins_regular text-[10px] text-neutral-60">
          {item.time}
        </Text>
      </View>

      {!item.read && (
        <View className="absolute right-4 top-4 h-2 w-2 rounded-full bg-green-700" />
      )}

      <Pressable
        className="absolute bottom-4 right-4 p-1"
        onPress={() => onDelete(item.id)}
      >
        <Trash2 color="#E14232" size={18} />
      </Pressable>
    </View>
  );
};
