// Определение символов пустого пространства
var whitespace = " \t\n\r";
function isEmpty(s) {
	var i;
	if((s == null) || (s.length == 0))
		return true;
	// проверка строки на наличие символов, отличных от пробелов
	for (var i=0; i<s.length; i++) {
		var c = s.charAt(i);
		if (whitespace.indexOf(c) == -1)
			return false;
	}
	// Здесь все символы являются символами пустого пространства
	return true;
}
// Является ли имя словом
function isWord(s) {
	var wPattern = /^[a-zа-я]*$/i;
	if (wPattern.test(s))
		return true;
	else
		return false;
}
// Проверка имени пользователя
function listenUserName(inputId, errorId) {
	if (!inputId || !errorId)
		return;
	var userTxt = inputId.value;
	var errorContent = document.getElementById(errorId);
	if (isEmpty(userTxt)) {
		if (errorContent.hasChildNodes())
			errorContent.removeChild(errorContent.lastChild);
		var empty = document.createTextNode("Имя не должно быть пустым");
		errorContent.appendChild(empty);
		return;
	}
	if (!isWord(userTxt)) {
		if (errorContent.hasChildNodes())
			errorContent.removeChild(errorContent.lastChild);
		var notWord = document.createTextNode("Имя должно состоять из символов алфавита");
		errorContent.appendChild(notWord);
		return;
	}
	if (errorContent.hasChildNodes())
		errorContent.removeChild(errorContent.lastChild);
}
// Проверка фамилии пользователя
function listenSecondName(inputId, errorId) {
	if (!inputId || !errorId)
		return;
	var userTxt = inputId.value;
	var errorContent = document.getElementById(errorId);
	if (!isEmpty(userTxt) && !isWord(userTxt)) {
		if (errorContent.hasChildNodes())
			errorContent.removeChild(errorContent.lastChild);
		var notWord = document.createTextNode("Фамилия должна состоять из символов алфавита");
		errorContent.appendChild(notWord);
		return;
	}
	if (errorContent.hasChildNodes())
		errorContent.removeChild(errorContent.lastChild);
}
// Проверка пароля
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
		var emptyPass = document.createTextNode("Пароль не должен быть пустым");
		errorContent.appendChild(emptyPass);
		return;
	}
	// Количество символов пароля должно быть не меньше numChars
	if (passTxt.length < numChars) {
		if (errorContent.hasChildNodes())
			errorContent.removeChild(errorContent.lastChild);
		var tooSmall = document.createTextNode("Пароль не должен быть меньше "+numChars+" символов");
		errorContent.appendChild(tooSmall);
		return;
	}
	if (errorContent.hasChildNodes())
		errorContent.removeChild(errorContent.lastChild);
}
// Был ли отмечен радиопереключатель
function checkSexStatus(radiogroup) {
	var numradios = radiogroup.length;
	for (var i=0; i<numradios; i++)
		if (radiogroup[i].checked)
			return true;
	return false;
}
// Проверка адреса электронной почты
function checkEmail(inputId, errorId) {
	if (!inputId || !errorId)
		return;
	var emailfilter = /^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,6}|\d+)$/i;
	var emailTxt = inputId.value;
	var errorContent = document.getElementById(errorId);
	if (isEmpty(emailTxt)) {
		if (errorContent.hasChildNodes())
			errorContent.removeChild(errorContent.lastChild);
		var empty = document.createTextNode("Введите адрес электронной почты");
		errorContent.appendChild(empty);
		return;
	}
	if (emailfilter.test(emailTxt) == false) {
		if (errorContent.hasChildNodes())
			errorContent.removeChild(errorContent.lastChild);
		var errorMail = document.createTextNode("Некорректный адрес электронной почты");
		errorContent.appendChild(errorMail);
		return;
	}
	if (errorContent.hasChildNodes())
		errorContent.removeChild(errorContent.lastChild);
}
// Прогресс-бар для контроля ввода текста
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
		document.getElementById(counter).innerHTML="Предел: "+percentage+"%";
		// color correction on style from CCFFF -> CC0000
		setcolor(document.getElementById(counter),percentage,"background-color");
	}
}
// Коррекция для цветовой гаммы RGB
function setcolor(obj,percentage,prop){
	obj.style[prop] = "rgb(80%,"+(100-percentage)+"%,"+(100-percentage)+"%)";
}
// Проверка отметки checkbox
function checkListener(inputId, contId) {
	if (!inputId || !contId) return;
	var checkFlag = inputId.checked;
	var cont = document.getElementById(contId);
	if (checkFlag) {
		if (cont.hasChildNodes()) cont.removeChild(cont.lastChild);
		var msg = document.createTextNode("Вам придёт уведомление о регистрации");
		cont.appendChild(msg);
		return;
	}
	else if (cont.hasChildNodes()) cont.removeChild(cont.lastChild);
}