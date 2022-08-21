import React from "react";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { UserModel } from "../../domain/models";
import { Auth } from "../../screens";
import { AuthContext, useAuth } from "../useAuth";
import { useDatabase } from "../useDatabase";

export const AuthProvider = ({ children }: {
    children: any,
}) => {

    // create state values for user data and loading
    const [user, setUser] = useState<UserModel | null>(null);
    const [loading, setLoading] = useState(false);
    const [session, setSession] = useState<any>(null)

    const { database } = useDatabase()
    const { auth } = useAuth()

    useEffect(() => {
        // get session data if there is an active session
        setSession(auth.session())

        setUser(session?.user ?? null);

        // listen for changes to auth
        const listener =
            auth.onAuthStateChange(
                async (_event: string, session: any) => {
                    try {
                        setLoading(true);
                        setSession(session)
                        const user = await database.getUserById(session?.user?.id || null)
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
    const value = { user, auth }

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

export default AuthProvider