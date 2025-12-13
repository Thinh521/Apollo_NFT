import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerContainer: {
    paddingTop: scale(20),
    paddingBottom: scale(24),
  },
  tabsContainer: {
    gap: scale(6),
    borderWidth: 1,
    flexDirection: 'row',
    borderRadius: scale(12),
    paddingHorizontal: scale(8),
    borderColor: Colors.border,
    backgroundColor: Colors.deepBackground,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(6),
    borderRadius: scale(6),
  },
  tabGradient: {
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
    borderRadius: scale(8),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
    color: Colors.textPrimary,
  },
  tabTextActive: {
    color: Colors.white,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.bold,
  },
  card: {
    position: 'relative',
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: scale(16),
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: Colors.border,
    backgroundColor: Colors.deepBackground,
  },
  rankBadge: {
    position: 'absolute',
    top: scale(16),
    right: scale(16),
    zIndex: 10,
  },
  crownContainer: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderRadius: scale(20),
    padding: scale(8),
  },
  rankNumber: {
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
    color: Colors.textMuted,
  },
  creatorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(20),
  },
  avatarLarge: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  avatarTopThree: {
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  creatorDetails: {
    flex: 1,
    marginLeft: scale(16),
  },
  creatorNameLarge: {
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.bold,
    color: Colors.textPrimary,
  },
  creatorUsernameLarge: {
    fontSize: FontSizes.small,
    fontWeight: FontWeights.regular,
    color: Colors.textPrimary,
  },
  volumeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(98, 126, 234, 0.15)',
    borderRadius: scale(16),
    padding: scale(16),
    marginBottom: scale(16),
    borderWidth: 1,
    borderColor: 'rgba(98, 126, 234, 0.3)',
  },
  volumeIconContainer: {
    marginRight: scale(8),
  },
  volumeTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  volumeValue: {
    fontSize: FontSizes.huge,
    fontWeight: FontWeights.black,
    color: Colors.ethereum,
    marginRight: scale(6),
  },
  volumeLabel: {
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
    color: Colors.ethereum,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(16),
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: scale(4),
  },
  statDivider: {
    width: 1,
    height: scale(40),
    backgroundColor: Colors.borderAccent,
  },
  statLabel: {
    fontSize: FontSizes.xsmall,
    fontWeight: FontWeights.medium,
    color: Colors.textMuted,
    marginTop: scale(4),
  },
  statValue: {
    color: Colors.textPrimary,
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
  },
  footerLoader: {
    paddingVertical: scale(20),
    alignItems: 'center',
  },
});
