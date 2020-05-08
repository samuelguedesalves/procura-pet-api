const Case = require('../models/Case');
const User = require('../models/User');
const Upload = require('../models/Upload');

module.exports = {

    /**
     * This route create a case
     */
    async createCase(request, response){
        const { title, description} = request.body;
        const { user_id } = response.locals;

        await User.findOne({ '_id': user_id })
            .select(['localization','phone'])
            .then( function( userQuery ){
                const { localization, phone } = userQuery;

                if( localization && phone ){
                    Case.create({ title, description, localization, phone, user_id })
                        .then( ( caseQuery ) => {
                            caseQuery.__v = undefined;
                            return response.send({ message: 'Success!', case:  caseQuery  });
                        } )
                        .catch( function(error){ 
                            return response.status(500).send({ message: 'Opps... Internal Server Erro!'});
                        } );
                }else{
                    return response.status(500).send({ message: '2 Opps... Bronk service! this is a big problem.' });
                }
                
            } ).catch( function(error){
                console.log(error);
                return response.status(500).send({ message: '1 Opps... Bronk service! this is a big problem.' })
            } );

    },

    /**
     * This route delete a case
     */
    async deleteCase(request, response){
        const { case_id } = request.query;
        const { user_id } = response.locals;

        Case.findOne({ '_id': case_id })
            .then( function(result_case){
                if(result_case.user_id === user_id){
                    
                    Case.deleteOne({ '_id': case_id })
                        .then( function(){
                            return response.send({ message: 'Success!', status: true });
                        } )
                        .catch( function(){
                            return response.send({ message: 'Error to delete!' });
                        } );

                }else{
                    return response.send({ message: 'this case does not belong to you!' });
                }
            } )
            .catch( function(error){
                return response.send({ message: 'this case does not existe!' });
            } );

    },

    /**
     * List cases in region
     */
    async listCases( request, response ){
        let { page, localization } = request.query;
        localization = localization.toUpperCase();

        //proibir a injesão de paginação negativa ou igual a zero
        if( page < 1 ){
            page = 1;
        }

        const skipes = 5 * (page - 1);

        await Case.find({ localization })
            .select({ 
                '_id':'', 
                'title':'', 
                'description':'', 
                'localization':'', 
                'phone':'', 
                'user_id':'' })
            .skip(skipes).limit(5)
            .then( function( list ) {
                const idList = list.map( function(item){ return item._id } );
                
                Upload.find({ 'case_id' : idList })
                    .then( function( uploadQuery ){
                        
                        const finalList = list.map( function( caseItem ){
                            
                            function urlArrayUnformated (){
                                const urls = uploadQuery.map( function(uploadItem){ 
                                    if( uploadItem.case_id == caseItem._id ){
                                        return uploadItem.url;
                                    } 
                                } )

                                return urls;
                            }

                            return {
                                '_id': caseItem._id , 
                                'title': caseItem.title , 
                                'description': caseItem.description , 
                                'localization': caseItem.localization , 
                                'phone': caseItem.phone , 
                                'user_id': caseItem.user_id,
                                "image_url": (urlArrayUnformated()).filter( function( item ){
                                    return  item != null
                                } )[0]
                            }
                        } )

                        return response.send({ finalList });
                    } )
                    .catch( function(error){
                        return response.send({ error });

                    } )

                //return response.send(list);
            }).catch( function(error){
                console.log(error);
                return response.send({ message: 'error in cases pagination' });
            } );

    },
    
    
    /**
     * This route modify and update a case
     */
    async updateCase(request, response){
        const  { case_id, title, description } = request.body;
        const { user_id } = response.locals;

        await Case.updateOne({ '_id': case_id, user_id }, { title, description })
            .then( function( result ){
                if(result.n != 0){
                    return response.send({ message: 'Success!' });
                }else{
                    return response.send({ message: 'Opps... this case is not your or not existe!' });
                }
            } )
            .catch( function( error ){
                return response.status(400).send({ message: 'Opps... Case update error!' });
            } );
        
    },
}