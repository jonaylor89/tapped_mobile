export default interface StorageRepository {
  // Profile Picture
  uploadPFP(filename: string, imageInfo: FormData): Promise<void>;
  getPFPUrl(filename: string): Promise<string | null>;

  // Badges
  uploadBadge(filename: string, imageBlob: Blob): Promise<void>;
  getBadgeUrl(filename: string): Promise<string | null>;
}
