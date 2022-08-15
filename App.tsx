import React from 'react'
import 'react-native-url-polyfill/auto'
import { Account } from './components'
import { View } from 'react-native'
import { AuthProvider } from './contexts/useAuth'
import { DatabaseProvider } from './contexts/useDatabase'

export default function App() {
  return (
    <View>
      <DatabaseProvider>
        <AuthProvider>
          <Account />
        </AuthProvider>
      </DatabaseProvider>
    </View>
  )
}