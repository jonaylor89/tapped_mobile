import * as React from 'react';
import { StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ProfileScreen from '../../screens/ProfileScreen';
import SearchScreen from '../../screens/SearchScreen';
import BottomTabNavigator from './BottomTabNavigator';

const profileName = 'Profile';
const searchName = 'Search';


const Tab = createBottomTabNavigator();

function MainContainer() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={profileName}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === profileName) {
                            iconName = focused ? 'person' : 'person-outline'
                        } else if (rn === searchName) {
                            iconName = focused ? 'search' : 'search-outline'
                        }

                        return <Ionicons name={iconName} size={size} color={color} />
                    },
                    tabBarActiveTintColor: '#007aff',
                    tabBarInactiveTintColor: '#757575',
                    // tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
                    // tabBarStyle: { padding: 10, height: 70 },
                    tabBarBackground: () => (
                        <BlurView tint='dark' intensity={100} style={ styles.blurred } />
                    ),
                    headerBackground: () => (
                        <BlurView tint='dark' intensity={100} style={ styles.blurred } />
                    ),
                    headerTintColor: '757575',
                    headerTitleStyle: { color: '#007aff' }
                })
            }
            >

                <Tab.Screen name={searchName} component={SearchScreen} />
                <Tab.Screen name={profileName} component={ProfileScreen} options= {{ title: 'Username' }} />

            </Tab.Navigator>

        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    blurred: {
        backgroundColor: '#171717',
        position: 'absolute', 
        left: 0, 
        right: 0, 
        top: 0, 
        bottom: 0,
    }
})

export default MainContainer