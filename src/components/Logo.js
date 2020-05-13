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
            <Container>
                <Image style={{width: 100, height: 100}}
                       source={require('../assets/images/react-logo.png')}/>
                <Text style={styles.logoText}> Test Client</Text>
            </Container>
        );
    };
}

const styles = StyleSheet.create({
    logoText: {
        fontSize: 22,
        marginVertical: 15,
        color: 'rgba(255,255,255,0.7)',
    },
});
