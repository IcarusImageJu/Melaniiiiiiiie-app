import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {styles} from './styles';

function Button ({title, children, onPress}) {
    return(
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text>{children || title}</Text>
        </TouchableOpacity>
    )
}

export default Button