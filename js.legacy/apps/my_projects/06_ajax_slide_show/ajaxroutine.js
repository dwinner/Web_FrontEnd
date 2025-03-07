function createAjaxObj(){
    var httprequest = false;
    if (window.XMLHttpRequest) { // if Mozilla, Safari etc
        httprequest = new XMLHttpRequest();
    if (httprequest.overrideMimeType)
        httprequest.overrideMimeType('text/xml');
    }
    else if (window.ActiveXObject) { // if IE
        try {
            httprequest = new ActiveXObject("Msxml2.XMLHTTP");
        } 
        catch (e) {
            try {
                httprequest = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e){}
        }
    }
    return httprequest;
}

var ajaxpack = new Object();
ajaxpack.basedomain = "http://"+window.location.hostname;
ajaxpack.ajaxobj = createAjaxObj();
ajaxpack.filetype = "txt";
ajaxpack.addrandomnumber = 0; //Set to 1 or 0. See documentation.

ajaxpack.getAjaxRequest = function(url, parameters, callbackfunc, filetype) {
    ajaxpack.ajaxobj = createAjaxObj(); //recreate ajax object to defeat cache problem in IE
    if (ajaxpack.addrandomnumber == 1) //Further defeat caching problem in IE?
        var parameters=parameters+"&ajaxcachebust="+new Date().getTime();
    if (this.ajaxobj) {
        this.filetype = filetype;
        this.ajaxobj.onreadystatechange = callbackfunc;
        this.ajaxobj.open('GET', url+"?"+parameters, true);
        this.ajaxobj.send(null);
    }
}

ajaxpack.postAjaxRequest = function(url, parameters, callbackfunc, filetype) {
    ajaxpack.ajaxobj = createAjaxObj(); //recreate ajax object to defeat cache problem in IE
    if (this.ajaxobj) {
        this.filetype = filetype;
        this.ajaxobj.onreadystatechange = callbackfunc;
        this.ajaxobj.open('POST', url, true);
        this.ajaxobj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        this.ajaxobj.setRequestHeader("Content-length", parameters.length);
        this.ajaxobj.setRequestHeader("Connection", "close");
        this.ajaxobj.send(parameters);
    }
}
