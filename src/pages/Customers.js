import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {
    SafeAreaView,
    View,
} from 'react-native';
import {Container, Content, Header, Title, Right, Left, Body, Fab, Icon, List} from 'native-base';
import ListView from '../components/ListView';

const tempCustomers = [
    {
        name: 'jihad',
        status: 'nothing',
        total: 20,
    }, {
        name: 'jad',
        status: 'nothing',
        total: 100,
    }, {
        name: 'john',
        status: 'nothing',
        total: 0.11,
    }, {
        name: 'sarah',
        status: 'nothing',
        total: 12000,
    }, {
        name: 'none',
        status: 'nothing',
        total: 0.120,
    },
    {
        name: 'jihad',
        status: 'nothing',
        total: 20,
    }, {
        name: 'jad',
        status: 'nothing',
        total: 100,
    }, {
        name: 'john',
        status: 'nothing',
        total: 0.11,
    }, {
        name: 'sarah',
        status: 'nothing',
        total: 12000,
    }, {
        name: 'none',
        status: 'nothing',
        total: 0.120,
    },
];

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
                <Content style={{flex: 1}} contentContainerStyle={{flex: 1}}>
                    <List
                        dataArray={tempCustomers}
                        renderRow={
                            (customer) =>
                                <ListView
                                    title={customer.name}
                                    subtitle={customer.status}
                                    right={customer.total}
                                    handleClickEvent={
                                        this.openCustomerPage
                                    }/>
                        }>
                    </List>
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
                </Content>
            </Container>
        );
    };

    addNewCustomer() {
        // alert('new customer');
        Actions.addCustomer();
    }

    openCustomerPage() {
        alert('i was clicked');
    }
}

export default Customers;
