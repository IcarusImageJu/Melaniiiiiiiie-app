import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {styles} from './styles';

function Button ({title, onPress}) {
    return(
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button