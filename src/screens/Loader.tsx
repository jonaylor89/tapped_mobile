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
import type { RootStackParamList } from '.';
import { useStorage } from '../contexts/useStorage';

import Routes from './routes';
import { BadgesList, Socials, AccountTypeBadge } from '../components/profile';
import { AccountType, OnboardedUser } from '../domain/models';
import { useAuth } from '../contexts/useAuth';
import { useDatabase } from '../contexts/useDatabase';
import { Avatar } from '../components';

function Loader(props) {
    const state = {
        isLoading: props.isLoading,
    };

    const styles = StyleSheet.create({
        container: {
            marginTop: 40,
            padding: 12,
            marginLeft: 12,
            marginRight: 12,
        },
        verticallySpaced: {
            paddingTop: 4,
            paddingBottom: 4,
            alignSelf: 'stretch',
        },
        mt20: {
            marginTop: 20,
        },
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
        <View style={styles.container}>
            <View style={styles.verticallySpaced}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator animating={state.isLoading} color='black' size={'large'} />
                </View>
            </View>
        </View>
    );
}

export default Loader;
