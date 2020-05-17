import React, {Component} from 'react';
import {
    Image, StyleSheet,
} from 'react-native';
import {View, Text} from 'native-base';


export default class EmptyListPlaceHolder extends Component<{}> {
    render() {
        return (
            //todo refactor
            <View style={styles.container}>
                {/*<Image style={{width: 120, height: 120}}*/}
                {/*       source={require(`../assets/images/empty-${this.props.type}-list.png`)}/>*/}
                <Text style={styles.logoText}> {this.props.message}</Text>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', justifyContent: 'center',
    },
    logoText: {
        fontSize: 16,
        marginVertical: 15,
        color: 'rgba(0,0,0,0.7)',
    },
});
