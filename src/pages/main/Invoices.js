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
import {getInvoicesList} from '../../actions/invoice.actions';
import {zeroPad} from '../../utils/general.utils';

class Invoices extends Component<{}> {

    render() {
        const {getUser: {userDetails}, getInvoices, getCustomers, getItems} = this.props;
        return (
            <Container>
                {(getCustomers.isLoading || getItems.isLoading || getInvoices.isLoading) && <Loader/>}
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
                            {this.renderInvoicesList(getInvoices.invoicesList || [], getCustomers.customersList || [])}
                        </Tab>
                        <Tab heading="PENDING">
                            {
                                this.renderInvoicesList(
                                    (getInvoices.invoicesList || []).filter((invoice) => {
                                        return !invoice.payment.status;
                                    }, getCustomers.customersList || []),
                                )}
                        </Tab>
                        <Tab heading="PAID">
                            {
                                this.renderInvoicesList(
                                    (getInvoices.invoicesList || []).filter((invoice) => {
                                        return invoice.payment.status;
                                    }, getCustomers.customersList || []),
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

    renderInvoicesList(invoicesList, customersList) {
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
                            right={invoice.total}
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
