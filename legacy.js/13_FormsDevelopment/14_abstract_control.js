function isEmpty(s) {
	var i;
	if ((s == null) || (s.length == 0))
		return true;
	// �������� ������ �� ������� ��������, �������� �� ��������
	for (i=0; i<s.length; i++) {
		var c = s.charAt(i);
		if (whitespace.indexOf(c) == -1)
			return false;
	}
	// ����� ��� ������� �������� ��������� ������� ������������.
	return true;
}

function isEmail(field) {
	var positionOfAt;
	var s = field.value;
	if (isEmpty(s)) {
		alert("����� �� ������ ���� ������");
		field.focus();
		return false;
	}
	positionOfAt = s.indexOf('@',1);
	if ((positionOfAt == -1) || (positionOfAt == (s.length-1))) {
		alert("����� ����� ������������ ������!");
		field.focus();
		return false;
	}
	return true;
}

function isEmail_re(field) {
	var s = field.value;
	if (isEmpty(s)) {
		alert("����� �� ������ ���� ������");
		field.focus();
		return false;
	}
	if (/[^@]+@[^@]+/.test(s))
		return true;
	alert("����� ����� ������������ ������!");
	field.focus();
	return false;
}

function isDigit(c) {
	return ((c >= '0') && (c <= '9'))
	// ������ � �������������� ����������� ���������
	// return /^\d$/.test(c);
}

function isInteger(s) {
	var i=0, c;
	if (isEmpty(s))
		return false;
	if (s.charAt(i) == '-')
		i++;
	for (i=0; i<s.length; i++) {
		// �������� ����, ��� ��� ������� ����������� �������
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