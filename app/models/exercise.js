import mongoose, {Schema} from 'mongoose';

// Define movie schema
const exerciseSchema = new Schema({
        user: {type: Schema.Types.ObjectId, ref: 'user'},
        type: String
    },
    {
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
    });

// Export Mongoose model
export default mongoose.model('exercise', exerciseSchema);
