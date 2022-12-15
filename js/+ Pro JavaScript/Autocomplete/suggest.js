"use strict";

var getFunctionsUrl = "SuggestHandler.ashx?keyword=";
var phpHelpUrl = "http://www.php.net/manual/en/function.";
var httpRequestKeyword = "";
var userKeyword = "";
var suggestions = 0;
var suggestionMaxLength = 30;
var isKeyUpDownPressed = false;
var autocompletedKeyword = "";
var hasResults = false;
var timeoutId = -1;
var position = -1;
var oCache = new Object();
var minVisiblePosition = 0;
var maxVisiblePosition = 9;
var debugMode = true;
var checkForChangesInverval = 500;
var xmlHttpGetSuggestions = createXmlHttpRequestObject();
window.onload = init;

function createXmlHttpRequestObject() {
    var xmlHttp = null;

    try {
        xmlHttp = new XMLHttpRequest();
    } catch (e) {
        var xmlHttpVersions = new Array("MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.5.0", "MSXML2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP");
        for (var i = 0; i < xmlHttpVersions.length && !xmlHttp; i++) {
            try {
                xmlHttp = new ActiveXObject(xmlHttpVersions[i]);
            } catch (e) {
            }
        }
    }

    return !xmlHttp ? null : xmlHttp;
}

function init() {
    var oKeyword = document.getElementById("keyword");        
    oKeyword.setAttribute("autocomplete", "off");
    oKeyword.value = "";
    oKeyword.focus();
    setTimeout("checkForChanges()", checkForChangesInverval);
}

function addToCache(keyword, values) {
    oCache[keyword] = new Array();
    for (var i = 0; i < values.length; i++) {
        oCache[keyword][i] = values[i];
    }
}

function checkCache(keyword) {
    if (oCache[keyword]) {
        return true;
    }

    for (var i = keyword.length - 2; i >= 0; i--) {
        var currentKeyword = keyword.substring(0, i + 1);
        if (!oCache[currentKeyword])
            continue;

        var cacheResults = oCache[currentKeyword];
        var keywordResults = new Array();
        var keywordResultsSize = 0;
        for (var j = 0; j < cacheResults.length; j++) {
            if (cacheResults[j].indexOf(keyword) === 0) {
                keywordResults[keywordResultsSize++] = cacheResults[i];
            }
        }

        addToCache(keyword, keywordResults);
        return true;
    }

    return false;
}

function getSuggestions(keyword) {
    if (keyword === "" || isKeyUpDownPressed) {
        return;
    }

    if (checkCache(keyword)) {
        httpRequestKeyword = userKeyword = keyword;
        displayResults(keyword, oCache[keyword]);
    } else {
        if (xmlHttpGetSuggestions) {
            try {
                if (xmlHttpGetSuggestions.readyState === 4 || xmlHttpGetSuggestions.readyState === 0) {
                    httpRequestKeyword = userKeyword = keyword;
                    xmlHttpGetSuggestions.open("GET", getFunctionsUrl + encode(keyword), true);
                    xmlHttpGetSuggestions.onreadystatechange = handleGettingSuggestions;
                    xmlHttpGetSuggestions.send(null);
                } else {
                    userKeyword = keyword;
                    if (timeoutId !== -1) {
                        clearTimeout(timeoutId);
                    }

                    timeoutId = setTimeout("getSuggestions(userKeyword);", 500);
                }
            } catch (e) {
                throw e; // displayError("Can't connect to server:\n" + e.toString());
            }
        }
    }
}

function xmlToArray(resultsXml) {
    var resultsArray = new Array();
    for (var i = 0; i < resultsXml.length; i++) {
        resultsArray[i] = resultsXml.item(i).firstChild.data;
    }

    return resultsArray;
}

function handleGettingSuggestions() {
    if (xmlHttpGetSuggestions.readyState !== 4)
        return;

    if (xmlHttpGetSuggestions.status === 200) {
        try {
            updateSuggestions();
        } catch (e) {
            throw e; // displayError(e.toString());
        }
    } else {
        displayError("There was a problem retrieving the data:\n" + xmlHttpGetSuggestions.statusText);
    }
}

