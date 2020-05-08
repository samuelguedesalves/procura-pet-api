const Upload = require('../models/Upload');

const datauriConversor = require('../utils/datauri_conversor');
const cdnIntegration = require('../utils/cdn_integration');

module.exports = {
    
    /**
     * Image case upload
     */
    async imageCaseUpload(request, response){
        const { case_id } = response.locals;
        const image = datauriConversor(request.file).content;

        cdnIntegration.imageUpload(image, await function(result, error){
            if(error){ return response.status(500).send({ message: 'Error in image upload' }) }
            
            Upload.create({ 'name': result.public_id, 'url': result.url, 'case_id': case_id })
                .then( function( result ){
                    return response.send({ message: 'Success!', result });
                }).
                catch( function( error ){
                    return response.status(500).send({ message: 'Error in upload register in database!' });
                });

        } );
        
    }

}