module.exports = [
    {
        "method": "get",
        "path": "auth/register",
        "protected": true,
        "controller": "AuthController.Register"      
    },
    {
        "method": "get",
        "path": "auth/confirm",
        "protected": false,
        "controller": "AuthController.Confirm"      
    },
    {
        "method": "post",
        "path": "auth/confirmPost",
        "protected": false,
        "controller": "AuthController.Confirm"      
    },

]