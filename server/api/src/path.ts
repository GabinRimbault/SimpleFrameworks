module.exports = [
    {
        "method": "get",
        "path": "perso/register",
        "protected": true,
        "controller": "PersoController.Register"      
    },
    {
        "method": "get",
        "path": "perso/confirm",
        "protected": false,
        "controller": "PersoController.Confirm"      
    }
]