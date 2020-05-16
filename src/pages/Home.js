import React, {Component} from 'react';
import {Button, Container, Content, Header, Text, FooterTab, Icon} from 'native-base';
import {connect} from 'react-redux';
import {logoutUser} from '../actions/auth.actions';

class Home extends Component<{}> {

    logoutUser = () => {
        this.props.dispatch(logoutUser());
    };

    render() {
        const {getUser: {userDetails}} = this.props;
        return (
            // <View>
            //     {/*<Logo/>*/}
            //     <Text>Hello {userDetails ? userDetails.name : 'man'}</Text>
            //     <Button onPress={this.logoutUser}>
            //         <Text>Logout</Text>
            //     </Button>
            // </View>
            <Container>
                <Header/>
                <Content>
                    <Text>Home</Text>
                </Content>

            </Container>
        );
    };
}

const mapStateToProps = (state) => ({
    getUser: state.userReducer.getUser,
});

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
