//! travelmap.js
//! version : 0.01.0
//! authors : Shawn Wildermuth
//! license : MIT

// Build support for AMD or simple global (borrowed pattern from moment.js)
(function () {

  "use strict";

  // travelMap object
  var _travelMap = {};

  var _defaultOptions = {
    stops: [],
    currentStop: 0,
    selector: "#map",
    iconUrl: "http://wildermuth.com/",
    initialZoom: 4,
    pastStroke: {
      color: '#190300',
      opacity: 0.5,
      weight: 2
    },
    futureStroke: {
      color: '#D30000',
      opacity: 0.6,
      weight: 2
    }
  };


  _travelMap.createMap = function (options) {

    var map;
    var settings = _extend(options, _defaultOptions);

    if (!settings.stops || settings.stops.length == 0) {
      throw "You must supply stops when creating a map.";
    }

    // calculate past, future and current stops
    var pastLines = settings.stops.slice(0, settings.currentStop + 1);
    var futureLines = settings.stops.slice(settings.currentStop, settings.stops.length);
    var currentLocation = settings.stops[settings.currentStop];

    _initStyle();

    // Require GMaps and Google Maps API
    if (!(typeof window.GMaps === 'function' && window.GMaps)) {
      console.log('GMaps (and Google Maps API) is required. Please register the following JavaScript library https://hpneo.github.io/gmaps/documentation.html');
    }

    map = new GMaps({
      div: settings.selector,
      lat: currentLocation.lat,
      lng: currentLocation.long,
      zoom: settings.initialZoom
    });

    map.map.setOptions({
      draggable: true,
      scrollwheel: false,
      disableDoubleClickZoom: true,
      zoomControl: true
    });

    // Past Lines
    map.drawPolyline({
      path: _toLatLongCollection(pastLines),
      strokeColor: settings.pastStroke.color,
      strokeOpacity: settings.pastStroke.opacity,
      strokeWeight: settings.pastStroke.weight
    });

    // Future Lines
    map.drawPolyline({
      path: _toLatLongCollection(futureLines),
      strokeColor: settings.futureStroke.color,
      strokeOpacity: settings.futureStroke.opacity,
      strokeWeight: settings.futureStroke.weight
    });

    for (var i = 0; i < settings.stops.length; ++i) {
      var stop = settings.stops[i];
      if (i != settings.currentStop) {
        map.addMarker({
          lat: stop.lat,
          lng: stop.long,
          icon: settings.iconUrl,
          infoWindow: { content: stop.info },
          anchorPoint: { x: 3, y: 3 }
        });
      }
    }

    map.drawOverlay({
      lat: currentLocation.lat,
      lng: currentLocation.long,
      content: '<div class="overlay">Current Location<br/>' + currentLocation.info + '<div class="overlay_arrow above"></div></div>',
      verticalAlign: 'top',
      horizontalAlign: 'center',
      layer: "overlayImage"
    });

    return {
      map: map,
      settings: settings,
      currentLocation: currentLocation
    };
  };

  var _toLatLong = function (stop) {
    return [ stop.lat, stop.long ];
  };

  var _toLatLongCollection = function (stops) {
    var collection = [];
    for (var x = 0; x < stops.length; ++x) {
      collection.push(_toLatLong(stops[x]));
    }
    
    return collection;
  };

  var _initStyle = function () {

    var stopStyle = ".stopName { background: none repeat scroll 0 0 #222; width: 4px; height: 4px; }" +
      ".gm-style-iw{ overflow: hidden !important; }";

    var style = document.createElement("style");
    style.innerHTML = stopStyle;
    document.head.appendChild(style);
  };

  var _extend = function (base, defaults) {

    var extended = defaults;
    
    // Extend options with defaults
    for (var key in base) {
      if (base.hasOwnProperty(key)) {
        if (base[key] !== undefined) {
          extended[key] = base[key];
        }
      }
    }

    return extended;

  };

  // Expose it as a public
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _travelMap;
    }
    exports.travelMap = _travelMap;
  } else {
    this.travelMap = _travelMap;
  }

  // AMD registration  
  if (typeof define === 'function' && define.amd) {
    define('travelMap', [], function () {
      return _travelMap;
    });
  }

}.call(this));