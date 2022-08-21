
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from ".";

import React, { useEffect, useState } from "react";
import { View, Text, Linking, TouchableOpacity, Button } from "react-native";
import { useAuth } from "../contexts/useAuth";
import Avatar from "../components/Avatar";
import Badges from "../components/Badges";
import { AccountType, OnboardedUser } from "../domain/models";
import { routes } from ".";
import { useDatabase } from "../contexts/useDatabase";

type Props = NativeStackScreenProps<RootStackParamList, routes.Profile>;

const Profile = ({ navigation, route }: Props) => {
    const userId = route.params?.userId || null

    const [loading, setLoading] = useState(false)
    const [currentUser, setCurrentUser] = useState<OnboardedUser | null>(null)

    const { user } = useAuth()
    const { database } = useDatabase()

    useEffect(() => {
        setLoading(true)
        try {
            if (user && (!userId || user.id === userId)) {
                setCurrentUser(user)
                return
            }
            if (!userId) {
                console.error("no user param")
                return
            }
            database.getUserById(userId)
                .then(fetchedUser => {
                    setCurrentUser(fetchedUser)
                })
                .catch(error => {
                    console.log(error)
                })
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }, [])

    return (
        (loading || !currentUser) 
        ? <View>{`Loading... ${loading} and ${JSON.stringify(currentUser)}`}</View> 
        : <>
            { /* TODO add an edit profile button and screen */}
            <Avatar url={user?.avatarUrl || ''} size={4096} editable={false} />
            <h1>{user?.username}</h1>
            <Text>Name: {user?.name}</Text>
            <Text>Bio: {user?.bio}</Text>
            <Text>Website: </Text>
            <TouchableOpacity onPress={() => Linking.openURL(user?.website || '')}>
                <Text style={{ color: 'blue' }}>{user?.website}</Text>
            </TouchableOpacity>
            {(user?.accountType === AccountType.Business)
                ? <Button title='Create a new badge' onPress={() => navigation.push(routes.CreateBadgeForm)} />
                : null
            }
            <Badges userId={currentUser.id} />
        </>
    );
}

export default Profile;