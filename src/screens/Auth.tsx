import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useAuth } from '../contexts/useAuth';
import { Button, Input } from 'react-native-elements';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { auth } = useAuth();

    const signInWithEmail = async () => {
        setLoading(true);
        try {
            await auth.signIn({
                email: email,
                password: password,
            });
        } catch (e) {
            Alert.alert((e as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const signUpWithEmail = async () => {
        setLoading(true);
        try {
            await auth.signUp({
                email: email,
                password: password,
            });
        } catch (e) {
            Alert.alert((e as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Input
                    label='Email'
                    leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder='email@address.com'
                    autoCapitalize={'none'}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <Input
                    label='Password'
                    leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    placeholder='Password'
                    autoCapitalize={'none'}
                />
            </View>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Button title='Sign in' disabled={loading} onPress={() => signInWithEmail()} />
            </View>
            <View style={styles.verticallySpaced}>
                <Button title='Sign up' disabled={loading} onPress={() => signUpWithEmail()} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
});

export default Auth;
