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
    simpleQuery: (req: string, options: object): any
    complexQuery(req: string, options: object): any
    checkTable(table: string): any
}