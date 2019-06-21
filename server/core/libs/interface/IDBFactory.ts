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
    simpleQuery(method: string, ip_user: string, table: string, req: string, name: string): any
    complexQuery(method: string, ip_user: string, req: string, name: string): any
    checkTable(table: string): any
}