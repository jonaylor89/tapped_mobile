
import UserModel from '../../domain/models/UserModel';
import DatabaseRepository from '../database_repository';

import { supabase } from '../../lib/supabase';
import { Badge } from '../../domain/models';


export default class SupabaseDatabaseImpl implements DatabaseRepository {

    async getUserById(id: string): Promise<UserModel | null> {
        try {
            let { data, error, status } = await supabase
                .from("users")
                .select(`name, username, bio, website, avatar_url, account_type, onboarded, updated_at`)
                .eq("id", id)
                .single();
            if (error && status !== 406) {
                throw error;
            }

            if (!data) {
                return UserModel.uninitializedUser(id)
            }

            // TODO validate data
            return UserModel.fromJSON(data)
        } catch (error) {
            // TODO add better log mechanism
            console.log(error)
            return null
        }
    }

    async upsertUser(user: UserModel) {

        const dbUser = UserModel.toJSON(user);

        let { error } = await supabase
            .from("users")
            .upsert(dbUser, { returning: "minimal" });

        if (error) {
            throw error;
        }
    }

    async updateUser(user: UserModel) {
        const dbUser = UserModel.toJSON(user);
        let { error } = await supabase
            .from("users")
            .update(dbUser, { returning: "minimal" })
            .match({ id: user.id });

        if (error) {
            throw error;
        }
    }

    async insertBadge(badge: Badge) {
        const { error } = await supabase
            .from('badges')
            .insert([badge])

        if (error) {
            throw error;
        }
    }

    async getUserByUsername(username: string): Promise<UserModel> {
        const { data, error, status } = await supabase
            .from('users')
            .select(`name, username, bio, website, avatar_url, account_type, onboarded, updated_at`)
            .match({ username })
            .single()

        if (error && status !== 406) {
            throw error;
        }

        return UserModel.fromJSON(data)
    }
}