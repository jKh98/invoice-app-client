import React, {Component} from 'react';
import {Container, Content, CardItem, Card} from 'native-base';
import {Actions} from 'react-native-router-flux';
import Logo from '../components/Logo';
import {BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {getInvoicesList} from '../actions/invoice.actions';
import {ErrorUtils} from '../utils/error.utils';
import {getCustomersList} from '../actions/customer.actions';
import {getItemsList} from '../actions/item.actions';

class Splash extends Component<{}> {

    async componentDidMount() {
        await Promise.all([
            await this.props.dispatch(getInvoicesList()),
            await this.props.dispatch(getCustomersList()),
            await this.props.dispatch(getItemsList())]).
        then((responses) => {
            if (responses[0].success && responses[1].success && responses[2].success) {
                Actions.replace('home')
            } else {
                throw 'Something went wrong. Check connection or try again later.';
            }
        }).catch((e) => {
            const newError = new ErrorUtils(e);
            newError.showAlert();
            setTimeout(()=>{
                BackHandler.exitApp();
            },4000);
        });

    }

    render() {
        return (
            <Container>
                <Content padder contentContainerStyle={{display: 'flex', flex: 1, justifyContent: 'center'}}>
                    <Card transparent>
                        <CardItem>
                            <Logo/>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    };
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

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
