import pg, { Pool } from "pg";
import { Log } from "../Logger";

class PgDatabase {
    private static pool: Pool;
    constructor() {}

    static connectPgDatabase = () => {
        try {
            Log.info('Enter connection of Postgres');
            this.pool = new Pool({
                connectionString: process.env.PG_DATABASE_URL
            });
            this.pool.on('connect', (stream)=>{
                Log.info('Postgres connected');
            });
            this.pool.on('acquire', (stream)=>{
                Log.info('Postgres acquired');
            });
            this.pool.on('remove', (stream)=>{
                Log.error('Postgres Removed');
            });
            this.pool.on('error', (error)=>{
                Log.error('Postgres Error');
            });
        } catch (error) {
            Log.info('Error in Postgres connection', error);
        }
    }

    static query = async (queryTextOrConfig: string, values: any) => await this.pool.query(queryTextOrConfig, values);
}

export default PgDatabase;