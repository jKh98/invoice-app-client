import React, {Component} from 'react';
import {
    Text,
    View,
} from 'react-native';
import {Body, Container, Content, Header, Left, Right, Title} from 'native-base';
import NavBar from '../components/NavBar';


class Settings extends Component<{}> {

    render() {
        return (
            <Container>
                <Header>
                    <Left/>
                    <Body>
                        <Title>Settings</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content>
                </Content>
            </Container>
        );
    };
}

export default Settings;
