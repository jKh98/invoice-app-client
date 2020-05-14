import React, {Component} from 'react';
import {
    Text,
    View,
} from 'react-native';
import {Container, Content, Header, Title, Right, Left, Body, Icon, Button, Tabs, Tab, Fab} from 'native-base';
import {connect} from 'react-redux';


class Invoices extends Component<{}> {

    render() {
        const {getUser: {userDetails}} = this.props;
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent light>
                            <Icon name='settings'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Invoices</Title>
                    </Body>
                    <Right>
                        <Button transparent light>
                            <Icon name='search'/>
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
