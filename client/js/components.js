import React from 'react';


export var Test = React.createClass({
    render() {
        return <a onClick={this.eventHandler}>Hello World62</a>
    },
    eventHandler() {
        alert('handler!');
    }
});
