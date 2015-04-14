(function(){

    var URL = window.location;
     NAMRIA = L.WMS.source('http://geoserver.namria.gov.ph/geoserver/geoportal/wms', {
        'transparent': true,
        'tiled': true,
        'format': 'image/png'
    });


    var lat = 14
    var lng = 121
    var zoom = 13;
    map = null;

    initMap();
    applyParams();

    //index.html?l=dti_ncr_offices,denr_aqms&z=12&c=14.561,121.032
    function applyParams(){
        var params = purl(URL).param();
        params.l = params.l.split(',');
        params.c = params.c.split(',');

        // set viewport
        map.setView([params.c[0], params.c[1]], params.z);

        // get layers
        for(var i in params.l){
            var layer = params.l[i];
            NAMRIA.addSubLayer(layer);
        }

        // add layers to map
        NAMRIA.addTo(map);
    }


    function initMap(){
        var url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
        url = 'http://s1.geoportal.gov.ph/tiles/v2/PGPv3/{z}/{x}/{y}.png';

        map = L.map('map', {
            minZoom: 6
        });

        L.tileLayer(url, {
            attribution: '&copy; <a href="http://namria.gov.ph">NAMRIA</a>'
        }).addTo(map);

    }

})();


