import React, {Component} from 'react';
import {Button, Text, Footer, FooterTab, Icon, Header, Content} from 'native-base';
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
                        <Icon name="file-invoice-dollar" type={'FontAwesome5'}/>
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
                            }}
                            textStyle={{color: "#fff"}}>
                        <Icon name="settings"/>
                        <Text active>Settings</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}

export default NavBar;
