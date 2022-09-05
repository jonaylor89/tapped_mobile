import type OnboardedUser from '../domain/models/OnboardedUser';

import { useContext, createContext } from 'react';
import SupabaseAuthImpl from '../data/prod/supabase_auth_impl';
import AuthRepository from '../data/auth_repository';
import { UserModel } from '../domain/models';

// TODO - Abstract this out a bit more?
const auth = new SupabaseAuthImpl();

// create a context for authentication
export const AuthContext = createContext<{
    authUser: UserModel | null;
    user: OnboardedUser | null;
    auth: AuthRepository;
}>({ authUser: null, user: null, auth: auth });

// export the useAuth hook
export const useAuth = () => {
    return useContext(AuthContext);
};
