import {Platform} from 'react-native';
import {scale} from '../utils/scaling';

export const Colors = {
  // Core
  white: '#FFFFFF',
  black: '#000000',
  primary: '#1C51FE',
  secondary: '#9333EA',
  background: '#FFFFFF',
  overlay: 'rgba(0, 0, 0, 0.4)',

  // Card & surfaces
  cardBackground: '#F9FAFB',
  cardBorder: '#E5E7EB',
  grayBackground: '#F3F4F6',

  // Borders
  border: '#D1D5DB',
  borderMuted: '#E6EDFF',
  borderLight: '#B0FFCE',
  borderTertiary: '#E5E7EB',

  // Text
  textPrimary: '#111827',
  textSecondary: '#4B5563',
  textMuted: '#9CA3AF',
  textLight: '#6B7280',
  title: '#212121',
  inputText: '#374151',

  // Status / Feedback
  success: '#10B981',
  successText: '#047857',
  greenLight: '#E6F4EA',
  error: '#EF4444',
  redColor: '#DC2626',

  // UI / Elements
  headerBackground: '#50CFA1',
  bottomSheetHandle: '#D1D5DB',
  disabledText: '#A0A0A0',
  disabledBorder: '#D1D5DB',
  disabledBackground: '#F3F4F6',
};

export const FontSizes = {
  xsmall: scale(10),
  small: scale(12),
  medium: scale(14),
  regular: scale(16),
  semiLarge: scale(18),
  large: scale(20),
  xlarge: scale(22),
  xxlarge: scale(24),
  huge: scale(26),
};

export const FontWeights = {
  thin: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
};

export const Shadows = {
  light: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  medium: {
    shadowColor: '#4c63d2',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  heavy: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  extraHeavy: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  dropdown: {
    ...Platform.select({
      android: {elevation: 5},
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
    }),
  },
  card: {
    shadowColor: '#b2b2b2ff',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 10,
  },
};
