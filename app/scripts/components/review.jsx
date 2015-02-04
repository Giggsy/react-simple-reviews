var React = require('React');
var Router = require('react-router');
var colors =  ["#4BE02D", "#53D72F", "#5CCF31", "#65C733", "#6EBF35", "#76B738", "#7FAF3A", "#88A73C", "#919F3E", "#9A9740", "#A28E43", "#AB8645", "#B47E47", "#BD7649", "#C66E4B", "#CE664E", "#D75E50", "#E05652", "#E94E54", "#F24657"]

var Review = React.createClass({
  mixins: [ Router.State ],

  colors: function() {
    var score = this.getParams().score;
    return (
      colors.map(function(color, i) {
      var maxRange = 100 - i * 5;
      var minRange = 100 - (i * 5) -5;
      var pickedStyle = { backgroundColor: color, height: '37%' };
      var style = { backgroundColor: color, height: '3.5%' };
      if (score >= minRange && score < maxRange) {
        return <div style={pickedStyle}>
          <div className="rating">{score}%</div>
        </div> 
      } else {
        return <div style={style} /> 
      }
    })
    )
  },

  render: function() {
    return (
      <div className="review-hero-unit">
        {this.colors()}
      </div>
    );
  }

});

module.exports = Review;
