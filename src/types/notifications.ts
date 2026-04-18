import { LucideIcon } from 'lucide-react-native';

export type NotificationType =
  | 'transaction'
  | 'offer'
  | 'app_update'
  | 'achievement'
  | 'alert';

export type NotificationItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  type: NotificationType;
  icon: LucideIcon;
  iconBg: string;
  read: boolean;
};

export type NotificationPreferencesState = {
  transactions: boolean;
  offers: boolean;
  appUpdates: boolean;
};
