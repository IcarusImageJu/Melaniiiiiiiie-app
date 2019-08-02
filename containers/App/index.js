import React, {memo, useEffect, useState} from 'react';
import { View, AsyncStorage } from 'react-native';
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

function App({lang, handleSetLocale}) {
  const [localized, setLocalized] = useState(false);
  const _handleChangeLang = async locale => {
    if(locale !== ''){
      await i18next.changeLanguage(locale);
      setLocalized(!localized);
      await AsyncStorage.setItem(MyStorage.LANG, locale);
    } else {
      const currentLang = await AsyncStorage.getItem(MyStorage.LANG);
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
