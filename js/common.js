var todoArr = [];
window.onload = function(){

  if (localStorage.getItem('todo')!=undefined) {
    todoArr = JSON.parse(localStorage.getItem('todo'));
    createAllEl(todoArr);
  }
IfListEmpty();
}

function IfListEmpty(){
  var listOfEl = document.getElementsByTagName("li");
  var list = document.getElementById('list_of_tasks');
  if(listOfEl.length == 0){
    var noTask = document.createElement("div");
    noTask.className = 'noTask';
    var txt = document.createTextNode("no tasks in your list");
    noTask.appendChild(txt);
    list.appendChild(noTask);
  }
}


var ul_list = document.querySelector("ul");
ul_list.addEventListener('click',function(e){
  if(e.target.tagName === 'IMG'){
    e.target.parentElement.parentElement.classList.toggle("checked");
    if(e.target.parentElement.parentElement.classList.contains("checked")){
      e.target.src = 'images/moon.svg';
    }
    else {
      e.target.src = 'images/saturn.svg';
    }
    getState();
  }
  if(e.target.className === 'close'){
    e.target.parentElement.parentElement.removeChild(e.target.parentElement);
    getState();
    IfListEmpty();
  }
},false);


function addTask(){
  var input_space = document.getElementById('task_input');
  var input_text = input_space.value;
  var new_task = document.createElement("li");
  var p = document.createElement("p");
  var task_text = document.createTextNode(input_text);
  p.appendChild(task_text);
  var list = document.getElementById('list_of_tasks');
  if(input_text === ''){
        alert("Input task text!");
  }
  else{
    var close = document.createElement("div");
    var disk = document.createElement("div");
    var img = document.createElement("img");
    img.src = 'images/saturn.svg';
    disk.className = 'disk';
    disk.appendChild(img);
    var text = document.createTextNode("-");
    close.className = 'close';
    close.appendChild(text);
    new_task.appendChild(disk);
    new_task.appendChild(p);
    new_task.appendChild(close);
    list.appendChild(new_task);
    input_space.value = '';
    var noTask = list.getElementsByClassName('noTask');
    if (noTask.length != 0) {
      noTask[0].parentElement.removeChild(noTask[0]);
    }
    closePopup();
    getState();
  }
}

function openPopup(){
  var popup = document.getElementById("popup_task");
  popup.style.transform = "scale(1)";
}
function closePopup(){
  var popup = document.getElementById("popup_task");
  popup.style.transform = "scale(0)";
}



function getState(){
  todoArr =[];
  var listOfEl = document.getElementsByTagName("li");
  for(var i = 0; i<listOfEl.length; i++){
    var todoObj = {
      isChecked: false,
      str: ''
    }
    if(listOfEl[i].classList.contains("checked")){
      todoObj.isChecked = true;
    }
    var p = listOfEl[i].querySelector("p");
    todoObj.str = p.textContent;
    todoArr[i]=todoObj;
  }
  localStorage.clear();
  localStorage.setItem('todo',JSON.stringify(todoArr));
}

function createAllEl(obj){
  for (var i = 0; i < obj.length; i++) {
  var new_task = document.createElement("li");
  var p = document.createElement("p");
  var task_text = document.createTextNode(obj[i].str);
  p.appendChild(task_text);
  var list = document.getElementById('list_of_tasks');
  var close = document.createElement("div");
  var disk = document.createElement("div");
  var img = document.createElement("img");
  if(obj[i].isChecked == true){
    new_task.className = 'checked';
    img.src = 'images/moon.svg';
  }
  else{
  img.src = 'images/saturn.svg';
  }
  disk.className = 'disk';
  disk.appendChild(img);
  var text = document.createTextNode("-");
  close.className = 'close';
  close.appendChild(text);
  new_task.appendChild(disk);
  new_task.appendChild(p);
  new_task.appendChild(close);
  list.appendChild(new_task);
}
}
