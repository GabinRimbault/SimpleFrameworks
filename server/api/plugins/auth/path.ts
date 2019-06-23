module.exports = [
	{
		method: "get",
		path: "auth/register",
		protected: true,
		controller: () => {},
	},
	{
		method: "get",
		path: "auth/confirm",
		protected: false,
		controller: () => {},
	},
	{
		method: "post",
		path: "auth/confirmPost",
		protected: false,
		controller: () => {},
	},
];
