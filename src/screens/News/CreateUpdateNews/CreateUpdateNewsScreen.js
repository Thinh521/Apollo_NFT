import {API_BASE} from '@env';
import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import {Controller, useForm} from 'react-hook-form';
import {showMessage} from 'react-native-flash-message';
import FastImage from 'react-native-fast-image';

import {CloseIcon, CloudIcon} from '~/assets/icons/icons';

import {Input} from '~/components/ui/Input';
import {Button} from '~/components/ui/Button';

import {useCategories} from '~/hook/useCategories';
import {createNewsApi, updateNewsApi} from '~/api/NewsApi';

import {scale} from '~/utils/scaling';
import {ERROR_MESSAGES} from '~/utils/errors/blockchainErrors';
import {VALIDATION_RULES} from '~/validations/authValidations';

import {commonStyles} from '~/styles/common';
import {Colors} from '~/theme/theme';
import styles from './CreateUpdateNews.styles';

// Main content
const CreateUpdateNewsScreen = ({route}) => {
  const news = route.params?.news;
  const isEditMode = !!news?.id;

  const [isLoading, setIsLoading] = useState(false);
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    news?.thumbnail
      ? {
          uri: `${API_BASE}/api/upload/${news?.thumbnail}`,
          fileName: 'current_image.jpg',
        }
      : null,
  );

  const {categoryList, isLoading: isLoadingCategories} = useCategories('news');

  console.log('categoryList', categoryList);

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
    setValue,
  } = useForm({
    defaultValues: {
      title: news?.title || '',
      description: news?.description || '',
      categoryId: news?.categoryId || '',
      content: news?.content || '',
      status: news?.status || 'published',
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  // Image picker
  const handleImagePicker = () => {
    const options = {
      mediaType: 'mixed',
      quality: 1,
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

      if (response.errorCode) {
        let errorMsg = 'Không thể chọn ảnh';
        if (response.errorCode === 'permission') {
          errorMsg = 'Vui lòng cấp quyền truy cập thư viện ảnh';
        }
        Alert.alert('Lỗi', errorMsg);
        return;
      }

      if (response.assets?.[0]) {
        setSelectedImage(response.assets[0]);
      }
    });
  };

  // Handle submit
  const onSubmit = async data => {
    if (!selectedImage && !isEditMode) {
      Alert.alert('Lỗi', ERROR_MESSAGES.IMAGE_REQUIRED);
      return;
    }

    setIsLoading(true);

    try {
      if (isEditMode) {
        await updateNewsApi({
          id: news.id,
          ...data,
        });

        showMessage({message: 'Cập nhật tin tức thành công', type: 'success'});
      } else {
        const formData = {
          ...data,
          image: selectedImage,
        };

        await createNewsApi(formData);

        showMessage({message: 'Tạo tin tức thành công', type: 'success'});
      }
    } catch (error) {
      Alert.alert('Lỗi', error.message || 'Có lỗi xảy ra.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.background}
        barStyle="light-content"
        translucent={false}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        scrollEnabled={!isLoading}>
        <View style={styles.content}>
          {/* Upload Section */}
          <View style={styles.uploadSection}>
            {selectedImage ? (
              <View style={styles.imagePreviewContainer}>
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={() => setSelectedImage(null)}
                  disabled={isLoading}>
                  <CloseIcon />
                </TouchableOpacity>
                <View style={styles.imageWrapper}>
                  <FastImage
                    source={{uri: selectedImage.uri}}
                    style={styles.previewImage}
                    resizeMode="cover"
                  />
                  <View style={styles.previewImageWrapper}>
                    <Text
                      style={[
                        styles.uploadedImageText,
                        {marginBottom: 0, marginTop: scale(10)},
                      ]}>
                      {selectedImage.fileName}
                    </Text>
                    {selectedImage.fileSize && (
                      <Text style={styles.uploadedImageSize}>
                        {(selectedImage.fileSize / 1024 / 1024).toFixed(2)} MB
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            ) : (
              <>
                <View style={styles.uploadIcon}>
                  <CloudIcon />
                </View>
                <Text style={styles.uploadTitle}>Drag & drop file here</Text>
                <Text style={styles.uploadSubtitle}>or click to browse</Text>
                <View style={styles.supportedFormats}>
                  <Text style={styles.supportedFormatsText}>
                    Supported formats: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV
                  </Text>
                </View>
                <Button.Main
                  title="Choose File"
                  useGradient
                  onPress={handleImagePicker}
                  gradientColors={[Colors.secondary, Colors.primary]}
                  disabled={isLoading}
                />
              </>
            )}
          </View>

          {/* Details Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={commonStyles.title}>// DETAILS</Text>
            </View>

            <View style={styles.formGroup}>
              <Controller
                control={control}
                name="title"
                rules={VALIDATION_RULES.title}
                render={({field: {value, onChange, onBlur}}) => (
                  <Input
                    label="Title"
                    placeholder="Enter title"
                    placeholderTextColor={Colors.textGray}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={!!errors.title}
                    errorMessage={errors.title?.message}
                    containerStyle={styles.inputContainer}
                    editable={!isLoading}
                  />
                )}
              />
              <Text style={styles.hint}>
                This will be displayed as the title of your NFT
              </Text>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Category</Text>

              <Controller
                control={control}
                name="categoryId"
                rules={{required: 'Category is required'}}
                render={({field: {value, onChange}}) => (
                  <View style={{position: 'relative'}}>
                    <TouchableOpacity
                      style={[
                        styles.dropdownButton,
                        errors.categoryId && {borderColor: Colors.error},
                      ]}
                      onPress={() =>
                        setShowCategoryOptions(!showCategoryOptions)
                      }
                      disabled={isLoadingCategories}>
                      <Text
                        style={[
                          styles.dropdownText,
                          !value && {color: Colors.textGray},
                        ]}>
                        {categoryList?.find(c => c.id === value)?.name ||
                          'Select category'}
                      </Text>

                      <Icon
                        name={
                          showCategoryOptions ? 'chevron-up' : 'chevron-down'
                        }
                        size={20}
                        color={Colors.white}
                      />
                    </TouchableOpacity>

                    {showCategoryOptions && (
                      <View style={styles.dropdownListAbsolute}>
                        {categoryList?.map(item => (
                          <TouchableOpacity
                            key={item.id}
                            style={[
                              styles.dropdownItem,
                              value === item.id && styles.dropdownItemActive,
                            ]}
                            onPress={() => {
                              onChange(item.id);
                              setShowCategoryOptions(false);
                            }}>
                            <Text
                              style={[
                                styles.dropdownItemText,
                                value === item.id &&
                                  styles.dropdownItemTextActive,
                              ]}>
                              {item.name}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                )}
              />

              {errors.categoryId && (
                <Text style={styles.errorText}>
                  {errors.categoryId.message}
                </Text>
              )}

              <Text style={styles.hint}>Choose the news category</Text>
            </View>

            <View style={styles.formGroup}>
              <Controller
                control={control}
                name="description"
                rules={VALIDATION_RULES.description}
                render={({field: {value, onChange, onBlur}}) => (
                  <Input
                    label="Description"
                    placeholder="Provide a detailed description of your item"
                    placeholderTextColor={Colors.textGray}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    editable={!isLoading}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    error={!!errors.description}
                    errorMessage={errors.description?.message}
                    containerStyle={[styles.textArea, styles.inputContainer]}
                  />
                )}
              />
              <Text style={styles.hint}>
                The description will be included on the item's detail page
              </Text>
            </View>

            <View style={styles.formGroup}>
              <Controller
                control={control}
                name="content"
                rules={{required: 'Content is required'}}
                render={({field: {value, onChange, onBlur}}) => (
                  <Input
                    label="content"
                    placeholder="Provide a detailed content of your item"
                    placeholderTextColor={Colors.textGray}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    editable={!isLoading}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    error={!!errors.content}
                    errorMessage={errors.content?.message}
                    containerStyle={[styles.textArea, styles.inputContainer]}
                  />
                )}
              />
              <Text style={styles.hint}>
                The description will be included on the item's detail page
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        {isEditMode ? (
          <Button.Main
            title={isLoading ? 'PROCESSING...' : 'UPDATE NEWS'}
            useGradient
            gradientColors={[Colors.secondary, Colors.primary]}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          />
        ) : (
          <View style={{flexDirection: 'row', gap: scale(12)}}>
            {/* Save Draft */}
            <Button.Main
              title={isLoading ? 'PROCESSING...' : 'SAVE DRAFT'}
              onPress={handleSubmit(data =>
                onSubmit({...data, status: 'draft'}),
              )}
              disabled={isLoading}
              style={{flex: 1}}
            />

            {/* Publish */}
            <Button.Main
              title={isLoading ? 'PROCESSING...' : 'PUBLISH'}
              useGradient
              gradientColors={[Colors.secondary, Colors.primary]}
              onPress={handleSubmit(data =>
                onSubmit({...data, status: 'published'}),
              )}
              disabled={isLoading}
              style={{flex: 1}}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CreateUpdateNewsScreen;
