import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@screens/HomeScreen';
import DetailScreen from '@screens/DetailScreen';

export type ShopStackParamList = { Home: undefined; Detail: { id: string } };
const Stack = createNativeStackNavigator<ShopStackParamList>();

export default function ShopStack() {
  return <Stack.Navigator><Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} /><Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Chi tiết món', headerTintColor: '#1D4ED8', headerTitleStyle: { color: '#1D4ED8', fontWeight: '800' }, headerStyle: { backgroundColor: '#FFFFFF' } }} /></Stack.Navigator>;
}
