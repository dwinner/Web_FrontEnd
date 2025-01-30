// Объект, содержащий значения cookie
var cookies = new Object();
// Пореверка того, был ли пользователь здесь ранее
document.cookie = "cookieenabled=yes";
extractCookies();
if (cookies["cookieenabled"] == "yes") {
    if (cookies["returninguser"] == "true") { // Если пользователь уже посещал страницу
        changePageStyle(cookies["pageStyle"]);
    }
    else { // Если пользователь здесь впервые
        var expiration = new Date();
        expiration.setMonth(expiration.getMonth() + 1);
        // Устанавливаем текущую тему оформления на месяц
        document.cookie = "pageStyle=sky; expires="+expiration.toGMTString();
        document.cookie = "returninguser=true; expires="+expiration.toGMTString();
    }
}
// Функция извлечения файлов cookie в соответствующий объект
function extractCookies() {
  var name, value;
  var beginning, middle, end;
  for (name in cookies) {
    // Если имеются значения, удалить их
    cookies = new Object();
    break;
  }
  beginning = 0;  // начать с начала строки cookie
  while (beginning < document.cookie.length) {
    middle = document.cookie.indexOf('=', beginning);   // Найти '='
    end = document.cookie.indexOf(';', beginning);  // Найти ';'
    if (end == -1) // Если нет ';', то это последнее поле cookie
      end = document.cookie.length;
    if ((middle > end) || (middle == -1)) {
      // Если поле cookie не имеет значения...
      name = document.cookie.substring(beginning, end);
      value = "";
    }
    else {  // Извлечь значение поля
      name = document.cookie.substring(beginning, middle);
      value = document.cookie.substring(middle + 1, end);
    }
    cookies[name] = unescape(value);    // добавить в массив
    beginning = end + 2;    // пропуск до начала следующего поля
   }
}
// Функция смены темы оформления страницы
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
// Установка значения переключателя на текущей теме
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
