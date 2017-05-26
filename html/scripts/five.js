var i = 0;
var addTask = function() { 
	i += 1;
	var taskItem = document.taskForm.taskListItem.value;
	var list = document.getElementById("taskList");

	var checkbox = document.createElement('input');
	checkbox.type = "checkbox";
	checkbox.onclick = function(){ setDone(this.parentNode.id)};

	var newItem = document.createElement("li");
	newItem.id = 'item' + i;
	newItem.appendChild(checkbox);
	newItem.appendChild(document.createTextNode(taskItem));
	list.appendChild(newItem);
}

var setDone = function (item) {
    document.getElementById(item).className = "checked-off";
};

