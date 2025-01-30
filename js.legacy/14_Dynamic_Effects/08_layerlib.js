/* layerlib.js: ������ ���������� Layer, ����������
	������� �������� �� ������������� */

/* �������� �������� */
var layerobject = ((document.layers) ? (true) : (false));
var dom = ((document.getElementById) ? (true) : (false));
var allobject = ((document.all) ? (true) : (false));

/* �������� ��������� */
opera = navigator.userAgent.toLowerCase().indexOf('opera') != -1;

/* ������� ������� ��� ������������� �������� layerName */
function getElement(layerName, parentLayer) {
	if (layerobject) {
		parentLayer = (parentLayer) ? parentLayer : self;
		layerCollection = parentLayer.document.layers;
		if (layerCollection[layerName])
			return layerCollection[layerName];
		/* �������� ��������� ����� */
		for (i=0; i<layerCollection.length;)
			return (getElement(layerName, layerCollection[i++]));
	}
	if (allobject)
		return document.all[layerName];
	if (dom)
		return document.getElementById(layerName);
}

/* ������ ���� � id = layerName */
function hide(layerName) {
	var theLayer = getElement(layerName);
	if (layerobject)
		theLayer.visibility = 'hide';
	else
		theLayer.visibility = 'hidden';
}

/* �������� ���� � id = layerName */
function show(layerName) {
	var theLayer = getElement(layerName);
	if (layerobject)
		theLayer.visibility = 'show';
	else
		theLayer.visibility = 'visible';
}

/* ���������� ���������� x ���� layerName */
function setX(layerName, x) {
	var theLayer = getElement(layerName);
	if (layerobject)
		theLayer.left = x;
	else if (opera)
		theLayer.style.pixelLeft = x;
	else
		theLayer.style.left = x+"px";
}

/* ���������� ���������� y ���� layerName */
function setY(layerName, y) {
	var theLayer = getElement(layerName);
	if (layerobject)
		theLayer.top = y;
	else if (opera)
		theLayer.style.pixelTop = y;
	else
		theLayer.style.top = y+"px";
}

/* ���������� �������� z-index ���� layerName */
function setZ(layerName, zIndex) {
	var theLayer = getElement(layerName);
	if (layerobject)
		theLayer.zIndex = zIndex;
	else
		theLayer.style.zIndex = zIndex;
}

/* ���������� ������ ���� layerName */
function setHeight(layerName, height) {
	var theLayer = getElement(layerName);
	if (layerobject)
		theLayer.clip.height = height;
	else if (opera)
		theLayer.style.pixelHeight = height;
	else
		theLayer.style.height = height+"px";
}

/* ���������� ������ ���� layerName */
function setWidth(layerName, width) {
	var theLayer = getElement(layerName);
	if (layerobject)
		theLayer.clip.width = width;
	else if (opera)
		theLayer.style.pixelWidth = width;
	else
		theLayer.style.width = width+"px";
}

/* ���������� ������������� ��������� ��� ���� layerName
	� ������� ��������� �������� top, right, bottom � left */
function setClip(layerName, top, rigth, bottom, left) {
	var theLayer = getElement(layerName);
	if (layerobject) {
		theLayer.clip.top = top;
		theLayer.clip.right = right;
		theLayer.clip.bottom = bottom;
		theLayer.clip.left = left;
	}
	else
		theLayer.style.clip = "rect("+top+"px "+rigth+"px "+" "+bottom+"px "+left+"px )";
}

/* ���������� ���������� layerName ������ ����������� ����������� */
function setContents(layerName, content) {
	var theLayer = getElement(layerName);
	if (layerobject) {
		theLayer.document.write(content);
		theLayer.document.close();
		return;
	}
	if (theLayer.innerHTML)
		theLayer.innerHTML = content;
}