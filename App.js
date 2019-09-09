/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Asset, AppLoading, Updates } from 'expo';
import { Provider } from 'react-redux';

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
    // load i18n translation
    try {
      await i18n.init();
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

  const _purger = async () => {
	await store.persistor.purge();
	Updates.reloadFromCache();
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <App />
		<TouchableOpacity onPress={_purger}>
			<Text>Purge the app</Text>
		</TouchableOpacity>
      </PersistGate>
    </Provider>
  );
}

export default Root;
