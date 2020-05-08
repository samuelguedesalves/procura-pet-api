const express = require('express');

const CasesController = require('../controllers/CasesControllers');
const authentic = require('../utils/authentic');

const multerConfig = require('../utils/multer_config');
const multer = require('multer');

const case_router = express.Router();

//Router middleware, verify access token authorization
case_router.use( function(request, response, next){
    const { authorization } = request.headers;

    if( authorization ){

        const tokenHash = authorization.split(':');
        
        if( tokenHash[0] === 'Bearer' && tokenHash.length === 2 ){
            const auth = authentic.verify(tokenHash[1]);
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
 * this route make a new case.
 * receive { title, description, localization, phone, user_id }
 * return { message: 'Success!', status: true }
 */
case_router.post('/new_case', 
    function(request, response, next){
        const { title, description } = request.body;
        const { user_id } = response.locals;

        if( title && description && user_id ){
            next();
        }else{
            return response.send({ message: 'Opps... Data is missing!' });
        }
    }, 
    CasesController.createCase );

/**
 * This router delete a case
 * in query params receive cause_id and user_id
 */
case_router.delete('/delete_case', 
    function( request, response, next ){
        const { case_id } = request.query;

        if( case_id ){
            next();
        }else{
            return response.send({ message: 'Opps... Data is missing!' });
        }
    },
    CasesController.deleteCase );


/**
 * Case listing
 */
case_router.get('/cases',
    CasesController.listCases);

/**
 * Case update
 */
case_router.put('/update_case', 
    function( request, response, next ){
        const { case_id, title, description } = request.body;

        if(case_id && title && description){
            next();
        }else{
            return response.send({ message: 'Opps... Data is missing!' })
        }
    }, 
    CasesController.updateCase );

module.exports = case_router;