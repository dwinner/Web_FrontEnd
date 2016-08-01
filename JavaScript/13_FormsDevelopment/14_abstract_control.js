function isEmpty(s) {
	var i;
	if ((s == null) || (s.length == 0))
		return true;
	// Проверка строки на наличие символов, отличных от пробелов
	for (i=0; i<s.length; i++) {
		var c = s.charAt(i);
		if (whitespace.indexOf(c) == -1)
			return false;
	}
	// Здесь все символы являются символами пустого пространства.
	return true;
}

function isEmail(field) {
	var positionOfAt;
	var s = field.value;
	if (isEmpty(s)) {
		alert("Адрес не должен быть пустым");
		field.focus();
		return false;
	}
	positionOfAt = s.indexOf('@',1);
	if ((positionOfAt == -1) || (positionOfAt == (s.length-1))) {
		alert("Адрес имеет недопустимый формат!");
		field.focus();
		return false;
	}
	return true;
}

function isEmail_re(field) {
	var s = field.value;
	if (isEmpty(s)) {
		alert("Адрес не должен быть пустым");
		field.focus();
		return false;
	}
	if (/[^@]+@[^@]+/.test(s))
		return true;
	alert("Адрес имеет недопустимый формат!");
	field.focus();
	return false;
}

function isDigit(c) {
	return ((c >= '0') && (c <= '9'))
	// Версия с использованием регулярного выражения
	// return /^\d$/.test(c);
}

function isInteger(s) {
	var i=0, c;
	if (isEmpty(s))
		return false;
	if (s.charAt(i) == '-')
		i++;
	for (i=0; i<s.length; i++) {
		// Проверка того, что все символы оказываются числами
		c = s.charAt(i);
		if (!isDigit(c))
			return false;
	}
	return true;
}

function isInteger_re(s) {
	return /^-?\d+$/.test(s);
}

function isIntegerInRange(s, min, max) {
	if (isEmpty(s))
		return false;
	if (!isInteger(s))
		return false;
	var num = parseInt(s);
	return ((num >= min) && (num < max));
}