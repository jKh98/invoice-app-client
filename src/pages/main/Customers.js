import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {Container, Header, Title, Right, Left, Body, Fab, Icon, List, View, Text} from 'native-base';
import ListView from '../../components/ListView';
import {connect} from 'react-redux';
import {getCustomersList} from '../../actions/customer.actions';
import Loader from '../../components/Loader';
import {ErrorUtils} from '../../utils/error.utils';
import EmptyListPlaceHolder from '../../components/EmptyListPlaceHolder';

class Customers extends Component<{}> {

    componentDidMount() {
        this.loadCustomersList();
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

    render() {
        const {getCustomers} = this.props;
        return (

            <Container>
                {getCustomers.isLoading && <Loader/>}
                <Header>
                    <Left/>
                    <Body>
                        <Title>Customers</Title>
                    </Body>
                    <Right/>
                </Header>
                <View style={{flex: 1}}>
                    {this.renderCustomersList(getCustomers.customersList || [])}
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

    renderCustomersList(customersList) {
        return (<List
            ListEmptyComponent={
                <EmptyListPlaceHolder
                    type={'item'}
                    message={'No customers found. Press the plus button to add new customers.'}/>}
            dataArray={customersList}
            renderRow={
                (customer) =>
                    <ListView
                        title={customer.name}
                        subtitle={customer.status}
                        right={customer.total}
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
    getCustomers: state.customerReducer.getCustomers,
});

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Customers);
