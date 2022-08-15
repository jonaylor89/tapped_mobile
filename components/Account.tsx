import { useState } from "react";
import { StyleSheet, View, Alert, Text, Linking, TouchableOpacity, Platform, Image } from "react-native";
import { Button, Input } from "react-native-elements";
import React from "react";
import { v4 as uuidv4 } from 'uuid';

import Avatar from "./Avatar";
import Badges from "./Badges";
import { pickImage } from "../lib/utils";
import { useAuth } from "../contexts/useAuth";

export default function Account() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [account_type, setAccountType] = useState("");

  const [onboarded, setOnboarded] = useState(false);
  const [createBadgeForm, setCreateBadgeForm] = useState(false);

  const [badgeReceiver, setBadgeReceiver] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imageFormData, setImageFormData] = useState<FormData | null>(null);
  const [badgeUrl, setBadgeUrl] = useState('')
  const [badgeImageFilename, setBadgeImageFilename] = useState('')

  const [usersBadges, setUsersBadges] = useState<Array<{ id: string; badge_url: string; sender_id: string }>>([]);

  const { user } = useAuth()

  async function updateProfile({
    name,
    username,
    website,
    avatar_url,
    account_type,
  }: {
    name: string,
    username: string;
    website: string;
    avatar_url: string;
    account_type: string;
  }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      if (!user) throw new Error("No user on the session!");

      const updates = {
        id: user.id,
        username,
        name,
        website,
        avatar_url,
        account_type,
        updated_at: new Date(),
      };

      let { error } = await supabase
        .from("users")
        .upsert(updates, { returning: "minimal" });

      if (error) {
        throw error;
      }

      setOnboarded(true)
    } catch (error) {
      Alert.alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function updateUserAvatar(avatar_url: string) {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      if (!user) throw new Error("No user on the session!");

      const updates = {
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase
        .from("users")
        .update(updates, { returning: "minimal" })
        .match({ id: user.id });

      if (error) {
        throw error;
      }

      setAvatarUrl(avatar_url);
    } catch (error) {
      Alert.alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  const createBadge = async () => {
    // upload image to supabase storage
    await uploadBadgeImage();

    // check if recipient exists
    try {
      const { data, error, status } = await supabase
        .from('users')
        .select('id')
        .match({ username: badgeReceiver })
        .single()

      if (error && status !== 406) {
        throw error;
      }

      if (!data) {
        throw new Error(`user ${badgeReceiver} does not exist`)
      }

      const recipientId = data.id;
      const senderId = supabase.auth.user()!.id;

      // Insert badge into badges table
      const { error: insertError } = await supabase
        .from('badges')
        .insert([{
          id: uuidv4(),
          badge_url: badgeUrl,
          receiver_id: recipientId,
          sender_id: senderId,
        }])

      if (insertError) {
        console.log(insertError)
      }

    } catch (e) {
      console.log(e)
    }

    // go back to account page
    setCreateBadgeForm(false);
  }

  async function uploadBadgeImage() {
    try {
      setUploading(true)

      if (imageFormData === null || badgeImageFilename === '') {
        return;
      }

      let { error: uploadError } = await supabase.storage.from('badges').upload(badgeImageFilename, imageFormData)
      if (uploadError) {
        throw uploadError
      }

      let { publicURL, error } = await supabase.storage.from('badges').getPublicUrl(badgeImageFilename);
      if (error) {
        throw error
      }
      if (!publicURL) {
        return;
      }

      setBadgeUrl(publicURL);
      console.log(publicURL);
    } catch (error) {
      alert((error as Error).message)
    } finally {
      setUploading(false)
    }
  }

  const Profile = () => {
    return (
      <View>
        <Avatar url={avatarUrl} size={4096} onUpload={(imageUrl: string) => { updateUserAvatar(imageUrl) }} />
        <h1>{username}</h1>
        <Text>Name: {name}</Text>
        <Text>Bio: {bio}</Text>
        <Text>Website: </Text>
        <TouchableOpacity onPress={() => Linking.openURL(website)}>
          <Text style={{ color: 'blue' }}>{website}</Text>
        </TouchableOpacity>
        {(account_type === 'business') ? <Button title='Create a new badge' onPress={() => setCreateBadgeForm(true)} /> : null}
        <Badges badges={usersBadges} />
      </View>
    );
  }

  const getBadgeImage = async () => {
    const imageData = await pickImage();
    if (!imageData) {
      return;
    }

    const {filename, imageInfo} = imageData;
    setBadgeImageFilename(filename);
    setImageFormData(imageInfo);
  }

  return (
    <View>
      {
        (onboarded)
          ? <View style={styles.container}>
            {
              (createBadgeForm)
                ? <View>
                  <h1>Send Badge Form</h1>

                  <View style={styles.verticallySpaced}>
                    {imageFormData !== null ? (
                      // <Image source={{ uri: badgeUrl }} style={{ width: 200, height: 200 }} />
                      <View />
                    ) : (
                      <View>
                        <Button title="Pick an image from camera roll" onPress={getBadgeImage} disabled={uploading} />
                      </View>
                    )}
                    <Input
                      label="Recipient username"
                      value={badgeReceiver || ""}
                      onChangeText={(text) => setBadgeReceiver(text)}
                    />
                  </View>

                  <Button title='Confirm' onPress={() => createBadge()} disabled={uploading} />
                </View>
                : <Profile />
            }
          </View>
          : <View>
            <View style={[styles.verticallySpaced, styles.mt20]}>
              <Input label="Email" value={session?.user?.email} disabled />
            </View>
            <View style={styles.verticallySpaced}>
              <Input
                label="Name"
                value={name || ""}
                onChangeText={(text) => setName(text)}
              />
            </View>
            <View style={styles.verticallySpaced}>
              <Input
                label="Username"
                value={username || ""}
                onChangeText={(text) => setUsername(text)}
              />
            </View>
            <View style={styles.verticallySpaced}>
              <Input
                label="Bio"
                value={bio || ""}
                onChangeText={(text) => setBio(text)}
              />
            </View>
            <View style={styles.verticallySpaced}>
              <Input
                label="Website"
                value={website || ""}
                onChangeText={(text) => setWebsite(text)}
              />
            </View>
            <View style={styles.verticallySpaced}>
              <Input
                label="Account Type"
                value={account_type || ""}
                onChangeText={(text) => setAccountType(text)}
              />
            </View>

            <View style={[styles.verticallySpaced, styles.mt20]}>
              <Button
                title={loading ? "Loading ..." : "Complete Sign Up"}
                onPress={() => updateProfile({ name, username, website, avatar_url: avatarUrl, account_type })}
                disabled={loading}
              />
            </View>

            <View style={styles.verticallySpaced}>
              <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
            </View>
          </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});