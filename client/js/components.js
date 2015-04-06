import React from 'react';
import {AppCanvas, AppBar, Paper} from 'material-ui';
import {RouteHandler, State} from 'react-router';
import $ from 'jquery';
import {markdown as Markdown} from 'markdown';

var WikiContent = React.createClass({
    render() {
        return <Paper zDepth={1} id="text">
            <div dangerouslySetInnerHTML={{__html:this.props.content}}></div>
        </Paper>
    }
});

var WikiEditor = React.createClass({
    render() {
        return <Paper zDepth={1} id="editor">
            <textarea onChange={this.handleChange} value={this.props.markdown}></textarea>
        </Paper>
    },
    handleChange(event) {
        this.props.onChange(event.target.value)
    }
});

export var WikiPage = React.createClass({
    mixins: [State],
    getInitialState() {
        return {markdown: '', html: ''};
    },
    render() {
        return <div>
            <div className="main-container">
                <WikiContent content={this.state.html} />
            </div>
            <div className="main-container">
                <WikiEditor markdown={this.state.markdown} onChange={this.update}/>
            </div>
        </div>
    },
    componentWillReceiveProps() {
        this.load();
    },
    componentDidMount() {
        this.load();
    },
    update(markdown) {
        this.setState({markdown: markdown, html: Markdown.toHTML(markdown)});
    },
    load() {
        $.get('/api/' + this.getParams().page + '.json', data => {
            this.update(data.text);
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
