import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, Button, View } from "react-native";
import { Input } from "react-native-elements";
import { RootStackParamList, routes } from ".";
import { useAuth } from "../contexts/useAuth";
import { useDatabase } from "../contexts/useDatabase";
import { useStorage } from "../contexts/useStorage";
import { Badge } from "../domain/models";

type Props = NativeStackScreenProps<RootStackParamList, routes.CreateBadgeForm>;

const CreateBadgeForm = ({ navigation }: Props) => {
    const [uploading, setUploading] = useState(false);
    const [badgeReceiver, setBadgeReceiver] = useState('')

    const { user } = useAuth()
    const { database } = useDatabase()
    const { storage } = useStorage()

    const uploadBadgeImage = async () => {
        try {
            setUploading(true)

            if (imageFormData === null || badgeImageFilename === '') {
                return;
            }

            storage.uploadBadge(badgeImageFilename, imageFormData)
            let { error: uploadError } = await supabase.storage.from('badges').upload(badgeImageFilename, imageFormData)
            if (uploadError) {
                throw uploadError
            }

            storage.getBadgeUrl(badgeImageFilename)
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

    const createBadge = async () => {
        // upload image to supabase storage
        await uploadBadgeImage();

        // check if recipient exists
        try {
            const recipient = await database.getUserByUsername(badgeReceiver);
            if (!recipient) {
                throw new Error(`user ${badgeReceiver} does not exist`)
            }

            const recipientId = recipient.id;
            const senderId = user!.id

            // Insert badge into badges table
            const badge: Badge = {
                id: uuidv4(),
                badge_url: badgeUrl,
                receiver_id: recipientId,
                sender_id: senderId,
            }
            database.insertBadge(badge)

        } catch (e) {
            console.log(e)
        }

        // go back to account page
        // TODO redirect to account page
        // setCreateBadgeForm(false);
        navigation.goBack()
    }

    const getBadgeImage = async () => {
        const imageData = await pickImage();
        if (!imageData) {
            return;
        }

        const { filename, imageInfo } = imageData;
        setBadgeImageFilename(filename);
        setImageFormData(imageInfo);
    }

    return (
        <>
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
        </>
    )
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

export default CreateBadgeForm;