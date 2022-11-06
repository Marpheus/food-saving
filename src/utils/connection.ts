import mongoose from 'mongoose';

const {DATABASE_URL} = process.env;

if (!DATABASE_URL) throw new Error('DATABASE_URL not defined');

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = {conn: null, promise: null}
}

async function dbConnect() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(`${DATABASE_URL}`).then(mongoose => mongoose)
    }

    cached.conn = await cached.promise;
    return cached.conn
}

export default dbConnect;