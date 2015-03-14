import React from 'react';

import {AppCanvas, AppBar} from 'material-ui';

var WikiContent = React.createClass({
   render() {
       return <div>WikiContent</div>
   }
});

var WikiEditor = React.createClass({
    render() {
        return <div>WikiEditor</div>
    }
});

export var Page = React.createClass({
    render() {
        return <AppCanvas predefinedLayout={1}>
            <AppBar title="Wiki" showMenuIconButton={false} />
            <div className="mui-app-content-canvas">
                <WikiContent />
                <WikiEditor />
            </div>
        </AppCanvas>
    }
});
