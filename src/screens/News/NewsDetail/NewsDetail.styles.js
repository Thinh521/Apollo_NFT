import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: scale(24),
  },
  thumbnail: {
    width: '100%',
    height: scale(240),
    backgroundColor: Colors.surfaceBackground,
  },
  contentContainer: {
    padding: scale(16),
  },
  title: {
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
    color: Colors.textPrimary,
    lineHeight: 28,
    marginBottom: scale(16),
  },
  authorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(20),
  },
  authorAvatar: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: Colors.surfaceBackground,
  },
  authorInfo: {
    marginLeft: scale(12),
    flex: 1,
  },
  authorName: {
    color: Colors.textPrimary,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.bold,
  },
  dateText: {
    fontSize: FontSizes.small,
    color: Colors.textMuted,
    marginTop: scale(2),
  },
  categoryBadge: {
    backgroundColor: Colors.featureIconBg,
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: scale(12),
  },
  categoryText: {
    color: Colors.primary,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.medium,
  },
  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(16),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border,
    marginBottom: scale(20),
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  actionText: {
    fontSize: FontSizes.small,
    color: Colors.textSecondary,
    marginLeft: scale(8),
    fontWeight: FontWeights.medium,
  },
  descriptionContainer: {
    backgroundColor: Colors.deepBackground,
    padding: scale(16),
    borderRadius: scale(12),
    marginBottom: scale(20),
    borderLeftWidth: scale(4),
    borderLeftColor: Colors.primary,
  },
  descriptionText: {
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    lineHeight: scale(22),
  },
  content: {
    fontSize: FontSizes.small,
    color: Colors.textSecondary,
    lineHeight: 22,
    textAlign: 'justify',
  },
  footer: {
    marginTop: scale(32),
    paddingTop: scale(20),
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  footerText: {
    fontSize: FontSizes.small,
    color: Colors.textMuted,
    textAlign: 'center',
  },
});
