// ����������� �������� ������� ������������
var whitespace = " \t\n\r";
function isEmpty(s) {
	var i;
	if((s == null) || (s.length == 0))
		return true;
	// �������� ������ �� ������� ��������, �������� �� ��������
	for (var i=0; i<s.length; i++) {
		var c = s.charAt(i);
		if (whitespace.indexOf(c) == -1)
			return false;
	}
	// ����� ��� ������� �������� ��������� ������� ������������
	return true;
}
// �������� �� ��� ������
function isWord(s) {
	var wPattern = /^[a-z�-�]*$/i;
	if (wPattern.test(s))
		return true;
	else
		return false;
}
// �������� ����� ������������
function listenUserName(inputId, errorId) {
	if (!inputId || !errorId)
		return;
	var userTxt = inputId.value;
	var errorContent = document.getElementById(errorId);
	if (isEmpty(userTxt)) {
		if (errorContent.hasChildNodes())
			errorContent.removeChild(errorContent.lastChild);
		var empty = document.createTextNode("��� �� ������ ���� ������");
		errorContent.appendChild(empty);
		return;
	}
	if (!isWord(userTxt)) {
		if (errorContent.hasChildNodes())
			errorContent.removeChild(errorContent.lastChild);
		var notWord = document.createTextNode("��� ������ �������� �� �������� ��������");
		errorContent.appendChild(notWord);
		return;
	}
	if (errorContent.hasChildNodes())
		errorContent.removeChild(errorContent.lastChild);
}
// �������� ������� ������������
function listenSecondName(inputId, errorId) {
	if (!inputId || !errorId)
		return;
	var userTxt = inputId.value;
	var errorContent = document.getElementById(errorId);
	if (!isEmpty(userTxt) && !isWord(userTxt)) {
		if (errorContent.hasChildNodes())
			errorContent.removeChild(errorContent.lastChild);
		var notWord = document.createTextNode("������� ������ �������� �� �������� ��������");
		errorContent.appendChild(notWord);
		return;
	}
	if (errorContent.hasChildNodes())
		errorContent.removeChild(errorContent.lastChild);
}
// �������� ������
function listenPassword(inputId, errorId, numChars) {
	if (!inputId || !errorId)
		return;
	var passTxt = inputId.value;
	var errorContent = document.getElementById(errorId);
	numChars = parseInt(numChars);
	if (typeof numChars != "number")
		return;
	if (isEmpty(passTxt)) {
		if (errorContent.hasChildNodes())
			errorContent.removeChild(errorContent.lastChild);
		var emptyPass = document.createTextNode("������ �� ������ ���� ������");
		errorContent.appendChild(emptyPass);
		return;
	}
	// ���������� �������� ������ ������ ���� �� ������ numChars
	if (passTxt.length < numChars) {
		if (errorContent.hasChildNodes())
			errorContent.removeChild(errorContent.lastChild);
		var tooSmall = document.createTextNode("������ �� ������ ���� ������ "+numChars+" ��������");
		errorContent.appendChild(tooSmall);
		return;
	}
	if (errorContent.hasChildNodes())
		errorContent.removeChild(errorContent.lastChild);
}
// ��� �� ������� ������������������
function checkSexStatus(radiogroup) {
	var numradios = radiogroup.length;
	for (var i=0; i<numradios; i++)
		if (radiogroup[i].checked)
			return true;
	return false;
}
// �������� ������ ����������� �����
function checkEmail(inputId, errorId) {
	if (!inputId || !errorId)
		return;
	var emailfilter = /^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,6}|\d+)$/i;
	var emailTxt = inputId.value;
	var errorContent = document.getElementById(errorId);
	if (isEmpty(emailTxt)) {
		if (errorContent.hasChildNodes())
			errorContent.removeChild(errorContent.lastChild);
		var empty = document.createTextNode("������� ����� ����������� �����");
		errorContent.appendChild(empty);
		return;
	}
	if (emailfilter.test(emailTxt) == false) {
		if (errorContent.hasChildNodes())
			errorContent.removeChild(errorContent.lastChild);
		var errorMail = document.createTextNode("������������ ����� ����������� �����");
		errorContent.appendChild(errorMail);
		return;
	}
	if (errorContent.hasChildNodes())
		errorContent.removeChild(errorContent.lastChild);
}
// ��������-��� ��� �������� ����� ������
function textCounter(field, counter, maxlimit, linecounter) {
	// text width
	var fieldWidth =  parseInt(field.offsetWidth);
	var charcnt = field.value.length;
	// trim the extra text
	if (charcnt > maxlimit) { 
		field.value = field.value.substring(0, maxlimit);
	}
	else { 
		// progress bar percentage
		var percentage = parseInt(100 - (( maxlimit - charcnt) * 100)/maxlimit);
		document.getElementById(counter).style.width =  parseInt((fieldWidth*percentage)/100)+"px";
		document.getElementById(counter).innerHTML="������: "+percentage+"%";
		// color correction on style from CCFFF -> CC0000
		setcolor(document.getElementById(counter),percentage,"background-color");
	}
}
// ��������� ��� �������� ����� RGB
function setcolor(obj,percentage,prop){
	obj.style[prop] = "rgb(80%,"+(100-percentage)+"%,"+(100-percentage)+"%)";
}
// �������� ������� checkbox
function checkListener(inputId, contId) {
	if (!inputId || !contId) return;
	var checkFlag = inputId.checked;
	var cont = document.getElementById(contId);
	if (checkFlag) {
		if (cont.hasChildNodes()) cont.removeChild(cont.lastChild);
		var msg = document.createTextNode("��� ����� ����������� � �����������");
		cont.appendChild(msg);
		return;
	}
	else if (cont.hasChildNodes()) cont.removeChild(cont.lastChild);
}