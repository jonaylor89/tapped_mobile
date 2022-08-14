import React from "react";
import { View, Text } from "react-native";

export default function Badges({ badges }: { 
    badges: Array<{ id: string; badge_url: string; sender_id: string }>; 
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
