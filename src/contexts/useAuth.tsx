
import type OnboardedUser from '../domain/models/OnboardedUser'

import { useContext, createContext } from 'react';
import SupabaseAuthImpl from '../data/prod/supabase_auth_impl';
import AuthRepository from '../data/auth_repository';

// TODO - Abstract this out a bit more?
const auth = new SupabaseAuthImpl()

// create a context for authentication
export const AuthContext = createContext<{ 
    user: OnboardedUser | null,
    auth: AuthRepository,
}>({ user: null, auth: auth });

// export the useAuth hook
export const useAuth = () => {
    return useContext(AuthContext);
};