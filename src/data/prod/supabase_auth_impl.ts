import { Session } from '@supabase/supabase-js';
import { supabase } from './supabase';
import AuthRepository from '../auth_repository';

export default class SupabaseAuthImpl implements AuthRepository {
    onAuthStateChange(callback: (event: string, session: Session | null) => Promise<void>): any {
        const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) =>
            callback(event, session),
        );

        return listener;
    }

    async updateUser(data: { onboarded: boolean }) {
        await supabase.auth.update({ data: data });
    }

    async signUp(data: { email: string; password: string }) {
        await supabase.auth.signUp(data);
    }

    session(): any {
        return supabase.auth.session();
    }

    async signIn(data: { email: string; password: string }) {
        await supabase.auth.signIn(data);
    }

    async signOut() {
        await supabase.auth.signOut();
    }
}
