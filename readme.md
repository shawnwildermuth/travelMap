# travelMap

This project extends the GMaps project and allow a building of map that shows a travel map.

## Overview

I built this when I decided to travel around the world in a year. To create a map, you need GMaps and the Google Maps API. You can see it in action on my tour map:

> http://wilderworldtour.com

## Installation

You can either download the travelmap.js (or min.js) or you can just use bower to install it:

```
> bower install travelmap
```
## Dependencies

This project depends on [GMaps](https://github.com/hpneo/gmaps) and the Google Maps API. The bower package installs the GMaps project as a dependency already. It does not require any other libraries (e.g. no jQuery). It shouldn't have any problems working with any libraries as far as I know.

## Simple Usage

Before you can use the library, you need to include the Google API and GMaps libraries. Usually, you would include all three at once:

```
<script src="http://maps.google.com/maps/api/js?sensor=true" type="text/javascript" ></script>
<script src="/bower_components/gmaps/gmaps.js" type="text/javascript" ></script>
<script src="/bower_components/travelmap/travelmap.js" type="text/javascript" ></script>
// Your Script Goes Here
```

Once you have the scripts, it's usage is simply calling createMap and specifying the stops and selector:

```
// JavaScript
var map = travelMap.createMap({
  stops: [
    { 
      lat: 33.748995, 
      long: -84.387982, 
      info: "Atlanta, Georgia - Departed Jun 3, 2014" 
    },
    { 
      lat: 48.856614, 
      long: 2.352222, 
      info: "Paris, France - Jun 4-24, 2014" 
    },
    { 
      lat: 50.850000, 
      long: 4.350000, 
      info: "Brussels, Belgium - Jun 25-27, 2014" 
    }
  ],
  selector: "#map"
});
```

## Map Object

The map object that is returned from createMap contains three properties:

* map: The underlying GMaps object
* settings: The complete settings used to create the map. **(readonly)**
* currentStop: An object that represents the current stop on the trip. **(readonly)**

## options

When you call createMap, you can specify any of the following options (defaults are shown here):

```
{
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
  }
}
```

## Summary

If you're interested in making changes, please add an issue and send me a pull request! 