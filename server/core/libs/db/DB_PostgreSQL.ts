import { IDBFactory } from "../interface/IDBFactory";
import { IOptions } from "../interface/IOptions";

export class DB_PostgreSQL implements IDBFactory {
	host: string;
	user: string;
	password: string;
	database: string;
	haveInstance: boolean;
	objMysql: any;

	constructor() {
		this.host = "";
		this.user = "";
		this.password = "";
		this.database = "";
		this.haveInstance = false;
		this.objMysql = null;
	}

	public init(): void {}

	public reloadDB(): any {}

	isConnected(): any {}

	simpleQuery(req: string, options: IOptions): Promise<any> {
		return new Promise((resolve, reject) => {});
	}

	complexQuery(req: string, options: IOptions): Promise<any> {
		return new Promise((resolve, reject) => {});
	}

	checkTable(table: string): Promise<any> {
		return new Promise((resolve, reject) => {});
	}
}
