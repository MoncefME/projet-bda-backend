import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity-old/User"

export const AppDataSource = new DataSource({
    type: "oracle",
    host: "localhost",
    port: 1521,
    username: "BDA",
    password: "admin",
    database: "XE",
    synchronize: false,
    logging: false,
    entities: ["src/entities/**/*.ts"],
    migrations: [],
    subscribers: [],
})
