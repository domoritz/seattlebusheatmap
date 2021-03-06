$(function() {
    var osm = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
    });

    var map = L.map('map', {
        center: [47.6210, -122.3328],
        zoom: 13,
        layers: [osm]
    });

    var heatmapLayer = L.TileLayer.heatMap({
        radius: { value: 100, absolute: true },
        opacity: 0.9
    });

    $.getJSON('https://api.onebusaway.org/api/where/vehicles-for-agency/1.json?key=TEST&callback=?', function(data) {
        var buses = data.data.list;
        var heatmapData = [];
        $.each(buses, function(index, value) {
            var d = value.location;
            d.value = 1;
            heatmapData.push(d);
        });
        heatmapLayer.setData(heatmapData);
        heatmapLayer.addTo(map);
    });

    var hash = new L.Hash(map);
});
