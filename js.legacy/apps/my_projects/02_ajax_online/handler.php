<?php
require_once('sqlTypes/mysql.functions.php');
if (!session_start()) exit("<p>Ошибка идентификации</p>");
if ($_POST['session_id'] != session_id())
	exit("<p>Попытка передачи данных с другого хоста!</p>");
$query = 'SELECT pass=MD5("'.$_POST['pass'].'") FROM users WHERE name="'.$_POST['name'].'"';
if (is_single_record($query)) {
	$_SESSION['user'] = $_POST['name'];
	$_SESSION['password'] = $_POST['pass'];
	$sessId = session_id();
	$sql = 'SELECT * FROM session WHERE id_session = "'.$sessId.'"';
	// проверяем, вошёл ли пользователь
	if (is_single_record($sql)) {
		$qu = 'UPDATE session SET putdate = NOW(), user = "'.$_SESSION['user'].'" ';
    	$qu .= 'WHERE id_session = "'.$id_session.'"';
		if (!dml_execute($qu)) exit;
	}
	else {
		if (!isset($_SESSION['user'])) $_SESSION['user'] = '';
		$query = "INSERT INTO session VALUES('$sessId', NOW(), '".$_SESSION['user']."')";
		if (!dml_execute($query)) exit;
	}
	// осуществляем автоматичечкий переход
	echo "<HTML><HEAD>
			<META HTTP-EQUIV='Refresh' CONTENT='0; URL=index.php' />
		  </HEAD></HTML>";
}
else exit("<p>Посетитель не зарегистрирован!</p>");
?>