import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {Container, Fab, Icon, List, View} from 'native-base';
import {connect} from 'react-redux';
import ListView from '../../components/ListView';
import EmptyListPlaceHolder from '../../components/EmptyListPlaceHolder';
import Loader from '../../components/Loader';
import moment from 'moment';
import {zeroPad} from '../../utils/general.utils';
import {getCurrency} from '../../utils/currencies.utils';
import {formatCurrency} from '../../utils/redux.form.utils';
import PageHeader from '../../components/MainPageHeader';

/**
 * Component that renders the invoices list
 */
class Invoices extends Component<{}> {

    render() {
        const {getUser: {userDetails}, getInvoices, getCustomers} = this.props;
        const currency = getCurrency(userDetails.base_currency);

        return (
            <Container>
                {getInvoices.isLoading && <Loader/>}
                <PageHeader title={'Invoices'}/>
                <View style={{flex: 1}}>
                    {this.renderInvoicesList(getInvoices.invoicesList || [],
                        getCustomers.customersList || [],
                        currency)}
                    <Fab
                        style={{backgroundColor: '#5067FF'}}
                        position="bottomRight"
                        onPress={() => {
                            this.addNewInvoice();
                        }}>
                        <Icon name="add"/>
                    </Fab>
                </View>
            </Container>
        );
    };

    /**
     * called on pressing add button
     * opens invoice form page with null to indicate adding a new invoice
     */
    addNewInvoice() {
        let newNumber = this.props.getInvoices ? this.props.getInvoices.invoicesList.length : 1;
        Actions.invoiceForm({invoice: null, newNumber: zeroPad(newNumber, 8)});
    }

    /**
     * called on pressing add button
     * opens invoice form page with an invoice object to indicate editing an existing invoice
     *
     * @param invoice
     */
    editInvoice(invoice) {
        Actions.invoiceForm({invoice: invoice});
    }

    /**
     * Dynamically maps invoice list to list component
     * Maps customer names to corresponding invoices
     *
     * @param invoicesList
     * @param customersList
     * @param currency
     * @returns {*}
     */
    renderInvoicesList(invoicesList, customersList, currency) {
        return (
            <List
                ListEmptyComponent={
                    <EmptyListPlaceHolder
                        type={'item'}
                        message={'No invoices found.\nPress the plus button to add new items.'}/>}
                dataArray={invoicesList}
                renderRow={
                    (invoice) =>
                        <ListView
                            title={(customersList.find(e => e._id === invoice.customer) || {}).name}
                            subtitle={invoice.number}
                            right={formatCurrency(invoice.total, currency)}
                            rightSub={moment(invoice.issued).format('DD/MM/YYYY')}
                            handleClickEvent={
                                () => {
                                    this.editInvoice(invoice);
                                }
                            }/>
                }
                keyExtractor={(item, index) => index.toString()}>
            </List>
        );
    }
}

/**
 * map props to invoices reducer to get invoices list
 * map props to customer reducer to get map customer names to invoices
 * map props to user reducer to get base currency
 *
 * @param state
 * @returns {{getInvoices: getInvoices, getItems: getItems, getCustomers: getCustomers, getUser: getUser}}
 */
const mapStateToProps = (state) => ({
    getInvoices: state.invoiceReducer.getInvoices,
    getCustomers: state.customerReducer.getCustomers,
    getUser: state.userReducer.getUser,
});

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Invoices);
