import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Router, {Route, Redirect, NotFoundRoute} from 'react-router';

import {Page, WikiPage, PageNotFound} from './components.js';

injectTapEventPlugin();


var routes = (
    <Route handler={Page} path="/">
        <Route handler={WikiPage} path="/wiki/:page" name="wiki_page" />
        <Redirect from="/" to="/wiki/index" />
        <NotFoundRoute handler={PageNotFound}/>
    </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler) {
    React.render(<Handler />, document.getElementById('main'));
});
