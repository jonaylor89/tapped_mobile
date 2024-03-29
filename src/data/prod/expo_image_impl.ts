import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuidv4 } from 'uuid';

import { ImageRepository } from '../image_repository';

export class ExpoImageImpl implements ImageRepository {
  async pickImage(): Promise<{
    filename: string | null;
    imageUri: string | null;
    imageInfo: FormData | null;
    cancelled: boolean;
  }> {
    if (Platform.OS !== 'web') {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!');
        throw new Error('Permission to access camera roll is required!');
      }
    }

    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (result.cancelled) {
      return {
        filename: null,
        imageUri: null,
        imageInfo: null,
        cancelled: true,
      };
    }

    // workaround for Expo image picker bug
    // https://github.com/expo/expo/issues/9984
    const blob = await fetch(result.uri).then((res) => res.blob());

    const ext = result.uri.split(';')[0].split('/')[1];
    const filename = `${uuidv4()}.${ext}`;

    const formData = new FormData();
    formData.append('files', blob);

    return {
      filename,
      imageUri: result.uri,
      imageInfo: formData,
      cancelled: false,
    };
  }
}
