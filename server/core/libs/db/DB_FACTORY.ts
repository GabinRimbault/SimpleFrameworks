import { DB_MYSQL } from './DB_MYSQL';
import { DB_PostgreSQL } from './DB_PostgreSQL';
import { DB_SQLite } from './DB_SQLite';

export class DB_FACTORY {
    static loadDB(env_db: string){
        switch(env_db){

            case 'MySQL': 
                const a = new DB_MYSQL()
                return a
        
            case 'PostgreSQL': 
                return new DB_PostgreSQL()

            case 'SQLite': 
                return new DB_SQLite()

            default: 
                //return err
                console.log('ERREUR')
            break
        }        
    }
}