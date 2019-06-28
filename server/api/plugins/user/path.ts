import { UserController } from "./Controller/UserController";
const User = new UserController();

module.exports = [
	//Methods GET
	{
		method: "get",
		path: "user",
		protected: true,
		controller: User.findAllUserController,
	},
	// Comment faire comprendre qu'il s'agit d'un search ?
	{
		method: "get",
		path: "user/:request/:content",
		protected: false,
		controller: User.searchUserController,
	},

	{
		method: "get",
		path: "user/lastid",
		protected: false,
		controller: User.lastUserIDController,
	},
	{
		method: "get",
		path: "user/count",
		protected: false,
		controller: User.findAllUserController,
	},
	{
		method: "get",
		path: "user/:api_key",
		protected: true,
		controller: User.findAllUserController,
	},
	{
		method: "get",
		path: "user/id/:id",
		protected: true,
		controller: User.findAllUserController,
	},

	//Méthods POST
	{
		method: "post",
		path: "user/register",
		protected: true,
		controller: User.findAllUserController,
	},
	{
		method: "post",
		path: "user/confirm",
		protected: true,
		controller: User.findAllUserController,
	},
	{
		method: "post",
		path: "user/signin",
		protected: true,
		controller: User.findAllUserController,
	},
	{
		method: "post",
		path: "user/signout",
		protected: true,
		controller: User.findAllUserController,
	},

	//Méthods PUT
	{
		method: "put",
		path: "user/id/:id/:api_key",
		protected: true,
		controller: User.findAllUserController,
	},

	//Méthods DEL
	{
		method: "del",
		path: "user/id/:id/:api_key",
		protected: true,
		controller: User.findAllUserController,
	},
];
