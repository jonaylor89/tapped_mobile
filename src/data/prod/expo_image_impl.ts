import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuidv4 } from 'uuid';

import { ImageRepository } from '../image_repository';

export class ExpoImageImpl implements ImageRepository {
  async pickImage(): Promise<{
    filename: string | null;
    imageUri: string | null;
    imageBlob: Blob | null;
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

    console.log('image picker results', result);

    if (result.cancelled) {
      return {
        filename: null,
        imageUri: null,
        imageBlob: null,
        cancelled: true,
      };
    }

    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob: Blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', result.uri, true);
      xhr.send(null);
    });
    console.log('blob', blob);

    const ext = result.uri.split(';')[0].split('/')[1];
    const filename = `${uuidv4()}.${ext}`;

    return {
      filename,
      imageUri: result.uri,
      imageBlob: blob,
      cancelled: false,
    };
  }
}
