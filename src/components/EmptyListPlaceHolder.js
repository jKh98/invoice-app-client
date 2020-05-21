import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content, Text} from 'native-base';

/**
 * Placeholder component for empty lists
 * Should preview image and text
 */
export default class EmptyListPlaceHolder extends Component<{}> {
    render() {
        return (
            <Container>
                <Content padder contentContainerStyle={{display: 'flex', flex: 1, justifyContent: 'center'}}>
                    {/*<Image style={{width: 120, height: 120}}*/}
                    {/*       source={require(`../assets/images/empty-${this.props.type}-list.png`)}/>*/}
                    <Text style={styles.logoText}> {this.props.message}</Text>
                </Content>
            </Container>
        );
    };
}

const styles = StyleSheet.create({
    logoText: {
        textAlign: 'center',
        fontSize: 16,
        marginVertical: 15,
        color: 'rgba(0,0,0,0.7)',
    },
});
