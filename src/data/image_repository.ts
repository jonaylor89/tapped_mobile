export interface ImageRepository {
  pickImage(): Promise<{
    filename: string | null;
    imageInfo: FormData | null;
    cancelled: boolean | null;
  }>;
}
