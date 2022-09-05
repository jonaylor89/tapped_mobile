
import React from 'react';
import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'
import { OnboardedUser } from '../../domain/models';

const socials =  {
    twitter: {
        name: 'twitter',
        url: 'https://twitter.com/'
    },
    instagram: {
        name: 'instagram',
        url: 'https://instagram.com/'
    },
    tiktok: {
        name: 'tiktok',
        url: 'https://tiktok.com/@'
    },
    soundcloud: {
        name: 'soundcloud',
        url: '',
    },
    spotify: {
        name: 'spotify',
        url: '',
    }
}

const Social = ({ type, handle }: {
    type: { name: string, url: string },
    handle?: string | null
}) => {

    if (!handle) {
        return null
    }

    const link = type.url + handle
    return (
        <TouchableOpacity onPress={() => Linking.openURL(link)}>
            <FontAwesome5 name={type.name} style={styles.icon} />
        </TouchableOpacity>
    );
}

const Socials = ({ user }: {
    user: OnboardedUser | null
}) => {
    return (
        <View style={styles.container}>
            <Social type={socials.twitter} handle={user?.twitterHandle} />
            <Social type={socials.instagram} handle={user?.instagramHandle} />
            <Social type={socials.tiktok} handle={user?.tiktokHandle} />
            <Social type={socials.soundcloud} handle={user?.soundcloudHandle} />
            <Social type={socials.spotify} handle={user?.spotifyHandle} />
            {user?.soundcloudHandle ? <FontAwesome5 name={'soundcloud'} style={styles.icon} /> : null}
            {user?.spotifyHandle ? <FontAwesome5 name={'spotify'} style={styles.icon} /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 6,
        marginBottom: 12,
    },
    icon: {
        fontSize: 24,
        color: 'white',
        paddingRight: 16,
    }
})

export default Socials;