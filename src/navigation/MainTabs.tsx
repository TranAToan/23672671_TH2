import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { theme } from '@constants/theme';
import { useCartStore } from '@stores/cartStore';
import ShopStack from './ShopStack';
import CartScreen from '@screens/CartScreen';
import MeScreen from '@screens/MeScreen';

export type MainTabsParamList = { Shop: undefined; Cart: undefined; Me: undefined };
const Tabs = createBottomTabNavigator<MainTabsParamList>();

export default function MainTabs() {
  const totalQuantity = useCartStore((state) => state.totalQuantity());
  return <Tabs.Navigator screenOptions={{ tabBarActiveTintColor: theme.primary, tabBarInactiveTintColor: theme.textLight, tabBarStyle: { height: 64, paddingBottom: 8, paddingTop: 6, borderTopColor: theme.border, backgroundColor: theme.surface }, tabBarLabelStyle: { fontWeight: '700' }, tabBarBadgeStyle: { backgroundColor: theme.secondary, color: theme.surface } }}>
    <Tabs.Screen name="Shop" component={ShopStack} options={{ title: 'Cửa hàng', headerShown: false, tabBarIcon: () => null }} />
    <Tabs.Screen name="Cart" component={CartScreen} options={{ title: 'Giỏ', headerShown: false, tabBarBadge: totalQuantity > 0 ? totalQuantity : undefined, tabBarIcon: () => null }} />
    <Tabs.Screen name="Me" component={MeScreen} options={{ title: 'Tôi', headerShown: false, tabBarIcon: () => null }} />
  </Tabs.Navigator>;
}
