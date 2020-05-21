import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Spinner} from 'native-base';

/**
 * Loader component shows when retrieving or sending data
 */
class Loader extends Component<{}> {

    render() {
        return (
            <View style={styles.container}>
                <Spinner color='blue'/>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 99,
        justifyContent: 'center',
    },
});

export default Loader;
