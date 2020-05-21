import React, {Component} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';

import Routes from './components/Routes';
import {connect} from 'react-redux';

/**
 * Main app component called by App.js
 * Specifies status bar properties and includes routes component
 */
class Main extends Component<{}> {
    render() {
        const {authData: {isLoggedIn}} = this.props;
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={'#1c313a'} barStyle={'light-content'}/>
                <Routes isLoggedIn={isLoggedIn}/>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

/**
 * maps props to authentication data needed by routes component
 *
 * @param state
 * @returns {{authData: authData}}
 */
const mapStateToProps = (state) => ({
    authData: state.authReducer.authData,
});

export default connect(mapStateToProps, null)(Main);
