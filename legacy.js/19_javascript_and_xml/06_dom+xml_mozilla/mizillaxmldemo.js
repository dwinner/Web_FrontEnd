function deleteLastElement() {
	/* ��������� ������ ��������� employee */
	var employeeList = document.getElementsByTagName('employee');
	if (employeeList.length > 0) {
		// ����� ��������� employee � ������� ���
		var toDelete = employeeList.item(employeeList.length-1);
		document.documentElement.removeChild(toDelete);
	}
	else
		alert('��� ��������� employee ��� ��������');
}

function addElement() {
    var rootElement = document.documentElement;
    
    /* �������� �������� employee */
    var newEmployee = document.createElement('employee');
    
    /* �������� � ���������� ��������� �������� � ��������� �������� */
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
    
    /* ���������� ������� ������ � �������� */
    rootElement.appendChild(newEmployee);
}
