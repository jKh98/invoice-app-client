import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';
import {
    CustomerForm,
    Customers,
    InvoiceForm,
    Invoices,
    ItemForm,
    Items,
    Login,
    Profile,
    SignUp,
    Splash,
} from '../pages/index';
import {Root} from 'native-base';
import {connect} from 'react-redux';
import NavBar from './NavBar';

/**
 * React-native-router-flux router component.
 * Divides scenes into root category for authentication, and app category for app session
 * Wrapped with native-base root to enable some native-base features such as Toast which needs context on Android devices
 */
export default class Routes extends Component<{}> {

    render() {
        const RouterWithRedux = connect()(Router);

        return (
            <Root>
                <RouterWithRedux>
                    <Scene>
                        <Scene key={'root'} hideNavBar={true} initial={!this.props.isLoggedIn}>
                            <Scene key="login" component={Login} title="Login" initial={true}/>
                            <Scene key="signup" component={SignUp} title="Sign Up"/>
                        </Scene>
                        <Scene key={'app'} hideNavBar={true} initial={this.props.isLoggedIn}>
                            <Scene key="splash" title="Splash" initial={this.props.isLoggedIn} component={Splash}/>
                            <Scene key="home" title="Home" tabs
                                   tabBarComponent={NavBar}>
                                <Scene key="invoices" component={Invoices} title="Invoices" hideNavBar initial/>
                                <Scene key="customers" component={Customers} title="Customers" hideNavBar/>
                                <Scene key="items" component={Items} title="Items" hideNavBar/>
                            </Scene>
                            <Scene key="customerForm" component={CustomerForm} title="Customer" hideNavBar/>
                            <Scene key="itemForm" component={ItemForm} title="Item" hideNavBar/>
                            <Scene key="invoiceForm" component={InvoiceForm} title="Invoice" hideNavBar/>
                            <Scene key="profile" component={Profile} title="Profile" hideNavBar/>
                        </Scene>
                    </Scene>
                </RouterWithRedux>
            </Root>
        );
    }
}
