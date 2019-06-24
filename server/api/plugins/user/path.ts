import { UserController } from "./Controller/UserController";
const User = new UserController();

module.exports = [
	{
		method: "get",
		path: "user",
		protected: true,
		controller: User.findAllUserController,
	},
	{
		method: "post",
		path: "user",
		protected: false,
		controller: User.findAllUserController,
	},
];
