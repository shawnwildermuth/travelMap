module.exports = function (config) {
  config.set({
    browsers: ['Firefox'],
    frameworks: ['jasmine'],
    files: [
      'http://maps.google.com/maps/api/js?sensor=true',
      'bower_components/gmaps/gmaps.js',
      'travelmap.js',
      'tests/**/*.js'
    ]
  });
};