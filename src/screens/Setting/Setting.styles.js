import {StyleSheet} from 'react-native';
import {scale} from '~/utils/scaling';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  placeholder: {
    width: scale(40),
  },
  scrollContent: {
    paddingTop: scale(20),
    paddingBottom: scale(40),
  },
  section: {
    marginHorizontal: scale(16),
    backgroundColor: Colors.deepBackground,
    borderRadius: scale(12),
    overflow: 'hidden',
    marginBottom: scale(24),
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sectionHeader: {
    paddingHorizontal: scale(16),
    marginBottom: scale(12),
  },
  sectionTitle: {
    fontSize: scale(14),
    fontWeight: '600',
    color: Colors.textPrimary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingVertical: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.04)',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(10),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(12),
  },
  icon: {
    width: scale(20),
    height: scale(20),
    tintColor: Colors.textPrimary,
  },
  settingTitle: {
    color: Colors.textPrimary,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.bold,
  },
  settingItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  rightText: {
    fontSize: FontSizes.small,
    color: Colors.textMuted,
    marginRight: scale(4),
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: scale(20),
  },
  versionText: {
    fontSize: FontSizes.small,
    color: Colors.textMuted,
  },
});
