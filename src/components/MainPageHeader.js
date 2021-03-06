import React, {Component} from 'react';
import {Body, Button, Header, Icon, Left, Right, Title, Toast} from 'native-base';
import {getInvoicesList} from '../actions/invoice.actions';
import {getCustomersList} from '../actions/customer.actions';
import {getItemsList} from '../actions/item.actions';
import {Actions} from 'react-native-router-flux';
import {ErrorUtils} from '../utils/error.utils';
import {connect} from 'react-redux';
import {getUser} from '../actions/auth.actions';

/**
 * Header component for main pages.
 * Contains a button that opens profile page and a refresh button tat loads all data.
 */
class MainPageHeader extends Component<{}> {
    /**
     * Dispatches actions to load all application data
     *
     * @returns {Promise<void>}
     */
    refreshData = async () => {
        await Promise.all([
            await this.props.dispatch(getUser()),
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
                    <Button transparent light onPress={() => {
                        Actions.profile();
                    }}>
                        <Icon name='ios-person'/>
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

export default connect(null, mapDispatchToProps)(MainPageHeader);
