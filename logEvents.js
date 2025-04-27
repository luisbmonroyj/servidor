/*dependencias nativas*/
const {format} = require ('date-fns');
const {v4: uuid } = require('uuid');
/*{format} es un alias*/
const fs = require ('fs');
const fsPromises = require ('fs').promises;
const path = require('path');
/* funcion para hacer registro de eventos y errores
fecha \t hora \t id \t mensaje \N
Creacion de la carpeta logs y sobreescribir/crear archivo "logName
Se pretende usar uno para las peticiones, log, y otro para los errores" 
*/ 
const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    //console.log(logItem);
    try{
        if (!fs.existsSync(path.join(__dirname,'logs'))) {
            fs.mkdir(path.join(__dirname,'logs'), (err) => {
                if (err) throw err;
            //    console.log('directorio creado');
            });
        }
        //test
        await fsPromises.appendFile(path.join(__dirname,'logs',logName),logItem);
                
    } catch (err){
        console.error(err);
    }
}

module.exports = logEvents;
