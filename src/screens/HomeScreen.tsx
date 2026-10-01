import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, RefreshControl, StatusBar, StyleSheet, Text, TextInput, View, Vibration } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { DEBOUNCE_MS, ROOM_LABEL, STALE_TIME_MS, STUDENT, VARIANT } from '@constants/student';
import { theme } from '@constants/theme';
import { useDebouncedValue } from '@hooks/useDebouncedValue';
import { getProducts } from '@services/productApi';
import { useCartStore } from '@stores/cartStore';
import type { ShopStackParamList } from '@navigation/ShopStack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProductCard } from '@components/ProductCard';
import { Watermark } from '@components/Watermark';
import { Pressable } from 'react-native';

type Props = NativeStackScreenProps<ShopStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, DEBOUNCE_MS);
  const query = useQuery({ queryKey: ['products'], queryFn: getProducts, staleTime: STALE_TIME_MS });
  const add = useCartStore((state) => state.add);
  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    return () => {
      StatusBar.setBarStyle('dark-content');
    };
  }, []);
  const products = useMemo(() => (query.data ?? []).filter((item) => item.title.toLowerCase().includes(debouncedSearch.toLowerCase())), [debouncedSearch, query.data]);
  const addProduct = (product: (typeof products)[number]) => { add(product); if (VARIANT.hapticOnAdd === 'selection') Vibration.vibrate(40); Alert.alert('Đã thêm vào giỏ', `MSSV ${STUDENT.mssv}`); };

  return <SafeAreaView style={styles.container}><View style={styles.header}><View style={styles.headerTop}><Text style={styles.brand}>KTXGO</Text><View style={styles.deliveryPill}><Text style={styles.delivery}>{`Giao tận ${ROOM_LABEL}`}</Text></View></View><TextInput value={search} onChangeText={setSearch} placeholder="Tìm món..." placeholderTextColor={theme.textLight} style={styles.search} /></View>
    {query.isLoading ? <View style={styles.center}><ActivityIndicator color={theme.primary} size="large" /><Text style={styles.status}>Đang tải món…</Text></View> : query.isError ? <View style={styles.center}><Text style={styles.error}>MSSV {STUDENT.mssv}</Text><Text style={styles.errorDetail}>Không tải được dữ liệu món.</Text><Pressable onPress={() => { query.refetch().then(() => undefined); }} style={styles.retry}><Text style={styles.retryText}>Thử lại</Text></Pressable></View> : products.length === 0 ? <View style={styles.center}><Text style={styles.status}>Không tìm thấy sản phẩm.</Text></View> : <FlashList data={products} numColumns={2} keyExtractor={(item) => `${STUDENT.mssv}-${item.id}`} renderItem={({ item }) => <ProductCard product={item} onPress={() => navigation.navigate('Detail', { id: String(item.id) })} onAdd={() => addProduct(item)} />} refreshControl={<RefreshControl refreshing={query.isRefetching} onRefresh={() => { query.refetch().then(() => undefined); }} />} contentContainerStyle={styles.list} />}
    <Watermark fixed /></SafeAreaView>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  header: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 14, backgroundColor: theme.primary },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brand: { color: theme.surface, fontSize: 28, fontWeight: '900', letterSpacing: 2 },
  deliveryPill: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 24, backgroundColor: theme.secondary },
  delivery: { color: theme.surface, fontWeight: '800', fontSize: 15 },
  search: { marginTop: 16, paddingHorizontal: 16, height: 48, borderRadius: 12, borderWidth: 1, borderColor: theme.border, backgroundColor: theme.surface, color: theme.text },
  list: { paddingHorizontal: 6, paddingBottom: 96 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  status: { marginTop: 10, color: theme.textLight },
  error: { textAlign: 'center', color: theme.error, fontWeight: '800' },
  errorDetail: { marginTop: 6, color: theme.textLight },
  retry: { marginTop: 14, paddingHorizontal: 22, paddingVertical: 11, borderRadius: 8, backgroundColor: theme.error },
  retryText: { color: theme.surface, fontWeight: '700' },
});
