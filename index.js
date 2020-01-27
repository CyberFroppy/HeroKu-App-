let express = require('express');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
let {StudentList} = require('./model');
let mongoose = require('mongoose');
let app = express();

//segunda capa, parte publica que cuando cargue el browser va a agregar el index.html por default,
//se debe agregar en una carpeta con el nombre public.
app.use(express.static('public'));
app.use(morgan('dev') );
//Middleware es una funcion para procesar request, se ejecuta primero lo que se especifique y ya que se ejecuta prosigue 
//con el endpoint (segundo parametro, si no hay se deja en blanco)

app.get('/api/estudiantes', (req,res)=>{
    StudentList.getAll()
    .then(StudentList=>{
        return res.status(200).json(StudentList);
    })
    .catch(error=>{
        console.log(error);
        res.statusMessage = "Hubo un error de conexion con la BD";
        return res.status(500).send();
    })
});
//Otro endpoint
app.get('/api/getById',(req,res)=>{
    let id = req.query.id;
    let result = estudiantes.find((elemento)=>{
        if(elemento.matricula == id){
            return elemento;
        }
    });
    if(result){
        res.status(200).json(result);
    }
    else{
        res.statusMessage = "Alumno no se encuentra en la lista";
        res.status(404).send();
    }
});
//Otro endpoint
app.get('/api/getByName/:name',(req,res)=>{
    let name = req.params.name;
    let result = estudiantes.filter((elemento)=>{
        if(elemento.nombre === name){
            return elemento;
        }
    });
    if(result.length > 0){
        res.status(200).json(result);
    }
    else{
        res.statusMessage = "Alumno no se encuentra en la lista";
        res.status(404).send();
    }
});
/*
//Metodo Post
app.post('/api/newStudent',jsonParser, (req,res)=>{
    const newStudents = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        matricula: req.body.matricula
    }
    if()
    console.log(req.body);
    return res.status(200).json({});
});
//Metodo Put 
app.put('/api/updateStudent/:id',jsonParser,(req,res)=>{   
    
});
app.delete('/api/deleteStudenet?id=matricula',jsonParser,(req,res)=>{

})*/
//Metodo listen, primer parametro es el numero de puerto y el segundo es una funcion anonima
let server;
function runServer(port, databaseUrl){
    return new Promise( (resolve, reject ) => {
        mongoose.connect(databaseUrl, response => {
            if ( response ){
                return reject(response);
            }
            else{
                server = app.listen(port, () => {
                console.log( "App is running on port " + port );
                resolve();
            })
                .on( 'error', err => {
                mongoose.disconnect();
                return reject(err);
                })
            }
        });
    });
}
   
function closeServer(){
    return mongoose.disconnect()
        .then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing the server');
            server.close( err => {
                if (err){
                    return reject(err);
                }
                else{
                    resolve();
                }
            });
        });
    });
}
runServer(8080,"mongodb://localhost/university");
module.exports = {app, runServer,closeServer};
