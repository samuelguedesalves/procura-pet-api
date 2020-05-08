const Datauri = require('datauri');
const path = require('path');

const datauri = new Datauri();

module.exports = function datauri_conversor (file) {
    return datauri.format(path.extname(file.originalname).toString(), file.buffer );
}