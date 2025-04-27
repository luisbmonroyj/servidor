# Servidor creado en nodeJS desde cero

## Inicializar npm en el proyecto

Ejecutar esta instruccion en la carpeta root del proyecto

        npm init

es una utilidad que permite organizar las dependencias del proyecto en un archivo json. Las preguntas que realiza tienen opciones por defecto (opcion) y se aceptan con ENTER.
Se recomienda cambiar "entry point: (index.js)" por el nombre del archivo js que va a correr el servicio y el repositorio remoto si ya se tiene, y en ultima instancia el autor si asi lo desea.

## instalacion de dependencias:
* Dependencias necesarias para este proyecto

    Se instalan con el comando
        npm i <paquete> <opciones>

    - date-fns
    Dependencia para formatear fechas y horas
        
            npm i date-fns

    - uuid
    Paquete que genera codigos unicos
        
            npm i uuid

    - nodemon
    Dependencia que reinicia el servidor cuando hay un cambio en el archivo principal
        
            npm i nodemon -D

    de esta forma se instala no como dependencia del proyecto sino como herramienta de desarrollo

    Si se esta clonando el reṕositorio, se pueden instalar todas las dependencias con
        
            npm install

    lo que leera el contenido de package.json y creara la carpeta node_modules con los necesarios.

Estas dependencias descargaran unos archivos en la carpeta del proyecto (node_modules) que es necesario ignorar en el repositorio remoto. en la carpeta raiz del proyecto, crear el archivo .gitignore y agregar "node_modules" y cualquier otro archivo pesado o con informacion sensible que no se quiera sincronizar remotamente.
    
* Actualizacion de paquetes
    
    Ejemplo "nodemon": "^3.1.10"

    ^ restringe la actualizacion hacia una version menor (1) o a un parche (10) pero no deja instalar
    una version diferente a la mayor (3)

    para instalar una version diferente:
    
            npm i uuid@2.3.1

## Desinstalar paquetes
    
    npm uninstall <package>
    npm un <package>
    npm rm <package>

## Documentacion de los modulos 
    [pagina ofical npm][npm]. 

[npm]: www.npmjs.com 










