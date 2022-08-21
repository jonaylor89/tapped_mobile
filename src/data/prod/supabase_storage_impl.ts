import { supabase } from "../../lib/supabase";
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
        throw new Error("Not implemented")
    }
    async getBadgeUrl(filename: string): Promise<string | null> {
        return null;
    }
}