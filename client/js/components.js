import React from 'react';
import {AppCanvas, AppBar, Paper} from 'material-ui';
import {RouteHandler, State} from 'react-router';
import $ from 'jquery';

var md = require('markdown-it')({breaks: true})
    .use(require('markdown-it-highlightjs'))
    .use(require('./markdown-it-checkbox'));


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
            <button onClick={this.props.onSaveClick}>Save</button>
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
            <h1 id="page-title">{this.state.title}</h1>
            <div className="main-container">
                <WikiContent content={this.state.html} />
            </div>
            <div className="main-container">
                <WikiEditor markdown={this.state.markdown} onChange={this.update} onSaveClick={this.save} />
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
        this.setState({markdown: markdown, html: md.render(markdown)});
    },
    load() {
        $.get('http://localhost:5000/api/pages/' + this.getParams().page + '/', data => {
            this.update(data.text);
            this.setState({title: this.getParams().page})
        });
    },
    save() {
        $.post('http://localhost:5000/api/pages/' + this.getParams().page + '/', data=JSON.stringify({'text': this.state.markdown}));
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
