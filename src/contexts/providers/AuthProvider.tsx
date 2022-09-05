import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { OnboardedUser, UserModel } from '../../domain/models';
import { Auth, OnboardForm } from '../../screens';
import { AuthContext, useAuth } from '../useAuth';
import { useDatabase } from '../useDatabase';

export const AuthProvider = ({ children }: { children: any }) => {
    // create state values for user data and loading
    const [authUser, setAuthUser] = useState<UserModel | null>(null);
    const [onboarded, setOnboarded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentSession, setCurrentSession] = useState<any>(null);
    const [user, setUser] = useState<OnboardedUser | null>(null);

    const { database } = useDatabase();
    const { auth } = useAuth();

    useEffect(() => {
        try {
            setLoading(true);

            // get session data if there is an active session
            setCurrentSession(auth.session());

            // Get user data
            if (currentSession?.user) {
                setAuthUser(currentSession.user);
                database.getUserById(currentSession.user.id).then((user: OnboardedUser) => {
                    if (user) {
                        setOnboarded(true);
                    }
                    setUser(user);
                });
            }

            // listen for changes to auth
            const listener = auth.onAuthStateChange(async (_event: string, session: any) => {
                try {
                    setLoading(true);
                    setCurrentSession(session);
                    if (!session?.user) {
                        setUser(null);
                        return;
                    }

                    setAuthUser(session.user);
                    const dbuser = await database.getUserById(session.user.id);
                    if (dbuser) {
                        setOnboarded(true);
                    }
                    setUser(dbuser);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            });

            // cleanup the useEffect hook
            return () => {
                listener?.unsubscribe();
            };
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [auth, currentSession?.user, database]);

    const RouteAuth = () => {
        if (!(currentSession && currentSession.user)) {
            return <Auth />;
        }

        return onboarded ? children : <OnboardForm />;
    };

    // create signUp, signIn, signOut functions
    const value = { authUser, user, auth };

    // use a provider to pass down the value
    return loading ? (
        <View>
            <Text>Loading...</Text>
        </View>
    ) : (
        <AuthContext.Provider value={value}>
            <RouteAuth />
        </AuthContext.Provider>
    );
};

export default AuthProvider;
