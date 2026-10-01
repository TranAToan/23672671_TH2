module.exports = {
  preset: '@react-native/jest-preset',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community|-async-storage)?|@react-navigation|@tanstack|@shopify|zustand|axios|react-native-haptic-feedback)/)',
  ],
  moduleNameMapper: {
    '^react-native-haptic-feedback$': '<rootDir>/__mocks__/react-native-haptic-feedback.ts',
    '^@react-native-community/geolocation$': '<rootDir>/__mocks__/@react-native-community/geolocation.ts',
  },
};
