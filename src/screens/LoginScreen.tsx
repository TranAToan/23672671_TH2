import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { AUTH_TOKEN } from '@constants/student';
import { theme } from '@constants/theme';
import { useAuthStore } from '@stores/authStore';
import { Watermark } from '@components/Watermark';

export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const login = useAuthStore((state) => state.login);
  const submit = () => {
    if (phone.trim().length < 8) { Alert.alert('Số điện thoại chưa hợp lệ', 'Vui lòng nhập ít nhất 8 chữ số.'); return; }
    login(AUTH_TOKEN);
  };
  return <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <View style={styles.form}>
        <Text style={styles.logo}>KTXGO</Text>
        <Text style={styles.caption}>Giao đồ tận phòng ký túc xá</Text>
        <TextInput value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="Số điện thoại" placeholderTextColor={theme.textLight} style={styles.input} />
        <Pressable onPress={submit} style={({ pressed }) => [styles.button, pressed && styles.pressed]}><Text style={styles.buttonText}>Vào cửa hàng</Text></Pressable>
      </View>
    </ScrollView>
    <Watermark />
  </KeyboardAvoidingView>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  content: { flexGrow: 1, justifyContent: 'center', padding: 24, paddingBottom: 80 },
  form: { alignItems: 'center' },
  logo: { color: theme.primary, fontSize: 38, fontWeight: '900', letterSpacing: 2 },
  caption: { marginTop: 10, color: theme.textLight, textAlign: 'center', fontSize: 15 },
  input: { width: '100%', marginTop: 30, paddingHorizontal: 16, height: 52, borderWidth: 1, borderColor: theme.border, borderRadius: 12, backgroundColor: theme.surface, color: theme.text },
  button: { width: '100%', marginTop: 14, padding: 15, borderRadius: 10, alignItems: 'center', backgroundColor: theme.primary },
  buttonText: { color: theme.surface, fontWeight: '800', fontSize: 16 },
  pressed: { opacity: 0.82 },
});
