import Badge from "../domain/models/Badge";

export default interface StorageRepository {
    // Profile Picture 
    uploadPFP(file: File): Promise<string>;
    getPFPUrl(filename: string): Promise<string>;

    // Badges
    uploadBadge(badge: Badge): Promise<{ error: Error }>;
    getBadgeUrl(filename: string): Promise<string | null>;
}