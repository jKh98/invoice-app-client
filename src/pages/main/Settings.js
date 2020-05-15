import React, {Component} from 'react';
import {Body, Container, Content, Header, Left, Right, Title, Text} from 'native-base';


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
