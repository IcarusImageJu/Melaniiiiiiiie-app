import React, {memo} from 'react';
import {Text, SafeAreaView, TouchableOpacity} from 'react-native';
import Button from '../../components/Button';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';
import reducer from './reducer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { createChan } from './actions';
import { useInjectReducer } from '../../utils/injectReducer';
import makeSelectCreate from './selectors';
import { createStructuredSelector } from 'reselect';

const key = 'create';

function Create({handleCreateChan, history, match}) {
	useInjectReducer({ key, reducer })
	useInjectSaga({ key, saga });

	return(
		<SafeAreaView style={{padding: 50}}>
			<TouchableOpacity onPress={history.goBack}>
				<Text>Go Back</Text>
			</TouchableOpacity>
            <Text>Select or record a sound for your chan: {match.params.slug}</Text>
			<Button onPress={() => handleCreateChan(match.params.slug, history.push)}>Submit</Button>
        </SafeAreaView>
	)
}

const mapStateToProps = createStructuredSelector({
    create: makeSelectCreate(),
});

export function mapDispatchToProps(dispatch) {
    return {
		handleCreateChan: (chan, push, sound) => dispatch(createChan(chan, push, sound)),
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
	withConnect,
	withRouter,
	memo,
)(Create);