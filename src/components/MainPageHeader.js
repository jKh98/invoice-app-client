import React, {Component} from 'react';
import {
    BackHandler,
    StyleSheet,
    View,
} from 'react-native';
import {Body, Button, Header, Icon, Left, Right, Spinner, Title, Toast} from 'native-base';
import {getInvoicesList} from '../actions/invoice.actions';
import {getCustomersList} from '../actions/customer.actions';
import {getItemsList} from '../actions/item.actions';
import {Actions} from 'react-native-router-flux';
import {ErrorUtils} from '../utils/error.utils';
import {connect} from 'react-redux';


class PageHeader extends Component<{}> {
    refreshData = async () => {
        await Promise.all([
            await this.props.dispatch(getInvoicesList()),
            await this.props.dispatch(getCustomersList()),
            await this.props.dispatch(getItemsList())])
            .then((responses) => {
                if (responses[0].success && responses[1].success && responses[2].success) {
                    Toast.show({
                        text: 'Data was successfully updated.',
                        buttonText: 'Okay',
                        type: 'success',
                    });
                } else {
                    throw 'Something went wrong. Check connection or try again later.';
                }
            }).catch((e) => {
                const newError = new ErrorUtils(e);
                newError.showAlert();
            });
    };

    render() {
        return (
            <Header>
                <Left>
                    <Button transparent light onPress={()=>{
                        Actions.profile()
                    }}>
                        <Icon name='ios-menu'/>
                    </Button>
                </Left>
                <Body>
                    <Title>{this.props.title}</Title>
                </Body>
                <Right>
                    <Button transparent light onPress={() => {
                        this.refreshData();
                    }}>
                        <Icon name='ios-refresh'/>
                    </Button>
                </Right>
            </Header>
        );
    };
}

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

export default connect(null, mapDispatchToProps)(PageHeader);
