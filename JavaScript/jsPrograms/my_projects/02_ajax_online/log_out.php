<?php
require_once('sqlTypes/mysql.functions.php');
session_start();
$id_session = session_id();
$query = "DELETE FROM session WHERE id_session = '".$id_session."'";
@mysql_query($query);
session_destroy();
$backPage = $_SERVER['HTTP_REFERER'];
header('Location: '.$backPage);
exit;
?>