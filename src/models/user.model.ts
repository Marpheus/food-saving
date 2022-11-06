import {model, models, Schema} from 'mongoose';

const ConfigUnitType = {
    id: {
        type: Number,
        required: true,
        unique: true
    },
    threshold: {
        type: Number,
        required: true,
    },
    enabled: {
        type: Boolean,
        required: true,
    }
}

const ConfigType = {
    meatFish: ConfigUnitType,
    bistro: ConfigUnitType,
    plantBased: ConfigUnitType,
    bakery: ConfigUnitType,
    fruitVegetables: ConfigUnitType,
    sausages: ConfigUnitType,
    dairy: ConfigUnitType,
    durable: ConfigUnitType,
    drinks: ConfigUnitType,
    special: ConfigUnitType,
    cosmetics: ConfigUnitType,
    children: ConfigUnitType,
    otocObal: ConfigUnitType,
}

const DataSentType = {
    date: {
        type: String,
        required: true,
    },
    ids: {
        type: Array,
        required: true
    },
    payload: {
        type: String,
        required: true
    }
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    config: {
        type: ConfigType,
        required: true,
    },
    dataSent: {
        type: Array<typeof DataSentType>
    }
});

const UserModel = models.User || model('User', UserSchema);

export default UserModel