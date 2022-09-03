
import { Session } from '@supabase/supabase-js';
import { supabase } from './supabase';
import AuthRepository from '../auth_repository';

export default class SupabaseAuthImpl implements AuthRepository {

    onAuthStateChange(
        callback: (event: string, session: Session | null) => Promise<void>
    ): any {
        const { data: listener } = supabase.auth.onAuthStateChange(
            async (event, session) => callback(event, session)
        );

        return listener
    }

    async signUp(data: { email: string, password: string }) {
        supabase.auth.signUp(data)
    }

    session(): any {
        return supabase.auth.session()
    }

    async signIn(data: { email: string, password: string }) {
        supabase.auth.signIn(data)
    }

    async signOut() {
        supabase.auth.signOut()
    }
}