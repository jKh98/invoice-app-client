import React, {Component} from 'react';
import {
    View,
} from 'react-native';
import {Container, Content, Header, Title, Right, Left, Body,Text, Icon, Button, Tabs, Tab, Fab} from 'native-base';
import {connect} from 'react-redux';
import store from '../../config/store';


class Invoices extends Component<{}> {

    render() {
        const {getUser: {userDetails}} = this.props;
        console.log(store().store.getState())
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent light>
                            <Icon name='ios-settings'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Invoices</Title>
                    </Body>
                    <Right>
                        <Button transparent light>
                            <Icon name='ios-search'/>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Tabs>
                        <Tab heading="ALL">
                            <Text>{userDetails ? userDetails.name : 'man'}</Text>
                        </Tab>
                        <Tab heading="PENDING">
                            <Text>{userDetails ? userDetails.email : 'man'}</Text>
                        </Tab>
                        <Tab heading="PAID">
                            <Text>{userDetails ? userDetails.password : 'man'}</Text>
                        </Tab>
                    </Tabs>
                </Content>
                <View style={{flex: 1}}>
                    <Fab
                        style={{backgroundColor: '#5067FF'}}
                        position="bottomRight"
                        onPress={() => {
                            this.addNewInvoice();
                        }}>
                        <Icon name="add"/>
                    </Fab>
                </View>
            </Container>
        );
    };

    addNewInvoice() {
        alert('new invoice');
    }
}

const mapStateToProps = (state) => ({
    getUser: state.userReducer.getUser,
});

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

export default connect(mapStateToProps, null)(Invoices);
