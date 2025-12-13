import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    padding: scale(16),
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(60),
    paddingHorizontal: scale(40),
  },
  emptyText: {
    textAlign: 'center',
    marginTop: scale(12),
    color: Colors.textMuted,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.medium,
  },
});
