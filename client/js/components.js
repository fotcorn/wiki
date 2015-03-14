import React from 'react';
import {AppCanvas, AppBar} from 'material-ui';
import {RouteHandler} from 'react-router';


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

export var WikiPage = React.createClass({
    render() {
        return <div>
            <WikiContent />
            <WikiEditor />
        </div>
    }
});

export var Page = React.createClass({
    render() {
        return <AppCanvas predefinedLayout={1}>
            <AppBar title="Wiki" showMenuIconButton={false} />
            <div className="mui-app-content-canvas">
                <RouteHandler />
            </div>
        </AppCanvas>
    }
});
