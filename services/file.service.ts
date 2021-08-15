import { UploadApiOptions, v2 as cloudImg } from "cloudinary";

cloudImg.config({
  cloud_name: process.env.IMAGE_CLOUD_NAME,
  api_key: process.env.IMAGE_API_KEY,
  api_secret: process.env.IMAGE_API_SECRET,
});
class ImageService {
  public static async uploadImage(file, options?: UploadApiOptions) {
    const result = await cloudImg.uploader.upload(file, options);
    return result;
  }

  public static async removeImage(
    publicId: string,
    options?: {
      resource_type?: string;
      type?: string;
      invalidate?: boolean;
    }
  ) {
    try {
      await cloudImg.uploader.destroy(publicId, options);
    } catch (error) {
      throw error;
    }
  }
}

export default ImageService;
