//1.48.41
//dependencias nativas
const fs = require ('fs');
const path = require('path');
const http = require('http');
const fsPromises = require ('fs').promises;

const PORT = process.env.PORT || 4500;

const serveFile =  async (filePath, contentType, response) => {
    try{
        /*manipular el tipo de archivo, texto o imagen, con una sentencia ternaria*/
        const rawData = await fsPromises.readFile(
            filePath, 
            !contentType.includes('image') ? 'utf8' : '');
        const data = contentType === 'application/json'? JSON.parse(rawData) : rawData;
        //entregar el codigo de respuesta correcto, si existe pagina es 404, si existe es 200
        response.writeHead(
            filePath.includes('404.html') ? 404 : 200, {'Content-Type':contentType}
        );
        response.end(
            contentType === 'application/json'? JSON.stringify(data) : data
        );
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
            /*Redireccionamiento a una pagina nueva, al index o 404
            el metodo .base es el nombre del archivo*/
            switch(path.parse(filePath).base){
            //301 redirect
            case 'old-page.html':
                serverResponse.writeHead(301,{'Location':'/new-page.html'}); 
                serverResponse.end();
                break;
            case 'www-page.html':
                serverResponse.writeHead(301,{"Location":'/'});
                serverResponse.end();
                break;
            default:
                //al entregar una respuesta 404
                serveFile(path.join(__dirname,'views','404.html'), 'text/html', serverResponse);
            }
            /*las pruebas de esta rutina se hacen creando los archivos:
            new-page.html
            404.html
            Se corre el servidor y se trata de llamar la pagina de "case 'old-page.html'"
            para comprobar que va a la nueva pagina
            con otra peticion se usa una direccion incorrecta para comprobar si carga 404.html
            */
        }
    }
);

server.listen(PORT,() => console.log('Server running on port ',PORT));