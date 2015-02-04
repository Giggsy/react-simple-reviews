var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;
var tweenState = require('react-tween-state');
var $ = require('jquery');
var SearchBox = require('./SearchBox');
var MovieStore = require('../stores/MovieStore');
var searchActions = require('../actions/SearchActions');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

React.initializeTouchEvents(true);
var Home = React.createClass({
  mixins: [tweenState.Mixin],

  getInitialState: function() {
    return {
      transform: 50,
      height: 40,
      matches: [],
      loading: false
    };
  }, 

  onChange: function(state) {
    this.setState(state);
    this.tween();
  },

  componentDidMount: function() {
    this.unsubscribe = MovieStore.listen(this.onChange);
  },

  componentWillUnmount: function() {
    this.unsubscribe();
  },

  tween: function() {
    this.tweenState('transform', {
      easing: tweenState.easingTypes.easeInOutQuad,
      duration: 500,
      endValue: this.state.left === 0 ? 50 : 0
    });
    this.tweenState('height', {
      easing: tweenState.easingTypes.easeInOutQuad,
      duration: 500,
      endValue: this.state.left === 0 ? 40 : 15
    });
  },

  tweenTransformValue: function() {
    return 'translateY(' + this.getTweeningValue('transform')+ '%)';
  },

  tweenHeightValue: function() {
    return  this.getTweeningValue('height') + 'vh';
  },

  displayList: function() {
    if (this.state.loading) {
      return (
        <div className="loader">Loading...</div>
      );
    }
  },

  render: function() {
    var style = {
      backgroundColor : '#76B738',
      height: this.tweenHeightValue(), 
      transform: this.tweenTransformValue(),
      WebkitTransform: this.tweenTransformValue()
    };


    var results = this.state.matches.map(function(movie) {
      return (
        <Link to="review" params={{score: movie.rating}}>
          <li className="list__item" key={movie.title}>
            <img className="thumbnail" src={movie.thumbnail} />
            <span className="title">
              {movie.title} ({movie.rating}%)
            </span>
          </li>
        </Link>
      )
    });

    return (
      /*jshint ignore:start */
      <div className="full">
        <div className="hero-unit" style={style}>
          <SearchBox />
        </div>
        <ul className="list__container">
          <ReactCSSTransitionGroup transitionName="example">
            {results}
          </ReactCSSTransitionGroup>
        </ul>
          {this.displayList()}
      </div>
      /*jshint ignore:end */
    );
  }
});

module.exports = Home;
