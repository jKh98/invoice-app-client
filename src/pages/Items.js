import React, {Component} from 'react';
import {
    Text,
    View,
} from 'react-native';
import {Body, Container, Content, Header, Left, Right, Title} from 'native-base';


class Items extends Component<{}> {

    render() {
        return (
            <Container>
                <Header>
                    <Left/>
                    <Body>
                        <Title>Items</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content>
                </Content>
            </Container>
        );
    };
}

export default Items;
