import {StyleSheet} from 'react-native';
import {scale} from '~/utils/scaling';
import {Colors, FontSizes, FontWeights, Shadows} from '~/theme/theme';

export default StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  backgroundWrapper: {
    position: 'relative',
  },
  backgroundContainer: {
    height: scale(180),
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  cameraBox: {
    position: 'absolute',
    bottom: scale(16),
    right: scale(16),
    backgroundColor: Colors.white,
    borderRadius: scale(999),
    padding: scale(4),
  },
  cameraIcon: {
    color: Colors.black,
  },
  avatarSection: {
    marginTop: -scale(50),
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: scale(12),
  },
  avatar: {
    width: scale(100),
    height: scale(100),
    borderRadius: 999,
    borderWidth: 5,
    borderColor: Colors.white,
    backgroundColor: Colors.black,
    ...Shadows.medium,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: -scale(4),
    right: -scale(0),
    backgroundColor: Colors.white,
    borderRadius: scale(999),
    padding: scale(4),
  },
  removeAvatarButton: {
    marginTop: scale(8),
    paddingVertical: scale(6),
    paddingHorizontal: scale(12),
  },
  removeAvatarText: {
    color: Colors.error,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.bold,
  },
  avatarHint: {
    color: Colors.textHighlight,
    fontSize: FontSizes.small,
    textAlign: 'center',
    marginTop: scale(8),
  },
  formSection: {
    marginTop: scale(26),
    paddingHorizontal: scale(16),
  },
  formGroup: {
    marginBottom: scale(24),
  },
  label: {
    color: Colors.black,
    fontSize: scale(14),
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(8),
  },
  inputContainer: {
    marginBottom: 0,
  },
  textArea: {
    minHeight: scale(100),
  },
  characterCount: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
    textAlign: 'right',
    marginTop: scale(4),
  },
  hint: {
    color: Colors.textGray,
    fontSize: FontSizes.small,
    marginTop: scale(4),
  },
  readOnlyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
    borderRadius: scale(8),
    paddingVertical: scale(14),
    paddingHorizontal: scale(16),
    marginBottom: scale(8),
  },
  lockIcon: {
    marginRight: scale(10),
  },
  readOnlyText: {
    flex: 1,
    color: Colors.textGray,
    fontSize: FontSizes.small,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 211, 238, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(34, 211, 238, 0.3)',
    borderRadius: scale(12),
    padding: scale(16),
    marginHorizontal: scale(16),
    marginTop: scale(8),
    gap: scale(12),
  },
  infoText: {
    flex: 1,
    color: Colors.textGray,
    fontSize: FontSizes.small,
    lineHeight: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: scale(12),
    padding: scale(16),
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.backgroundExtra,
    backgroundColor: Colors.backgroundExtra,
  },
  cancelButtonText: {
    color: Colors.black,
  },
  saveButton: {
    flex: 1,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loadingText: {
    color: Colors.white,
    fontSize: FontSizes.regular,
    marginTop: scale(16),
  },
});
