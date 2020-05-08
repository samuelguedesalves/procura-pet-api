const multer = require('multer');

/**
 * const path = require('path');
 * const crypto = require('crypto');
 * 
 * dest, storage, limits,fileFilter
 */

module.exports = {
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: ( request, file, callback ) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
        ];

        if ( allowedMimes.includes(file.mimetype) ){
            callback(null, true);
        }else{
            callback(new Error('Invalid file type.') );
        }
    },
}