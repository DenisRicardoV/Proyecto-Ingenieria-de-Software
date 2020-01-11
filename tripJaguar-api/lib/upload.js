'use strict'
const IncomingForm = require('formidable').IncomingForm;
const debug = require('debug')('tripJaguar:api:routes:agencia:upload')

module.exports = function upload(User, Agency, Tour) {


    function fromTours(req,res,next){
        debug('A request has come to /agencia/upload')

        // const ruta = 'images/tours'
        // var form = new IncomingForm();
        // form.parse(req);

        console.log("RUTA ACCEDIDA: ", req.files);




        // form.on('field', (name, field) => {
        //     uid = field;
        // })
        // form.on('fileBegin', function (name, file){
        //     file.path = './public/'+ruta+'/' +generateName(uid,file);
        // });

        // form.on('file', (field, file) => {
        //     console.log('NAMEE:',file.path);

        //     Tour.addImage(uid, generateNameByPath(file.path) );
        //     // Do something with the file
        //     // e.g. save it to the database
        //     // you can access it using file.path
        // });
        // form.on('end', () => {
        //     res.json();

        // });
    }

    return {
        fromTours
    }

    function generateName(uid,file){
        // return 
        var name = uid+'-'+String(Date.now())+'.'+getExtension(file.name);
        
        return name;

        function getExtension(name)
        {
            return name.split('.').pop();
        }
    }

    function generateNameByPath(path){
        // return 
        var nesult = path.split('/').pop();
         
        
        return nesult;

       
    }
    

    

};