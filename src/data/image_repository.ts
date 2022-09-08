export interface ImageRepository {
  pickImage(): Promise<{
    filename: string | null;
    imageUri: string | null;
    imageBlob: Blob | null;
    cancelled: boolean | null;
  }>;
}
