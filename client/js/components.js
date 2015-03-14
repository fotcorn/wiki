import React from 'react';
import {AppCanvas, AppBar} from 'material-ui';
import {RouteHandler, State} from 'react-router';
import $ from 'jquery';

var WikiContent = React.createClass({
    render() {
        return <div>{this.props.content}</div>
    }
});

var WikiEditor = React.createClass({
    render() {
        return <div>WikiEditor</div>
    }
});

export var WikiPage = React.createClass({
    mixins: [State],
    getInitialState() {
        return {text: ''};
    },
    render() {
        return <div>
            <WikiContent content={this.state.text} />
            <WikiEditor />
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
