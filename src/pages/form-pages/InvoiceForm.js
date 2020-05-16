import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {
    Container,
    Content,
    Header,
    Title,
    Right,
    Left,
    Body,
    Card,
    CardItem,
    Icon,
    Button,
    Text, Tabs, Tab, Fab, List,
} from 'native-base';
import renderTextInput from '../../components/reduxFormRenderers/RenderTextInput';
import {Field, reduxForm} from 'redux-form';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {validateRequiredField} from '../../utils/form.utils';
import ListView from '../../components/ListView';

class InvoiceForm extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            tempItems: [
                {
                    name: 'Item1',
                    description: 'nothing',
                    price: 20,
                    quantity: 3,
                }, {
                    name: 'Item2',
                    description: 'nothing',
                    price: 100,
                    quantity: 1,
                }, {
                    name: 'Item3',
                    description: 'nothing',
                    price: 0.11,
                    quantity: 3,
                },
            ],
        };
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={this.goBack}>
                            <Icon name={'ios-arrow-back'}/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Invoice</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content style={{flex: 1}} contentContainerStyle={{flex: 1}}>
                    <Tabs>
                        <Tab heading="EDIT" padder>
                            <Content padder>
                                <Card>
                                    <CardItem cardBody>
                                        <Field name={'number'}
                                               keyboardType={'default'}
                                               placeholder={'INV0000'}
                                               component={renderTextInput}/>
                                    </CardItem>
                                    <CardItem cardBody>
                                        <Field name={'date'}
                                               keyboardType={'numeric'}
                                               placeholder={'15/05/2020'}
                                               component={renderTextInput}/>
                                    </CardItem>
                                </Card>
                                <Card>
                                    <CardItem cardBody>

                                        <Field name={'customer'}
                                               keyboardType={'default'}
                                               placeholder={'Customer'}
                                               component={renderTextInput}/>
                                    </CardItem>
                                    <CardItem cardBody>

                                        <Field name={'due'}
                                               keyboardType={'default'}
                                               placeholder={'Due'}
                                               itemProps
                                               component={renderTextInput}/>
                                    </CardItem>
                                </Card>
                                <Card>
                                    <CardItem cardBody>
                                        {this.renderItemsList()}
                                    </CardItem>
                                    <CardItem button light onPress={() => {
                                        this.addItemToInvoice();
                                    }}>
                                        <Left>
                                            <Icon active name="ios-add"/>
                                            <Body>
                                                <Text>Add Item</Text>
                                            </Body>
                                        </Left>
                                    </CardItem>
                                    <CardItem style={{backgroundColor: 'lightgray'}}>
                                        <Left>
                                            <Text>Subtotal</Text>
                                        </Left>
                                        <Right>
                                            <Text>Total</Text>
                                        </Right>
                                    </CardItem>
                                </Card>
                                <Button block primary onPress={this.handleSubmit(this.onSubmit)}>

                                    <Text>Save</Text>
                                </Button>
                            </Content>
                        </Tab>
                        <Tab heading="PREVIEW">
                            <Content padder>
                            </Content>
                        </Tab>
                    </Tabs>
                    <Fab
                        style={{backgroundColor: '#5067FF'}}
                        position="bottomRight"
                        onPress={() => {
                            this.sendInvoice();
                        }}>
                        <Icon name="ios-send"/>
                    </Fab>
                </Content>
            </Container>
        );
    };


    handleSubmit(values) {
        //TODO DISPATCH ACTIONS
    }

    goBack() {
        //TODO handling
        Actions.pop();
    }

    sendInvoice() {

    }

    renderItemsList() {
        return (
            <List
                dataArray={this.state.tempItems}
                renderRow={
                    (item, i) =>
                        <ListView
                            title={item.name}
                            subtitle={item.description}
                            right={`${item.quantity} × ${item.price}`}
                            rightSub={item.price * item.quantity}
                            left={i}
                            handleClickEvent={
                                this.openInvoicePage
                            }/>
                }
                keyExtractor={(item, index) => index.toString()}>
            </List>
        );
    }

    addItemToInvoice() {
        // TODO add Items dynamically
        this.setState({
            tempItems: [...this.state.tempItems, {
                name: 'Item4',
                description: 'nothing',
                price: 21,
                quantity: 3,
            }],
        });
    }
}

//todo refactor
const validate = (values) => {
    return {
        name: validateRequiredField('Name', values.name),
        price: validateRequiredField('Price', values.price),
    };
};

const mapStateToProps = (state) => ({
    //TODO CHECK STATE PARAMS
    // loginUser: state.authReducer.loginUser,
});

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'invoiceForm',
        validate,
    }),
)(InvoiceForm);
