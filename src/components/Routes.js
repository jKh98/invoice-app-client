import React, {Component} from 'react';
import View from 'react-native';
import {ActionConst, Router, Scene, Tabs} from 'react-native-router-flux';
import {
    Login,
    SignUp,
    Invoices,
    Customers,
    Items,
    Settings,
} from '../pages/index';
import NavBar from './NavBar';
import {Button, Icon} from 'native-base';
import Loader from './Loader';


export default class Routes extends Component<{}> {

    render() {
        return (
            <Router>
                <Scene>
                    <Scene key={'root'} hideNavBar={true} initial={!this.props.isLoggedIn}>
                        <Scene key="login" component={Login} title="Login" initial={true}/>
                        <Scene key="signup" component={SignUp} title="Sign Up"/>
                    </Scene>
                    <Scene key={'app'} hideNavBar={true} initial={this.props.isLoggedIn}>
                        <Scene key="home" title="Home" tabs={true} initial hideNavBar type={ActionConst.REPLACE}>
                            <Scene key="invoices" component={Invoices} title="Invoices" hideNavBar={true} initial/>
                            <Scene key="customers" component={Customers} title="Customers" hideNavBar={true}/>
                            <Scene key="items" component={Items} title="Items" hideNavBar={true}/>
                            <Scene key="settings" component={Settings} title="Settings" hideNavBar={true}/>
                        </Scene>
                    </Scene>
                </Scene>
            </Router>
        );
    }
}
