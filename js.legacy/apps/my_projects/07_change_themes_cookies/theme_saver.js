// ������, ���������� �������� cookie
var cookies = new Object();
// ��������� ����, ��� �� ������������ ����� �����
document.cookie = "cookieenabled=yes";
extractCookies();
if (cookies["cookieenabled"] == "yes") {
    if (cookies["returninguser"] == "true") { // ���� ������������ ��� ������� ��������
        changePageStyle(cookies["pageStyle"]);
    }
    else { // ���� ������������ ����� �������
        var expiration = new Date();
        expiration.setMonth(expiration.getMonth() + 1);
        // ������������� ������� ���� ���������� �� �����
        document.cookie = "pageStyle=sky; expires="+expiration.toGMTString();
        document.cookie = "returninguser=true; expires="+expiration.toGMTString();
    }
}
// ������� ���������� ������ cookie � ��������������� ������
function extractCookies() {
  var name, value;
  var beginning, middle, end;
  for (name in cookies) {
    // ���� ������� ��������, ������� ��
    cookies = new Object();
    break;
  }
  beginning = 0;  // ������ � ������ ������ cookie
  while (beginning < document.cookie.length) {
    middle = document.cookie.indexOf('=', beginning);   // ����� '='
    end = document.cookie.indexOf(';', beginning);  // ����� ';'
    if (end == -1) // ���� ��� ';', �� ��� ��������� ���� cookie
      end = document.cookie.length;
    if ((middle > end) || (middle == -1)) {
      // ���� ���� cookie �� ����� ��������...
      name = document.cookie.substring(beginning, end);
      value = "";
    }
    else {  // ������� �������� ����
      name = document.cookie.substring(beginning, middle);
      value = document.cookie.substring(middle + 1, end);
    }
    cookies[name] = unescape(value);    // �������� � ������
    beginning = end + 2;    // ������� �� ������ ���������� ����
   }
}
// ������� ����� ���� ���������� ��������
function changePageStyle(styleName) {
  var oLink = document.getElementById("linkStyle");
  var cookieTimer = new Date();
  cookieTimer.setMonth(cookieTimer.getMonth()+1); 
  switch (styleName) {
    case "sky":
      oLink.href = "main_layout.css";
      document.cookie = "pageStyle=sky; expires="+cookieTimer.toGMTString();
      break;
    case "twilight":
      oLink.href = "silver_layout.css";
      document.cookie = "pageStyle=twilight; expires="+cookieTimer.toGMTString();
      break;
    case "eclipse":
      oLink.href = "pink_layout.css";
      document.cookie = "pageStyle=eclipse; expires="+cookieTimer.toGMTString();
      break;
    default:
      return;
  }
}
// ��������� �������� ������������� �� ������� ����
function noteCurrentTheme() {
    if (cookies["pageStyle"] == "sky") {
        var currentRadio = document.getElementById("sky");
        currentRadio.checked = true;
    }
    else if (cookies["pageStyle"] == "twilight") {
        var currentRadio = document.getElementById("twilight");
        currentRadio.checked = true;
    }
    else if (cookies["pageStyle"] == "eclipse") {
        var currentRadio = document.getElementById("eclipse");
        currentRadio.checked = true;
    }
}
