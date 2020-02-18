'use strict';

module.exports = function(Container) {
    const fs = require('fs');
    Container.FileUpload = function(file,name, cb){
            console.log('fichero',file)
            console.log('nombre',name)
        fs.writeFile('./server/local-storage/'+name,file,'base64',function (err) {});
        cb(null,'ALGO'+file);
    }

    Container.remoteMethod('FileUpload', {
        accepts:[ {arg: 'file', type:'any'},
        {arg: 'name', type:'string'}],
        returns: {arg: 'resp', type: 'string'}
  });
};
