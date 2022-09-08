import 'react-native-get-random-values';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, Button, View, TextInput } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { RootStackParamList } from '.';
import { useAuth } from '../contexts/useAuth';
import { useDatabase } from '../contexts/useDatabase';
import { useStorage } from '../contexts/useStorage';
import { Badge } from '../domain/models';
import Routes from './routes';

import { ImagePicker } from '../components/create_badge_form';
import { useTheme } from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, Routes.CreateBadgeForm>;

function CreateBadgeForm({ navigation }: Props) {
  const [uploading, setUploading] = useState(false);
  const [badgeReceiver, setBadgeReceiver] = useState('');
  const [badgeImageBlob, setBadgeImageBlob] = useState<Blob | null>(null);
  const [badgeFilename, setBadgeFilename] = useState('');

  const { user } = useAuth();
  const { database } = useDatabase();
  const { storage } = useStorage();
  const theme = useTheme();

  const createBadge = async () => {
    // check if recipient exists
    try {
      if (!user) {
        return;
      }

      const recipient = await database.getUserByUsername(badgeReceiver);
      if (!recipient) {
        // throw new Error(`user ${badgeReceiver} does not exist`);
        alert(`user does not exist`);
        setBadgeReceiver('');
        return;
      }

      // upload image to supabase storage
      const publicUrl = await uploadBadgeImage();
      if (publicUrl === null) {
        throw new Error('badge image did not upload correctly');
      }

      const recipientId = recipient.id;
      const senderId = user.id;

      // Insert badge into badges table
      const badge: Badge = {
        id: uuidv4(),
        badgeUrl: publicUrl || '',
        receiverId: recipientId,
        senderId,
        createdAt: new Date(),
      };
      database.insertBadge(badge);
    } catch (e) {
      console.log(e);
    }

    navigation.goBack();
    alert(`badge succesfully created`);
  };

  const uploadBadgeImage = async (): Promise<string | null> => {
    try {
      setUploading(true);

      if (badgeFilename === '' || badgeImageBlob === null) return null;

      await storage.uploadBadge(badgeFilename, badgeImageBlob);

      const publicURL = await storage.getBadgeUrl(badgeFilename);

      return publicURL;
    } catch (error: any) {
      console.error(error.message);
      alert(error.message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const onImagePicked = (filename: string, imageBlob: Blob) => {
    setBadgeFilename(filename);
    setBadgeImageBlob(imageBlob);
  };

  const styles = StyleSheet.create({
    container: {
      marginTop: 40,
      padding: 12,
      marginLeft: 12,
      marginRight: 12,
    },
    verticallySpaced: {
      paddingTop: 4,
      paddingBottom: 4,
      alignSelf: 'stretch',
    },
    mt20: {
      marginTop: 20,
    },
    input: {
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
      borderWidth: 1,
      padding: 5,
      margin: 12,
    },
    errorText: {
      fontSize: 12,
      color: 'red',
      alignSelf: 'center',
    },
  });

  const confirmDisabled =
    uploading || badgeReceiver === '' || badgeFilename === '';

  return (
    <View style={styles.container}>
      <View style={styles.verticallySpaced}>
        <ImagePicker onImagePicked={onImagePicked} />
        <TextInput
          style={styles.input}
          autoCapitalize='none'
          value={badgeReceiver || ''}
          placeholder='Recipient`s Username'
          placeholderTextColor={'#AAAAAA'}
          onChangeText={(text) => setBadgeReceiver(text)}
          // usernameIsValid ? null : <View />
        />
      </View>

      <Button
        title='Confirm'
        onPress={() => createBadge()}
        disabled={confirmDisabled}
      />
    </View>
  );
}

export default CreateBadgeForm;
