import 'dotenv/config';
import mongoose from 'mongoose';

let mongoConnected = false;

export function isMongoConnected(): boolean {
  return mongoConnected;
}

export function getMongoURI(): string | undefined {
  return (
    process.env.MONGODB_URI ||
    process.env.MONGODB_URL ||
    process.env.MONGO_URI ||
    process.env.DATABASE_URL
  );
}

export async function connectDB(): Promise<boolean> {
  if (mongoose.connection.readyState === 1) {
    mongoConnected = true;
    return true;
  }

  const uri = getMongoURI();

  if (!uri || !uri.trim()) {
    console.log('[Database] No MongoDB URI found in environment (checked MONGODB_URI, MONGODB_URL, MONGO_URI). Operating with persistent JSON storage.');
    mongoConnected = false;
    return false;
  }

  try {
    const masked = uri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@');
    console.log(`[Database] Connecting to MongoDB Atlas (${masked})...`);
    
    await mongoose.connect(uri.trim(), {
      serverSelectionTimeoutMS: 5000,
      dbName: 'devbyshukla',
    });

    mongoConnected = true;
    console.log(`[Database] MongoDB Atlas Connected! (Database: ${mongoose.connection.name || 'devbyshukla'})`);
    return true;
  } catch (error: any) {
    console.warn('[Database] MongoDB connection warning:', error.message);
    if (error.message?.includes('whitelist') || error.message?.includes('IP')) {
      console.warn('[Database] IMPORTANT: Please whitelist 0.0.0.0/0 in MongoDB Atlas -> Network Access so cloud servers can connect.');
    }
    console.log('[Database] Operating with resilient local database fallback.');
    mongoConnected = false;
    return false;
  }
}
