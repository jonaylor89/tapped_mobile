import { supabase } from "./supabase";
import StorageRepository from "../storage_repository";

enum Buckets {
    Avatars = 'avatars',
    Badges = 'badges',
}

export default class SupabaseStorageImpl implements StorageRepository {
    async uploadPFP(filename: string, imageInfo: FormData): Promise<void>  {
        const { error } = await supabase.storage.from(Buckets.Avatars).upload(filename, imageInfo)
        if (error) throw error
    }

    async getPFPUrl(filename: string): Promise<string | null> {
        const { publicURL, error } = await supabase.storage.from(Buckets.Avatars).getPublicUrl(filename);
        if (error) throw error

        return publicURL
    }

    async uploadBadge(filename: string, imageInfo: FormData): Promise<void> {
        const { error } = await supabase.storage.from(Buckets.Badges).upload(filename, imageInfo)
        if (error) throw error
    }

    async getBadgeUrl(filename: string): Promise<string | null> {
        const { publicURL, error } = await supabase.storage.from(Buckets.Badges).getPublicUrl(filename);
        if (error) throw error

        return publicURL
    }
}