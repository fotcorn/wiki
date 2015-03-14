import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import {Page} from './components.js';

injectTapEventPlugin();

React.render(
    <Page />,
    document.getElementById('main')
);
