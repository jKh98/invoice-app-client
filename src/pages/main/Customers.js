import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {Container, Content, Header, Title, Right, Left, Body, Fab, Icon, List, View, Text} from 'native-base';
import ListView from '../../components/ListView';

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
                <View style={{flex: 1}}>
                    {this.renderCustomersList()}
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
        // alert('new customer');
        Actions.addCustomer();
    }

    openCustomerPage() {
        alert('i was clicked');
    }

    renderCustomersList() {
        return (<List
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
            }
            keyExtractor={(item, index) => index.toString()}>
        </List>);
    }
}

export default Customers;