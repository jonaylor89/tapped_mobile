import { SetStateAction, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Alert, StyleSheet, View, Image, Platform } from 'react-native'
import { Button, Input } from 'react-native-elements'
import React from 'react'
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuidv4 } from 'uuid';

export default function Avatar({url, size, onUpload }: {
    url: string; 
    size: number; 
    onUpload: Function;
}) {
    const [avatarUrl, setAvatarUrl] = useState(url);
    const [uploading, setUploading] = useState(false);

    // useEffect(() => {
    //     if (avatarUrl !== '') downloadImage(avatarUrl)
    // }, [url])

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
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (result.cancelled) {
            return;
        }

        const ext = result.uri.split(';')[0].split('/')[1]
        const filename = `${uuidv4()}.${ext}`

        console.log(ext)
        console.log(filename)

        const file = new File([result.uri], filename, { type: `image/${ext}`})
        const formData = new FormData();
        formData.append("files", file)

        uploadAvatar(filename, formData)
      };

    // async function downloadImage(path: string) {
    //     try {
    //         const { data, error } = await supabase.storage.from('avatars').download(path)
    //         if (error) {
    //             throw error
    //         }
    //         const url: string = URL.createObjectURL(data!)
    //     } catch (error) {
    //         console.log('Error downloading image: ', (error as Error).message)
    //     }
    // }

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

            setAvatarUrl(publicURL)
            onUpload(publicURL)
        } catch (error) {
            alert((error as Error).message)
        } finally {
            setUploading(false)
        }
    }

    return (
        <View>
            {avatarUrl ? (
                <Image source={{uri: avatarUrl}} style={{width: 400, height: 400}} />
            ) : (
                <View/>
            )}
            <View>
                <Button title="Pick an image from camera roll" onPress={pickImage} disabled={uploading} />
            </View>
        </View>
    )
}