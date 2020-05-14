import React, {Component} from 'react';
import {ActionConst, Router, Scene} from 'react-native-router-flux';
import {
    Login,
    SignUp,
    Invoices,
    Customers,
    Items,
    Settings,
    AddCustomer,
    AddItem,
} from '../pages/index';
import {connect} from 'react-redux';

export default class Routes extends Component<{}> {

    render() {
        const RouterWithRedux = connect()(Router);

        return (
            <RouterWithRedux>
                <Scene>
                    <Scene key={'root'} hideNavBar={true} initial={!this.props.isLoggedIn}>
                        <Scene key="login" component={Login} title="Login" initial={true}/>
                        <Scene key="signup" component={SignUp} title="Sign Up"/>
                    </Scene>
                    <Scene key={'app'} hideNavBar={true} initial={this.props.isLoggedIn}>
                        <Scene key="home" title="Home" tabs={true} initial type={ActionConst.REPLACE}>
                            <Scene key="invoices" component={Invoices} title="Invoices" hideNavBar  initial/>
                            <Scene key="customers" component={Customers} title="Customers" hideNavBar/>
                            <Scene key="items" component={Items} title="Items" hideNavBar/>
                            <Scene key="settings" component={Settings} title="Settings" hideNavBar/>
                        </Scene>
                        <Scene key="addCustomer" component={AddCustomer} title="Customer" hideNavBar/>
                        <Scene key="addItem" component={AddItem} title="Customer" hideNavBar/>

                    </Scene>
                </Scene>
            </RouterWithRedux>
        );
    }
}
