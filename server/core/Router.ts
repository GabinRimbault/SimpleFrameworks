import { routerError } from "../config/error/router.error";
import { Logs } from "./libs/class/Logs";
const chalk = require("chalk");

export class Router {
	env: any;
	server: any;
	path: Array<Object>;

	constructor(env: any, server: any, path: Array<Object>) {
		this.env = env;
		this.server = server;
		this.path = path;
	}

	public init(): void {
		this.loadPlugin();

		//FIXME A CHANGER CE CHIFFRE DOIT ETRE PRIS DE LA CLASS PLUGINS
		Logs.receiveSuccess("NB Plugins load : " + chalk.green(this.path.length));
	}

	private loadPlugin(): void {
		for (let i = 0; i != this.path.length; i++) {
			console.log("[ " + chalk.cyan(this.path[i].name.toUpperCase()) + " ]");

			for (let n = 0; n != this.path[i].path.length; n++) {
				//METHODS GET
				this.path[i].path[n].method === "get"
					? Logs.tryCatch(() => {
							this.loadMethodGet(this.path[i].path[n]);
					  }, {})
					: "";

				//METHODS ¨POST
				this.path[i].path[n].method === "post"
					? Logs.tryCatch(() => {
							this.loadMethodPost(this.path[i].path[n]);
					  }, {})
					: "";

				//METHODS PUT
				this.path[i].path[n].method === "put"
					? Logs.tryCatch(() => {
							this.loadMethodPut(this.path[i].path[n]);
					  }, {})
					: "";

				//METHODS DEL
				this.path[i].path[n].method === "del"
					? Logs.tryCatch(() => {
							this.loadMethodDel(this.path[i].path[n]);
					  }, {})
					: "";

				//METHODS PATCH
				this.path[i].path[n].method === "patch"
					? Logs.tryCatch(() => {
							this.loadMethodPatch(this.path[i].path[n]);
					  }, {})
					: "";
			}
			console.log("---------------------------------------");
		}
	}

	private loadMethodGet(path: object): any {
		//If not protected
		if (!path.protected) {
			Logs.receiveSuccess(chalk.green("[GET]") + " { " + path.path + " }");
			this.server.get("/" + path.path, path.controller);
		} else {
			Logs.receiveSuccess(chalk.green("[GET]") + " { " + path.path + " } - " + chalk.magenta("[GUARD]"));
			this.server.get("/" + path.path, path.controller);
		}
	}

	private loadMethodPost(path: object): void {
		//If not protected
		if (!path.protected) {
			Logs.receiveSuccess(chalk.blue("[POST]") + " { " + path.path + " }");
			this.server.post("/" + path.path, path.controller);
		} else {
			Logs.receiveSuccess(chalk.blue("[POST]") + " { " + path.path + " } - " + chalk.magenta("[GUARD]"));
			this.server.post("/" + path.path, path.controller);
		}
	}

	private loadMethodPut(path: object): void {
		//If not protected
		if (!path.protected) {
			console.log(chalk.yellow("PUT") + " { " + path.path + " }");
			this.server.put("/" + path.path, path.controller);
		} else {
			console.log(chalk.yellow("PUT") + " { " + path.path + " } - " + chalk.magenta("[GUARD]"));
			this.server.put("/" + path.path, path.controller);
		}
	}

	private loadMethodDel(path: object): void {
		//If not protected
		if (!path.protected) {
			console.log(chalk.red("DEL") + " { " + path.path + " }");
			this.server.delete("/" + path.path, path.controller);
		} else {
			console.log(chalk.red("DEL") + " { " + path.path + " } - " + chalk.magenta("[GUARD]"));
			this.server.delete("/" + path.path, path.controller);
		}
	}

	private loadMethodPatch(path: object): void {
		//If not protected
		if (!path.protected) {
			console.log(chalk.green("PATCH") + " { " + path.path + " }");
			this.server.post("/" + path.path, path.controller);
		} else {
			console.log(chalk.green("PATCH") + " { " + path.path + " } - " + chalk.magenta("[GUARD]"));
			this.server.patch("/" + path.path, path.controller);
		}
	}
}
