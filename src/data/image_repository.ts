export interface ImageRepository {
  pickImage(): Promise<{
    filename: string | null;
    imageUri: string | null;
    imageInfo: FormData | null;
    cancelled: boolean | null;
  }>;
}
