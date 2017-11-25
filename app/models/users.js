import mongoose, { Schema } from 'mongoose';

// Define user schema
var userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  first_name: String,
  last_name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: Date,
  updated_at: Date,
  deleted_at: Date
});

// Export Mongoose model
export default mongoose.model('user', userSchema);
