import React, {Component} from 'react';
import {Button, Container, Footer, FooterTab, Icon, Header, Content} from 'native-base';
import {
    Text,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

class NavBar extends Component<{}> {
    render() {
        return (
            <Footer>
                <FooterTab>
                    <Button vertical onPress={() => {
                        Actions.invoices();
                    }}>
                        <Icon name="apps"/>
                        <Text>Apps</Text>
                    </Button>
                    <Button vertical onPress={() => {
                        Actions.customers();
                    }}>
                        <Icon name="camera"/>
                        <Text>Camera</Text>
                    </Button>
                    <Button vertical onPress={() => {
                        Actions.items();
                    }}>
                        <Icon active name="navigate"/>
                        <Text>Navigate</Text>
                    </Button>
                    <Button vertical onPress={() => {
                        Actions.settings();
                    }}>
                        <Icon name="person"/>
                        <Text>Contact</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    };
}

export default NavBar;
