import React from 'react';
import { ActivityIndicator, Alert, Image, Pressable, ScrollView, StyleSheet, Text, View, Vibration } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from '@constants/theme';
import { STUDENT, VARIANT } from '@constants/student';
import { getProductById } from '@services/productApi';
import { useCartStore } from '@stores/cartStore';
import type { ShopStackParamList } from '@navigation/ShopStack';
import { formatVnd } from '@components/ProductCard';
import { Watermark } from '@components/Watermark';

type Props = NativeStackScreenProps<ShopStackParamList, 'Detail'>;
export default function DetailScreen({ route }: Props) {
  const { data, isLoading, isError } = useQuery({ queryKey: ['product', route.params.id], queryFn: () => getProductById(route.params.id) });
  const addItem = useCartStore((state) => state.add);
  const add = () => { if (!data) return; addItem(data); if (VARIANT.hapticOnAdd === 'selection') Vibration.vibrate(40); Alert.alert('Đã thêm vào giỏ', `MSSV ${STUDENT.mssv}`); };
  if (isLoading) return <View style={styles.screen}><View style={styles.center}><ActivityIndicator color={theme.primary} /></View><View style={styles.watermarkBar}><Watermark inFlow /></View></View>;
  if (isError || !data) return <View style={styles.screen}><View style={styles.center}><Text style={styles.error}>Không tìm thấy sản phẩm.</Text></View><View style={styles.watermarkBar}><Watermark inFlow /></View></View>;
  return <View style={styles.screen}><ScrollView style={styles.container} contentContainerStyle={styles.content}><View style={styles.card}><Image source={{ uri: data.image }} style={styles.image} resizeMode="contain" /><Text style={styles.category}>{data.category}</Text><Text style={styles.title}>{data.title}</Text><Text style={styles.price}>{formatVnd(data.price)}</Text><Text style={styles.subline}>Giao nội khu · nhận tận phòng</Text><Text style={styles.description}>{data.description}</Text><Pressable onPress={add} style={styles.button}><Text style={styles.buttonText}>Thêm vào giỏ</Text></Pressable></View></ScrollView><View style={styles.watermarkBar}><Watermark inFlow /></View></View>;
}
const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: theme.background }, container: { flex: 1, backgroundColor: theme.background }, content: { padding: 16, paddingBottom: 144 }, card: { padding: 16, borderRadius: 16, backgroundColor: theme.surface }, image: { height: 280, width: '100%' }, category: { marginTop: 12, color: theme.secondary, textTransform: 'uppercase' }, title: { marginTop: 6, color: theme.text, fontSize: 22, fontWeight: '800', textAlign: 'center' }, price: { marginTop: 10, color: theme.primary, fontSize: 20, fontWeight: '900', textAlign: 'center' }, subline: { marginTop: 8, color: theme.textLight, textAlign: 'center' }, description: { marginTop: 18, color: theme.textLight, lineHeight: 22 }, button: { marginTop: 22, alignItems: 'center', padding: 15, borderRadius: 10, backgroundColor: theme.primary }, buttonText: { color: theme.surface, fontWeight: '800' }, center: { flex: 1, alignItems: 'center', justifyContent: 'center' }, error: { color: theme.error }, watermarkBar: { position: 'absolute', left: 0, right: 0, bottom: 0, minHeight: 34, alignItems: 'center', justifyContent: 'center', backgroundColor: '#DBEAFE' } });
