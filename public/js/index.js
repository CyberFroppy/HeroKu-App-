import { response } from "express";

function loadStudents(){
    let url = '/api/estudiantes';
    let settings = {
        method:'GET'
    };
    fetch(url,settings){
        .then (response => {
            if(response.ok){
                return response.json();
            }
        })
        .then(responseJSON =>{
            displayResults(responseJSON);
        });
    }

}
function displayResults(responseJSON){
    $('studentList').empty();
    
    for(let i = 0;i < responseJSON.length;i++){
        
    }
}
function init(){
    loadStudents();
}
init();