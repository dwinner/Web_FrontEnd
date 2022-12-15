<?php
$message = $_GET['sendvalue'];
$message = "Hello, ".$message;
echo "<script type=\"text/javascript\">";
$call = "window.parent.RPCComplete('".$message."');";
echo $call;
echo "</script>";
?>