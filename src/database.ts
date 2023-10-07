import { Client } from "pg";
import "dotenv/config";

export const client = new Client({
    user : process.env.MOVIES_M4_USER,
    password :  process.env.MOVIES_M4_PASSWORD,
    host:  process.env.MOVIES_M4_HOST,
    database:  process.env.MOVIES_M4_DATABASE,
    port:Number(process.env.MOVIES_M4_PORT),
})

export const conectionDataBase=async()=>{
    try {
        await client.connect()
        console.log("connection established")
        await createTables();
    } catch (error) {
        console.log(error)
    }
}

const createTables = async () => {
    try{
        const queryString = `
            CREATE TABLE IF NOT EXISTS movies (
                id  SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                category VARCHAR(20) NOT NULL,
                duration INTEGER NOT NULL,
                price INTEGER NOT NULL
            );
        `
        await client.query(queryString);
        console.log("Table created");
    } catch (error) {
        console.log(error);
    }
}
