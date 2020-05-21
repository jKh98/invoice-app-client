import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {Container, Fab, Icon, List, View} from 'native-base';
import ListView from '../../components/ListView';
import {connect} from 'react-redux';
import EmptyListPlaceHolder from '../../components/EmptyListPlaceHolder';
import {getCurrency} from '../../utils/currencies.utils';
import {formatCurrency} from '../../utils/redux.form.utils';
import PageHeader from '../../components/MainPageHeader';

class Customers extends Component<{}> {
    render() {
        const {getCustomers, getUser: {userDetails}} = this.props;
        const currency = getCurrency(userDetails.base_currency);
        return (
            <Container>
                <PageHeader title={'Customers'}/>
                <View style={{flex: 1}}>
                    {this.renderCustomersList(getCustomers.customersList || [], currency)}
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
