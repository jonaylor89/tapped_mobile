import React, { useState } from 'react';
import { Button, View, StyleSheet, Alert } from 'react-native';
import { Input } from 'react-native-elements';
import { useAuth } from '../contexts/useAuth';
import { useDatabase } from '../contexts/useDatabase';
import { useImagePicker } from '../contexts/useImagePicker';
import { useStorage } from '../contexts/useStorage';
import { AccountType } from '../domain/models';

const OnboardForm = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');

    const [avatarUrl, setAvatarUrl] = useState('');

    const [loading, setLoading] = useState(false);

    const { authUser } = useAuth();
    const { database } = useDatabase();
    const { storage } = useStorage();
    const { imagePicker } = useImagePicker();

    const uploadProfilePicture = async () => {
        try {
            // pick image
            const { filename, imageInfo, cancelled } = await imagePicker.pickImage();

            if (cancelled || !filename || !imageInfo) {
                return;
            }

            // upload image
            await storage.uploadPFP(filename, imageInfo);

            // get image url
            const pfpUrl = await storage.getPFPUrl(filename);
            if (!pfpUrl) {
                throw new Error('Could not get image url');
            }

            setAvatarUrl(pfpUrl);
        } catch (e) {
            console.error(e);
        }
    };

    const updateProfile = async () => {
        try {
            setLoading(true);
            if (!authUser) throw new Error('No user on the session!');

            database.upsertUser({
                id: authUser.id,
                username,
                name,
                bio,
                website: null,
                twitterHandle: null,
                instagramHandle: null,
                tiktokHandle: null,
                soundcloudHandle: null,
                spotifyHandle: null,
                avatarUrl,
                accountType: AccountType.Basic,
                updatedAt: new Date(),
                createdAt: new Date(),
            });
        } catch (error) {
            Alert.alert((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const canSubmit = () => {
        return name !== '' && username !== '' && bio !== '' && avatarUrl !== '';
    };

    // TODO multi-stage onboarding
    // https://dribbble.com/shots/18053925-Friendzy-Interest-and-Profile-Set-Up
    return (
        <View>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Input label='Email' value={authUser?.email} disabled />
            </View>
            <View style={styles.verticallySpaced}>
                <Input label='Name' value={name || ''} onChangeText={(text) => setName(text)} />
            </View>
            <View style={styles.verticallySpaced}>
                <Input
                    label='Username'
                    value={username || ''}
                    onChangeText={(text) => setUsername(text)}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <Input label='Bio' value={bio || ''} onChangeText={(text) => setBio(text)} />
            </View>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                {
                    // TODO Display the profile picture if one is already uploaded
                    // and use some kind of overlay to allow the user to upload a new one
                    // https://dribbble.com/shots/15145502-Login-And-Sign-up-Screens
                }
                {avatarUrl ? (
                    <View />
                ) : (
                    <Button
                        title={'Upload Profile Picture'}
                        onPress={() => uploadProfilePicture()}
                        disabled={loading}
                    />
                )}
            </View>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Button
                    title={loading ? 'Loading ...' : 'Complete Sign Up'}
                    onPress={() => updateProfile()}
                    disabled={loading || !canSubmit()}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
});

export default OnboardForm;
