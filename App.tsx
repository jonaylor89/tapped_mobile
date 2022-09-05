import 'react-native-url-polyfill/auto';

import React from 'react'
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import {
  AuthProvider,
  DatabaseProvider,
  ImagePickerProvider,
  StorageProvider,
} from './src/contexts/providers'
import {
  CreateBadgeForm,
  OnboardForm,
  Profile,
  RootStack,
  routes,
} from './src/screens'


export default function App() {
  return (
    <>
      <DatabaseProvider>
        <AuthProvider>
          <StorageProvider>
            <ImagePickerProvider>
              <NavigationContainer theme={DarkTheme}>
                {/* 
                TODO make a splash screen 
                The screen will just display a loading icon  
                but will load all the necessary bits of data 
                as well as check if a user is onboarded or not
              */}
                <RootStack.Navigator initialRouteName={routes.Profile}>
                  <RootStack.Screen name={routes.Profile} component={Profile} />
                  <RootStack.Screen name={routes.OnboardForm} component={OnboardForm} />
                  <RootStack.Screen name={routes.CreateBadgeForm} component={CreateBadgeForm} />
                </RootStack.Navigator>
              </NavigationContainer>
            </ImagePickerProvider>
          </StorageProvider>
        </AuthProvider>
      </DatabaseProvider>
    </>
  )
}

