import { SetStateAction, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Alert, StyleSheet, View, Image } from 'react-native'
import { Button, Input } from 'react-native-elements'
import React from 'react'

export default function Avatar(url: string, size: number, onUpload: Function) {
  const [avatarUrl, setAvatarUrl] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (url !== '') downloadImage(url)
  }, [url])

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

  async function uploadAvatar(event: any) {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

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
        <Image src={avatarUrl} alt="Avatar" className="avatar image" />
      ) : (
        <View className="avatar no-image" />
      )}
      <View>
        <Input
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </View>
    </View>
  )
}