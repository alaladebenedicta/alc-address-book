var data = [
    {
        "firstname": "Alalade",
        "lastname": "Benedicta",
        "phone_number":"09039121087",
         "email":"akian@gmail.com"
    },
    {
        "firstname": "Akinola",
        "lastname": "Ayo",
        "phone_number":"09039121087",
         "email":"akian@gmail.com"
    }
];

var newContact = document.querySelector(".new-contact-wrapper");
var displayContact = document.querySelector(".display-contact-wrapper")
var contactsWrapper = document.querySelector(".contact-lists");
var form = document.querySelector(".form");
var input = document.querySelectorAll(".input");
var editMode = false;
var editIndex = null;

function addEventListeners(){

    var addButton = document.querySelector('.add-button');
    var closeButton = document.querySelector('.close-button');
    var discardButton  = document.querySelector(".discard-button");



    addButton.addEventListener("click", function(){
        newContact.classList.add("wrapper-show")
    });

    discardButton.addEventListener("click", function(){
        for(var x=0; x < input.length; x++){
            input[x].value = "";
        }
        newContact.classList.remove("wrapper-show")
    });

    closeButton.addEventListener("click", function(){
        displayContact.classList.remove("wrapper-show")
    });



}

addEventListeners();

// Image uploader function 
function imageUploader (){
    var input = document.querySelectorAll('#image');
    [].forEach.call(input, function(x){
        x.addEventListener('change', function(e){
        document.getElementById('icon').classList.add('hide');
        var image = x.files;
         for(var ii in image){
              var reader = new FileReader();
              var data = image[ii]
              reader.onload = function(){
                  document.getElementById('img-holder').src = reader.result;
                  document.getElementById('img-holder').classList.remove('hide');
              }
             reader.readAsDataURL(e.target.files[0]);
            }
        })
    });  
    // Write method to get image path or something
}

imageUploader();

    

    function displayContacts(){
    
        for(var i in data){
            var div = document.createElement("div");
            var button = document.createElement("button");
    
            div.onclick = function(e){
    
                if(e.target.tagName == "BUTTON")
    
                return;
                displayContact.classList.add("wrapper-show");
                var index = this.getAttribute("data-index")
                var currentdata = data[index];
    
                contactDetails(currentdata);
                editContact(index);
            }
    
    
            button.onclick = function(){
                var index = parseInt(this.getAttribute("data-index"));
                delete data[index];
    
                contactsWrapper.innerHTML = "";
                displayContacts();
    
            }
    
            div.textContent = `${data[i].firstname}  ${data[i].lastname}`;
            div.className = "detail";
            div.setAttribute("data-index", i);
    
            button.className = "delete-btn fa-trash";
            button.setAttribute("data-index", i);
            div.appendChild(button);
    
            contactsWrapper.appendChild(div);
        }
    
    }
    
    function addContact(){
        var saveButton = document.querySelector('.save-button');
    
        var newdata ={};
        form.addEventListener("submit", function(e){
            e.preventDefault();
    
    
            for(var i=1; i < e.target.length -1; i++){
                var name = e.target[i].name;
                newdata[name] = e.target[i].value;
                e.target[i].value = "";
            }
            if(editMode){
                data[editIndex] = newdata;
            }else{
                data.push(newdata);
            }
    
    
            newContact.classList.remove("wrapper-show");
            contactsWrapper.innerHTML = "";
            displayContacts();
            editMode = false;
    
        });
    }
    
    function contactDetails( currentdata){
        var name = document.querySelector(".name");
        var phone_number = document.querySelector(".phone-number");
        var email = document.querySelector(".email");
    
        name.innerHTML = currentdata.firstname+" "+ currentdata.lastname;
        phone_number.innerHTML  = currentdata.phone_number;
        email.innerHTML  = currentdata.email;
    }
    
    function editContact(index){
        var editButton  = document.querySelector(".edit-button");
        var dataToEdit = data[index];
    
        editButton.addEventListener("click", function(){
            var heading = document.querySelector(".heading");
            heading.innerHTML = "EDIT";
    
            newContact.classList.add("wrapper-show");
            displayContact.classList.remove("wrapper-show");
    
            editMode = true;
            editIndex = index;
            for(var x=0; x < input.length; x++){
                var key = input[x].name;
                input[x].value = data[index][key]
            }
        })
    }
    
    displayContacts();
    addContact();
    