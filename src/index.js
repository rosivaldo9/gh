import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import  * as servicoWorker from './serviceWorker';


ReactDOM.render(<App />, document.getElementById('root'));

servicoWorker.unregister();