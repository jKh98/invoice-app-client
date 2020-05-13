import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Profile from '../pages/Profile';


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
                        <Scene key="profile" component={Profile} title="Profile" initial={this.props.isLoggedIn}/>
                    </Scene>
                </Scene>
            </Router>
        );
    }
}
