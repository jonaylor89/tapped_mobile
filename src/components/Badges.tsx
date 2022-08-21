import React from "react";
import { View, Text } from "react-native";

export default function Badges({ userId }: { 
    userId: string;
}) {
    const badgeElements = badges.map(badge => (
        <View key={badge.id}>
            <Text>{badge.id}</Text>
            <Text>{badge.badge_url}</Text>
            <Text>{badge.sender_id}</Text>
        </View>
    ));
    return (
        <View>
            {badgeElements}
        </View>
    );
}
