/// <reference path="_references.js" />
$(document).ready(function () {

    $("<div id='popup'><div id='popupContent'><img src='Content/progress.gif' alt='progress' /><div>Заказ оформляется...</div></div></div>").appendTo("body");

    // Глобальные настройки Ajax
    $.ajaxSetup({
        timeout: 5000,
        converters: {
            "text html": function (data) {
                return $(data);
            }
        }
    });

    $(document)
        .ajaxError(function (e, jqXhr, settings, errorMessage) {
            $("#error").remove();
            var msg = "Произошла ошибка. Пожалуйста, повторите запрос";
            if (errorMessage === "timeout") {
                msg = "Время запроса истекло. Пожалуйста, повторите запрос";
            } else if (jqXhr.status === 404) {
                msg = "Файл не найден";
            }
            $("<div id='error' />").text(msg).insertAfter("h1");
        })
        .ajaxSuccess(function () {
            $("#error").remove();
        });

    // Клиентские манипуляции с элементами
    var fNames = ["carnation", "lily", "orchid"];
    var frNames = ["Гвоздики", "Лилии", "Орхидеи"];
    var fRow = $("<div id='row3' class='drow' />").appendTo("div.dtable");
    var fTemplate = $("<div class='dcell'><img/><label/><input/></div>");

    for (var i = 0; i < fNames.length; i++) {
        fTemplate.clone().appendTo(fRow).children()
            .filter("img").attr("src", "Content/" + fNames[i] + ".png").end()
            .filter("label").attr("for", fNames[i]).text(frNames[i]).end()
            .filter("input").attr({
                name: fNames[i],
                value: 0,
                required: "required"
            });
    }

    $("<a id='left'></a><a id='right'></a>")
        .prependTo("#orderForm")
        .addClass("arrowButton")
        .click(function (e) {
            var elemSequence = ["row1", "row2", "row3"];
            var visibleRow = $("div.drow:visible");
            var visibleRowIndex = jQuery.inArray(visibleRow.attr("id"), elemSequence);
            var targetRowIndex;
            if (e.target.id === "left") {
                targetRowIndex = visibleRowIndex - 1;
                if (targetRowIndex < 0) {
                    targetRowIndex = elemSequence.length - 1;
                }
            } else {
                targetRowIndex = (visibleRowIndex + 1) % elemSequence.length;
            }

            visibleRow.fadeOut("fast", function () {
                $("#" + elemSequence[targetRowIndex]).fadeIn("fast");
            });
        })
        .hover(function (e) {
            var propValue = e.type === "mouseenter" ? "-50px 0px" : "0px 0px";
            $(this).css("background-position", propValue);
        });
    $("#right").appendTo("#orderForm");
    $("#row2, #row3, #popup, #summaryForm").hide();

    // Асинхронное получение данных
    var flowerRequest = $.get("flowers.html", function (data) {
        var elements = data.filter("div").addClass("dcell");
        elements.slice(0, 3).appendTo("#row1");
        elements.slice(3).appendTo("#row2");
    });
    var jsonRequest = $.getJSON("additionalFlowers.json", function (data) {
        $("#flowerTmpl").tmpl(data).appendTo("#row3");
    });

    // Локальная и дистанционная проверка корректности данных
    $("<div id='errorSummary'>Пожалуйста, исправьте следующие ошибки:</div>")
        .append("<ul id='errorsList'></ul>")
        .hide()
        .insertAfter("h1");
    $("#orderForm").validate({
        highlight: function (element /*,errorClass*/) {
            $(element).addClass("invalidElem");
        },
        unhighlight: function (element /*,erroClass*/) {
            $(element).removeClass("invalidElem");
        },
        errorContainer: "#errorSummary",
        errorLabelContainer: "#errorsList",
        wrapper: "li",
        errorElement: "div"
    });

    var plurals = {
        astor: "астр",
        daffodil: "нарциссов",
        rose: "роз",
        peony: "пионов",
        primula: "примул",
        snowdrop: "подснежиков",
        carnation: "гвоздик",
        lily: "лилий",
        orchid: "орхидей"
    };

    $.when(flowerRequest, jsonRequest).then(function () {
        $("input").each(function (index, element) {
            $(element).rules("add", {
                required: true,
                min: 0,
                digits: true,
                remote: {
                    url: "http://localhost:1337/stockcheck",
                    type: "post",
                    global: false
                },
                messages: {
                    required: "Пожалуйста, введите количество " + plurals[element.name],
                    digits: "Пожалуйста, введите количество " + plurals[element.name],
                    min: "Пожалуйста, введите положительное число для " + plurals[element.name]
                }
            });
        }).change(function (e) {
            if ($("#orderForm").validate().element($(e.target))) {
                var totalVal = 0;
                $("input").each(function (index, element) {
                    totalVal += Number($(element).val());
                });
                $("#total").text(totalVal);
            }
        });
    });

    // Отправка формы

    function processServerResponse(data) {
        if (data.products.length > 0) {
            $("body > *:not('h1')").hide();
            $("#summaryForm").show();
            $("#productRowTmpl").tmpl(data.products).appendTo("tbody");
            $("#totalItems").text(data.totalItems);
            $("#totalPrice").text(data.totalPrice);
        } else {
            var inputElement = $("input").get(0);
            var error = new Object();
            error[element.name] = "Не выбран ни один продукт";
            $("#orderForm").validate().showErrors(error);
            $(inputElement).removeClass("invalidElem");
        }
    }

    $("#orderForm button").click(function (e) {
        e.preventDefault();
        var formData = $("#orderForm").serialize();
        $("body *").not("#popup, #popup *").css("opacity", 0.5);
        $("input").attr("disabled", "disabled");
        $("#popup").show();
        $.ajax({
            url: "http://localhost:1337/order", // NOTE: Можно было бы взять из атрибута action
            type: "post",
            data: formData,
            dataType: "json",
            dataFilter: function (data/*,dataType*/) {
                data = $.parseJSON(data);
                var cleanData = {
                    totalItems: data.totalItems,
                    totalPrice: data.totalPrice
                };
                delete data.totalPrice;
                delete data.totalItems;
                cleanData.products = [];
                for (var prop in data) {
                    if (!data.hasOwnProperty(prop))
                        continue;
                    cleanData.products.push({
                        name: plurals[prop],
                        quantity: data[prop]
                    });
                }

                return cleanData;
            },
            converters: {
                "text json": function (data) {
                    return data;
                }
            },
            success: function (data) { // BUG: Одна из callbacked-функций не принимает управление
                processServerResponse(data);
            },
            complete: function () {
                //setTimeout(function() { // NOTE: Таймаут здесь для наглядности демо
                $("body *").not("#popup, #popup *").css("opacity", 1);
                $("input").removeAttr("disabled");
                $("#popup").hide();
                //}, 1500);
            }
        });
    });

    // Обработка заказа
    var total = $("#buttonDiv").prepend("<div>Всего заказано: <span id='total'>0</span></div>").css({
        clear: "both",
        padding: "5px"
    });
    $("<div id='bbox' />").appendTo("body").append(total);
    $("input").change(function () {
        var totalSum = 0;
        $("input").each(function (index, element) {
            totalSum += Number($(element).val());
        });
        $("#total").text(totalSum);
    });
});