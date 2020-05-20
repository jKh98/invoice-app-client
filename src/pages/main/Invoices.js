import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {
    Container,
    Content,
    Header,
    Title,
    Right,
    Left,
    Body,
    Icon,
    Button,
    Tabs,
    Tab,
    Fab,
    List,
} from 'native-base';
import {connect} from 'react-redux';
import ListView from '../../components/ListView';
import EmptyListPlaceHolder from '../../components/EmptyListPlaceHolder';
import Loader from '../../components/Loader';
import moment from 'moment';
import {zeroPad} from '../../utils/general.utils';
import {getCurrency} from '../../utils/currencies.utils';
import {formatCurrency} from '../../utils/redux.form.utils';

class Invoices extends Component<{}> {

    render() {
        const {getUser: {userDetails}, getInvoices, getCustomers} = this.props;
        const currency = getCurrency(userDetails.base_currency);
        return (
            <Container>
                {getInvoices.isLoading && <Loader/>}
                <Header>
                    <Left>
                        <Button transparent light>
                            <Icon name='ios-menu'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Invoices</Title>
                    </Body>
                    <Right>
                        <Button transparent light>
                            <Icon name='ios-search'/>
                        </Button>
                    </Right>
                </Header>
                <Content style={{flex: 1}} contentContainerStyle={{flex: 1}}>
                    <Tabs>
                        <Tab heading="ALL">
                            {this.renderInvoicesList(getInvoices.invoicesList || [],
                                getCustomers.customersList || [],
                                currency)}
                        </Tab>
                        <Tab heading="PENDING">
                            {
                                this.renderInvoicesList(
                                    (getInvoices.invoicesList || []).filter((invoice) => {
                                            return (invoice.payment && !invoice.payment.status);
                                        }, getCustomers.customersList || [],
                                        currency),
                                )}
                        </Tab>
                        <Tab heading="PAID">
                            {
                                this.renderInvoicesList(
                                    (getInvoices.invoicesList || []).filter((invoice) => {
                                            return (invoice.payment && invoice.payment.status);
                                        }, getCustomers.customersList || [],
                                        currency),
                                )}
                        </Tab>
                    </Tabs>
                    <Fab
                        style={{backgroundColor: '#5067FF'}}
                        position="bottomRight"
                        onPress={() => {
                            this.addNewInvoice();
                        }}>
                        <Icon name="add"/>
                    </Fab>
                </Content>
            </Container>
        );
    };

    addNewInvoice() {
        let newNumber = this.props.getInvoices ? this.props.getInvoices.invoicesList.length : 1;
        Actions.invoiceForm({invoice: null, newNumber: zeroPad(newNumber, 8)});
    }

    openInvoicePage(invoice) {
        Actions.invoiceForm({invoice: invoice});
    }

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
                                    this.openInvoicePage(invoice);
                                }
                            }/>
                }
                keyExtractor={(item, index) => index.toString()}>
            </List>
        );
    }
}

const mapStateToProps = (state) => ({
    getInvoices: state.invoiceReducer.getInvoices,
    getCustomers: state.customerReducer.getCustomers,
    getItems: state.itemReducer.getItems,
    getUser: state.userReducer.getUser,
});

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Invoices);
