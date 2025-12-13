import {scale} from '../utils/scaling';

export const Colors = {
  // Core Colors
  white: '#FFFFFF',
  black: '#000000',
  primary: '#1C51FE',
  secondary: '#9333EA',

  ethereum: '#627EEA',

  // Background Colors
  background: '#FFFFFF',
  deepBackground: '#F8FAFC',
  surfaceBackground: '#F1F5F9',
  mutedBackground: '#f4f4f4ff',
  backgroundExtra: '#ececec',

  // Gradient Colors
  gradientStart: '#1C51FE',
  gradientEnd: '#9333EA',
  gradientPurpleStart: '#9333EA',
  gradientPurpleEnd: '#C026D3',
  gradientBlueStart: '#1C51FE',
  gradientBlueEnd: '#3B82F6',

  // Accent Colors
  accent: '#06B6D4',
  accentPurple: '#A78BFA',
  accentBlue: '#60A5FA',
  accentPink: '#F472B6',

  // Border Colors
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  borderAccent: 'rgba(28, 81, 254, 0.2)',
  borderGlow: 'rgba(147, 51, 234, 0.2)',

  // Text Colors
  textPrimary: '#0F172A',
  textSecondary: '#334155',
  textMuted: '#64748B',
  textDark: '#1E293B',
  textGradient: ['#1C51FE', '#9333EA'],

  // Status Colors
  success: '#10B981',
  successLight: '#34D399',
  successDark: '#059669',
  error: '#EF4444',
  errorLight: '#F87171',
  errorDark: '#DC2626',
  warning: '#F59E0B',
  warningLight: '#FBBF24',
  info: '#06B6D4',

  // Overlay & Shadow
  overlay: 'rgba(15, 23, 42, 0.4)',
  overlayLight: 'rgba(15, 23, 42, 0.2)',
  shadowColor: '#1C51FE',
  glowColor: 'rgba(28, 81, 254, 0.3)',

  // Feature Card Colors
  featureIconBg: 'rgba(28, 81, 254, 0.15)',
  featureIconBgPurple: 'rgba(147, 51, 234, 0.15)',
  featureIconBgCyan: 'rgba(6, 182, 212, 0.15)',

  // Interactive States
  hover: 'rgba(28, 81, 254, 0.05)',
  pressed: 'rgba(28, 81, 254, 0.1)',
  disabled: '#E2E8F0',
  disabledText: '#94A3B8',
  disabledBackground: '#e0e0e0',
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
  massive: scale(32),
};

export const FontWeights = {
  thin: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
  black: '900',
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
    shadowColor: '#585858',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  heavy: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  glow: {
    shadowColor: '#1C51FE',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 12,
  },
  purpleGlow: {
    shadowColor: '#9333EA',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 10,
  },
};
