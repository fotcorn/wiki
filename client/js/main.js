import {Test} from './components.js';
import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

React.render(
    <Test />,
    document.getElementById('main')
);
