<?php
session_start();
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" 
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>����� �����������</title>
</head>
<body bgcolor="#FFF8DC">
<form action="handler.php" method="post">
 <table>
   <tr>
    <td>��� ���������� : </td>
    <td><input name="name" type="text"
    		   value="<?php echo @$_SESSION['user']; ?>" /></td>
   </tr>
   <tr>
    <td>������ :</td>
    <td><input name="pass" type="password"
    		   value="<?php echo @$_SESSION['password']; ?>" /></td>
   </tr>
   <tr>
    <td><input name="session_id" type="hidden"
    		   value="<?php echo session_id(); ?>" /></td>
    <td><input type="submit" value="���������"></td>
   </tr>
 </table>
</form>

<hr />
<?php
// ���� ���������� "�����" - ������������ ���
if (isset($_SESSION['user']) && !empty($_SESSION['user'])) {	echo 'Hello, '.$_SESSION['user'].'!<br />';
	echo '<a href="user_track.html">�������� ������������ ������</a><br />';
	echo '<a href="log_out.php">�����</a>';
}
?>

</body>
</html>