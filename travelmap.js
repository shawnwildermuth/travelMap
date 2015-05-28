//! travelmap.js
//! version : 1.0.2
//! authors : Shawn Wildermuth
//! license : MIT
//! repo    : https://github.com/shawnwildermuth/travelmap

// Build support for AMD or simple global (borrowed pattern from moment.js)
(function () {

  "use strict";

  // travelMap object
  var _travelMap = {};

  var _defaultOptions = {
    stops: [],        // Array of the stops to show (required)
    currentStop: 0,   // Ordinal Position of current location
    selector: "#map", // CSS Selector for container for the map
    icon: {           // Icon details
      url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAIAAABvrngfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAAAA1JREFUGFdjoDNgYAAAAHIAAejt7scAAAAASUVORK5CYII=",
      width: 3,
      height: 3,
    },
    initialZoom: 4,   // Initial Level of Zoom for the Google Map
    pastStroke: {     // Settings for the lines before the currentStop
      color: '#190300', 
      opacity: 0.5,
      weight: 2
    },
    futureStroke: {   // Settings for hte lines after the currentStop
      color: '#D30000',
      opacity: 0.6,
      weight: 2
    },
    mapOptions: {     // Options for map (See GMaps for full list of options)
      draggable: true,
      scrollwheel: false,
      disableDoubleClickZoom: true,
      zoomControl: true
    },
    overlay: {
      className: "travelmap-overlay"
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

    map.map.setOptions(settings.mapOptions);

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
          icon: settings.icon.url,
          infoWindow: { content: stop.info },
          anchorPoint: { x: settings.icon.width/2, y: settings.icon.height/2 }
        });
      }
    }

    map.drawOverlay({
      lat: currentLocation.lat,
      lng: currentLocation.long,
      content: '<div class="' + settings.overlay.className + '">Current Location<br/>' + currentLocation.info + '<div class="' + settings.overlay.className + '-arrow ' + settings.overlay.className + '-arrow-above"></div></div>',
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
      
    var overlayStyle = " .travelmap-overlay{" +
"  display:block;" +
"  text-align:center;" +
"  color:#fff;" +
"  font-size:12px;" +
"  line-height:14px;" +
"  opacity:0.8;" +
"  background:#4477aa;" +
"  border:solid 3px #336699;" +
"  border-radius:4px;" +
"  box-shadow:2px 2px 10px #333;" +
"  text-shadow:1px 1px 1px #666;" +
"  padding:0 4px;" +
"  margin-top: -24px;" +
"  white-space: nowrap;" +
"}" +

".travelmap-overlay-arrow{" +
"  left:50%;" +
"  margin-left:-16px;" +
"  width:0;" +
"  height:0;" +
"  position:absolute;" +
"}" +
".travelmap-overlay-arrow.travelmap-overlay-arrow-above{" +
"  bottom:-15px;" +
"  border-left:16px solid transparent;" +
"  border-right:16px solid transparent;" +
"  border-top:16px solid #336699;" +
"}" +
".travelmap-overlay-arrow.travelmap-overlay-arrow-below{" +
"  top:-15px;" +
"  border-left:16px solid transparent;" +
"  border-right:16px solid transparent;" +
"  border-bottom:16px solid #336699;" +
"}";

    var style = document.createElement("style");
    style.innerHTML = stopStyle + overlayStyle;
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