function updateSuggestions() {
    /* TODO: Обработать возможные ошибки var response = xmlHttpGetSuggestions.responseText*/

    var response = xmlHttpGetSuggestions.responseXML.documentElement;
    var nameArray = new Array();
    if (response.childNodes.length) {
        // ReSharper disable Html.TagNotResolved
        nameArray = xmlToArray(response.getElementsByTagName("name"));
        // ReSharper restore Html.TagNotResolved
    }

    if (httpRequestKeyword === userKeyword) {
        displayResults(httpRequestKeyword, nameArray);
    } else {
        addToCache(httpRequestKeyword, nameArray);
    }
}

function displayResults(keyword, resultsArray) {
    var div = "<table>";

    if (!oCache[keyword] && keyword) {
        addToCache(keyword, resultsArray);
    }

    if (resultsArray.length === 0) {
        div += "<tr><td>No results found for <b>" + keyword + "</b></td></tr>";
        hasResults = false;
        suggestions = 0;
    } else {
        position = -1;
        isKeyUpDownPressed = false;
        hasResults = true;
        suggestions = oCache[keyword].length;

        for (var i = 0; i < oCache[keyword].length; i++) {
            var crtFunction = oCache[keyword][i];
            var crtFunctionLink = crtFunction;
            while (crtFunctionLink.indexOf("_") !== -1) {
                crtFunctionLink = crtFunctionLink.replace("_", "-");
            }

            div += "<tr id='tr"
                + i
                + "' onclick='location.href=document.getElementById(\"a"
                + i
                + "\").href;' onmouseover='handleOnMouseOver(this);' "
                + "onmouseout='handleOnMouseOut(this);'>"
                + "<td align='left'><a id='a"
                + i
                + "' href='" + phpHelpUrl + crtFunctionLink + ".php";

            if (crtFunction.length <= suggestionMaxLength) {
                div += "'><b>"
                    + crtFunction.substring(0, httpRequestKeyword.length)
                    + "</b>";
                div += crtFunction.substring(httpRequestKeyword.length, crtFunction.length)
                    + "</a></td></tr>";
            } else {
                if (httpRequestKeyword.length < suggestionMaxLength) {
                    div += "'><b>"
                        + crtFunction.substring(0, httpRequestKeyword.length)
                        + "</b>";
                    div += crtFunction.substring(httpRequestKeyword.length, suggestionMaxLength)
                        + "</a></td></tr>";
                } else {
                    div += "'><b>"
                        + crtFunction.substring(0, suggestionMaxLength)
                        + "</b></td></tr>";
                }
            }
        }
    }

    div += "</table>";
    var oSuggest = document.getElementById("suggest");
    var oScroll = document.getElementById("scroll");
    oScroll.scrollTop = 0;
    oSuggest.innerHTML = div;
    oScroll.style.visibility = "visible";

    if (resultsArray.length > 0) {
        autocompleteKeyword();
    }
}

function checkForChanges() {
    var keyword = document.getElementById("keyword").value;
    if (keyword === "") {
        hideSuggestions();
        userKeyword = httpRequestKeyword = "";
    }

    setTimeout("checkForChanges()", checkForChangesInverval);
    if ((userKeyword !== keyword) && (autocompletedKeyword !== keyword) && (!isKeyUpDownPressed)) {
        getSuggestions(keyword);
    }
}

