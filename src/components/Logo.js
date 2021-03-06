import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native';
import {H1, View} from 'native-base';

/**
 * Logo component with brand name and brand icon for several use cases (Login, Splash ...)
 */
export default class Logo extends Component<{}> {
    render() {
        return (
            <View style={styles.container}>
                <Image style={{width: 120, height: 120}}
                       source={require('../assets/images/react-logo.png')}/>
                <H1>Invoice App</H1>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', justifyContent: 'center',
    },
    logoText: {
        fontSize: 22,
        marginVertical: 15,
        color: 'rgba(0,0,0,0.7)',
    },
});
