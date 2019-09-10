import React, {memo} from 'react';
import {Text, SafeAreaView} from 'react-native';
import Button from '../../components/Button';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';
import reducer from './reducer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { emitSound, changeType } from './actions';
import { useInjectReducer } from '../../utils/injectReducer';
import makeSelectChan from './selectors';
import { Link } from 'react-router-native'
import { createStructuredSelector } from 'reselect';
import { ENUM_CHAN_TYPE } from '../../constants/chanType';

const key = 'chan';

function Chan({chan, handleChangeChanType, history, match}) {
	useInjectReducer({ key, reducer })
	useInjectSaga({ key, saga });

	return(
		<SafeAreaView style={{padding: 50}}>
			<Link to="/">
				<Text>Go Back</Text>
			</Link>
            <Text>Bienvenue dans le chan: {match.params.slug}</Text>
			<Link to={`/create/${match.params.slug}`}>
				<Text>Changer le son du chan</Text>
			</Link>
			<Button onPress={() => handleChangeChanType(ENUM_CHAN_TYPE.RECEIVER)}>Etre receveur</Button>
			<Button onPress={() => handleChangeChanType(ENUM_CHAN_TYPE.EMITTER)}>Etre Emetteur</Button>
			<Button onPress={() => handleChangeChanType(ENUM_CHAN_TYPE.BOTH)}>Les deux</Button>
			{(chan.type === ENUM_CHAN_TYPE.EMITTER || chan.type === ENUM_CHAN_TYPE.BOTH ) &&
				<Text>Je suis emetteur</Text>
			}
			{(chan.type === ENUM_CHAN_TYPE.RECEIVER || chan.type === ENUM_CHAN_TYPE.BOTH ) &&
				<Text>Je suis receveur</Text>
			}
        </SafeAreaView>
	)
}

const mapStateToProps = createStructuredSelector({
    chan: makeSelectChan(),
});

export function mapDispatchToProps(dispatch) {
    return {
		handleSubmitSound: () => dispatch(emitSound()),
		handleChangeChanType: type => dispatch(changeType(type)),
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
)(Chan);