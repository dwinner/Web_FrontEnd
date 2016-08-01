var http = require("http");
var url = require("url");
var queryString = require("querystring");
var port = process.env.port || 1337;

http.createServer(function (req, res) {
   console.log("Request: " + req.method + " to " + req.url);
   
   switch (req.method) {
      case "OPTIONS":
         res.writeHead(200, "OK", {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Origin": "*"
         });
         break;

      case "POST":
         var dataObject = new Object();
         var contentType = req.headers["content-type"];
         var fullBody = "";
         
         if (contentType) {
            if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
               req.on("data", function (chunk) {
                  fullBody += chunk.toString();
               });
               req.on("end", function () {
                  var dBody = queryString.parse(fullBody);
                  writeResponse(req, res, dBody, url.parse(req.url, true).query["callback"]);
               });
            } else {
               req.on("data", function (chunk) {
                  fullBody += chunk.toString();
               });
               req.on("end", function () {
                  dataObject = JSON.parse(fullBody);
                  var dprops = new Object();
                  for (var i = 0; i < dataObject.length; i++) {
                     dprops[dataObject[i].name] = dataObject[i].value;
                  }
                  writeResponse(req, res, dprops);
               });
            }
         }
         break;

      case "GET":
         var data = url.parse(req.url, true).query;
         writeResponse(req, res, data, data["callback"]);
         break;
   }
}).listen(port);
console.log("Ready on port " + port);

var flowerData = {
   aster: { price: 2.99, stock: 10, plural: "астр" },
   daffodil: { price: 1.99, stock: 10, plural: "нарциссов" },
   rose: { price: 4.99, stock: 2, plural: "роз" },
   peony: { price: 1.50, stock: 3, plural: "пионов" },
   primula: { price: 3.12, stock: 20, plural: "примул" },
   snowdrop: { price: 0.99, stock: 5, plural: "подснежников" },
   carnation: { price: 0.50, stock: 1, plural: "гвоздик" },
   lily: { price: 1.20, stock: 2, plural: "лилий" },
   orchid: { price: 10.99, stock: 5, plural: "орхидей" }
};

var writeResponse = function (req, res, data, jsonp) {
   var jsonData = "";
   if (req.url === "/stockcheck") {
      for (var flower in data) {
         if (data.hasOwnProperty(flower)) {
            jsonData = flowerData[flower].stock >= data[flower] || "В наличии имеется только " + flowerData[flower].stock + " " + flowerData[flower].plural;
            break;
         }
      }
      
      jsonData = JSON.stringify(jsonData);
   } else {
      var totalCount = 0;
      var totalPrice = 0;
      for (var item in data) {
         if (data.hasOwnProperty(item)) {
            if (item !== "_" && data[item] > 0) {
               var itemNum = Number(data[item]);
               totalCount += itemNum;
               totalPrice += (itemNum * flowerData[item].price);
            } else {
               delete data[item];
            }
         }
      }
      
      data.totalItems = totalCount;
      data.totalPrice = totalPrice.toFixed(2);
      
      jsonData = JSON.stringify(data);
      if (jsonp) {
         jsonData = jsonp + "(" + jsonData + ")";
      }
   }
   
   res.writeHead(200, "OK", {
      "Content-Type": jsonp ? "text/javascript" : "application/json",
      "Access-Control-Allow-Origin": "*"
   });
   res.write(jsonData);
   res.end();
};