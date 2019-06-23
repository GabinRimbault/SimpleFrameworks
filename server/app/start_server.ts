import { Server } from "../core/Server";
const clear = require("clear");
import { dev } from "./environments/env-dev";
import { prod } from "./environments/env-prod";
import { options } from "../config/config";

clear();

var env = {};

new Server(process.argv[2] === "-prod" ? (env = prod) : (env = dev), options).init();
