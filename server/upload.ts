import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(6).toString('hex');
    cb(null, 'photo-' + uniqueSuffix + ext);
  }
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif'
  ];

  if (allowedMimeTypes.includes(file.mimetype.toLowerCase())) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (JPG, PNG, WEBP, GIF) are allowed'));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max file size
  }
});

// Helper to determine the final photo URL
export async function processUploadedFile(file?: Express.Multer.File): Promise<string | undefined> {
  if (!file) return undefined;

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  // If Cloudinary credentials are provided, we can upload to Cloudinary
  if (cloudName && apiKey && apiSecret) {
    try {
      const timestamp = Math.round(new Date().getTime() / 1000);
      const signaturePayload = `timestamp=${timestamp}${apiSecret}`;
      const signature = crypto.createHash('sha1').update(signaturePayload).digest('hex');

      const formData = new FormData();
      const fileBuffer = fs.readFileSync(file.path);
      const blob = new Blob([fileBuffer], { type: file.mimetype });
      formData.append('file', blob, file.filename);
      formData.append('api_key', apiKey);
      formData.append('timestamp', timestamp.toString());
      formData.append('signature', signature);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const json = await res.json() as { secure_url?: string };
        // Delete local temporary file once uploaded to Cloudinary
        try { fs.unlinkSync(file.path); } catch (e) {}
        if (json.secure_url) {
          return json.secure_url;
        }
      } else {
        console.warn('Cloudinary upload returned non-200, falling back to local upload URL:', await res.text());
      }
    } catch (err) {
      console.warn('Cloudinary upload failed, falling back to local file:', err);
    }
  }

  // Fallback: local persistent upload URL served via Express
  return `/uploads/${file.filename}`;
}
