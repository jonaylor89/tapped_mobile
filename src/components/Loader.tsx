import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { Component, Props, useEffect, useLayoutEffect, useState } from 'react';
import { Text, Button, View, StyleSheet, ActivityIndicator } from 'react-native';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';
import Constants from 'expo-constants';
import { useFonts, Manrope_700Bold } from '@expo-google-fonts/manrope';
import { useTheme } from '@react-navigation/native';
import type { RootStackParamList } from '../screens';
import { useStorage } from '../contexts/useStorage';

import Routes from '../screens/routes';
import { BadgesList, Socials, AccountTypeBadge } from './profile';
import { AccountType, OnboardedUser } from '../domain/models';
import { useAuth } from '../contexts/useAuth';
import { useDatabase } from '../contexts/useDatabase';
import { Avatar } from '.';

export default function Loader(props) {
    const state = {
        isLoading: props.isLoading,
    };

    const styles = StyleSheet.create({
        modalBackground: {
            flex: 1,
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'space-around',
            backgroundColor: '#rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
        },
        activityIndicatorWrapper: {
            backgroundColor: '#FFFFFF',
            height: 100,
            width: 100,
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
        },
    });

    return (
        <View>
            <View style={styles.activityIndicatorWrapper}>
                <ActivityIndicator animating={state.isLoading} color='black' size={'large'} />
            </View>
        </View>
    );
}
