
import type UserModel from '../models/UserModel'

import React, { useContext, useState, useEffect, createContext } from 'react';
import { useDatabase } from './useDatabase';
import { Account, Auth } from '../components';
import { View } from 'react-native';
import SupabaseAuthImpl from '../services/prod/supabase_auth_impl';

// TODO - Abstract this out a bit more?
const auth = new SupabaseAuthImpl()

// create a context for authentication
const AuthContext = createContext<{ user: UserModel | null }>({ user: null });

export const AuthProvider = ({ children }: {
    children: any,
}) => {

    // create state values for user data and loading
    const [user, setUser] = useState<UserModel | null>(null);
    const [loading, setLoading] = useState(false);
    const [session, setSession] = useState<any>(null)

    const database = useDatabase()

    useEffect(() => {
        // get session data if there is an active session
        setSession(auth.session())

        setUser(session?.user ?? null);

        // listen for changes to auth
        const { data: listener } =
            auth.onAuthStateChange(
                async (_event: string, session: any) => {
                    try {
                        setLoading(true);
                        setSession(session)
                        const user = await database.getUserData(session?.user || null)
                        setUser(user);
                    } catch (error) {
                    } finally {
                        setLoading(false);
                    }
                }
            );

        // cleanup the useEffect hook
        return () => {
            listener?.unsubscribe();
        };
    }, []);

    // create signUp, signIn, signOut functions
    const value = { user }

    // use a provider to pass down the value
    return (loading)
        ? <View>Loading...</View>
        : <AuthContext.Provider value={value}>
            {(session && session.user)
                ? { children }
                : <Auth />
            }
        </AuthContext.Provider>
};

// export the useAuth hook
export const useAuth = () => {
    return useContext(AuthContext);
};