import { UserController } from "./Controller/UserController";
const User = new UserController();

module.exports = [
	{
		method: "get",
		path: "user",
		protected: false,
		controller: User.findAllUserController,
	},
	{
		method: "post",
		path: "user",
		protected: false,
		controller: User.findAllUserController,
	},
];
