import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';
import {scale} from '~/utils/scaling';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  logo: {
    width: scale(100),
    height: scale(100),
    marginBottom: scale(20),
  },
  text: {
    color: Colors.title,
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.bold,
  },
});
