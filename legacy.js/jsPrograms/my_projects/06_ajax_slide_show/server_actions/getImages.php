<?php
require_once('../php_utils/DirectoryItems.class.php');
require_once('../php_utils/abs_path.functions.php');
// ���� � ����� index.html
$rootPath = '../index.html';
// ��������� ���������� url ��� �����������
$imgPath = getAbsRootUrl($rootPath);
$imgPath .= 'images/';
// �������� ������ ����������� � �������
$imageList = new DirectoryItems('../images');
// ��������� ������ �����������
$imageList->imagesOnly();
// ��������� ������ ������-�����������
$imageList->naturalCaseInsensitiveOrder();
// �������� �������� ������ ������-�����������
$imgArray = $imageList->getFileArray();
$imgArray = array_keys($imgArray);
// ��������� ���������� url ��� ������� �����������
$imgCount = sizeof($imgArray);
$i = 0;
for (; $i < $imgCount; $i++)
	$imgArray[$i] = $imgPath.$imgArray[$i];
// ��������� ����� � xml-�������
$xmlResp = '<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>';
$xmlResp .= '<imagelist>';
$i = 0;
for (; $i < $imgCount; $i++)	$xmlResp .= '<image>'.$imgArray[$i].'</image>';
$xmlResp .= '</imagelist>';
echo $xmlResp;
?>