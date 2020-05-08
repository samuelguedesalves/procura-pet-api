const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();


//Sign up new user
router.post('/new_user', 
    (request, response, next)=>{
        const { email, password, name, phone, localization } = request.body;
        if( email && password && name && phone && localization ){
            next();
        }else{
            return response.send({ message: 'Opps... Data is missing!' });
        }
    },
    UserController.signUpNewUser 
);

//Sing in user
router.post('/login_user', 
    (request, response, next)=>{ 
        const { email, password } = request.body;
        if(email && password){
            next();
        }else{
            return response.send({ message: 'Opps... Data is missing!' });
        }
    },
    UserController.login 
);

module.exports = router;