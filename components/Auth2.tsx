import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { supabase } from '../lib/supabase'
import { Button, Input } from 'react-native-elements'


export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { user, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    })

    console.log(user)

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  return (
      <View style={[styles.container]}>
        <View style={[styles.verticallySpaced, styles.container2, styles.back, styles.mt20]}>
          <Input
            label="Email"
            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={'none'}
          />
        </View>
         <View style={styles.verticallySpaced}>
          <Input
            label="Password"
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize={'none'}
          />
        </View>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
        </View>
        <View style={styles.verticallySpaced}>
          <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()}/>
        </View>
        <View style={styles.back}>
        
        </View>
    </View>
  )
}


const styles = StyleSheet.create({

 

  container: {
    height: 20,
    width: '100%',
    justifyContent: 'center',
    flex:1,
    alignItems: 'center',
    marginTop: '30%',
  },

  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
    display: 'flex',
  },
 
  back: {
      backgroundColor: 'red',
      borderRadius: 350,
  }, 

  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  
  mt20: {
    marginTop: 15,
  },
})

/** 
 * login_container: {
    background-color: rgb(14 165 233),
      height: 100,
      display: grid,
      align-items: center,
      justify-content: center,
  },
  
  login_card: {
  background-color: white,
  width: 300px,
  height: 350px,
  border-radius: 40px,
  display: flex,
  flex-direction: column,
  align-items-center,
},

  sign_in_container: {
  flex: 1,
  display: flex,
  flex-direction: column,
  align-items: center,
  justify-content: center,
},

  sign_in_container > button: {
  padding: 20px,
  border: none,
  border-radius: 40px,
  background-color: rgb(14 165 233),
  color: white,
},

  error: {
  color: red,
  text-align: center,
  font-size: 10px,
  font-style: italic,
  margin: 5px,
}, */