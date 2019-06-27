import { UserModel } from "./../Model/UserModel";
import { MainController } from "./../../../../core/controllers/MainController";
import { IResponseController } from "../../../../core/libs/interface/IResponseController";
import { IOptions } from "../../../../core/libs/interface/IOptions";
const data = require("../config/data.json");
const ip = require("ip");

export class UserController extends UserModel {
	public findAllUserController(req: Request, res: Response): void {
		let options: IOptions = {
			table: data.table,
			field: "*",
			name: "findAllUser",
			method: req.method,
			ip: ip.address(),
		};

		super
			.findAllUserModel(options)
			.then((response: IResponseController) => MainController.response(req, res, response))
			.catch((error: IResponseController) => MainController.response(req, res, error));
	}

	public searchUserController(req: Request, res: Response): void {
		let options: IOptions = {
			table: data.table,
			field: "*",
			name: "searchUserController",
			method: req.method,
			ip: ip.address(),
			request: req.params.request,
			content: req.params.content,
		};

		super
			.searchUserModel(options)
			.then((response: IResponseController) => MainController.response(req, res, response))
			.catch((error: IResponseController) => MainController.response(req, res, error));
	}
}
