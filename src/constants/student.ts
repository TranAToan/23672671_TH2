export const STUDENT = {
  fullName: 'TRẦN A TOÀN',
  mssv: '23672671',
} as const;

export const LAST_DIGIT = Number(STUDENT.mssv.at(-1));
export const STUDENT_SEED = Number(STUDENT.mssv.slice(-3));
export const DEBOUNCE_MS = 400;
export const STALE_TIME_MS = 21000;
export const PRICE_MULTIPLIER = 30500;
export const BASE_SHIP_FEE = 9000;
export const ROOM_LABEL = `P.${370 + LAST_DIGIT}`;
export const BANNER_IMAGE_ID = 270 + LAST_DIGIT;

export const VARIANT = {
  watermarkAtTop: false,
  authField: 'phone' as const,
  tabOrder: 'shopFirst' as const,
  hapticOnAdd: 'selection' as const,
  shipFormula: 'B' as const,
  detailPresentation: 'card' as const,
};

export const examStamp = (): string =>
  String(STUDENT_SEED * 1419 - STUDENT.mssv.length * 5).padStart(6, '0');

export const WATERMARK_TEXT = `TH2 · ${STUDENT.mssv} · ${STUDENT.fullName} · #${examStamp()}`;
export const AUTH_TOKEN = `ktxgo-${STUDENT.mssv}-${examStamp()}`;
export const CART_STORAGE_KEY = `ktxgo-cart-${STUDENT.mssv}`;
