import mongoose, { Schema } from 'mongoose';

// Define movie schema
var exerciseSchema = new Schema({
  created_at: Date,
  user: { type: Schema.Types.ObjectId, ref: 'user'},
  type: String
});

// Export Mongoose model
export default mongoose.model('exercise', exerciseSchema);
