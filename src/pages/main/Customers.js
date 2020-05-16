import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {Container, Content, Header, Title, Right, Left, Body, Fab, Icon, List, View, Text} from 'native-base';
import ListView from '../../components/ListView';
import {connect} from 'react-redux';
import {getCustomersList} from '../../actions/customer.actions';

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

    componentDidMount() {
        this.props.dispatch(getCustomersList());
    }

    render() {
        const {getCustomers: {customersList}} = this.props;
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
                    {this.renderCustomersList(customersList)}
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
        Actions.customerForm();
    }

    openCustomerPage() {
        alert('i was clicked');
    }

    renderCustomersList(customersList) {
        console.log(customersList);
        return (<List
            dataArray={customersList}
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


const mapStateToProps = (state) => ({
    getCustomers: state.customerReducer.getCustomers,
});

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Customers);

// export default Customers;
