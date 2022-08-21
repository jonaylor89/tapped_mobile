import { SetStateAction, useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Alert, StyleSheet, View, Image, Platform } from 'react-native'
import { Button, Input } from 'react-native-elements'
import React from 'react'
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuidv4 } from 'uuid';

export default function Avatar({ url, size }: {
    url: string;
    size: number;
}) {
    const [imageUrl, setImageUrl] = useState(url);
    const [uploading, setUploading] = useState(false);

    const pickImage = async () => {

        if (Platform.OS !== 'web') {
            let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (permissionResult.granted === false) {
                alert('Permission to access camera roll is required!');
                return;
            }
        }

        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
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
        const blob = await fetch(result.uri)
            .then(res => res.blob());

        console.log(blob)

        const ext = result.uri.split(';')[0].split('/')[1]
        const filename = `${uuidv4()}.${ext}`

        console.log(ext)
        console.log(filename)

        const formData = new FormData();
        formData.append("files", blob)

        uploadAvatar(filename, formData)
    };

    async function uploadAvatar(filename: string, imageInfo: FormData) {
        try {
            setUploading(true)

            let { error: uploadError } = await supabase.storage.from('avatars').upload(filename, imageInfo)
            if (uploadError) {
                throw uploadError
            }

            let { publicURL, error } = await supabase.storage.from('avatars').getPublicUrl(filename);
            if (error) {
                throw error
            }
            if (!publicURL) {
                return;
            }

            console.log(publicURL);
            // onUpload(publicURL);
            setImageUrl(publicURL);
        } catch (error) {
            alert((error as Error).message)
        } finally {
            setUploading(false)
        }
    }

    return (
        <View>
            {imageUrl !== '' ? (
                <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />
            ) : (
                <View />
            )}
            <View>
                <Button title="Pick an image from camera roll" onPress={pickImage} disabled={uploading} />
            </View>
        </View>
    )
}