const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://procura-pet-1:petfofo@cluster0-vsabj.gcp.mongodb.net/procuraPet?retryWrites=true&w=majority',{useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true})
    .then( () => console.log('connected to database') )
    .catch( erro => console.log(erro) );

mongoose.Promise = global.Promise;

module.exports = mongoose;