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
import { Button, InputItem, List } from '@ant-design/react-native';

import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { t } from '../../services/i18n'

import reducer from './reducer';
import saga from './saga';
import makeSelectHome from './selectors';

const key = 'home';

// import Button from '../../components/Button';

function Home({home, lang, handleloadList, handleloadCurrencies, handleChangeLang}) {
    useInjectReducer({ key, reducer });
    useInjectSaga({ key, saga });

    return(
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, paddingTop: 32}}>
				<List
					renderHeader={() => t('header')}
				>
					<InputItem />
				</List>
				<Button>
					Entrer dans le chan
				</Button>
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = createStructuredSelector({
    home: makeSelectHome(),
});
  
export function mapDispatchToProps(dispatch) {
    return {
        dispatch,
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