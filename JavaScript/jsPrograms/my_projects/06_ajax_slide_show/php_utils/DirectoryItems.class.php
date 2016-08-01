<?php
class DirectoryItems {	// массив файлов для каталога
	private $filearray = array();
	public $directory;	// путь к директории
	public $replacechar;	// символ для замены в именах файлов
	// PHP5-style конструктор
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
		else {			// ошибка
			exit("You should pass the directory name");
		}
	}
	// Создает титул файла для формата File_Name как File Name, если
	// $this->replacechar = "_", например
	private function createTitle($title) {		// убрать расширение
		$title = substr($title, 0, strrpos($title, '.'));
		// заменить разделители слов
		$title = str_replace($this->replacechar, ' ', $title);
		return $title;
	}
	// Имеют ли файлы один и тот же тип
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
	// метод фильтрации файлов по расширению
	public function filter($extension) {		$extension = strtolower($extension);
		foreach ($this->filearray as $key => $value) {			$ext = substr($key, strrpos($key, '.')+1);
			$ext = strtolower($ext);
			if ($ext != $extension) {				unset($this->filearray[$key]);
			}
		}
	}
	// метод снятия фильтра с каталога
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
	// фильтрация изображений
	public function imagesOnly() {		$extension = '';
		$types = array('jpg', 'jpeg', 'gif', 'png');
		foreach ($this->filearray as $key => $value) {			$extension = substr($key, strrpos($key, '.')+1);
			$extension = strtolower($extension);
			if (!in_array($extension, $types)) {				unset($this->filearray[$key]);
			}
		}
	}
	// метод доступа к закрытому полю $filearray
	public function getFileArray() {		return $this->filearray;
	}
	// Сортировка файлов каталога (wrapper)
	function indexOrder() {		sort($this->filearray);
	}
	// "Натуральная" cортировка файлов каталога (wrapper)
	function naturalCaseInsensitiveOrder() {		natcasesort($this->filearray);
	}
	// Количество файлов в каталоге (wrapper)
	function getCount() {		return sizeof($this->filearray);
	}
}
?>