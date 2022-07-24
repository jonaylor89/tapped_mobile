import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import { Auth, Account } from './components'
import { View } from 'react-native'
import { Session } from '@supabase/supabase-js'
import React from 'react'
import { createAppContainer } from "react-navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import {SearchScreen, ProfileScreen } from './screens';
import { NavigationContainer, StackActions } from '@react-navigation/native'
import mintNFT from './components/mintNFT'

// const AppNavigator = createStackNavigator(
//   {
//     Home: Auth,
//     Profile: ProfileScreen,
//     Settings: SearchScreen,
//   },
//   {
//     defaultNavigationOptions: {
//       headerStyle: {
//         backgroundColor: "#006600",
//       },
//       headerTintColor: "#FFF",
//     },
//   }
// );

const Stack = createNativeStackNavigator();

export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <View>
      {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
      <NavigationContainer>
        {/* <Stack.Navigator>

           <Auth/>
           <ProfileScreen name="Home" component={Home} />
        </Stack.Navigator> */}
      </NavigationContainer>
    </View>
  )
}