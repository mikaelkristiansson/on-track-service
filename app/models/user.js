import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const SALT_WORK_FACTOR = 10;

// Define user schema
let userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});


/**
 * Before save a user document, Make sure:
 * Hash user's password
 *
 */
userSchema.pre('save', function (next) {
    let user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err);

            // override the clear text password with the hashed one
            user.password = hash;
            next();
        });
    });
});

/**
 * Create an Instance method to validate user's password
 * This method will be used to compare the given password with the password stored in the database
 *
 */
userSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};


// Export Mongoose model
export default mongoose.model('user', userSchema);
