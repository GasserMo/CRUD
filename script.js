const { json } = require("body-parser");
const express = require("express");

function validation(){
    var name =document.getElementById("name").value;
    var id =document.getElementById("id").value;
    var age =document.getElementById("age").value;
    var email =document.getElementById("email").value;
    var gender =document.getElementById("gender").value;

    if (name=="") {
        alert("Name is required");
        return false;
    }
    if (age<1) {
        alert("Age must be positve");
        return false;
    }
    if (id=="") {
        alert("ID is required");
        return false;
    }
    if (email=="") {
        alert("Email is required");
        return false;
    }else if (! email.includes("@")) {
        alert("Invalid Email address");
        return false;
    }

    

    if (gender=="") {
        alert("Gender is required");
        return false;
    }
    return true;
}
function showData() {
    var peopleList;
    if (localStorage.getItem("peopleList")== null) {
        peopleList=[];
    }else{
        peopleList=JSON.parse(localStorage.getItem("peopleList"));

    }
    var html="";
    peopleList.forEach(function(element, index){
        html+="<tr>";
        html+="<td>"+element.id+"</td>";
        html+="<td>"+element.name+"</td>";
        html+="<td>"+element.age+"</td>";
        html+="<td>"+element.email+"</td>";
        html+="<td>"+element.gender+"</td>";
        html+=
           '<td><button onclick="deleteData('+
           index+')" class="btn btn-danger">Delete</buttom><button onclick="updateData('+
           index+')" class="btn btn-warning m-2">Edit</buttom></td>';

        html+="</tr>"; 

    });
    document.querySelector("#crudTable tbody").innerHTML =html;
}
// loads all data document
document.onload = showData();


function AddData(){
    if (validation()==true) {
        var name =document.getElementById("name").value;
        var id =document.getElementById("id").value;
        var age =document.getElementById("age").value;
        var email =document.getElementById("email").value;
        var gender =document.getElementById("gender").value;
        var peopleList;
    if (localStorage.getItem("peopleList")== null) {
        peopleList=[];
    }else{
        peopleList=JSON.parse(localStorage.getItem("peopleList"));

    }
    peopleList.push({
        id:id,
        name:name,
        age:age,
        email:email,
        gender:gender
    });
    localStorage.setItem("peopleList",JSON.stringify(peopleList));
    showData();
    document.getElementById("name").value="";
    document.getElementById("id").value="";
    document.getElementById("age").value="";
    document.getElementById("email").value="";
    document.getElementById("gender").value="";
    
    }
}

function deleteData(index){
var peopleList;
if (localStorage.getItem("peopleList")==null) {
    peopleList=[];
}else{
    peopleList =JSON.parse(localStorage.getItem("peopleList"));
}

peopleList.splice(index,1);
localStorage.setItem("peopleList",JSON.stringify(peopleList));
showData();
}

function updateData(index){
    document.getElementById("Submit").style.display="none";
    document.getElementById("Update").style.display="block";

    var peopleList;
    if (localStorage.getItem("peopleList")== null) {
        peopleList=[];
    }else{
        peopleList=JSON.parse(localStorage.getItem("peopleList"));

    }
    document.getElementById("name").value=peopleList[index].name;
    document.getElementById("id").value=peopleList[index].id;
    document.getElementById("age").value=peopleList[index].age;
    document.getElementById("email").value=peopleList[index].email;
    document.getElementById("gender").value=peopleList[index].gender;

    document.querySelector("#Update").onclick=function(){
        if(validation() == true){
            peopleList[index].name =document.getElementById("name").value;
            peopleList[index].id =document.getElementById("id").value;
            peopleList[index].age =document.getElementById("age").value;
            peopleList[index].email =document.getElementById("email").value;
            peopleList[index].gender =document.getElementById("gender").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));
            showData();

            document.getElementById("name").value="";
            document.getElementById("id").value="";
            document.getElementById("age").value="";
            document.getElementById("email").value="";
            document.getElementById("gender").value="";

            document.getElementById("Submit").style.display="block";
            document.getElementById("Update").style.display="none";

        }
    }
}