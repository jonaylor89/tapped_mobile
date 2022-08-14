import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import { Auth, Account } from './components'
import { View } from 'react-native'
import { Session } from '@supabase/supabase-js'
import React from 'react'

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
      { (session && session.user) 
        ? <Account key={session.user.id} session={session} />
        : <Auth />
      }
    </View>
  )
}