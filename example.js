// example.js
(function() {
  
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
  
})();