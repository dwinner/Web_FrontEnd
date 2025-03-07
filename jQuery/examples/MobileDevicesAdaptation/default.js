/// <reference path="Scripts/_references.js" />

$(document).ready(function () {

    function calculateTotals() {
        var total = 0;
        $("#basketTable tbody").children().each(function (index, element) {
            var count = Number($(element).find("#count input").val());
            var price = Number($(element).attr("data-price").slice(1));
            var subTotal = count * price;
            $(element).find("#subtotal").text("$" + subTotal.toFixed(2));
            total += subTotal;
        });

        $("#total").text("$" + total.toFixed(2));
    }

    $.getJSON("data.json", function (data) {
        $("ul").append($("#liTmpl").tmpl(data)).listview("refresh");
        $("a.productLink").bind("tap", function () {
            var targetFlower = $(this).attr("data-flower");
            for (var i = 0; i < data.length; i++) {
                if (data[i].name !== targetFlower)
                    continue;

                var page = $("#productPage");
                page.find("#header").text(data[i].label);
                page.find("#image")
                    .attr("src", "Images/" + data[i].name + ".png")
                    .attr("alt", data[i].label);
                page.find("#description").text(data[i].text);
                page.find("#price").text(data[i].price);
                page.find("#buyButton").attr("data-flower", data[i].name);

                $.mobile.changePage("#productPage");
                break;
            }
        });

        function addProduct(targetFlower) {            
            var row = $("#basketTable tbody #" + targetFlower);
            if (row.length > 0) {
                var countCell = row.find("#count input");
                countCell.val(Number(countCell.val()) + 1);
            } else {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].name !== targetFlower)
                        continue;

                    $("#trTmpl").tmpl(data[i]).appendTo("#basketTable tbody").find("input").textinput();
                    break;
                }
            }

            calculateTotals();
            $.mobile.changePage("#basket");
        }

        $("#buyButton").bind("tap", function() {
            addProduct($(this).attr("data-flower"));
        });

        $("a.buy").bind("tap", function() {
            addProduct(this.id);
        });        

        $(document).on("change click", "input", function(/*event*/) {
            calculateTotals();
        });

        $("#submit").bind("tap", function() {
            var dataObject = new Object();
            $("#basketTable tbody").children().each(function(index, element) {
                dataObject[element.id] = $(element).find("#count input").val();
            });
            dataObject["name"] = $("#name").val();
            dataObject["wrap"] = $("option:selected").val();
            dataObject["shipping"] = $("input:checked").attr("id");
            console.log("DATA: " + JSON.stringify(dataObject));
        });
    });
});