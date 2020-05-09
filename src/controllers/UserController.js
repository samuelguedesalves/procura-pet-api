const User = require('../models/User');
const bcrypt = require('bcrypt');
const authentic = require('../utils/authentic');

module.exports = {

    /**
     * This function is to user sing up, receive email, password, name and phone in request body.
     * send
     * @param {*} request recive the requisition body
     * @param {*} response send the response
     */
    async signUpNewUser (request,response){
        const { email, password, name, phone, localization } = request.body;

        const user = await User.findOne({ email });

        if(user){
            return response.send({ message: 'Invalid E-mail!' });
        }else{
            await User.create({ name, email, password, phone, localization })
                .then( user => { 
                    const token = authentic.sign( user._id )

                    user.password = undefined;
                    user.__v = undefined;

                    return response.send({ message: 'Success!', user , accessToken: `Bearer:${token}` });
                } )
                .catch(err => {
                    return response.status(500).send('error in sign up');
                });
        }
    },

    /**
     * Authenticate user, receive email and password in request body, 
     * and send in response a message and access token, starting a session.
     */
    async login(request, response){
        const { email, password } = request.body;

        const user = await User.findOne({ email }).select({'name': '', 'email':'' , password, 'phone':'', 'localization':''});

        if(user){
            await bcrypt.compare(password, user.password)
                .then( function(result){
                    if (result === true){
                        const token = authentic.sign(user._id);

                        user.password = undefined;

                        return response.send({ message: 'Success!', user, accessToken: `Bearer:${token}` });
                    }else{
                        return response.send({ message: 'Opps... Something is wrong!' });
                    }
                } )
                .catch( function(error){ return response.status(500).send({ message: 'Opps... Internal Server Error' }) } );

        }else{
            return response.send({ message: 'Opps... Invalid user!' });
        }
    }
}