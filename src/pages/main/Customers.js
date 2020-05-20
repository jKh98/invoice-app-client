import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {Container, Header, Title, Right, Left, Body, Fab, Icon, List, View, Text, Button} from 'native-base';
import ListView from '../../components/ListView';
import {connect} from 'react-redux';
import EmptyListPlaceHolder from '../../components/EmptyListPlaceHolder';
import {getCurrency} from '../../utils/currencies.utils';
import {formatCurrency} from '../../utils/redux.form.utils';

class Customers extends Component<{}> {
    render() {
        const {getCustomers, getUser: {userDetails}} = this.props;
        const currency = getCurrency(userDetails.base_currency);
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent light>
                            <Icon name='ios-menu'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Customers</Title>
                    </Body>
                    <Right/>
                </Header>
                <View style={{flex: 1}}>
                    {this.renderCustomersList(getCustomers.customersList || [],currency)}
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
        Actions.customerForm({customer: null});
    }

    openCustomerPage(customer) {
        Actions.customerForm({customer: customer});
    }

    renderCustomersList(customersList, currency) {
        return (<List
            ListEmptyComponent={
                <EmptyListPlaceHolder
                    type={'item'}
                    message={'No customers found.\nPress the plus button to add new customers.'}/>}
            dataArray={customersList}
            renderRow={
                (customer) =>
                    <ListView
                        title={customer.name}
                        subtitle={`${customer.number_invoices} invoices`}
                        right={formatCurrency(customer.total, currency)}
                        handleClickEvent={
                            () => {
                                this.openCustomerPage(customer);
                            }
                        }/>
            }
            keyExtractor={(item, index) => index.toString()}>
        </List>);
    }
}


const mapStateToProps = (state) => ({
    getUser: state.userReducer.getUser,
    getCustomers: state.customerReducer.getCustomers,
});

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Customers);
