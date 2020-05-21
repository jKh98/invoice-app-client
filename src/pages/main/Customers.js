import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {Container, Fab, Icon, List, View} from 'native-base';
import ListView from '../../components/ListView';
import {connect} from 'react-redux';
import EmptyListPlaceHolder from '../../components/EmptyListPlaceHolder';
import {getCurrency} from '../../utils/currencies.utils';
import {formatCurrency} from '../../utils/redux.form.utils';
import PageHeader from '../../components/MainPageHeader';

/**
 * Component that renders the customers list
 */
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

    /**
     * called on pressing add button
     * opens customer form page with null to indicate adding a new customer
     */
    addNewCustomer() {
        Actions.customerForm({customer: null});
    }

    /**
     * called on pressing add button
     * opens customer form page with a customer object to indicate editing an existing customer
     *
     * @param customer
     */
    editCustomer(customer) {
        Actions.customerForm({customer: customer});
    }

    /**
     * Dynamically maps customer list to list component
     *
     * @param customersList
     * @param currency
     * @returns {*}
     */
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
                                this.editCustomer(customer);
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
