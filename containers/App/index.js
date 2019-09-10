import React, {memo, useEffect, useState} from 'react';
import { View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Route, NativeRouter } from 'react-router-native';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import i18next from 'i18next';

import MyStorage from '../../constants/myStorage';

import { makeSelectLocale } from '../LanguageProvider/selectors';
import { changeLocale } from '../LanguageProvider/actions';

import { styles } from './styles';

import Home from '../Home';
import Create from '../Create';
import Chan from '../Chan';

function App({lang, handleSetLocale}) {
  const [localized, setLocalized] = useState(false);
  const _handleChangeLang = async locale => {
    if(locale !== ''){
      await i18next.changeLanguage(locale);
      setLocalized(!localized);
      await SecureStore.setItemAsync(MyStorage.LANG, locale);
    } else {
      const currentLang = await SecureStore.getItemAsync(MyStorage.LANG);
      handleSetLocale(currentLang);
    }
    
  }
  useEffect(() => {
    _handleChangeLang(lang)
    },[lang]
  );
  return (
    <NativeRouter>
        <View style={styles.container}>
          <Route exact path='/' component={Home}/>
		  <Route exact path='/create/:slug' component={Create}/>
		  <Route exact path='/chan/:slug' component={Chan}/>
        </View>
    </NativeRouter>
  );
}

const mapStateToProps = createStructuredSelector({
  lang: makeSelectLocale(),
});

export function mapDispatchToProps(dispatch) {
  return {
      dispatch,
      handleSetLocale: locale => dispatch(changeLocale(locale))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(App);
