import { routerError } from "../config/error/router.error";
import { Logs } from "./libs/class/Logs";
import { Middleware } from "./libs/class/Middleware";
const chalk = require("chalk");
import { options } from "../config/config";
import { IPathRouter } from "./libs/interface/IPathRouter";

export class Router {
	env: any;
	server: any;
	path: IPathRouter;
	Middleware: Array<Function>;

	constructor(env: any, server: any, path: IPathRouter) {
		this.env = env;
		this.server = server;
		this.path = path;
		this.Middleware = Middleware.loadAllMiddleware();
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

	private loadMethodGet(path: IPathRouter): any {
		//If not protected
		if (!path.protected) {
			Logs.receiveSuccess(chalk.green("[GET]") + " { " + options.routeApi + path.path + " }");
			this.server.get(options.routeApi + path.path, path.controller);
		} else {
			Logs.receiveSuccess(
				chalk.green("[GET]") + " { " + options.routeApi + path.path + " } - " + chalk.magenta("[GUARD]")
			);
			this.server.get(options.routeApi + path.path, this.Middleware, path.controller);
		}
	}

	private loadMethodPost(path: IPathRouter): void {
		//If not protected
		if (!path.protected) {
			Logs.receiveSuccess(chalk.blue("[POST]") + " { " + options.routeApi + path.path + " }");
			this.server.post("/" + path.path, path.controller);
		} else {
			Logs.receiveSuccess(chalk.blue("[POST]") + " { " + path.path + " } - " + chalk.magenta("[GUARD]"));
			this.server.post(options.routeApi + path.path, this.Middleware, path.controller);
		}
	}

	private loadMethodPut(path: IPathRouter): void {
		//If not protected
		if (!path.protected) {
			console.log(chalk.yellow("PUT") + " { " + options.routeApi + path.path + " }");
			this.server.put(options.routeApi + path.path, path.controller);
		} else {
			console.log(
				chalk.yellow("PUT") + " { " + options.routeApi + path.path + " } - " + chalk.magenta("[GUARD]")
			);
			this.server.put(options.routeApi + path.path, this.Middleware, path.controller);
		}
	}

	private loadMethodDel(path: IPathRouter): void {
		//If not protected
		if (!path.protected) {
			console.log(chalk.red("DEL") + " { " + options.routeApi + path.path + " }");
			this.server.delete(options.routeApi + path.path, path.controller);
		} else {
			console.log(chalk.red("DEL") + " { " + options.routeApi + path.path + " } - " + chalk.magenta("[GUARD]"));
			this.server.delete(options.routeApi + path.path, this.Middleware, path.controller);
		}
	}

	private loadMethodPatch(path: IPathRouter): void {
		//If not protected
		if (!path.protected) {
			console.log(chalk.green("PATCH") + " { " + options.routeApi + path.path + " }");
			this.server.post(options.routeApi + path.path, path.controller);
		} else {
			console.log(
				chalk.green("PATCH") + " { " + options.routeApi + path.path + " } - " + chalk.magenta("[GUARD]")
			);
			this.server.patch(options.routeApi + path.path, this.Middleware, path.controller);
		}
	}
}
