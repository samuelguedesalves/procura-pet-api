const mongoose = require('mongoose');

const UploadSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    url:{
        type: String,
        required: true,
    },
    case_id:{
        type: String,
         required: true,
    }
});

const Upload = mongoose.model('Upload', UploadSchema);

module.exports = Upload;