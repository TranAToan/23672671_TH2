import React from 'react';
import { Linking, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { BASE_SHIP_FEE, examStamp, STUDENT } from '@constants/student';
import { theme } from '@constants/theme';
import { useAuthStore } from '@stores/authStore';
import { useCampusLocation } from '@hooks/useCampusLocation';
import { Watermark } from '@components/Watermark';

export default function MeScreen() {
  const logout = useAuthStore((state) => state.logout);
  const location = useCampusLocation();
  const locationAction = <>
    <Pressable onPress={location.requestLocation} style={styles.button}><Text style={styles.buttonText}>Lấy vị trí ước tính ship</Text></Pressable>
    <Pressable onPress={Linking.openSettings} style={[styles.button, styles.settingsButton]}><Text style={[styles.buttonText, styles.settingsButtonText]}>Mở Cài đặt (blocked)</Text></Pressable>
  </>;

  return <SafeAreaView style={styles.container}><View style={styles.header}><Text style={styles.heading}>TÔI · LOCATION</Text></View><View style={styles.profile}><Text style={styles.name}>{STUDENT.fullName}</Text><Text style={styles.mssv}>MSSV {STUDENT.mssv} · #{examStamp()}</Text></View><View style={styles.location}><Text style={[styles.text, location.status === 'granted' && styles.granted]}>Quyền: {location.status}</Text><Text style={styles.text}>Khoảng cách tới cổng KTX: {location.km !== null ? `${location.km.toFixed(2)} km` : 'Chưa xác định'}</Text><Text style={styles.fee}>Phí ship ước tính: {location.fee !== null ? `${location.fee.toLocaleString('vi-VN')} đ` : `${BASE_SHIP_FEE.toLocaleString('vi-VN')} đ`}</Text></View>{locationAction}<Pressable onPress={logout} style={styles.logout}><Text style={styles.logoutText}>Đăng xuất</Text></Pressable><Watermark fixed /></SafeAreaView>;
}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: theme.background }, header: { padding: 14, alignItems: 'center', backgroundColor: theme.primary }, heading: { color: theme.surface, fontSize: 19, fontWeight: '900' }, profile: { marginTop: 20, marginBottom: 14, alignItems: 'center' }, name: { color: theme.text, fontSize: 20, fontWeight: '800' }, mssv: { marginTop: 5, color: theme.textLight }, location: { marginHorizontal: 16, padding: 18, borderRadius: 14, backgroundColor: theme.surface }, text: { marginTop: 9, color: theme.textLight }, granted: { color: theme.success, fontWeight: '700' }, fee: { marginTop: 9, color: theme.secondary, fontWeight: '800' }, button: { marginHorizontal: 16, marginTop: 15, alignItems: 'center', padding: 12, borderRadius: 9, backgroundColor: theme.primary }, buttonText: { color: theme.surface, fontWeight: '800' }, settingsButton: { backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.primary }, settingsButtonText: { color: theme.primary }, logout: { marginHorizontal: 16, marginTop: 12, padding: 13, alignItems: 'center', borderRadius: 9, backgroundColor: theme.error }, logoutText: { color: theme.surface, fontWeight: '800' } });
