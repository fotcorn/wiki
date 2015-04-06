import React from 'react';
import {AppCanvas, AppBar, Paper} from 'material-ui';
import {RouteHandler, State} from 'react-router';
import $ from 'jquery';

var WikiContent = React.createClass({
    render() {
        return <Paper zDepth={1} id="text">
            <div>{this.props.content}</div>
        </Paper>
    }
});

var WikiEditor = React.createClass({
    render() {
        return <Paper zDepth={1} id="editor">
            <textarea>WikiEditor</textarea>
        </Paper>
    }
});

export var WikiPage = React.createClass({
    mixins: [State],
    getInitialState() {
        return {text: ''};
    },
    render() {
        return <div>
            <div className="main-container">
                <WikiContent content={this.state.text} />
            </div>
            <div className="main-container">
                <WikiEditor />
            </div>
        </div>
    },

    componentWillReceiveProps() {
        this.load();
    },

    componentDidMount() {
        this.load();
    },

    load() {
        $.get('/api/' + this.getParams().page + '.json', data => {
            this.setState({text: data.text});
        });
    }
});

export var PageNotFound = React.createClass({
   render() {
       return <h1>Page not found</h1>
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
