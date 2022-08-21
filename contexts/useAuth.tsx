
import type UserModel from '../domain/models/UserModel'

import { useContext, createContext } from 'react';
import SupabaseAuthImpl from '../data/prod/supabase_auth_impl';
import AuthRepository from '../data/auth_repository';

// TODO - Abstract this out a bit more?
const auth = new SupabaseAuthImpl()

// create a context for authentication
export const AuthContext = createContext<{ 
    user: UserModel | null,
    auth: AuthRepository,
}>({ user: null, auth: auth });

// export the useAuth hook
export const useAuth = () => {
    return useContext(AuthContext);
};