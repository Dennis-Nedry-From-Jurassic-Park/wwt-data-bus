import * as mongoose from "mongoose";
import {Schema} from "mongoose";

export const Uri = {
    docker: 'mongodb://mongodb_host:27017',
    localhost: 'mongodb://localhost:27017',
    local_host: 'mongodb://127.0.0.1:27017',
}

export const emptySchema: any = new Schema({}, {strict: false});

export class MongoDbClient {
    private dbName: string
    private mongoUri: string
    private mongoose: any
    private models: Map<string, any>

    constructor(
        dbName: string,
        mongoUri: string = Uri.local_host
    ) {
        this.dbName = dbName
        this.mongoUri = mongoUri
        this.models = new Map<string, any>()
    }

    public static async connect(dbName: string,): Promise<MongoDbClient> {
        const mongoDbClient = new MongoDbClient(dbName)
        mongoDbClient.mongoose = await mongoose.connect(mongoDbClient.mongoUri, {
            dbName: mongoDbClient.dbName
        })
        return mongoDbClient
    }

    async add_model(
        modelName: string,
        collectionName: string,
        schema: any = emptySchema
    ) {
        const model = await this.create_model(collectionName, schema)
        this.models.set(modelName, model)
    }

    async get_model(modelName: string) {
        return this.models.get(modelName)

    }

    async create_model(
        collectionName: string,
        schema: any = emptySchema
    ): Promise<any> {
        return this.mongoose.model(collectionName, schema);
    }

    async disconnect() {
        this.mongoose.disconnect()
    }

}