function handleKeyUp(e) {
    e = !e ? window.event : e;
    var target = !e.target ? e.srcElement : e.target;
    if (target.nodeType === 3) {
        target = target.parentNode;
    }

    var code = e.charCode ? e.charCode : (e.keyCode ? e.keyCode : (e.which ? e.which : 0));

    if (e.type === "keyup") {
        isKeyUpDownPressed = false;
        if ((code < 13 && code !== 8) || (code >= 14 && code < 32) || (code >= 33 && code <= 46 && code !== 38 && code !== 40) || (code >= 112 && code <= 123)) {

        } else {
            if (code === 13) {
                if (position >= 0) {
                    location.href = document.getElementById("a" + position).href;
                }
            } else {
                if (code === 40) {
                    var newTr = document.getElementById("tr" + (++position));
                    var oldTr = document.getElementById("tr" + (--position));
                    if (position >= 0 && position < suggestions - 1) {
                        oldTr.className = "";
                    }

                    if (position < suggestions - 1) {
                        newTr.className = "highlightrow";
                        updateKeywordValue(newTr);
                        position++;
                    }

                    e.cancelBubble = true;
                    e.returnValue = false;
                    isKeyUpDownPressed = true;

                    if (position > maxVisiblePosition) {
                        var oScroll = document.getElementById("scroll");
                        oScroll.scrollTop += 18;
                        maxVisiblePosition += 1;
                        minVisiblePosition += 1;
                    }
                } else {
                    if (code === 38) {
                        newTr = document.getElementById("tr" + (--position));
                        oldTr = document.getElementById("tr" + (++position));

                        if (position >= 0 && position <= suggestions - 1) {
                            oldTr.className = "";
                        }

                        if (position > 0) {
                            newTr.className = "highlightrow";
                            updateKeywordValue(newTr);
                            position--;

                            if (position < minVisiblePosition) {
                                oScroll = document.getElementById("scroll");
                                oScroll.scrollTop -= 18;
                                maxVisiblePosition -= 1;
                                minVisiblePosition -= 1;
                            }
                        } else {
                            if (position === 0) {
                                position--;
                            }
                        }

                        e.cancelBubble = true;
                        e.returnValue = false;
                        isKeyUpDownPressed = true;
                    }
                }
            }
        }
    }
}

function updateKeywordValue(oTr) {
    var oKeyword = document.getElementById("keyword");
    var crtLink = document.getElementById("a" + oTr.id.substring(2, oTr.id.length)).toString();
    crtLink = crtLink.replace("-", "_");
    crtLink = crtLink.substring(0, crtLink.length - 4);
    oKeyword.value = unescape(crtLink.substring(phpHelpUrl.length, crtLink.length));
}

function deselectAll() {
    for (var i = 0; i < suggestions; i++) {
        var oCrtTr = document.getElementById("tr" + i);
        if (oCrtTr && oCrtTr.className) {
            oCrtTr.className = "";
        }
    }
}

function handleOnMouseOver(oTr) {
    deselectAll();
    oTr.className = "highlightrow";
    position = oTr.id.substring(2, oTr.id.length);
}

function handleOnMouseOut(oTr) {
    oTr.className = "";
    position = -1;
}

function encode(uri) {
    if (encodeURIComponent) {
        return encodeURIComponent(uri);
    }

    if (escape) {
        return escape(uri);
    }

    return "";
}

function hideSuggestions() {
    var oScroll = document.getElementById("scroll");
    oScroll.style.visibility = "hidden";
}

function selectRange(oText, start, length) {
    if (oText.createTextRange) {
        var oRange = oText.createTextRange();
        oRange.moveStart("character", start);
        oRange.moveEnd("character", length - oText.value.length);
        oRange.select();
    } else {
        if (oText.setSelectionRange) {
            oText.setSelectionRange(start, length);
        }
    }

    oText.focus();
}

function autocompleteKeyword() {
    var oKeyword = document.getElementById("keyword");
    position = 0;
    deselectAll();
    var firstTr = document.getElementById("tr0");
    if (firstTr && firstTr.className) {
        firstTr.className = "highlightrow";
        updateKeywordValue(firstTr);
        selectRange(oKeyword, httpRequestKeyword.length, oKeyword.value.length);
        autocompletedKeyword = oKeyword.value;
    }
}

function displayError(message) {
    if (debugMode) {
        console.log("Error accessing the server! " + message);
    }
}
