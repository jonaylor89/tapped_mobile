import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useDatabase } from "../../contexts/useDatabase";
import { Badge } from "../../domain/models";

export default function Badges({ userId }: { 
    userId: string;
}) {

    const [badges, setBadges] = useState<Badge[]>([]);

    const { database } = useDatabase()

    useEffect(() => {
        database.getBadgesByUser(userId).then(setBadges)
    }, [])

    const badgeElements = badges.map(badge => (
        <View key={badge.id}>
            <Text>{badge.id}</Text>
            <Text>{badge.badgeUrl}</Text>
            <Text>{badge.senderId}</Text>
        </View>
    ));

    return (
        <View>
            {badgeElements}
        </View>
    );
}
