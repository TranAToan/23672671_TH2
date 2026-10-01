import React from 'react';
import { Image, Pressable, StyleSheet, Text } from 'react-native';
import { PRICE_MULTIPLIER } from '@constants/student';
import { theme } from '@constants/theme';
import type { Product } from '@models/product';

export const formatVnd = (price: number) => `${Math.round(price * PRICE_MULTIPLIER).toLocaleString('vi-VN')} đ`;
export const formatVndValue = (price: number) => `${Math.round(price).toLocaleString('vi-VN')} đ`;

type Props = { product: Product; onPress: () => void; onAdd: () => void };

export function ProductCard({ product, onPress, onAdd }: Props) {
  return <Pressable style={styles.card} onPress={onPress} accessibilityRole="button">
    <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
    <Text style={styles.category} numberOfLines={1}>{product.category}</Text>
    <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
    <Text style={styles.price}>{formatVnd(product.price)}</Text>
    <Pressable style={styles.addButton} onPress={(event) => { event.stopPropagation(); onAdd(); }} accessibilityRole="button" accessibilityLabel={`Thêm ${product.title} vào giỏ`}><Text style={styles.addText}>+</Text></Pressable>
  </Pressable>;
}

const styles = StyleSheet.create({
  card: { flex: 1, margin: 5, padding: 8, minHeight: 278, borderRadius: 12, backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.border, elevation: 2 },
  image: { width: '100%', height: 132, backgroundColor: '#F8FAFC', borderRadius: 8 },
  category: { marginTop: 8, color: theme.textLight, fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },
  title: { minHeight: 36, marginTop: 8, color: theme.text, fontWeight: '700' },
  price: { marginTop: 6, color: theme.primary, fontWeight: '800' },
  addButton: { alignSelf: 'flex-end', marginTop: 7, width: 38, height: 38, alignItems: 'center', justifyContent: 'center', borderRadius: 19, backgroundColor: theme.primary },
  addText: { color: theme.surface, fontSize: 25, lineHeight: 27, fontWeight: '700' },
});
