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
    Button, Footer, FooterTab,
    Text, Tabs, Tab, Fab, Toast,
} from 'native-base';
import renderTextInput from '../../components/reduxFormRenderers/RenderTextInput';
import renderItemsTextInputArray from '../../components/reduxFormRenderers/RenderItemsInputArray';
import {Field, FieldArray, formValueSelector, reduxForm, change} from 'redux-form';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';
import {
    validateRequiredField,
    validateNumberField,
    validatePositiveTimeDifference,
    required, number,
} from '../../utils/validate.utils';
import {ErrorUtils} from '../../utils/error.utils';
import {editInvoice, getInvoicesList} from '../../actions/invoice.actions';
import Loader from '../../components/Loader';
import renderSelectOption from '../../components/reduxFormRenderers/RenderSelectOption';
import renderDatePicker from '../../components/reduxFormRenderers/RenderDatePicker';

class InvoiceForm extends Component<{}> {

    sendInvoiceData = async (values) => {
        try {
            const response = await this.props.dispatch(editInvoice(values));
            if (!response.success) {
                throw response;
            } else {
                await this.refreshInvoicesList();
            }
        } catch (e) {
            const newError = new ErrorUtils(e);
            newError.showAlert();
        }
    };

    async refreshInvoicesList() {
        try {
            const response = await this.props.dispatch(getInvoicesList());
            if (!response.success) {
                throw response;
            } else {
                Toast.show({
                    text: 'Invoices list successfully updated.',
                    buttonText: 'Okay',
                    type: 'success',
                });
            }
        } catch (e) {
            const newError = new ErrorUtils(e);
            newError.showAlert();
        }
    }

    onSubmit = (values) => {
        this.sendInvoiceData(values);
    };

