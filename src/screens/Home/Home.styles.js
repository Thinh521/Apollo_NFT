import {StyleSheet} from 'react-native';
import {Colors, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    padding: scale(16),
  },
  section: {
    marginBottom: scale(26),
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(12),
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 24,
    fontWeight: FontWeights.extraBold,
  },
});
