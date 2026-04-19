import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  Bell,
  ChevronRight,
  FileText,
  HelpCircle,
  History,
  LogOut,
  Pencil,
  Shield,
  ShoppingBag,
  User,
} from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import {
  Container,
  Header,
  Image,
  ModalBackdrop,
  Pressable,
} from '@/components/ui';
import { useAuth } from '@/contexts/useAuth';
import { colors } from '@/global/colors';

const Profile = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    {
      title: 'Conta',
      items: [
        {
          id: 'personal-data',
          title: 'Dados Pessoais',
          subtitle: 'Nome, email e telefone',
          icon: <User color="#006414" size={24} />,
          route: '/(main)/profile/personal-data',
        },
        {
          id: 'security',
          title: 'Segurança',
          subtitle: 'Senha e autenticação',
          icon: <Shield color="#006414" size={24} />,
          route: '/(main)/profile/security',
        },
        {
          id: 'notifications',
          title: 'Notificações',
          subtitle: 'Alertas e preferências',
          icon: <Bell color="#006414" size={24} />,
          route: '/(main)/notifications',
        },
      ],
    },
    {
      title: 'Atividade',
      items: [
        {
          id: 'history',
          title: 'Histórico de Trocas',
          subtitle: 'Todas as suas transações',
          icon: <History color="#006414" size={24} />,
          route: '/(main)/profile/history',
        },
        {
          id: 'orders',
          title: 'Pedidos em aberto',
          subtitle: 'Todos os seus pedidos não retirados',
          icon: <ShoppingBag color="#006414" size={24} />,
          route: '/(main)/profile/orders',
        },
      ],
    },
    {
      title: 'Suporte',
      items: [
        {
          id: 'help',
          title: 'Central de Ajuda',
          subtitle: 'FAQ e suporte',
          icon: <HelpCircle color="#006414" size={24} />,
          route: '/(main)/profile/help',
        },
        {
          id: 'terms',
          title: 'Termos e Privacidade',
          subtitle: 'Políticas do app',
          icon: <FileText color="#006414" size={24} />,
          route: '/(main)/profile/terms',
        },
      ],
    },
  ];

  return (
    <Container className="bg-[#F8F9FA]" useSafeArea={false} withPadding={false}>
      <StatusBar translucent style="light" />

      <ScrollView
        bounces={false}
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <Header showBackButton title="Meu Perfil" />

        <View className="items-center bg-white pb-8 pt-6">
          <View className="relative">
            <View className="h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-lg">
              <Image
                source="https://i.pravatar.cc/300"
                style={{ width: '100%', height: '100%' }}
              />
            </View>

            <View className="absolute bottom-1 right-1 h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-primary-100">
              <Pencil color="white" size={16} />
            </View>
          </View>

          <Text className="mt-4 font-poppins_bold text-2xl text-neutral-100">
            {user?.name || 'Usuário não identificado'}
          </Text>

          <View className="mt-8 flex-row items-center gap-10">
            <View className="items-center">
              <Text className="font-poppins_bold text-2xl text-primary-100">
                127
              </Text>

              <Text className="font-poppins_regular text-xs text-neutral-60">
                Trocas
              </Text>
            </View>

            <View className="h-10 w-[1px] bg-neutral-20" />

            <View className="items-center">
              <Text className="font-poppins_bold text-2xl text-primary-100">
                3,847
              </Text>

              <Text className="font-poppins_regular text-xs text-neutral-60">
                Moedas coletadas
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-6 px-4">
          <View className="flex-row items-center rounded-2xl bg-white p-6 shadow-sm">
            <View className="h-14 w-14 items-center justify-center rounded-xl bg-alert-success-secondary/30">
              <View className="h-7 w-9 items-center justify-center rounded-md bg-primary-100">
                <View className="absolute right-1 h-1.5 w-2.5 rounded-full bg-white" />
              </View>
            </View>

            <View className="ml-5">
              <Text className="font-poppins_regular text-xs text-neutral-60">
                Saldo Total
              </Text>

              <View className="flex-row items-center gap-1">
                <Text className="font-poppins_bold text-2xl text-neutral-100">
                  ◈1,847.50
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="px-4 py-6">
          {menuItems.map(section => (
            <View key={section.title} className="mb-6">
              <Text className="mb-4 font-poppins_semibold text-base text-neutral-60">
                {section.title}
              </Text>

              <View className="gap-4">
                {section.items.map(item => (
                  <Pressable
                    key={item.id}
                    className="flex-row items-center justify-between rounded-2xl bg-white p-4 shadow-sm"
                    onPress={() => router.push(item.route as any)}
                  >
                    <View className="flex-1 flex-row items-center">
                      <View className="h-12 w-12 items-center justify-center rounded-xl bg-[#E8F5E9]">
                        {item.icon}
                      </View>

                      <View className="ml-4 flex-1">
                        <Text className="font-poppins_bold text-neutral-100">
                          {item.title}
                        </Text>

                        <Text className="font-poppins_regular text-xs text-neutral-60">
                          {item.subtitle}
                        </Text>
                      </View>
                    </View>

                    <ChevronRight color={colors.neutral[40]} size={20} />
                  </Pressable>
                ))}
              </View>
            </View>
          ))}

          <Pressable
            className="flex-row items-center justify-center rounded-2xl bg-white p-4 shadow-sm"
            onPress={() => setShowLogoutModal(true)}
          >
            <LogOut color={colors.alert.error.primary} size={20} />

            <Text className="ml-2 font-poppins_semibold text-red-500">
              Sair da Conta
            </Text>
          </Pressable>

          <Text className="mb-10 mt-6 text-center font-poppins_regular text-xs text-neutral-40">
            Versão 1.0.0
          </Text>
        </View>
      </ScrollView>

      <ModalBackdrop
        buttons={[
          {
            text: 'Cancelar',
            onPress: () => setShowLogoutModal(false),
            wired: true,
            color: colors.alert.error.primary,
          },
          {
            text: 'Sair',
            onPress: () => {
              setShowLogoutModal(false);
              logout();
            },
            color: colors.alert.error.primary,
          },
        ]}
        message="Você tem certeza que deseja sair da sua conta?"
        title="Sair da Conta"
        variant="error"
        visible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
      />
    </Container>
  );
};

export default Profile;
