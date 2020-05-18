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
    Text,
    Icon,
    Button,
    Tabs,
    Tab,
    Fab,
    List,
} from 'native-base';
import {connect} from 'react-redux';
import ListView from '../../components/ListView';
import {getInvoicesList} from '../../actions/invoice.actions';
import {ErrorUtils} from '../../utils/error.utils';
import EmptyListPlaceHolder from '../../components/EmptyListPlaceHolder';
import {getCustomersList} from '../../actions/customer.actions';
import Loader from '../../components/Loader';
import {getItemsList} from '../../actions/item.actions';

class Invoices extends Component<{}> {

    componentDidMount() {
        this.loadInvoicesList().then(r => {});
        this.loadCustomersList().then(r => {});
        this.loadItemsList().then(r => {});
    }

    async loadInvoicesList() {
        try {
            const response = await this.props.dispatch(getInvoicesList());
            if (!response.success) {
                throw response;
            }
        } catch (e) {
            const newError = new ErrorUtils(e);
            newError.showAlert();
        }
    }

    async loadCustomersList() {
        try {
            const response = await this.props.dispatch(getCustomersList());
            if (!response.success) {
                throw response;
            }
        } catch (e) {
            const newError = new ErrorUtils(e);
            newError.showAlert();
        }
    }

    async loadItemsList() {
        try {
            const response = await this.props.dispatch(getItemsList());
            if (!response.success) {
                throw response;
            }
        } catch (e) {
            const newError = new ErrorUtils(e);
            newError.showAlert();
        }
    }

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
                            <Text>{userDetails ? userDetails.name : 'man'}</Text>
                        </Tab>
                        <Tab heading="PENDING">
                            {   //todo add paid param
                                this.renderInvoicesList(
                                    (getInvoices.invoicesList || []).filter((invoice) => {
                                        return !invoice.paid.status;
                                    }, getCustomers.customersList || []),
                                )}
                            <Text>{userDetails ? userDetails.email : 'man'}</Text>
                        </Tab>
                        <Tab heading="PAID">
                            {   //todo add paid param
                                this.renderInvoicesList(
                                    (getInvoices.invoicesList || []).filter((invoice) => {
                                        return invoice.paid.status;
                                    }, getCustomers.customersList || []),
                                )}
                            <Text>{userDetails ? userDetails.password : 'man'}</Text>
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
        Actions.invoiceForm({invoice: null});
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
                        message={'No items found. Press the plus button to add new items.'}/>}
                dataArray={invoicesList}
                renderRow={
                    (invoice) =>
                        <ListView
                            // title={customersList.filter((e) => {
                            //     return e._id === invoice.customer;
                            // }).name}
                            subtitle={invoice.number}
                            right={invoice.total}
                            rightSub={invoice.issued}
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
