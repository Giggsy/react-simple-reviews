var React = require('react');
var $ = require('jquery');
var _ = require('lodash');
var tweenState = require('react-tween-state')

var MovieStore = require('../stores/MovieStore');
var searchActions = require('../actions/SearchActions');

var throttledUpdateMovies = _.debounce(searchActions.updateMovies, 800);


var SearchBox = React.createClass({
  mixins: [tweenState.Mixin],
  getInitialState: function() {
    return {
      value: '',
      matches: MovieStore.getMovies(),
      transform: '50%'
    };
  },

  onChange: function(movies) {
    this.setState({
      matches: movies
    });
  },

  componentDidMount: function() {
    this.unsubscribe = MovieStore.listen(this.onChange);
  },

  componentWillUnmount: function() {
    this.unsubscribe();
  },

  handleChange: function() {
    var term = $('.text-input').val();
    throttledUpdateMovies(term);
  },



  getSuggestions: function() {
    /*jshint ignore:start */
    return (
      this.state.matches.map(function (match) {
      return ( 
              <li className="list__item" key={match.title}>
                <span>
                  <img src={match.thumbnail} alt="" />
                </span>
                <span>
                  <div>{match.title}</div>
                  <div>{match.year}</div>
                </span>
              </li>
             )
    }) 
    );
    /*jshint ignore:end */
  },

  render: function() {
    /*jshint ignore:start */
    return (
        <input type="text" className="text-input" onChange={this.handleChange} />    
    );
    /*jshint ignore:end */
  }

});

module.exports = SearchBox;
