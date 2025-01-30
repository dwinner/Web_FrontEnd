<?php
class DirectoryItems {	// ������ ������ ��� ��������
	private $filearray = array();
	public $directory;	// ���� � ����������
	public $replacechar;	// ������ ��� ������ � ������ ������
	// PHP5-style �����������
	public function __construct($directory, $replacechar = "_") {		$this->directory = $directory;
		$this->replacechar = $replacechar;
		$d = '';
		if (is_dir($directory)) {			$d = @opendir($directory);
			if (!is_resource($d)) exit("Failed opening directory");
			while (false !== ($f = readdir($d))) {				if (is_file($directory.'/'.$f)) {					$title = $this->createTitle($f);
					$this->filearray[$f] = $title;
				}
			}
			closedir($d);
		}
		else {			// ������
			exit("You should pass the directory name");
		}
	}
	// ������� ����� ����� ��� ������� File_Name ��� File Name, ����
	// $this->replacechar = "_", ��������
	private function createTitle($title) {		// ������ ����������
		$title = substr($title, 0, strrpos($title, '.'));
		// �������� ����������� ����
		$title = str_replace($this->replacechar, ' ', $title);
		return $title;
	}
	// ����� �� ����� ���� � ��� �� ���
	public function checkAllSpecificType($extension) {		$extension = strtolower($extension);
		$bln = true;
		$ext = '';
		foreach ($this->filearray as $key => $value) {			$ext = substr($key, strrpos($key, '.')+1);
			$ext = strtolower($ext);
			if ($extension != $ext) {				$bln = false;
				break;
			}
		}
		return $bln;
	}
	// ����� ���������� ������ �� ����������
	public function filter($extension) {		$extension = strtolower($extension);
		foreach ($this->filearray as $key => $value) {			$ext = substr($key, strrpos($key, '.')+1);
			$ext = strtolower($ext);
			if ($ext != $extension) {				unset($this->filearray[$key]);
			}
		}
	}
	// ����� ������ ������� � ��������
	public function removeFilter() {		unset($this->filearray);
		$d = '';
		$d = @opendir($this->directory);
		if (!is_resource($d)) exit("Failed opening directory");
		while (false !== ($f = readdir($d))) {
			if (is_file($this->directory.'/'.$f)) {
				$title = $this->createTitle($f);
				$this->filearray[$f] = $title;
			}
		}
		closedir($d);
	}
	// ���������� �����������
	public function imagesOnly() {		$extension = '';
		$types = array('jpg', 'jpeg', 'gif', 'png');
		foreach ($this->filearray as $key => $value) {			$extension = substr($key, strrpos($key, '.')+1);
			$extension = strtolower($extension);
			if (!in_array($extension, $types)) {				unset($this->filearray[$key]);
			}
		}
	}
	// ����� ������� � ��������� ���� $filearray
	public function getFileArray() {		return $this->filearray;
	}
	// ���������� ������ �������� (wrapper)
	function indexOrder() {		sort($this->filearray);
	}
	// "�����������" c��������� ������ �������� (wrapper)
	function naturalCaseInsensitiveOrder() {		natcasesort($this->filearray);
	}
	// ���������� ������ � �������� (wrapper)
	function getCount() {		return sizeof($this->filearray);
	}
}
?>