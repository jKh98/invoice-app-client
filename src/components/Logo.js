import React, {Component} from 'react';
import {
    View,
    Image,
    Text, StyleSheet,
} from 'react-native';
import {Container} from 'native-base';


export default class Logo extends Component<{}> {
    render() {
        return (
            <View style={styles.container}>
                <Image style={{width: 120, height: 120}}
                       source={require('../assets/images/react-logo.png')}/>
                <Text style={styles.logoText}> Test Client</Text>
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
