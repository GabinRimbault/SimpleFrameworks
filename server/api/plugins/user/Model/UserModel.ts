import { MainModel } from "./../../../../core/models/MainModel";
import { IOptions } from "../../../../core/libs/interface/IOptions";
import { http } from "../config/http";

export class UserModel extends MainModel {
	protected findAllUserModel(options: IOptions): Promise<any> {
		return new Promise((resolve, reject) => {
			super
				.findAllMainModel(options)
				.then((res: Response) => {
					Object.keys(res).length >= 1
						? resolve(super.sendRequest(true, http.success.requestOK, Object.keys(res).length, res))
						: resolve(
								super.sendRequest(true, http.success.requestNotGuaranted, Object.keys(res).length, res)
						  );
				})
				.catch((err: Response) => reject(super.sendRequest(false, http.error.badRequest, 0, err)));
		});
	}

	protected searchUserModel(options: IOptions): Promise<any> {
		return new Promise((resolve, reject) => {
			super
				.searchMainModel(options)
				.then((res: Response) => {
					Object.keys(res).length >= 1
						? resolve(super.sendRequest(true, http.success.requestOK, Object.keys(res).length, res))
						: resolve(
								super.sendRequest(true, http.success.requestNotGuaranted, Object.keys(res).length, res)
						  );
				})
				.catch((err: Response) => reject(super.sendRequest(false, http.error.badRequest, 0, err)));
		});
	}

	protected lastUserIDModel(options: IOptions): Promise<any> {
		return new Promise((resolve, reject) => {
			super
				.lastItemMainModel(options)
				.then((res: Response) => {
					res[0].lastid >= 1
						? resolve(super.sendRequest(true, http.success.requestOK, 1, res))
						: resolve(super.sendRequest(true, http.success.requestNotGuaranted, 1, res));
				})
				.catch((err: Response) => reject(super.sendRequest(false, http.error.badRequest, 0, err)));
		});
	}

	protected countUserModel(options: IOptions): Promise<any> {
		return new Promise((resolve, reject) => {});
	}
}
