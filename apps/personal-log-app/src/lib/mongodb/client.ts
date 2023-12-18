import mongoose from 'mongoose';

class MongoDBClient {
    cachedConnection: {
        promise: Promise<typeof mongoose> | undefined;
        connection: typeof mongoose | undefined;
    };

    constructor() {
        this.cachedConnection = {
            promise: this.getMongoConnection(),
            connection: undefined,
        };
    }

    private async getMongoConnection() {
        const MONGO_DB_URL =
            process.env.MONGODB_URI || 'mongodb://localhost:27017';

        return mongoose.connect(MONGO_DB_URL, {
            bufferCommands: false,
            dbName: process.env.MONGO_DB_DATABASE || 'mongo-db',
            auth: {
                password: process.env.MONGO_DB_PASSWORD || 'admin',
                username: process.env.MONGO_DB_USERNAME || 'admin',
            },
        });
    }

    async connect() {
        if (this.cachedConnection.connection) {
            return this.cachedConnection.connection;
        }

        if (!this.cachedConnection.promise) {
            this.cachedConnection.promise = this.getMongoConnection();
        }

        try {
            this.cachedConnection.connection =
                await this.cachedConnection.promise;
        } catch (e) {
            this.cachedConnection.connection = undefined;
            this.cachedConnection.promise = undefined;
            throw e;
        }

        return this.cachedConnection.connection;
    }
}

export const mongoClient = new MongoDBClient();

export default mongoClient;
