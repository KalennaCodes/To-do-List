// SELECT ELEMENTS
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//CLASS NAMES
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//variables
let LIST = []
, id = 0;


//load items to the users interface
function addToDo(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
} 

// clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});


// SHOW TODAYS DATE 

const options = { weekday: "long", month: "short", day: "numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//FUNCTION TO DO

function addToDo( toDo, id, done, trash ) {

if(trash) { return; }

const DONE = done ? CHECK : UNCHECK;
const LINE = done ? LINE_THROUGH : "";

const item = `<li class="item">
                <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                <p class="text ${LINE}"> ${toDo} </p>
                <i class="fa fa-trash-o de" job="delete" id="${id}"></i>    
                </li>`;

const position = "beforeend";

list.insertAdjacentHTML(position, item);

}
// add item to the list when user hits enter key
document.addEventListener("keyup",function(event) {
    if(event.keyCode == 13){
        const toDo = input.value; 
        // if the input isnt empty
        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false          
        });
        input.value = "";  
            id++; }
}
});

// complete to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}
//remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

// target the items created dynamically
list.addEventListener("click", function(event) {
    const element = event.target; // return the clicked element inside list
    const elementJob = event.target.attributes.job.value; //complete or delete

    if(elementJob == "complete"){
        completeToDo(element);
    } else if(elementJob == "delete"){
        removeToDo(element);
    }

});