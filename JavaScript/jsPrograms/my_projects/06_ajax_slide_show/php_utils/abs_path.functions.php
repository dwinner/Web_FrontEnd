<?php
function getAbsRootUrl($relFile) {
	if (!file_exists($relFile)) return false;
	$proto = $_SERVER['SERVER_PROTOCOL'];
	$proto = strtolower(substr($proto, 0, strpos($proto, '/')));
	// абсолютный путь к текущему файлу в конкретном корне
	$abs_path = str_replace('\\', '/', realpath($relFile));
	// относительный путь для URL вместе с именем файла
	$relFile = substr($abs_path, similar_text($_SERVER['DOCUMENT_ROOT'], $abs_path));
	// относительный путь для URL без имени файла
	$relFile = substr($relFile, 0, strrpos($relFile, '/') + 1);
	return $proto.'://'.$_SERVER['HTTP_HOST'].$relFile;
}
?>