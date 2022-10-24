let saveBtn = document.querySelector('.save');
let cancelBtn =  document.querySelector('.cancel');
let form = document.querySelector('.form-wrapper');
var editFormData;

cancelBtn.onclick=function(){
    form.classList.remove('active')
}

function getFormData() {
    return {

        id: document.getElementById("id").value,

        current_client: document.getElementById("current_client").value,

        date_of_purchase: document.getElementById("date_of_purchase").value,

        description: document.getElementById("description").value,

        device_id: document.getElementById("device_id").value,

        ip_address: document.getElementById("ip_address").value,

        make: document.getElementById("make").value,

        manufacturer: document.getElementById("manufacturer").value,

        model: document.getElementById("model").value,

        os: document.getElementById("os").value,

        phno: document.getElementById("phno").value,

        serial_number: document.getElementById("serial_number").value,

        server_connected: document.getElementById("server_connected").value,

        status: document.getElementById("status").value,

        type_of_device: document.getElementById("type_of_device").value,

       

    }

}
function clearFormData() {


        document.getElementById("id").value = "";
    
        document.getElementById("type_of_device").value="";

        document.getElementById("manufacturer").value="";

        document.getElementById("make").value="";

        document.getElementById("model").value="";

        document.getElementById("os").value="";

        document.getElementById("date_of_purchase").value="";

        document.getElementById("current_client").value="";

        document.getElementById("device_id").value="";

        document.getElementById("serial_number").value="";

        document.getElementById("status").value="";

        document.getElementById("ip_address").value="";

        document.getElementById("description").value="";

        document.getElementById("phno").value="";

}

function setFormData(id,current_client, date_of_purchase, description, device_id, ip_address, make, manufacturer, model, os, phno, serial_number, server_connected, status, type_of_device) {


    document.getElementById("id").value = id;

    document.getElementById("current_client").value = current_client;

    document.getElementById("date_of_purchase").value = date_of_purchase;

    document.getElementById("description").value = description;

    document.getElementById("device_id").value = device_id;

    document.getElementById("ip_address").value = ip_address;

    document.getElementById("make").value = make;

    document.getElementById("manufacturer").value = manufacturer;

    document.getElementById("model").value = model;

    document.getElementById("os").value = os;

    document.getElementById("phno").value = phno;

    document.getElementById("serial_number").value = serial_number;

    document.getElementById("server_connected").value = server_connected;

    document.getElementById("status").value = status;

    document.getElementById("type_of_device").value = type_of_device;

    

}
function setSuccessMessage(message) {
    document.getElementById("message").innerHTML = message;
}

function add(){

    form.classList.add('active');
    

}

function editDatacall(id) {

    form.classList.add('active');
    console.log(serial_number);
    // call get user details by id API
    fetch("http://54.190.172.169:8080/byod/" + id, {
        method: "GET",
        mode: "cors",
    }).then((res) => res.json()).then((response) => {
        console.log("Edit info", response);
        editFormData = response;
        console.log(editFormData);
        setFormData(editFormData.id,editFormData.current_client, editFormData.date_of_purchase, editFormData.description, editFormData.device_id, editFormData.ip_address, editFormData.make, editFormData.manufacturer, editFormData.model, editFormData.os, editFormData.phno, editFormData.serial_number, editFormData.server_connected, editFormData.status, editFormData.type_of_device)

    })
}

function submitForm() {
    if (!editFormData){
        addByod(); // if the editFormData is undefined then call addUser()

    } 
    else editData();
}

function addByod() {
    //debugger;


    //form.classList.add('active');
    let payload = getFormData();
     fetch("http://54.190.172.169:8080/postbyod", {
         method: "POST", mode: "cors",
         headers: {
            "Content-Type": "application/json"
        }, 
         body: JSON.stringify(payload)
     }).then((res) => res.json()).then((response) => {
         //setSuccessMessage(response.message)
         // clear input email and name
         clearFormData();
         cancelBtn.onclick=function(){
            form.classList.remove('active')
        }
         getData();
         
     })
     

    /*const http = new XMLHttpRequest();
    http.open('POST','http://localhost:8080/postmobile');
    http.setRequestHeader('Content-Type','application/json');
    http.send(JSON.stringify(payload));
    http.onload= function(){
        console.log(http.responseText)
    }*/
}


function editData() {

    //debugger;
    var formData = getFormData();
    formData['id'] = editFormData.id; // get _id from selected user
    fetch("http://54.190.172.169/putbyod",  {
        method: "PUT", mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    }).then((res) => res.json()).then((response) => {
        setSuccessMessage(response.message)
        clearFormData();
        cancelBtn.onclick=function(){
            form.classList.remove('active')
        } // clear the form field
        getData(); // reload the table
    })
}

function getData() {
    fetch("http://54.190.172.169:8080/byod").then(
        (res) => res.json()
    ).then((response) => {
        var tmpData = "";
        console.log(response);
        response.forEach((user) => {
            tmpData += "<tr>"
            tmpData += "<td>" + user.id + "</td>";
            tmpData += "<td>" + user.current_client + "</td>";
            tmpData += "<td>" + user.date_of_purchase + "</td>";
            tmpData += "<td>" + user.description + "</td>";
            tmpData += "<td>" + user.device_id + "</td>";
            tmpData += "<td>" + user.ip_address + "</td>";
            tmpData += "<td>" + user.make + "</td>";
            tmpData += "<td>" + user.manufacturer + "</td>";
            tmpData += "<td>" + user.model + "</td>";
            tmpData += "<td>" + user.os + "</td>";
            tmpData += "<td>" + user.phno + "</td>";
            tmpData += "<td>" + user.serial_number + "</td>";
            tmpData += "<td>" + user.server_connected + "</td>";
            tmpData += "<td>" + user.status + "</td>";
            tmpData += "<td>" + user.type_of_device + "</td>";
            tmpData += "<td><button class='btn btn-primary' onclick='editDatacall(`" + user.id + "`)'>Edit</button></td>";
            //tmpData += "<td><button class='btn btn-danger' onclick='onDelete(this)'>Delete</button></td>";
            tmpData += "</tr>";
        })
        document.getElementById("taData").innerHTML = tmpData;
    })
}
getData();


//Delete the data
/*function onDelete(td) {
    /*if (confirm('Do you want to delete this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById('tab').deleteRow(row.rowIndex);
        clearFormData();

    }
    row = td.parentElement.parentElement;
    document.getElementById('tab').deleteRow(row.rowIndex);
    //clearFormData();
    fetch("http://localhost:8080/byod/" + id, {
        method: "DELETE",
        mode: "cors",
    }).then((res) => res.json()).then((response) => {
        console.log("delete info", response);
        
    })
    
          
}*/

function validateIp(eVal) {

    var val = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;



    if (val.test(eVal)) {

        return true;

    } else {

        return false;

    }

}

$('#ip_address').on('focusout', function () {



    if ($('#ip_address').val() != "") {



        if (validateIp($('#ip_address').val())) {



            $('.error').fadeOut('slow');



        } else {

            $('.error').text('Invalid IP!');

            $('.error').fadeIn('slow');

        }



    } else {

        $('.error').text('IP Required..!');

        $('.error').fadeIn("slow");

    }





});