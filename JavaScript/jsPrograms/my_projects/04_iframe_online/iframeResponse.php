<?php
echo '<script type="text/javascript">';
$call = 'window.parent.RPCComplete(\''.rand(1, 999999).'\');';
echo $call;
echo '</script>';
?>