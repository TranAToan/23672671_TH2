import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { WATERMARK_TEXT, VARIANT } from '@constants/student';
import { theme } from '@constants/theme';

export function Watermark({ inFlow = false, fixed = false }: { inFlow?: boolean; fixed?: boolean }) {
  return <Text style={[styles.watermark, inFlow ? styles.inFlow : (fixed ? styles.fixed : (VARIANT.watermarkAtTop ? styles.top : styles.bottom))]}>{WATERMARK_TEXT}</Text>;
}

const styles = StyleSheet.create({
  watermark: { left: 12, right: 12, textAlign: 'center', color: theme.textLight, fontSize: 12, lineHeight: 18, fontWeight: '700', zIndex: 5 },
  inFlow: { marginTop: 8, marginBottom: 8 },
  fixed: { position: 'absolute', bottom: 0, paddingVertical: 7, backgroundColor: '#DBEAFE', color: theme.primary },
  top: { top: 8 },
  bottom: { bottom: 28 },
});
