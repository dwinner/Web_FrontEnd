/// <reference path="../_references.js" />
$(document).ready(function () {
    $.getJSON("Static/mydata.json", function (data) {
        var flowers = $("#flowerTmpl").tmpl(data);

        // Создание виджета accordion для цветочной продукции

        var rowCount = 1;
        var appenderEl = "#products";
        for (var i = 0; i < flowers.length; i += 2) {
            $("<h2><a href='#'>" + data[i].name + " и " + data[i + 1].name + "</a></h2>").appendTo(appenderEl);
            $("<div id='row" + (rowCount++) + "'></div>").appendTo(appenderEl).append(flowers.slice(i, i + 2));
        }
        $(appenderEl).accordion({
            fillspace: true
        });

        // Добавление корзины покупателя

        function removeTableRow(row) {
            row.remove();
            if ($("#basketTable tbody").children(":visible").length === 0) {
                $("#placeholder").show();
            }
        }

        $("#products input").change(function ( /*event*/) {
            $("#placeholder").hide();
            var fname = $(this).attr("name");
            var row = $("tr[id=" + fname + "]");
            if (row.length === 0) {
                $("#rowTmpl").tmpl({
                    name: fname,
                    val: $(this).val(),
                    product: $(this).siblings("label").text()
                }).appendTo("#basketTable").find("a").click(function () {
                    removeTableRow($(this).closest("tr"));
                    var prodSelector = "#products";
                    var iElem = $(prodSelector).find("input[name=" + fname + "]");
                    $(prodSelector).accordion("activate", iElem.closest("div[id^=row]").prev());
                    iElem.val(0).select();
                });
            } else if ($(this).val() !== "0") {
                row.children().eq(1).text($(this).val());
            } else {
                removeTableRow(row);
            }
        });

        // Создание кнопки jQuery UI

        $("#buttonDiv, #basket").wrapAll("<div />").parent().css({
            float: "left",
            marginLeft: "2px"
        });

        var dialogTarget = "#completeDialog";

        $("button").button().click(function (e) {
            e.preventDefault();
            if ($("#placeholder:visible").length) {
                $("<div>Пожалуйста, выберите продукт</div>").dialog({
                    modal: true,
                    buttons: [{ text: "OK", click: function () { $(this).dialog("close"); } }]
                });
            } else {
                $(dialogTarget).dialog("open");
            }
        });

        // Добавление диалогового окна        

        function sendOrder() {
            var dataToSend = new Object();
            $("input").each(function(index, element) {
                var jqElement = $(element);
                dataToSend[jqElement.attr("name")] = jqElement.val();
            });
            console.log(JSON.stringify(data));
            $("#completeDialog").dialog("close");
            $("#products input").val("0");
            $("#products").accordion("option", "active", 0);
            $("#basketTable tbody").children(":visible").remove();
            $("#placeholder").show();
        }

        $(dialogTarget).dialog({
            modal: true,
            autoOpen: false,
            buttons: [
               {
                   text: "OK",
                   click: sendOrder
               },
               {
                   text: "Отменить",
                   click: function () {
                       $(dialogTarget).dialog("close");
                   }
               }
            ]
        });
    });
});