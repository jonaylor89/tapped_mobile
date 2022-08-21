import Badge from "../../domain/models/Badge";
import StorageRepository from "../storage_repository";

export default class SupabaseStorageImpl implements StorageRepository {
    async uploadBadge(badge: Badge): Promise<{ error: Error }> {
        return { error: new Error("Not implemented") };
    }
    async getBadgeUrl(filename: string): Promise<string | null> {
        return null;
    }
}