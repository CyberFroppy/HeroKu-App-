//Se incluye mongoose, paquete encargado de linkear mongo con node
let mongoose = require('mongoose');
//Se le dice al sistema que se usaran promesas.
mongoose.Promise = global.Promise;

// schema palabra reservada, en mongoose es para crear nuestra coleccion

// 
let studentCollection = mongoose.Schema({
    nombre:{type: String},
    apellido: {type : String},
    matricula: {type:Number,
                required:true,
                unique:true
                }
});
//Usando la coleccion creada en mongo
let Student = mongoose.model('students',studentCollection);
//Para hacer un insert se usara la variable que se acaba de crear "Student"

let StudentList = {
    getAll: function(){
        return Student.find()
        //Promesa
        .then(students =>{
            return students;
        })
        //Por si falla algo en la base de datos
        .catch(error=>{
            throw Error(error);
        })
    }
};
module.exports = {
    StudentList
};
