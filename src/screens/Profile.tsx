import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Text, Button, View, StyleSheet } from 'react-native';
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

import Routes from './routes';
import { BadgesList, Socials } from '../components/profile';
import { AccountType, OnboardedUser } from '../domain/models';
import { useAuth } from '../contexts/useAuth';
import { useDatabase } from '../contexts/useDatabase';
import { Avatar } from '../components';

export const HEADER_HEIGHT = 64 + Constants.statusBarHeight;

type Props = NativeStackScreenProps<RootStackParamList, Routes.Profile>;

function Profile({ navigation, route }: Props) {
  const userId = route.params?.userId || null;
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<OnboardedUser | null>(null);
  const { user: currentUser } = useAuth();
  const { database } = useDatabase();
  const theme = useTheme();
  const [fontsLoaded] = useFonts({
    Manrope_700Bold,
  });
  const scrollOffset = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollOffset.value = event.contentOffset.y;
  });
  useEffect(() => {
    setLoading(true);
    try {
      // is the user the currentUser?
      if (currentUser && (!userId || currentUser.id === userId)) {
        setUser(currentUser);
        return;
      }

      if (!userId) {
        console.error('no userid param');
        return;
      }
      database
        .getUserById(userId)
        .then((fetchedUser) => {
          console.log('FETCHED USER', fetchedUser);
          setUser(fetchedUser);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [userId, currentUser, database]);

  const styles = StyleSheet.create({
    container: {
      marginRight: 10,
      marginLeft: 10,
      height: '100%',
    },
    usernameHeader: {
      fontSize: 48,
      paddingVertical: 6,
      // Note the quoting of the value for `fontFamily` here; it expects a string!
      fontFamily: 'Manrope_700Bold',
      color: theme.colors.text,
    },
    text: {
      color: theme.colors.text,
    },
    bioHeader: {
      color: theme.colors.text,
      fontFamily: 'Manrope_700Bold',
      fontSize: 24,
    },
    title: {
      color: theme.colors.text,
      fontSize: 18,
      textAlign: 'center',
      fontWeight: '600',
      marginLeft: 14,
      marginTop: 6,
    },
  });

  const animatedHeaderStyles = useAnimatedStyle(() => {
    const headerOpacity = interpolate(
      scrollOffset.value,
      [0, HEADER_HEIGHT],
      [0, 1],
      Extrapolate.CLAMP,
    );

    return {
      opacity: headerOpacity,
    };
  });

  const animatedUsernameStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollOffset.value,
      [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT / 2],
      [0, 1, 0],
      Extrapolate.CLAMP,
    );

    return { opacity };
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: theme.colors.background,
      },
      headerRight: () => (
        <Avatar
          url={user?.avatarUrl}
          size={38}
          editable={false}
          rounded
          margin={5}
        />
      ),
      headerTitle: () => (
        <Animated.Text style={[styles.title, animatedHeaderStyles]}>
          {user?.name || ''}
        </Animated.Text>
      ),
    });
  }, [navigation, user]);

  if (loading || !user || !fontsLoaded) {
    return <Text>{`Loading... ${loading} and ${JSON.stringify(user)}`}</Text>;
  }

  return (
    <View style={styles.container}>
      <Animated.ScrollView onScroll={scrollHandler} scrollEventThrottle={6}>
        {/* TODO add an edit profile button and screen */}
        <Animated.Text style={[styles.usernameHeader, animatedUsernameStyles]}>
          {user.name}
        </Animated.Text>
        <Socials user={user} />
        <View style={{ marginBottom: 8, marginTop: 8 }}>
          <Text style={styles.bioHeader}>More Info</Text>
          <Text style={styles.text}>{user.bio}</Text>
        </View>
        {user.accountType === AccountType.Business ? (
          <Button
            title='Create a new badge'
            onPress={() => navigation.push(Routes.CreateBadgeForm)}
          />
        ) : null}
        <BadgesList userId={user.id} />
      </Animated.ScrollView>
    </View>
  );
}

export default Profile;
