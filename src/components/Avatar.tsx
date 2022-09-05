import React, { useState } from 'react';
import { View, Image, Platform, StyleSheet, ImageSourcePropType } from 'react-native';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuidv4 } from 'uuid';
import { useAssets } from 'expo-asset';

import { useStorage } from '../contexts/useStorage';
import { useImagePicker } from '../contexts/useImagePicker';

export default function Avatar({
    url,
    size,
    editable,
    rounded,
    margin,
}: {
    url: string | null | undefined;
    size: number;
    editable: boolean;
    rounded: boolean;
    margin: number;
}) {
    const [imageUrl, setImageUrl] = useState(url);
    const [uploading, setUploading] = useState(false);

    const { storage } = useStorage();
    const { imagePicker } = useImagePicker();

    const [assets, error] = useAssets([require('../../assets/default_avatar.png')]);

    if (error) {
        console.error(error);
    }

    const pickImage = async () => {
        if (Platform.OS !== 'web') {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (permissionResult.granted === false) {
                alert('Permission to access camera roll is required!');
                return;
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
            return;
        }

        // workaround for Expo image picker bug
        // https://github.com/expo/expo/issues/9984
        const blob = await fetch(result.uri).then((res) => res.blob());

        console.log(blob);

        const ext = result.uri.split(';')[0].split('/')[1];
        const filename = `${uuidv4()}.${ext}`;

        console.log(ext);
        console.log(filename);

        const formData = new FormData();
        formData.append('files', blob);

        uploadAvatar(filename, formData);
    };

    async function uploadAvatar(filename: string, imageInfo: FormData) {
        try {
            setUploading(true);

            await storage.uploadPFP(filename, imageInfo);

            const publicUrl = await storage.getPFPUrl(filename);
            if (!publicUrl) {
                return;
            }

            console.log(publicUrl);
            // onUpload(publicURL);
            setImageUrl(publicUrl);
        } catch (error) {
            alert((error as Error).message);
        } finally {
            setUploading(false);
        }
    }

    const styles = StyleSheet.create({
        image: {
            borderRadius: rounded ? 100 : 0,
            width: size,
            height: size,
        },
    });

    return (
        <View style={{ margin: margin }}>
            {url ? (
                <Image source={{ uri: url }} style={styles.image} />
            ) : assets ? (
                <Image source={assets[0] as ImageSourcePropType} style={styles.image} />
            ) : (
                <View />
            )}
            {editable ? (
                <View>
                    <Button
                        title='Pick an image from camera roll'
                        onPress={pickImage}
                        disabled={uploading}
                    />
                </View>
            ) : (
                <View />
            )}
        </View>
    );
}
