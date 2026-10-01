import { useCallback, useEffect } from 'react';
import { AppState, Linking, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { BASE_SHIP_FEE, VARIANT } from '@constants/student';
import { useLocationStore } from '@stores/locationStore';

const CAMPUS_GATE = { latitude: 10.762622, longitude: 106.660172 };
const toRadians = (value: number) => (value * Math.PI) / 180;

function distanceKm(latitude: number, longitude: number): number {
  const earthRadius = 6371;
  const dLat = toRadians(latitude - CAMPUS_GATE.latitude);
  const dLon = toRadians(longitude - CAMPUS_GATE.longitude);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRadians(CAMPUS_GATE.latitude)) * Math.cos(toRadians(latitude)) * Math.sin(dLon / 2) ** 2;
  return earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function shippingFee(km: number): number {
  if (VARIANT.shipFormula === 'B') return BASE_SHIP_FEE + Math.round(km * 1500) + 2000;
  return BASE_SHIP_FEE + Math.round(km * 1500);
}

export function useCampusLocation() {
  const location = useLocationStore();
  const requestLocation = useCallback(async () => {
    location.setStatus('requesting');
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) { location.setStatus('blocked', 'Quyền đã bị chặn.'); return; }
      if (result !== PermissionsAndroid.RESULTS.GRANTED) { location.setStatus('denied', 'Bạn chưa cấp quyền vị trí.'); return; }
    }
    Geolocation.getCurrentPosition(
      (position) => location.setLocation(position.coords.latitude, position.coords.longitude),
      (error) => location.setStatus('error', error.message),
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 10000 },
    );
  }, [location]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => { if (state === 'active' && location.status === 'blocked') requestLocation(); });
    return () => subscription.remove();
  }, [location.status, requestLocation]);

  const km = location.latitude !== null && location.longitude !== null ? distanceKm(location.latitude, location.longitude) : null;
  return { ...location, km, fee: km === null ? null : shippingFee(km), requestLocation, openSettings: Linking.openSettings };
}
