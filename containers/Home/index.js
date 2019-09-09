import React, {memo} from 'react';
import {
    Text,
    FlatList,
    SafeAreaView,
	View,
	TextInput
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
import {changeInputChan, submitChan} from './actions';
import {makeSelectLocale} from '../LanguageProvider/selectors';

const key = 'home';

import Button from '../../components/Button';

function Home({home, handleSubmitChan, handleChangeInputChan}) {
    useInjectReducer({ key, reducer });
    useInjectSaga({ key, saga });

    return(
        <SafeAreaView style={{padding: 50}}>
            <Text>Entrer un nom de chan pour le rejoindre ou le creer si il n'existe pas encore</Text>
			<TextInput
				style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
				onChangeText={handleChangeInputChan}
				value={home.chan}
			/>
			<Button onPress={() => handleSubmitChan(home.chan)}>
				Rejoindre le chan
			</Button>
			<FlatList
				ListHeaderComponent={<Text>Retrouver vos canaux</Text>}
				data={home.chans}
				keyExtractor={item => item}
				renderItem={({item}) => <Text>{item}</Text>}
			/>
        </SafeAreaView>
    )
}

const mapStateToProps = createStructuredSelector({
    home: makeSelectHome(),
    lang: makeSelectLocale(),
});
  
export function mapDispatchToProps(dispatch) {
    return {
		handleChangeInputChan: text => dispatch(changeInputChan(text)),
		handleSubmitChan: chan => dispatch(submitChan(chan)),
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