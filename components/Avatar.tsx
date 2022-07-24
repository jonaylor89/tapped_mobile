import { SetStateAction, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Alert, StyleSheet, View, Image } from 'react-native'
import { Button, Input } from 'react-native-elements'
import React from 'react'
import * as ImagePicker from 'expo-image-picker';

export default function Avatar({url, size, onUpload }: {
    url: string; 
    size: number; 
    onUpload: Function;
}) {
    const [avatarUrl, setAvatarUrl] = useState('')
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        if (url !== '') downloadImage(url)
    }, [url])

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
            uploadAvatar(result.uri)
        }
      };

    async function downloadImage(path: string) {
        try {
            const { data, error } = await supabase.storage.from('avatars').download(path)
            if (error) {
                throw error
            }
            const url: string = URL.createObjectURL(data!)
            setAvatarUrl(url)
        } catch (error) {
            console.log('Error downloading image: ', (error as Error).message)
        }
    }

    async function uploadAvatar(imageUri: string) {
        try {
            setUploading(true)


            const fileExt = imageUri.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            const file = new File([imageUri], fileName, { type: 'image/jpeg' })

            let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, imageUri)

            if (uploadError) {
                throw uploadError
            }

            onUpload(filePath)
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