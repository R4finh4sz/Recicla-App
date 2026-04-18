import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { useState } from 'react';
import { LayoutAnimation, Text, View } from 'react-native';

import { Pressable, Switch } from '@/components/ui';
import { NotificationPreferencesState } from '@/types/notifications';

type PreferencesProps = {
  preferences: NotificationPreferencesState;
  setPreferences: (prefs: NotificationPreferencesState) => void;
};

export const NotificationPreferences = ({
  preferences,
  setPreferences,
}: PreferencesProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsCollapsed(!isCollapsed);
  };

  const updatePreference = (
    key: keyof NotificationPreferencesState,
    value: boolean,
  ) => {
    setPreferences({ ...preferences, [key]: value });
  };

  return (
    <View className="m-4 rounded-2xl border border-neutral-20 bg-white p-4 shadow-sm">
      <Pressable
        className="flex-row items-center justify-between"
        onPress={toggleCollapse}
      >
        <Text className="font-poppins_bold text-base text-neutral-100">
          Preferências de Notificação
        </Text>

        <View className="flex-row items-center gap-2">
          {isCollapsed ? (
            <ChevronDown color="#006414" size={20} />
          ) : (
            <ChevronUp color="#006414" size={20} />
          )}
        </View>
      </Pressable>

      {!isCollapsed && (
        <View className="mt-4 gap-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="font-poppins_medium text-sm text-neutral-100">
                Transações
              </Text>

              <Text className="text-xs text-neutral-60">
                Receber alertas de trocas e compras
              </Text>
            </View>

            <Switch
              value={preferences.transactions}
              onValueChange={v => updatePreference('transactions', v)}
            />
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="font-poppins_medium text-sm text-neutral-100">
                Ofertas e Promoções
              </Text>

              <Text className="text-xs text-neutral-60">
                Novidades da loja e descontos
              </Text>
            </View>

            <Switch
              value={preferences.offers}
              onValueChange={v => updatePreference('offers', v)}
            />
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="font-poppins_medium text-sm text-neutral-100">
                Atualizações do App
              </Text>

              <Text className="text-xs text-neutral-60">
                Novos recursos e melhorias
              </Text>
            </View>

            <Switch
              value={preferences.appUpdates}
              onValueChange={v => updatePreference('appUpdates', v)}
            />
          </View>
        </View>
      )}
    </View>
  );
};
