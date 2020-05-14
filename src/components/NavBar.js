import React, {Component} from 'react';
import {Button, Container, Footer, FooterTab, Icon, Header, Content} from 'native-base';
import {
    Text,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

class NavBar extends Component<{}> {
    render() {
        return (
            <Container>
                {/*<Header/>*/}
                <Content/>
                <Footer>
                    <FooterTab>
                        <Button vertical >
                            <Icon name="apps"/>
                            <Text>Apps</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="camera"/>
                            <Text>Camera</Text>
                        </Button>
                        <Button vertical active>
                            <Icon active name="navigate"/>
                            <Text>Navigate</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="person"/>
                            <Text>Contact</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    };
}

export default NavBar;
