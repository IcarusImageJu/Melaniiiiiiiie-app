/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset'
import { Provider } from 'react-redux';
import * as Font from 'expo-font';

import { PersistGate } from 'redux-persist/integration/react'

import i18n from './services/i18n';
import configureStore from './configureStore';

const initialState = {};
const store = configureStore(initialState);

import App from './containers/App';

function Root() {
  const [appReady, setAppReady] = useState(false);
  const _cachRessourceAsync = async () => {
	// load minimal ressources for the homepage
	// const bg = require('./assets/login.png');
	// const logo = require('./assets/logo.png');
	try {
		await Promise.all([
			// Asset.fromModule(bg).downloadAsync(),
			// Asset.fromModule(logo).downloadAsync(),
			i18n.init(),
			Font.loadAsync({
				'antoutline': require('@ant-design/icons-react-native/fonts/antoutline.ttf'),
				'antfill': require('@ant-design/icons-react-native/fonts/antfill.ttf')
			})
		]);
		setAppReady(true)
    } catch (error) {
      	console.warn(error);
	}
    
  }
  if(!appReady){
    return(
      <AppLoading
        startAsync={_cachRessourceAsync}
        onFinish={() => setAppReady(true)}
      />
    )
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}

export default Root;
