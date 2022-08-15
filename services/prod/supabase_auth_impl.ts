
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';
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

    async signUp(data: any) {
        supabase.auth.signUp(data)
    }

    session(): any {
        return supabase.auth.session()
    }

    async signIn(data: any) {
        supabase.auth.signIn(data)
    }

    async signOut() {
        supabase.auth.signOut()
    }
}