import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView } from 'react-native';

import { NotificationList } from '@/components/Screens/Notifications/List';
import { MOCK_NOTIFICATIONS } from '@/components/Screens/Notifications/mocks';
import { NotificationPreferences } from '@/components/Screens/Notifications/Preferences';
import { Container, Header } from '@/components/ui';
import { useDefaultModal } from '@/store/defaultModalStore';
import { NotificationPreferencesState } from '@/types/notifications';

const Notifications = () => {
  const { openModal } = useDefaultModal();
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [preferences, setPreferences] = useState<NotificationPreferencesState>({
    transactions: true,
    offers: true,
    appUpdates: true,
  });

  const handleDeleteNotification = (section: string, id: string) => {
    openModal({
      title: 'Excluir Notificação',
      variant: 'error',
      message:
        'Tem certeza que deseja excluir esta notificação? Esta ação não pode ser desfeita.',
      confirmText: 'Sim, excluir',
      cancelText: 'Cancelar',
      onConfirm: () => {
        const updatedNotifications = { ...notifications };
        updatedNotifications[section] = updatedNotifications[section].filter(
          n => n.id !== id,
        );

        if (updatedNotifications[section].length === 0) {
          delete updatedNotifications[section];
        }

        setNotifications(updatedNotifications);
      },
      successMessage: 'Notificação excluída com sucesso!',
    });
  };

  const handleClearAll = () => {
    openModal({
      title: 'Limpar Tudo',
      variant: 'error',
      message: 'Deseja excluir todas as notificações?',
      confirmText: 'Sim, limpar tudo',
      cancelText: 'Cancelar',
      onConfirm: () => {
        setNotifications({});
      },
      successMessage: 'Todas as notificações foram removidas.',
    });
  };

  return (
    <Container
      className="bg-neutral-background"
      useSafeArea={false}
      withPadding={false}
    >
      <StatusBar translucent style="light" />

      <Header showBackButton title="Notificações" />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <NotificationPreferences
          preferences={preferences}
          setPreferences={setPreferences}
        />

        <NotificationList
          notifications={notifications}
          onClearAll={handleClearAll}
          onDelete={handleDeleteNotification}
        />
      </ScrollView>
    </Container>
  );
};

export default Notifications;
