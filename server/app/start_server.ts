import { Server } from "../core/Server";
const clear = require('clear')
import { dev } from "./environments/env-dev"
import { prod } from "./environments/env-prod"
import { options } from "../config/config"

clear()


import { MainModel } from './../core/models/MainModel';

new Server(dev, options)
.init()
 