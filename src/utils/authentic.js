const jwt = require('jsonwebtoken');
const { secret } = require('../config/secret.json');

module.exports = {
    /**
     * innit a session access
     * @param {*} userId
     */
    sign(userId){
        const token = jwt.sign({ id: userId }, secret, { expiresIn: 86400 } );
        return token;
    },

    /**
     * Varify token access
     * @param {*} token 
     */
    verify(token){
        let status = undefined;

        jwt.verify( token, secret , 
            function( error, decoded ){
                if (error) {
                    status = false;
                }else{
                    status = [true, decoded]
                }
            } );

        return status;
    }
        
    
}