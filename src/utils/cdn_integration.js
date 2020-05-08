const cloudinary = require('cloudinary');

const cdn_config = require('../config/cdn_config.json');

cloudinary.v2.config(cdn_config);

module.exports = {

    /**
     * Receive a image file and a callback function
     * @param {*} imagePath 
     * @param {*} callback
     */
    async imageUpload(imagePath, callback){
        await cloudinary.v2.uploader.upload( imagePath)
        .then( function(result){
            callback(result);
        } ).catch( function(error){ callback(null,error) } );
    },

    /**
     * Receive name from image file and a function callback
     * @param {*} fileName 
     * @param {*} callback 
     */
    async imageDestroy(fileName, callback){
        await cloudinary.v2.uploader.destroy(fileName)
            .then( function( result ){
                callback(result);
            } ).catch( function(error){ callback(null, error) } )
    },

}