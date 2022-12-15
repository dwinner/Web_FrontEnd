<?php
require_once('../php_utils/DirectoryItems.class.php');
require_once('../php_utils/abs_path.functions.php');
// Путь к корню index.html
$rootPath = '../index.html';
// формируем абсолютные url для изображений
$imgPath = getAbsRootUrl($rootPath);
$imgPath .= 'images/';
// Получаем список изображений с сервера
$imageList = new DirectoryItems('../images');
// Фильтруем только изображения
$imageList->imagesOnly();
// Сортируем список файлов-изображений
$imageList->naturalCaseInsensitiveOrder();
// Получаем числовой массив файлов-изображений
$imgArray = $imageList->getFileArray();
$imgArray = array_keys($imgArray);
// Формируем абсолютные url для массива изображений
$imgCount = sizeof($imgArray);
$i = 0;
for (; $i < $imgCount; $i++)
	$imgArray[$i] = $imgPath.$imgArray[$i];
// Формируем ответ в xml-формате
$xmlResp = '<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>';
$xmlResp .= '<imagelist>';
$i = 0;
for (; $i < $imgCount; $i++)	$xmlResp .= '<image>'.$imgArray[$i].'</image>';
$xmlResp .= '</imagelist>';
echo $xmlResp;
?>