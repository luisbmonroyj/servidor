//dependencias nativas
const fs = require ('fs');
const path = require('path');
const http = require('http');
const fsPromises = require ('fs').promises;

const PORT = process.env.PORT || 4500;

const serveFile =  async (filePath, contentType, response) => {
    try{
        const data = await fsPromises.readFile(filePath,'utf8');
        response.writeHead(200,{'Content-Type':contentType});
        response.end(data);
    } 
    catch (err) {
        console.error (err);
        response.statusCode = 500;
        response.end();
    }
}

const server = http.createServer(
    (serverRequest,serverResponse) => {
        console.log (`${serverRequest.url}\t${serverRequest.method}`);
        //imprime la direccion del servidor y el metodo usado

        //adquirir la extension del archivo para manipular el Content-Type y manipular correctamente los archivos
        const extension = path.extname(serverRequest.url);
        let contentType;
            switch (extension){
            case '.css':
                contentType = 'text/css';
                break;
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.json':
                contentType = 'application/json';
                break;
            case '.jpg':
                contentType = 'image/jpeg';
                break;
            case '.jpeg':
                contentType = 'image/jpeg';
                break;
            case '.png':
                contentType = 'image/png';
                break;
            case '.txt':
                contentType = 'text/plain';
                break;
            default:
                contentType = 'text/html';
        }

        //filtrar la ruta de los archivos segun su tipo con una sentencia ternaria anidada
        // condicion ? True : False
        let filePath = 
            contentType === 'text/html' && serverRequest.url === '/' ?
                path.join(__dirname,'views','index.html')
                : contentType === 'text/html' && serverRequest.url.slice(-1) === '/' ?
                    path.join(__dirname,'views',serverRequest.url,'index.html')
                    : contentType === 'text/html'?
                        path.join(__dirname,'views',serverRequest.url)
                        : path.join(__dirname,serverRequest.url)
                
        //Para que la extension .html  no sea necesaria en el navegador
        if (!extension && serverRequest.url.slice(-1) !== '/') filePath += '.html';
        
        //verificar que el archivo existe para cargarlo en el servidor
        if (fs.existsSync(filePath)){
            serveFile(filePath, contentType, serverResponse);
        }
        else {
            //301
            //404
        }
    }
);

server.listen(PORT,() => console.log('Server running on port ',PORT));