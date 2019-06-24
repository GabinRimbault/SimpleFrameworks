import fs from "fs";
import { options } from "../../../config/config";

export class Middleware {
	static loadAllMiddleware() {
		if (options.activeMiddleware) {
			var dataMiddleware = [];

			//Load different plugins and push to PLUGINS
			for (let i = 0; i !== fs.readdirSync("server/core/middlewares").length; i++) {
				//Load Middleware
				const middleware = require("../../middlewares/" + fs.readdirSync("server/core/middlewares")[i]);

				dataMiddleware.push(middleware.default.init);
			}

			return dataMiddleware;
		} else {
			return [];
		}
	}
}
