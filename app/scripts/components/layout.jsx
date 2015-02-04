var React = require('react');
require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var TransitionGroup = React.addons.CSSTransitionGroup;

var Layout = React.createClass({
  mixins: [ Router.State ],

  render: function() {
    var name = this.getRoutes().reverse()[0].name;

    return (
      <div className="App">
        <TransitionGroup component="div" transitionName="content">
          <RouteHandler key={name} />
        </TransitionGroup>
      </div>
    );
  }
});

module.exports = Layout;
