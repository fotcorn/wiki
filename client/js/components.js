import React from 'react';
import {AppCanvas, AppBar, Paper} from 'material-ui';
import Router from 'react-router';  // {RouteHandler, State, Navigation, Link}
import SublimeKeyMap from 'codemirror/keymap/sublime';
import CodeMirror from './codemirror';
import config from './config';
import $ from 'jquery';

var md = require('markdown-it')({breaks: true, linkify: true})
    .use(require('markdown-it-highlightjs'))
    .use(require('./markdown-it-checkbox'))
    .use(require('./markdown-it-link'));

var WikiContent = React.createClass({
    mixins: [Router.Navigation],

    componentDidUpdate() {
        var wikiContent = this;
        $('.wiki-page-link').on('click', function() {
            var page = $(this).data('wiki-page');
            wikiContent.transitionTo('wiki_page', {page: page});
            return false;
        });
    },
    render() {
        return <Paper zDepth={1} id="text">
            <div dangerouslySetInnerHTML={{__html:this.props.content}}></div>
        </Paper>
    }
});

var WikiEditor = React.createClass({
    keyMap: {
        Tab: function(cm) {
            if (cm.somethingSelected()) {
                cm.indentSelection("add");
            } else {
                cm.replaceSelection(cm.getOption("indentWithTabs") ? "\t" :
                    Array(cm.getOption("indentUnit") + 1).join(" "), "end", "+input");
            }
        },
        'Ctrl-T': false,
        fallthrough: ['sublime']
    },
    render() {
        return <Paper zDepth={1} id="editor">
            <CodeMirror onChange={this.handleChange} value={this.props.markdown} viewportMargin={Infinity}
                keyMap={this.keyMap} extraKeys={{'Ctrl-S': this.props.onSave}} />
        </Paper>
    },
    handleChange(event) {
        this.props.onChange(event.target.value);
    }
});

export var WikiPage = React.createClass({
    mixins: [Router.State],
    getInitialState() {
        return {markdown: '', html: '', dirty: false};
    },
    render() {
        let dirty;
        if (this.state.dirty) {
            dirty = <span>unsaved changes</span>
        } else {
            dirty = <span>saved</span>
        }
        return <div>
            <h1 id="page-title">{this.state.title} - {dirty}</h1>
            <div className="main">
                <div className="main-container left">
                    <WikiContent content={this.state.html} />
                </div>
                <div className="main-container right">
                    <WikiEditor markdown={this.state.markdown} onChange={this.update} onSave={this.save} />
                </div>
                <div style={{clear: 'both'}}></div>
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
        let pageName = this.getParams().page;
        $.get(config.apiUrl + '/pages/' + pageName + '/', data => {
            if (data.text == null) {
                data.text = '';
            }
            this.setState({markdown: data.text, title: pageName, dirty: false});
            md.context = {current_page: pageName};
            $('title').html(pageName + ' - stormnotes.io');
            this.renderMarkdown(data.text);
        }).fail(function() {
            window.location = '/account/login/?next=' + encodeURIComponent(window.location.pathname);
        });
    },
    save() {
        if (this.state.dirty) {
            $.ajax({
                type: 'POST',
                url: config.apiUrl + '/pages/' + this.getParams().page + '/',
                data: JSON.stringify({'text': this.state.markdown}),
                contentType: 'application/json'
            }).fail(function() {
                window.location = '/account/login/?next=' + encodeURIComponent(window.location.pathname);
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
        return <AppCanvas>
            <AppBar title={<Router.Link to="wiki_page" params={{page: "index"}} className="mui-app-bar-title">Wiki</Router.Link>} showMenuIconButton={false} />
            <div className="mui-app-content-canvas">
                <Router.RouteHandler />
            </div>
        </AppCanvas>
    }
});
