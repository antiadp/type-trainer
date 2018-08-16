import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './ducks/store';

//CSS Imports:
import './Components/CSS/Reset.css';
import './index.css';
import './App.css';
import './Components/Charts/Charts.css';
import './Components/Login/Login.css';
import './Components/Metrics/Metrics.css';
import './Components/Profile/Profile.css';
import './Components/SideNav/SideNav.css';
import './Components/Typing/Typing.css';
import './Components/DisplayText/DisplayText.css'
import './Components/MetricsModal/MetricsModal.css'

// import registerServiceWorker from './registerServiceWorker';
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
// registerServiceWorker();
