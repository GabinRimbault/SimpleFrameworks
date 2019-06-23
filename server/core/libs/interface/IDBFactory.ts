import { IOptions } from "./IOptions";

export interface IDBFactory {
    
    host: string
    user: string
    password: string
    database: string
    haveInstance: boolean
    objMysql: any
     
    init(): any
    reloadDB(): any
    isConnected(): any
    simpleQuery: (req: string, options: IOptions) => Promise<any>
    complexQuery(req: string, options: IOptions): Promise<any>
    checkTable(table: string): Promise<any>
}