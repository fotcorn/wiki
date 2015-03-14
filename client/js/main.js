import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Router, {Route, Redirect} from 'react-router';

import {Page, WikiPage} from './components.js';

injectTapEventPlugin();


var routes = (
    <Route handler={Page} path="/">
        <Route handler={WikiPage} path="/wiki/:page" />
        <Redirect from="/" to="/wiki/index" />
    </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler) {
    React.render(<Handler />, document.getElementById('main'));
});
