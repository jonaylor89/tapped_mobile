import React from "react";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { OnboardedUser } from "../../domain/models";
import { Auth, OnboardForm } from "../../screens";
import { AuthContext, useAuth } from "../useAuth";
import { useDatabase } from "../useDatabase";

export const AuthProvider = ({ children }: {
    children: any,
}) => {

    // create state values for user data and loading
    const [user, setUser] = useState<OnboardedUser | null>(null);
    const [onboarded, setOnboarded] = useState(false)
    const [loading, setLoading] = useState(false);
    const [session, setSession] = useState<any>(null)

    const { database } = useDatabase()
    const { auth } = useAuth()

    useEffect(() => {
        try {
            setLoading(true);

            // get session data if there is an active session
            setSession(auth.session())

            // Get user data
            database.getUserById(session?.user?.id || null)
                .then(user => {
                    if (user) { setOnboarded(true) }
                    setUser(session?.user ?? null);
                })

            // listen for changes to auth
            const listener =
                auth.onAuthStateChange(
                    async (_event: string, session: any) => {
                        try {
                            setLoading(true);
                            setSession(session)
                            const user = await database.getUserById(session?.user?.id || null)
                            if (user) { setOnboarded(true) }
                            setUser(user);
                        } catch (error) {
                            console.error(error)
                        } finally {
                            setLoading(false);
                        }
                    }
                );

            // cleanup the useEffect hook
            return () => {
                listener?.unsubscribe();
            };
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false);
        }
    }, []);

    const RouteAuth = () => {
        if (!(session && session.user) || user === null) {
            return <Auth />
        }

        return onboarded
            ? { children }
            : <OnboardForm />
    }
    // create signUp, signIn, signOut functions
    const value = { user, auth }

    // use a provider to pass down the value
    return (loading)
        ? <View>Loading...</View>
        : <AuthContext.Provider value={value}>
            <RouteAuth />
        </AuthContext.Provider>
};

export default AuthProvider