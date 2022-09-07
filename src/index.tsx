import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import './index.css';
// Import Swiper styles
import 'swiper/swiper.min.css';
import { store } from './redux/store';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { SettingsProvider } from 'contexts/SettingsContext';
import ThemeConfig from 'theme';

ReactDOM.render(
	<Provider store={store}>
		<SettingsProvider>
			<ThemeConfig>
				<App />
			</ThemeConfig>
		</SettingsProvider>
		<ToastContainer position="top-right" />
	</Provider>,
	document.getElementById('root')
);
serviceWorkerRegistration.register();
