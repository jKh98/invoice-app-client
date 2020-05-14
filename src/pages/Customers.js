import React, {Component} from 'react';
import {
    Text,
    View,
} from 'react-native';
import {Container, Content, Header, Title, Right, Left, Body, Fab, Icon} from 'native-base';


class Customers extends Component<{}> {

    render() {
        return (
            <Container>
                <Header>
                    <Left/>
                    <Body>
                        <Title>Customers</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content>
                </Content>
                <View style={{flex: 1}}>
                    <Fab
                        style={{backgroundColor: '#5067FF'}}
                        position="bottomRight"
                        onPress={() => {
                            this.addNewCustomer();
                        }}>
                        <Icon name="add"/>
                    </Fab>
                </View>
            </Container>
        );
    };

    addNewCustomer() {
        alert("new customer")
    }
}

export default Customers;
