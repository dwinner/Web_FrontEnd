function frameBuster() {
	if (window != "top")
		top.location.href = location.href;
}
window.onload = frameBuster;
