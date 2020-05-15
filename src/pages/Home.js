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
                {/*<Footer>*/}
                {/*    <FooterTab>*/}
                {/*        <Button vertical>*/}
                {/*            <Icon name="apps"/>*/}
                {/*            <Text>Apps</Text>*/}
                {/*        </Button>*/}
                {/*        <Button vertical>*/}
                {/*            <Icon name="camera"/>*/}
                {/*            <Text>Camera</Text>*/}
                {/*        </Button>*/}
                {/*        <Button vertical active>*/}
                {/*            <Icon active name="navigate"/>*/}
                {/*            <Text>Navigate</Text>*/}
                {/*        </Button>*/}
                {/*        <Button vertical>*/}
                {/*            <Icon name="person"/>*/}
                {/*            <Text>Contact</Text>*/}
                {/*        </Button>*/}
                {/*    </FooterTab>*/}
                {/*</Footer>*/}
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
