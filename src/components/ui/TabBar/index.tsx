import { router, usePathname } from 'expo-router';
import { memo, useMemo } from 'react';
import { View } from 'react-native';

import Pressable from '../Pressable';
import { TabBarIcon } from '../TabBarIcon';

const TAB_STACKS = ['Home', 'Shop', 'Profile'] as const;

export type ITab = (typeof TAB_STACKS)[number];

const PATHS: Record<ITab, string> = {
  Home: '/(main)/home',
  Shop: '/(main)/shop',
  Profile: '/(main)/profile',
};

const stripGroups = (path: string) => path.replace(/\/\([^/]+\)/g, '');

const normalize = (path: string) =>
  stripGroups(path).toLowerCase().replace(/\/+$/, '') || '/';

const NavBar = () => {
  const pathname = usePathname();

  const activeTab = useMemo<ITab>(() => {
    const current = normalize(pathname || '/');

    const found = TAB_STACKS.find(tab => {
      const target = normalize(PATHS[tab]);
      return current === target || current.startsWith(`${target}/`);
    });

    return found ?? 'Home';
  }, [pathname]);

  const handleNavigate = (routeName: ITab) => {
    const path = PATHS[routeName];
    if (!path) {
      return;
    }

    if (router.canDismiss()) {
      router.dismissTo(path as any);
      return;
    }
    router.push(path as any);
  };

  return (
    <View
      className="w-full rounded-t-[40px] bg-[#006414] shadow-lg"
      style={{ paddingBottom: 15 }}
    >
      <View className="w-full flex-row items-center justify-around px-4 pt-4">
        {TAB_STACKS.map(route => {
          const isFocused = activeTab === route;

          return (
            <View key={route} className="items-center justify-center">
              <Pressable onPress={() => handleNavigate(route)}>
                <TabBarIcon isFocused={isFocused} route={route} />
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default memo(NavBar);
