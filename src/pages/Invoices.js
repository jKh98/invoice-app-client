import React, {Component} from 'react';
import {
    Text,
    View,
} from 'react-native';
import {Container, Content, Header, Title, Right, Left, Body} from 'native-base';


class Invoices extends Component<{}> {

    render() {
        return (
            <Container>
                <Header>
                    <Left/>
                    <Body>
                        <Title>Invoices</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content>
                </Content>
            </Container>
        );
    };
}

export default Invoices;
