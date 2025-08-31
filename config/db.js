import mongoose from 'mongoose'

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI
  if (!mongoUri) {
    console.error('MONGO_URI is not set in environment variables')
    process.exit(1)
  }

  try {
    await mongoose.connect(mongoUri, {
      // bufferCommands false helps fail fast if unreachable
      bufferCommands: false,
    })
    console.log('MongoDB connected')
  } catch (err) {
    console.error('MongoDB connection error:', err?.message || err)
    process.exit(1)
  }
}