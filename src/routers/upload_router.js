const express = require('express');
const upload_route = express.Router();

//multer
const multer = require('multer');
const multerConfig = require('../utils/multer_config');

//upload controller
const UploadController = require('../controllers/UploadController');

//jwt auth
const authentic = require('../utils/authentic');

//Case model
const Case = require('../models/Case');

/**
 * Middleware token validation
 */
upload_route.use( function(request, response, next){
    const { authorization } = request.headers;
    
    if( authorization ){
        const hash = authorization.split(':');

        if(hash[0] === 'Bearer' && hash.length === 2 ){
            const auth = authentic.verify(hash[1]);
            
            
            if(auth){
                response.locals.user_id = auth[1].id;
                next();
            }else{
                return response.send({ message: 'Invalid Token' });
            }
        }else{
            return response.send({ message: 'Opps... Token unformatted' });
        }

    }else{
        return response.send({ message: 'Opps... Token is missing!' });
    }

} );

/**
 * Upload route
 */

upload_route.post('/upload', 
    multer(multerConfig).single('file'),
    async function(request, response, next){
        const { case_id } = request.query;
        const user_id = response.locals.user_id;

        await Case.findOne({'_id': case_id})
            .then( function(result){
                
                if(user_id === result.user_id){
                    response.locals.case_id = case_id;
                    next();
                }else{
                    return response.status(400).send({ message: 'Opps... This Case is not your' });
                }
                
            } )
            .catch( function(error){
                return response.status(400).send({ message: 'Opps... Error in query' });
            } );
    }, 
    UploadController.imageCaseUpload);

module.exports = upload_route;