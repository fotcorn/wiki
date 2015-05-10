import React from 'react';
import {AppCanvas, AppBar, Paper} from 'material-ui';
import {RouteHandler, State, Navigation, Link} from 'react-router';
import $ from 'jquery';

var md = require('markdown-it')({breaks: true})
    .use(require('markdown-it-highlightjs'))
    .use(require('./markdown-it-checkbox'))
    .use(require('./markdown-it-link'));


var WikiContent = React.createClass({
    mixins: [Navigation],
    componentDidMount() {
        window.wikiTransitionToPage = (page) => {
            this.transitionTo('wiki_page', {page: page});
        };
    },
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
        this.props.onChange(event.target.value);
    }
});

export var WikiPage = React.createClass({
    mixins: [State],
    getInitialState() {
        return {markdown: '', html: '', dirty: false};
    },
    render() {
        if (this.state.dirty) {
            var dirty = <span>unsaved changes</span>
        } else {
            var dirty = <span>saved</span>
        }
        return <div>
            <h1 id="page-title">{this.state.title} - {dirty}</h1>
            <div className="main-container">
                <WikiContent content={this.state.html} />
            </div>
            <div className="main-container">
                <WikiEditor markdown={this.state.markdown} onChange={this.update} />
            </div>
        </div>
    },
    renderMarkdown(markdown) {
        this.setState({html: md.render(markdown)});
    },
    update(markdown) {
        this.setState({markdown: markdown, dirty: true});
        this.renderMarkdown(markdown);
    },
    load() {
        if (this.interval == null) {
            window.setInterval(() => this.save() , 2000);
        }
        $.get('http://localhost:5000/api/pages/' + this.getParams().page + '/', data => {
            if (data.text == null) {
                data.text = '';
            }
            this.setState({markdown: data.text, title: this.getParams().page, dirty: false});
            this.renderMarkdown(data.text);
        });
    },
    save() {
        if (this.state.dirty) {
            $.ajax({
                type: 'POST',
                url: 'http://localhost:5000/api/pages/' + this.getParams().page + '/',
                data: JSON.stringify({'text': this.state.markdown}),
                contentType: 'application/json'
            });
            this.setState({dirty: false});
        }
    },
    componentWillReceiveProps() {
        this.load();
    },
    componentDidMount() {
        this.load();
    },
    interval: null
});

export var PageNotFound = React.createClass({
   render() {
       return <h1>Page not found</h1>
   }
});

export var Page = React.createClass({
    render() {
        return <AppCanvas predefinedLayout={1}>
            <AppBar title={<Link to="wiki_page" params={{page: "index"}} className="mui-app-bar-title">Wiki</Link>} showMenuIconButton={false} />
            <div className="mui-app-content-canvas">
                <RouteHandler />
            </div>
        </AppCanvas>
    }
});
