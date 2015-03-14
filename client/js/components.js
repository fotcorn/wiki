import React from 'react';

import {FlatButton} from 'material-ui';

export var Test = React.createClass({
    render() {
        return <div>
            <FlatButton label="Default" />
            <a onClick={this.eventHandler}>Hello World62</a>
        </div>
    },
    eventHandler() {
        alert('handler!');
    }
});
