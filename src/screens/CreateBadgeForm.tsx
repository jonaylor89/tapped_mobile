import 'react-native-get-random-values';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, Button, View } from 'react-native';
import { Input } from 'react-native-elements';
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
  const [badgeImageInfo, setBadgeImageInfo] = useState<FormData | null>(null);
  const [badgeFilename, setBadgeFilename] = useState('');
  const [badgeUrl, setBadgeUrl] = useState('');

  const { user } = useAuth();
  const { database } = useDatabase();
  const { storage } = useStorage();
  const theme = useTheme();

  const createBadge = async () => {
    // check if recipient exists
    try {
      const recipient = await database.getUserByUsername(badgeReceiver);
      if (!recipient) {
        throw new Error(`user ${badgeReceiver} does not exist`);
      }

      // upload image to supabase storage
      await uploadBadgeImage();

      const recipientId = recipient.id;
      const senderId = user!.id;

      // Insert badge into badges table
      const badge: Badge = {
        id: uuidv4(),
        badgeUrl,
        receiverId: recipientId,
        senderId,
      };
      database.insertBadge(badge);
    } catch (e) {
      console.log(e);
    }

    // go back to account page
    // TODO redirect to account page
    // setCreateBadgeForm(false);
    navigation.goBack();
  };

  const uploadBadgeImage = async () => {
    try {
      setUploading(true);

      if (badgeFilename === '' || badgeImageInfo === null) return;

      storage.uploadBadge(badgeFilename, badgeImageInfo);

      storage.getBadgeUrl(badgeFilename);
      const publicURL = await storage.getBadgeUrl(badgeFilename);
      if (!publicURL) {
        return;
      }

      console.log(publicURL);
      setBadgeUrl(publicURL);
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const onImagePicked = (filename: string, imageInfo: FormData) => {
    setBadgeFilename(filename);
    setBadgeImageInfo(imageInfo);
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
      color: theme.colors.text,
    },
  });

  const confirmDisabled =
    uploading || badgeReceiver === '' || badgeFilename === '';

  return (
    <View style={styles.container}>
      <View style={styles.verticallySpaced}>
        <ImagePicker onImagePicked={onImagePicked} />
        <Input
          style={styles.input}
          label='Recipient Username'
          value={badgeReceiver || ''}
          onChangeText={(text) => setBadgeReceiver(text)}
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
