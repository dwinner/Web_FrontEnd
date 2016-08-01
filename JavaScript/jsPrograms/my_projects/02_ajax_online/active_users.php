<?php
require_once('sqlTypes/mysql.functions.php');
$xmlData = '<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>';
$xmlData .= '<response>';
$xmlData .= '<users>';
$query = "SELECT putdate, user FROM session";
$users = exec_fetch_assoc_arr ($query, true);
$onlineNum = sizeof($users);
if ($onlineNum) { //  то-то есть в режиме 'online'
	$i = 0;
	for (; $i < $onlineNum; $i++) {
		$xmlData .= '<user>';
		$xmlData .= '<putdate>'.$users[$i]['putdate'].'</putdate>';
		$xmlData .= '<name>'.$users[$i]['user'].'</name>';
		$xmlData .= '</user>';
	}
	$xmlData .= '</users>';
}
else { // никого нет в 'online'
	$xmlData .= '</users>';
}
$xmlData .= '</response>';
echo $xmlData;
?>