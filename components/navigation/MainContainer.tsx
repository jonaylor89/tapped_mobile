import * as React from 'react';

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
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === profileName) {
                        iconName = focused ? 'person' : 'person-outline'
                    } else if (rn === searchName) {
                        iconName = focused ? 'search' : 'search-outline'
                    }

                    return <Ionicons name={iconName} size={size} color={color}/>
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTineColor: 'grey',
                labelStyle: { paddingBottom: 10, fontSize: 10},
                style: {padding: 10, height: 70}
            }}
            >

            <Tab.Screen name={searchName} component={SearchScreen}/>
            <Tab.Screen name={profileName} component={ProfileScreen}/>

        </Tab.Navigator>

        </NavigationContainer>
    );
}

export default MainContainer