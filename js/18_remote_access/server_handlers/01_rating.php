<?php
$rating = $_GET['rating'];
$curImg = '';
switch ($rating) {
	case 1:
		$curImg = "<img src='n_1.jpg' />";
		break;
	case 2:
		$curImg = "<img src='n_2.jpg' />";
		break;
	case 3:
		$curImg = "<img src='n_3.jpg' />";
		break;
	default: break;
}
?>