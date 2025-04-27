//dependencias nativas
const fs = require ('fs');
const path = require('path');
const http = require('http');
const fsPromises = require ('fs').promises;

const PORT = process.env.PORT || 4500;

const server = http.createServer(
    (req,res) => {
        console.log (`${req.url}\t${req.method}`);
    }
);

server.listen(PORT,() => console.log('Server running on port ',PORT));