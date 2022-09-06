import React, { useState } from 'react';
import { Image, Button, View, StyleSheet } from 'react-native';
import { useImagePicker } from '../../contexts/useImagePicker';

const styles = StyleSheet.create({
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 24,
  },
  image: {
    borderRadius: 12,
    width: 200,
    height: 200,
  },
  button: {
    marginBottom: 24,
  },
});

const ImagePicker = ({
  onImagePicked,
}: {
  onImagePicked: (filename: string, imageInfo: FormData) => void;
}) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const { imagePicker } = useImagePicker();

  const pickBadgeImage = async () => {
    const { imageUri, imageInfo, filename, cancelled } =
      await imagePicker.pickImage();

    if (cancelled) return;

    if (!imageInfo || !filename) {
      return;
    }

    onImagePicked(filename, imageInfo);

    console.log('AHHHH', imageUri);
    setImageUri(imageUri);
  };

  return (
    <View>
      {imageUri !== null ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>
      ) : (
        <View style={styles.button}>
          <Button
            title='Pick an image from camera roll'
            onPress={pickBadgeImage}
          />
        </View>
      )}
    </View>
  );
};

export default ImagePicker;
