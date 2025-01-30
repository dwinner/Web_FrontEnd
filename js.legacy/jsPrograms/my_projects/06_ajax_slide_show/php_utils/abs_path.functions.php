<?php
function getAbsRootUrl($relFile) {
	if (!file_exists($relFile)) return false;
	$proto = $_SERVER['SERVER_PROTOCOL'];
	$proto = strtolower(substr($proto, 0, strpos($proto, '/')));
	// ���������� ���� � �������� ����� � ���������� �����
	$abs_path = str_replace('\\', '/', realpath($relFile));
	// ������������� ���� ��� URL ������ � ������ �����
	$relFile = substr($abs_path, similar_text($_SERVER['DOCUMENT_ROOT'], $abs_path));
	// ������������� ���� ��� URL ��� ����� �����
	$relFile = substr($relFile, 0, strrpos($relFile, '/') + 1);
	return $proto.'://'.$_SERVER['HTTP_HOST'].$relFile;
}
?>