import {API_BASE} from '@env';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Controller, useForm} from 'react-hook-form';
import Icon from 'react-native-vector-icons/Feather';
import {showMessage} from 'react-native-flash-message';
import {launchImageLibrary} from 'react-native-image-picker';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import Images from '~/assets/images/images';
import {CameraIcon} from '~/assets/icons/icons';

import {Input} from '~/components/ui/Input';
import {Button} from '~/components/ui/Button';

import {saveUser} from '~/storage/authStorage';
import useKeyboardVisible from '~/hook/useKeyboardVisible';
import {updateUserApi, updateUserBackgroundApi} from '~/api/userApi';

import {VALIDATION_RULES} from '~/validations/authValidations';

import {formatAddress} from '~/utils/formatAddress';

import {Colors} from '~/theme/theme';
import {scale} from '~/utils/scaling';
import styles from './UpdateProfile.styles';

const UpdateProfileScreen = ({route, navigation}) => {
  const insets = useSafeAreaInsets();

  const user = route?.params?.user || null;

  const keyboardVisible = useKeyboardVisible();

  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors, isDirty},
  } = useForm({
    defaultValues: {
      userName: '',
      fullName: '',
      bio: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (user) {
      setValue('userName', user.userName || '');
      setValue('fullName', user.fullName || '');
      setValue('bio', user.bio || '');
    }
  }, [user, setValue]);

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 1000,
      maxHeight: 1000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        return;
      }

      if (response.error) {
        Alert.alert(
          'Lỗi chọn ảnh',
          'Không thể chọn ảnh. Vui lòng thử lại hoặc kiểm tra quyền truy cập.',
        );
        return;
      }

      if (response.assets && response.assets[0]) {
        setSelectedAvatar(response.assets[0]);
      }
    });
  };

  const handleBackgroundPicker = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 2000,
      maxHeight: 1000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) return;

      if (response.error) {
        Alert.alert(
          'Lỗi chọn ảnh',
          'Không thể chọn ảnh. Vui lòng thử lại hoặc kiểm tra quyền truy cập.',
        );
        return;
      }

      if (response.assets && response.assets[0]) {
        setSelectedBackground(response.assets[0]);
      }
    });
  };

  const onSubmit = async data => {
    if (!isDirty && !selectedAvatar && !selectedBackground) {
      showMessage({
        message: 'Không có thông tin thay đổi',
        type: 'warning',
      });
      return;
    }

    setIsUpdating(true);

    try {
      const updateData = {
        userName: data.userName.trim(),
        fullName: data.fullName.trim(),
        bio: data.bio.trim(),
      };

      if (selectedAvatar) {
        updateData.avatar = selectedAvatar;
      }

      const res = await updateUserApi(updateData);

      if (selectedBackground) {
        const bgRes = await updateUserBackgroundApi(selectedBackground);
        res.background = bgRes.background || res.background;
      }

      saveUser(res);

      showMessage({
        message: 'Cập nhật thành công',
        type: 'success',
      });
    } catch (error) {
      showMessage({
        message: 'Cập nhật thất bại',
        type: 'danger',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const getAvatarSource = () => {
    if (selectedAvatar) {
      return {uri: selectedAvatar.uri};
    }
    if (user?.avatar) {
      return {uri: `${API_BASE}/api/upload/${user.avatar}`};
    }
    return Images.avatar;
  };

  const getBackgroundSource = () => {
    if (selectedBackground) {
      return {uri: selectedBackground.uri};
    }
    if (user?.background) {
      return {uri: `${API_BASE}/api/upload/${user.background}`};
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        backgroundColor={Colors.background}
        barStyle="light-content"
        translucent={false}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          {paddingBottom: insets.bottom + scale(120)},
        ]}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!isUpdating}>
        {/* Avatar Section */}
        <View style={styles.backgroundWrapper}>
          <View style={styles.backgroundContainer}>
            <FastImage
              source={getBackgroundSource()}
              style={styles.backgroundImage}
              resizeMode="cover"
            />

            <TouchableOpacity
              style={styles.cameraBox}
              onPress={handleBackgroundPicker}
              activeOpacity={0.7}>
              <CameraIcon style={styles.cameraIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <FastImage
                source={getAvatarSource()}
                style={styles.avatar}
                resizeMode="cover"
              />

              <TouchableOpacity
                style={styles.editAvatarButton}
                onPress={handleImagePicker}
                disabled={isUpdating}>
                <CameraIcon />
              </TouchableOpacity>
            </View>

            {selectedAvatar && (
              <TouchableOpacity
                style={styles.removeAvatarButton}
                onPress={() => setSelectedAvatar(null)}
                disabled={isUpdating}>
                <Text style={styles.removeAvatarText}>Remove new photo</Text>
              </TouchableOpacity>
            )}

            <Text style={styles.avatarHint}>
              Click camera icon to update your profile picture
            </Text>
          </View>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          {/* Username */}
          <View style={styles.formGroup}>
            <Controller
              control={control}
              name="userName"
              rules={VALIDATION_RULES.userName}
              render={({field: {value, onChange, onBlur}}) => (
                <Input
                  label="Username"
                  labelStyle={styles.label}
                  placeholder="Enter your username"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={!!errors.userName}
                  errorMessage={errors.userName?.message}
                  containerStyle={styles.inputContainer}
                  editable={!isUpdating}
                />
              )}
            />
          </View>

          {/* Full Name */}
          <View style={styles.formGroup}>
            <Controller
              control={control}
              name="fullName"
              rules={VALIDATION_RULES.fullName}
              render={({field: {value, onChange, onBlur}}) => (
                <Input
                  label="Full Name"
                  labelStyle={styles.label}
                  placeholder="Enter your full name"
                  placeholderTextColor={Colors.textGray}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={!!errors.fullName}
                  errorMessage={errors.fullName?.message}
                  containerStyle={styles.inputContainer}
                  editable={!isUpdating}
                  iconLeft={
                    <Icon name="user" size={18} color={Colors.textGray} />
                  }
                />
              )}
            />
          </View>

          {/* Bio */}
          <View style={styles.formGroup}>
            <Controller
              control={control}
              name="bio"
              rules={VALIDATION_RULES.bio}
              render={({field: {value, onChange, onBlur}}) => (
                <Input
                  label="Bio"
                  labelStyle={styles.label}
                  placeholder="Tell us about yourself..."
                  placeholderTextColor={Colors.textGray}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={!!errors.bio}
                  errorMessage={errors.bio?.message}
                  containerStyle={[styles.inputContainer, styles.textArea]}
                  editable={!isUpdating}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              )}
            />
            <Text style={styles.characterCount}>
              {control._formValues.bio?.length || 0}/500
            </Text>
          </View>

          {/* Wallet Address (Read Only) */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Wallet Address</Text>
            <View style={styles.readOnlyContainer}>
              <Icon
                name="lock"
                size={18}
                color={Colors.textGray}
                style={styles.lockIcon}
              />
              <Text style={styles.readOnlyText} numberOfLines={1}>
                {formatAddress(user?.addressWallet || 'Not connected')}
              </Text>
            </View>
            <Text style={styles.hint}>Wallet address cannot be changed</Text>
          </View>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <MaterialIcon name="information" size={20} color={Colors.primary} />
          <Text style={styles.infoText}>
            Your profile information will be publicly visible on the marketplace
          </Text>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      {!keyboardVisible && (
        <View style={styles.buttonContainer}>
          <Button.Main
            title="Cancel"
            onPress={() => navigation.goBack()}
            style={styles.cancelButton}
            textStyle={styles.cancelButtonText}
            disabled={isUpdating}
          />
          <Button.Main
            title={isUpdating ? 'Updating...' : 'Save changes'}
            onPress={handleSubmit(onSubmit)}
            style={styles.saveButton}
            disabled={isUpdating}
          />
        </View>
      )}

      {/* Loading Overlay */}
      {isUpdating && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Đang cập nhật...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default UpdateProfileScreen;
