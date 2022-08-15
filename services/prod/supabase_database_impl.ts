
import UserModel from '../../models/UserModel';
import DatabaseRepository from '../database_repository';

import { supabase } from '../../lib/supabase';


export default class SupabaseDatabaseImpl implements DatabaseRepository {

    async getUserData(id: string): Promise<UserModel | null> {
        try {
            let { data, error, status } = await supabase
                .from("users")
                .select(`name, username, bio, website, avatar_url, account_type`)
                .eq("id", id)
                .single();
            if (error && status !== 406) {
                throw error;
            }

            if (!data) {
                return UserModel.uninitializedUser(id)
            }

            // TODO validate data

            return {
                id: id,
                name: data.name,
                username: data.username,
                bio: data.bio,
                website: data.website,
                avatarUrl: data.avatar_url,
                accountType: data.account_type,
                onboarded: true,
            }
        } catch (error) {
            // TODO add better log mechanism
            console.log(error)
            return null
        }
    }
}