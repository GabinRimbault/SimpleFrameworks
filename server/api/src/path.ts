module.exports = [
    {
        "method": "get",
        "path": "perso/register",
        "protected": true,
        "controller": "AuthController.Register"      
    },
    {
        "method": "get",
        "path": "perso/confirm",
        "protected": false,
        "controller": "AuthController.Confirm"      
    }
]