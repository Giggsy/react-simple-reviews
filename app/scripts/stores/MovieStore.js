var Reflux = require('reflux');
var $ = require('jquery');
var searchActions = require('../actions/SearchActions.js');

var _movies = [];

var MovieStore = Reflux.createStore({
  init: function() {
    this.listenTo(searchActions.updateMovies, this.onUpdateMovies);
  },

  onUpdateMovies: function(term) {
    this.trigger([]);
    this.fetchMovies(term);
  },

  getMovies: function() {
    return _movies; 
  },

  fetchMovies: function(term) {
    this.trigger({loading: true, matches: []});
    var apikey = '3jc5rjkcmb778zd5crd5zyfn';
    var matches;
    $.ajax('http://api.rottentomatoes.com/api/public/v1.0/movies.json', {
      data: {
        apikey: apikey,
        q: term
      },
      dataType: 'jsonp'
    }).success(function(data) {
      if (data.movies) {
        matches = data.movies.map(function(match) {
          return {title: match.title, year: match.year, thumbnail: match.posters.thumbnail, id: match.id, rating: match.ratings.critics_score};
        });
      } else {
        matches = [];
      }
      this.trigger({matches: matches, loading: false});
    }.bind(this));
  }
});

module.exports = MovieStore;
