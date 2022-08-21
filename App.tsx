import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { 
  AuthProvider, 
  DatabaseProvider, 
  StorageProvider,
} from './contexts/providers'
import { CreateBadgeForm, OnboardForm, Profile, RootStack, routes } from './screens'

export default function App() {
  return (
    <>
      <DatabaseProvider>
        <AuthProvider>
          <StorageProvider>
            <NavigationContainer>
              // TODO make a splash screen 
              // The screen will just display a loading icon  
              // but will load all the necessary bits of data 
              // as well as check if a user is onboarded or not
              <RootStack.Navigator initialRouteName={routes.Profile}>
                <RootStack.Screen name={routes.Profile} component={Profile} />
                <RootStack.Screen name={routes.OnboardForm} component={OnboardForm} />
                <RootStack.Screen name={routes.CreateBadgeForm} component={CreateBadgeForm} />
              </RootStack.Navigator>
            </NavigationContainer>
          </StorageProvider>
        </AuthProvider>
      </DatabaseProvider>
    </>
  )
}