import {model, models, Schema} from 'mongoose';

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
});

const UserModel = models.User || model('User', UserSchema);

export default UserModel