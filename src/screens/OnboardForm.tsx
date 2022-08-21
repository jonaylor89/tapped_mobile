import React, { useState } from "react";
import { Button, View, StyleSheet, Alert } from "react-native";
import { Input } from "react-native-elements";
import { useAuth } from "../contexts/useAuth";
import { useDatabase } from "../contexts/useDatabase";
import { useStorage } from "../contexts/useStorage";
import { AccountType } from "../domain/models";

const OnboardForm = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [website, setWebsite] = useState("");
    const [twitterHandle, setTwitterHandle] = useState("");
    const [instagramHandle, setInstagramHandle] = useState("");
    const [tiktokHandle, setTiktokHandle] = useState("");
    const [soundcloudHandle, setSoundcloudHandle] = useState("");
    const [spotifyHandle, setSpotifyHandle] = useState("");

    const [avatarUrl, setAvatarUrl] = useState("");

    const [loading, setLoading] = useState(false);

    const { user } = useAuth()
    const { database } = useDatabase()
    const { storage } = useStorage()

    const uploadProfilePicture = async () => {
        // TODO implement this
        setAvatarUrl('')
    }

    const updateProfile = async () => {
        try {
            setLoading(true);
            if (!user) throw new Error("No user on the session!");

            database.upsertUser({
                id: user.id,
                email: user.email,
                username,
                name,
                bio,
                website,
                twitterHandle,
                instagramHandle,
                tiktokHandle,
                soundcloudHandle,
                spotifyHandle,
                avatarUrl,
                onboarded: true,
                accountType: AccountType.Basic,
                updatedAt: new Date(),
                createdAt: new Date(),
            });
        } catch (error) {
            Alert.alert((error as Error).message);
        } finally {
            setLoading(false);
        }
    }

    // TODO multi-stage onboarding
    // https://dribbble.com/shots/18053925-Friendzy-Interest-and-Profile-Set-Up
    return (
        <View>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Input label="Email" value={user?.email || ''} disabled />
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
                    label="Twitter"
                    value={twitterHandle || ""}
                    onChangeText={(text) => setTwitterHandle(text)}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <Input
                    label="Instagram"
                    value={instagramHandle || ""}
                    onChangeText={(text) => setInstagramHandle(text)}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <Input
                    label="TikTok"
                    value={tiktokHandle || ""}
                    onChangeText={(text) => setTiktokHandle(text)}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <Input
                    label="Soundcloud"
                    value={soundcloudHandle || ""}
                    onChangeText={(text) => setSoundcloudHandle(text)}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <Input
                    label="Spotify"
                    value={spotifyHandle || ""}
                    onChangeText={(text) => setSpotifyHandle(text)}
                />
            </View>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                // TODO Display the profile picture if one is already uploaded
                // and use some kind of overlay to allow the user to upload a new one
                // https://dribbble.com/shots/15145502-Login-And-Sign-up-Screens
                <Button
                    title={'Upload Profile Picture'}
                    onPress={() => uploadProfilePicture()}
                    disabled={loading}
                />
            </View>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Button
                    title={loading ? "Loading ..." : "Complete Sign Up"}
                    onPress={() => updateProfile()}
                    disabled={loading}
                />
            </View>
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

export default OnboardForm;