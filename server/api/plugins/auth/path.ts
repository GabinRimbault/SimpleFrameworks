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
    }
]