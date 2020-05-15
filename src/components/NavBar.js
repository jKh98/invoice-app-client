import React, {Component} from 'react';
import {Button, Container, Footer, FooterTab, Icon, Header, Content} from 'native-base';
import {
    Text,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

class NavBar extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            scene: 1,
        };
    }

    render() {
        return (
            <Footer>
                <FooterTab>
                    <Button vertical
                            active={this.state.scene === 1}
                            onPress={() => {
                                Actions.invoices();
                                this.setState({scene: 1});
                            }}>
                        <Icon name="ios-document"/>
                        <Text>Invoice</Text>
                    </Button>
                    <Button vertical
                            active={this.state.scene === 2}
                            onPress={() => {
                                Actions.customers();
                                this.setState({scene: 2});
                            }}>
                        <Icon name="ios-people"/>
                        <Text>Customers</Text>
                    </Button>
                    <Button vertical
                            active={this.state.scene === 3}
                            onPress={() => {
                                Actions.items();
                                this.setState({scene: 3});
                            }}>
                        <Icon active name="ios-barcode"/>
                        <Text>Items</Text>
                    </Button>
                    <Button vertical
                            active={this.state.scene === 4}
                            onPress={() => {
                                Actions.settings();
                                this.setState({scene: 4});
                            }}>
                        <Icon name="settings"/>
                        <Text>Settings</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}

export default NavBar;
