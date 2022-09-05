import { Manrope_700Bold, useFonts } from "@expo-google-fonts/manrope";
import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDatabase } from "../../contexts/useDatabase";
import { Badge } from "../../domain/models";

export default function Badges({ userId }: {
    userId: string;
}) {

    const [badges, setBadges] = useState<Badge[]>([]);

    const { database } = useDatabase()
    const theme = useTheme()
    const [fontsLoaded] = useFonts({
        Manrope_700Bold,
    });

    useEffect(() => {
        database.getBadgesByUser(userId).then(setBadges)
    }, [])

    const styles = StyleSheet.create({
        header: {
            fontSize: 24,
            color: theme.colors.text,
            fontFamily: 'Manrope_700Bold',
        },
        noBadgesMsg: {
            color: 'grey',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            padding: 16,
        }
    })

    if (!fontsLoaded) {
        return (
            <>
                <Text>Loading...</Text> 
            </>
        )
    }

    const badgeElements = badges.map(badge => (
        <View key={badge.id}>
            <Text>{badge.id}</Text>
            <Text>{badge.badgeUrl}</Text>
            <Text>{badge.senderId}</Text>
        </View>
    ));

    return (
        <View>
            <Text style={styles.header}>Badges</Text>
            {
                (badges.length === 0) 
                ? <View style={styles.noBadgesMsg}><Text style={{ color: 'grey' }}>No Badges Yet</Text></View>
                : badgeElements
            }
        </View>
    );
}

