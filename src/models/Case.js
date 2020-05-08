const mongoose = require('../database/index');

const CaseSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    localization:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    user_id:{
        type: String,
        required: true,
    },
});

CaseSchema.pre('save', function(next){
    this.localization = this.localization.toUpperCase();
    next();
})

const Case = mongoose.model('Case', CaseSchema);

module.exports = Case;