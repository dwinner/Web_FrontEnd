var getCurrentPositionRx = function (opts) {
    opts = opts || {};
    var ret = new Rx.AsyncSubject();
    navigator.geolocation.getCurrentPosition(function (pos) {
        ret.onNext([pos.coords.latitude, pos.coords.longitude]);
        ret.onCompleted();
    }, function (err) {
        ret.onError(err.code);
    }, opts);

    return ret;
};

var mapChangeObservable = $("#mapOpts").toObservable("change")
    .select(function (x) {
        return x.currentTarget;
    })
    .select(function (x) {
        return x[x.options.selectedIndex].value;
    })
    .startWith("roadmap");

mapChangeObservable.subscribe(function (x) {
    console.log(x);
});

var currentMapUrl = mapChangeObservable.selectMany(function (mapType) {
    var mapPos = getCurrentPositionRx().catch(Rx.Observable.return([40.714728, -73.998672]));
    return mapPos.select(function (pos) {
        console.log("map should change to " + mapType + " with position " + pos[0] + ", " + pos[1]);
        return [mapType, pos];
    });
}).select(function (typeAndPos) {
    var mapType = typeAndPos[0];
    var coords = typeAndPos[1];
    return "http://maps.googleapis.com/maps/api/staticmap?zoom=12&size=400x400&sensor=true&mapType=" + mapType + "&center=" + coords[0] + "," + coords[1];
});

currentMapUrl.subscribe(function (x) {
    $("#mapImage").attr("src", x);
});