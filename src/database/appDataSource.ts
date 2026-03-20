import { DataSource } from "typeorm";
import dotenv from 'dotenv'

dotenv.config()

const dbHost = process.env.DB_HOST || "localhost";
const dbPort = Number(process.env.DB_PORT || 5432);
const dbUser = process.env.DB_USER || process.env.DB_USERNAME;
const dbPass = process.env.DB_PASS || process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME || process.env.DB_DATABASE;

export const appDataSource = new DataSource({
    type: "postgres",
    // Se existir a variável DB_HOST (vinda do Docker), usa ela. 
    // Senão, usa "localhost" (para você conseguir rodar no seu PC fora do Docker).
    host: dbHost,
    port: dbPort,
    username: dbUser as string,
    password: dbPass as string,
    database: dbName as string,
    
    // ATENÇÃO AQUI: Em produção (dentro do Docker), o caminho muda para .js
    entities: [
        process.env.NODE_ENV === "production" 
        ? "dist/entities/*.js" 
        : "src/entities/*.ts"
    ],
    
    logging: true,
    // Em produção real, synchronize deve ser false. Use migrations!
    synchronize: process.env.NODE_ENV !== "production", 
});