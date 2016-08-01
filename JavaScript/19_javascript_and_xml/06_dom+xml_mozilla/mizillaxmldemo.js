function deleteLastElement() {
	/* получение списка элементов employee */
	var employeeList = document.getElementsByTagName('employee');
	if (employeeList.length > 0) {
		// найти последний employee и удалить его
		var toDelete = employeeList.item(employeeList.length-1);
		document.documentElement.removeChild(toDelete);
	}
	else
		alert('Ќет элементов employee дл€ удалени€');
}

function addElement() {
    var rootElement = document.documentElement;
    
    /* создание элемента employee */
    var newEmployee = document.createElement('employee');
    
    /* создание и добавление дочернего элемента и текстовых значений */
    var newName = document.createElement('name');
    var newNameText = document.createTextNode(name);
    newName.appendChild(newNameText);
    newEmployee.appendChild(newName);
    
    var newTitle = document.createElement('title');
    var newTitleText = document.createTextNode(title);
    newTitle.appendChild(newTitleText);
    newEmployee.appendChild(newTitle);
    
    var newPhone = document.createElement('phone');
    var newPhoneText = document.createTextNode(phone);
    newPhone.appendChild(newPhoneText);
    newEmployee.appendChild(newPhone);
    
    var newEmail = document.createElement('email');
    var newEmailText = document.createTextNode(email);
    newEmail.appendChild(newEmailText);
    newEmployee.appendChild(newEmail);
    
    /* ƒобавление готовой записи в документ */
    rootElement.appendChild(newEmployee);
}
