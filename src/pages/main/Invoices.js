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
import store from '../../config/store';
import ListView from '../../components/ListView';

const tempInvoices = [
    {
        customer: 'jihad',
        number: 123234,
        total: 120,
        date: '15/5/2020',
    },
    {
        customer: 'jihad',
        number: 123234,
        total: 120,
        date: '15/5/2020',
    },
    {
        customer: 'jihad',
        number: 123234,
        total: 120,
        date: '15/5/2020',
    },
    {
        customer: 'jihad',
        number: 123234,
        total: 120,
        date: '15/5/2020',
    },
    {
        customer: 'jihad',
        number: 123234,
        total: 120,
        date: '15/5/2020',
    },
    {
        customer: 'jihad',
        number: 123234,
        total: 120,
        date: '15/5/2020',
    },
    {
        customer: 'jihad',
        number: 123234,
        total: 120,
        date: '15/5/2020',
    },
    {
        customer: 'jihad',
        number: 123234,
        total: 120,
        date: '15/5/2020',
    },
    {
        customer: 'jihad',
        number: 123234,
        total: 120,
        date: '15/5/2020',
    },

];

class Invoices extends Component<{}> {

    render() {
        const {getUser: {userDetails}} = this.props;
        console.log(store().store.getState());
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent light>
                            <Icon name='ios-settings'/>
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
                            {this.renderInvoicesList()}
                            <Text>{userDetails ? userDetails.name : 'man'}</Text>
                        </Tab>
                        <Tab heading="PENDING">
                            {   //todo add pending param
                                this.renderInvoicesList()}
                            <Text>{userDetails ? userDetails.email : 'man'}</Text>
                        </Tab>
                        <Tab heading="PAID">
                            {   //todo add paid param
                                this.renderInvoicesList()}
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
        // alert('new invoice');
        Actions.invoiceForm();
    }

    renderInvoicesList() {
        return (
            <List
                dataArray={tempInvoices}
                renderRow={
                    (invoice) =>
                        <ListView
                            title={invoice.customer}
                            subtitle={invoice.number}
                            right={invoice.total}
                            rightSub={invoice.date}
                            handleClickEvent={
                                this.openInvoicePage
                            }/>
                }
                keyExtractor={(item, index) => index.toString()}>
            </List>
        );
    }

    openInvoicePage() {
        alert('opened');
    }
}

const mapStateToProps = (state) => ({
    getUser: state.userReducer.getUser,
});

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

export default connect(mapStateToProps, null)(Invoices);
