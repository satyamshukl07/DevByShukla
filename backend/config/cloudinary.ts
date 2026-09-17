import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Check if Cloudinary credentials exist in environment
export const isCloudinaryConfigured = (): boolean => {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
};

export function initCloudinary() {
  if (isCloudinaryConfigured()) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
    console.log('[Cloudinary] Connected and active with cloud_name:', process.env.CLOUDINARY_CLOUD_NAME);
  }
}

// Initialize on load
initCloudinary();

/**
 * Upload an image file to Cloudinary if configured; otherwise returns local URL
 */
export async function uploadImage(file: Express.Multer.File): Promise<string> {
  if (isCloudinaryConfigured()) {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'devbyshukla/reviews',
        transformation: [
          { width: 400, height: 400, crop: 'fill', gravity: 'face' },
          { quality: 'auto', fetch_format: 'auto' }
        ]
      });

      // Cleanup local temp file
      try {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      } catch (e) {
        // Ignore file cleanup error
      }

      console.log('[Cloudinary] Image uploaded successfully:', result.secure_url);
      return result.secure_url;
    } catch (err) {
      console.warn('[Cloudinary] Upload failed, falling back to local storage:', err);
    }
  }

  // Fallback to local server static URL
  return `/uploads/${file.filename}`;
}
