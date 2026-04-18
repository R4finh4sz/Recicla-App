import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Bell } from 'lucide-react-native';
import { ScrollView, Text, View } from 'react-native';

import { HomeBanner } from '@/components/Screens/Home/Banner';
import { ExchangesCarousel } from '@/components/Screens/Home/ExchangesCarousel';
import { RecentTransactions } from '@/components/Screens/Home/RecentTransactions';
import { WalletCard } from '@/components/Screens/Home/WalletCard';
import { Container, Header, Pressable } from '@/components/ui';
import { useAuth } from '@/contexts/useAuth';

const Home = () => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <Container className="bg-white" useSafeArea={false} withPadding={false}>
      <StatusBar translucent style="light" />

      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <Header
          leftComponent={
            <Text className="font-poppins_bold text-xl text-white">
              Olá {user?.name?.split(' ')[0] || 'Usuário'}
            </Text>
          }
          rightComponent={
            <Pressable onPress={() => router.push('/(main)/notifications')}>
              <View className="h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <Bell color="white" size={24} />

                <View className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border-2 border-primary-100 bg-red-500" />
              </View>
            </Pressable>
          }
        />

        <HomeBanner />

        <View className="flex-1 px-4">
          <WalletCard />

          <View className="mt-8">
            <ExchangesCarousel />
          </View>

          <View className="mt-8 pb-10">
            <RecentTransactions />
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default Home;
