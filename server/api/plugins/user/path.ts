module.exports = [
    {
        "method": "post",
        "path": "user/add",
        "protected": true,
        "controller": "UserController.Add"      
    },
    {
        "method": "post",
        "path": "user/del/:id",
        "protected": true,
        "controller": "UserController.Del"      
    },
]