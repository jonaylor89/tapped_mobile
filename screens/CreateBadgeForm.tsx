import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, Button, View } from "react-native";
import { Input } from "react-native-elements";
import { v4 as uuidv4 } from 'uuid';
import { RootStackParamList, routes } from ".";
import { useAuth } from "../contexts/useAuth";
import { useDatabase } from "../contexts/useDatabase";
import { useStorage } from "../contexts/useStorage";
import { Badge } from "../domain/models";
import { pickImage } from "../lib/utils";

type Props = NativeStackScreenProps<RootStackParamList, routes.CreateBadgeForm>;

const CreateBadgeForm = ({ navigation }: Props) => {
    const [uploading, setUploading] = useState(false);
    const [badgeReceiver, setBadgeReceiver] = useState('')
    const [badgeUrl, setBadgeUrl] = useState('')
    const [badgeImageInfo, setBadgeImageInfo] = useState<FormData | null>(null)
    const [badgeFilename, setBadgeFilename] = useState('')

    const { user } = useAuth()
    const { database } = useDatabase()
    const { storage } = useStorage()

    const uploadBadgeImage = async () => {
        try {
            setUploading(true)
            storage.uploadBadge(badgeFilename, badgeImageInfo)

            storage.getBadgeUrl(badgeFilename)
            const publicURL = await storage.getBadgeUrl(badgeFilename);
            if (!publicURL) {
                return;
            }

            console.log(publicURL);
            setBadgeUrl(publicURL);
        } catch (error) {
            alert((error as Error).message)
        } finally {
            setUploading(false)
        }
    }

    const createBadge = async () => {
        // check if recipient exists
        try {
            const recipient = await database.getUserByUsername(badgeReceiver);
            if (!recipient) {
                throw new Error(`user ${badgeReceiver} does not exist`)
            }

            // upload image to supabase storage
            await uploadBadgeImage();

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

    const pickBadgeImage = async () => {
        const { imageInfo, filename: badgeImageFilename, cancelled } = await pickImage()
        if (cancelled) return

        if (!imageInfo || !badgeImageFilename) {
            return;
        }

        setBadgeImageInfo(imageInfo)
        setBadgeFilename(badgeImageFilename)
    }


    // TODO design a better image picker component
    return (
        <>
            <h1>Send Badge Form</h1>
            <View style={styles.verticallySpaced}>
                {badgeUrl !== ''
                    ? (
                        // <Image source={{ uri: badgeUrl }} style={{ width: 200, height: 200 }} /> 
                        <View />
                    )
                    : (
                        <View>
                            <Button title="Pick an image from camera roll" onPress={pickBadgeImage} disabled={uploading} />
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