    render() {
        const {handleSubmit, editInvoice, getItems, getCustomers, totalValue, subtotalValue, amountPaid, change, paymentStatus} = this.props;
        return (
            <Container>
                {editInvoice.isLoading && <Loader/>}
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
                                <Card style={{paddingHorizontal: 10}}>
                                    <CardItem cardBody>
                                        <Field name={'number'}
                                               keyboardType={'default'}
                                               placeholder={'INV0000'}
                                               validate={[required]}
                                               component={renderTextInput}/>
                                    </CardItem>
                                    <CardItem cardBody>
                                        <Field
                                            component={renderDatePicker}
                                            keyboardType='default'
                                            name={'issued'}
                                            label={'Issued: '}
                                            placeholder="YYYY/MM/DD"
                                            validate={[required]}
                                        />
                                    </CardItem>
                                </Card>
                                <Card style={{paddingHorizontal: 10}}>
                                    <CardItem cardBody>
                                        <Field name={`customer`}
                                               component={renderSelectOption}
                                               iosHeader="Select Customer"
                                               placeHolder={"Select a customer..."}
                                               optionsArray={(getCustomers.customersList || [])}
                                               label={'To: '}
                                               validate={[required]}
                                               placeholder={'Customer'}/>
                                    </CardItem>
                                    <CardItem cardBody>
                                        <Field
                                            component={renderDatePicker}
                                            keyboardType='default'
                                            name={'due'}
                                            label={'Due: '}
                                            placeholder="YYYY/MM/DD"
                                            validate={[required]}
                                        />
                                    </CardItem>
                                </Card>
                                <Card>
                                    <FieldArray name="items"
                                                optionsArray={getItems.itemsList || []}
                                                change={change}
                                                component={renderItemsTextInputArray}
                                    />
                                </Card>
                                <Card>
                                    <CardItem button light onPress={handleSubmit(this.calculateSubTotal)}>
                                        <Left>
                                            <Icon active name="ios-calculator"/>
                                            <Body>
                                                <Text>Calculate</Text>
                                            </Body>
                                        </Left>
                                    </CardItem>
                                </Card>
                                <Card>
                                    <CardItem cardBody style={{backgroundColor: 'lightgray', paddingHorizontal: 10}}>
                                        <Field name={'subtotal'}
                                               keyboardType={'numeric'}
                                               placeholder={'0'}
                                               label={'Subtotal'}
                                               textAlign={'right'}
                                               defaultValue={'0'}
                                               editable={false}
                                               validate={[required, number]}
                                               component={renderTextInput}/>
                                    </CardItem>
                                    <CardItem cardBody style={{paddingHorizontal: 10}}>
                                        <Field name={'discount'}
                                               keyboardType={'numeric'}
                                               placeholder={'0'}
                                               label={'Discount'}
                                               textAlign={'right'}
                                               onChange={(value) => {
                                                   let newTotal = Number(subtotalValue) - Number(value);
                                                   change('total', String(newTotal));
                                                   change('payment.amount_due', String(newTotal - Number(amountPaid)));
                                               }}
                                               valdiate={[required, number]}
                                               component={renderTextInput}/>
                                    </CardItem>
                                    <CardItem cardBody style={{paddingHorizontal: 10}}>
                                        <Field name={'total'}
                                               keyboardType={'numeric'}
                                               placeholder={'0'}
                                               label={'Total'}
                                               textAlign={'right'}
                                               editable={false}
                                               validate={[required, number]}
                                               component={renderTextInput}/>
                                    </CardItem>
                                    <CardItem cardBody style={{paddingHorizontal: 10}}>
                                        <Field name={'payment.amount_paid'}
                                               keyboardType={'numeric'}
                                               label={'Payments'}
                                               placeholder={'0'}
                                               textAlign={'right'}
                                               onChange={(value) => {
                                                   change('payment.amount_due', String(Number(totalValue) - Number(value)));
                                               }}
                                               validate={[required, number]}
                                               component={renderTextInput}/>
                                    </CardItem>
                                    <CardItem cardBody style={{backgroundColor: 'lightgray', paddingHorizontal: 10}}>
                                        <Field name={'payment.amount_due'}
                                               keyboardType={'numeric'}
                                               placeholder={'0'}
                                               label={'Amount Due'}
                                               textAlign={'right'}
                                               editable={false}
                                               validate={[required, number]}
                                               component={renderTextInput}/>
                                    </CardItem>
                                </Card>
                                <Card>
                                    <CardItem button light onPress={handleSubmit(this.setPaymentStatus)}>
                                        <Left>
                                            <Icon active name="ios-cash"/>
                                            <Body>
                                                <Text>Mark as {paymentStatus ? 'Unpaid' : 'Paid'} </Text>
                                            </Body>
                                        </Left>
                                    </CardItem>
                                </Card>
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
                <Footer>
                    <FooterTab>
                        <Button full onPress={handleSubmit(this.onSubmit)}>
                            <Text>Save</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    };

    goBack() {
        Actions.pop();
        Actions.refresh();
    }

    sendInvoice() {
        //Todo Lookup
    }

    calculateSubTotal = (values) => {
        if (values.items) {
            let allItemsSubtotal = values.items.reduce(function (a, b) {
                return a + Number(b.subtotal);
            }, 0);
            values.subtotal = String(allItemsSubtotal);
            values.total = String(allItemsSubtotal - Number(values.discount));
            values.payment.amount_due = String(Number(values.total) - Number(values.payment.amount_paid));
        }
    };
    setPaymentStatus = (values) => {
        console.log(values.payment.status);
        values.payment.status = !values.payment.status;
    };
}

const selector = formValueSelector('invoiceForm');

const mapStateToProps = (state, props) => {
    let initialValues, subtotalValue = selector(state, 'subtotal'),
        totalValue = selector(state, 'total'),
        amountPaid = selector(state, 'payment.amount_paid');
    if (props.invoice) {

        props.invoice.items.forEach((item) => {
            item.quantity = String(item.quantity);
            item.subtotal = String(item.subtotal);
        });
        initialValues = {
            number: props.invoice.number,
            customer: props.invoice.customer,
            issued: new Date(props.invoice.issued),
            due: new Date(props.invoice.due),
            items: props.invoice.items,
            subtotal: props.invoice.subtotal.toString(),
            discount: props.invoice.discount.toString(),
            total: props.invoice.total.toString(),
            payment: {
                amount_paid: props.invoice.payment.amount_paid.toString(),
                amount_due: props.invoice.payment.amount_due.toString(),
                status: props.invoice.payment.status,
            },

        };
    } else {
        initialValues = {
            number: `INV${props.newNumber}`,
            customer: null,
            items: [{item: null, quantity: '0', subtotal: '0'}],
            subtotal: '0',
            discount: '0',
            total: '0',
            payment: {
                amount_paid: '0',
                amount_due: '0',
                status: false,
            },
        };
    }
    let paymentStatus = initialValues.payment.status;

    return ({
        initialValues,
        editInvoice: state.invoiceReducer.editInvoice,
        getInvoices: state.invoiceReducer.getInvoices,
        getCustomers: state.customerReducer.getCustomers,
        getItems: state.itemReducer.getItems,
        subtotalValue,
        totalValue,
        amountPaid,
        paymentStatus,
    });
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({change}, dispatch);
};


export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
    reduxForm({
        form: 'invoiceForm',
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        updateUnregisteredFields: true,
    }),
)(InvoiceForm);
