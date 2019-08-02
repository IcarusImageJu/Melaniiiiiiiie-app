import React, {memo} from 'react';
import {
    Text,
    FlatList,
    SafeAreaView,
    View
} from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { t } from '../../services/i18n'

import reducer from './reducer';
import saga from './saga';
import makeSelectHome from './selectors';
import {loadList, loadCurrencies} from './actions';
import {changeLocale} from '../LanguageProvider/actions';
import {makeSelectLocale} from '../LanguageProvider/selectors';

const key = 'home';

import Button from '../../components/Button';

function Home({home, lang, handleloadList, handleloadCurrencies, handleChangeLang}) {
    useInjectReducer({ key, reducer });
    useInjectSaga({ key, saga });

    return(
        <SafeAreaView>
            <View style={{flex: 1, paddingTop: 32}}>
                <Text>{t('header')}</Text>
                <Text>Current language: {lang}</Text>
                <Button onPress={() => handleChangeLang('en')} title='App in EN' />
                <Button onPress={() => handleChangeLang('fr')} title='App en FR' />
                <Text>Fetch julien github repos with fetch</Text>
                <Button onPress={handleloadList} title='Fetch list' />
                <FlatList
                    keyExtractor={item => item.name}
                    data={home.list}
                    renderItem={({item}) => (
                        <Text>{item.name}</Text>
                    )}
                />
                <Text>Fetch currency rates witch GQL</Text>
                <Button onPress={handleloadCurrencies} title='Fetch rates' />
                <FlatList
                    keyExtractor={item => item.name}
                    data={home.rates}
                    renderItem={({item}) => (
                        <Text>{item.name}</Text>
                    )}
                />
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = createStructuredSelector({
    home: makeSelectHome(),
    lang: makeSelectLocale(),
});
  
export function mapDispatchToProps(dispatch) {
    return {
        handleloadList: () => dispatch(loadList()),
        handleloadCurrencies: () => dispatch(loadCurrencies()),
        handleChangeLang: lang => dispatch(changeLocale(lang))
    };
}
  
const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
    memo,
)(Home);