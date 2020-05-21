import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {
    Body,
    Button,
    Card,
    CardItem,
    Container,
    Content,
    Fab,
    Footer,
    FooterTab,
    Icon,
    Left,
    Text,
    Toast,
} from 'native-base';
import renderTextInput from '../../components/reduxFormRenderers/RenderTextInput';
import renderItemsTextInputArray from '../../components/reduxFormRenderers/RenderItemsInputArray';
import {change, Field, FieldArray, formValueSelector, reduxForm} from 'redux-form';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';
import {
    formatCurrency,
    normalizeCurrency,
    number,
    required,
    validatePositiveTimeDifference,
} from '../../utils/redux.form.utils';
import {ErrorUtils} from '../../utils/error.utils';
import {editInvoice, getInvoicesList, sendInvoiceByEmail} from '../../actions/invoice.actions';
import Loader from '../../components/Loader';
import renderSelectOption from '../../components/reduxFormRenderers/RenderSelectOption';
import renderDatePicker from '../../components/reduxFormRenderers/RenderDatePicker';
import {getCurrency} from '../../utils/currencies.utils';
import InnerPageHeader from '../../components/InnerPageHeader';

class InvoiceForm extends Component<{}> {

    sendInvoiceData = async (values) => {
        try {
            const response = await this.props.dispatch(editInvoice(values));
            if (!response || !response.success) {
                throw response;
            } else {
                await this.refreshInvoicesList();
                return response;
            }
        } catch (e) {
            const newError = new ErrorUtils(e);
            newError.showAlert();
        }
    };

    refreshInvoicesList = async () => {
        try {
            const response = await this.props.dispatch(getInvoicesList());
            if (!response || !response.success) {
                throw response;
            } else {
                Toast.show({
                    text: 'Invoices list successfully updated.',
                    buttonText: 'Okay',
                    type: 'success',
                });
                return response;
            }
        } catch (e) {
            const newError = new ErrorUtils(e);
            newError.showAlert();
        }
    };

    sendInvoiceByEmail = async (values) => {
        try {
            let response = await this.sendInvoiceData(values);
            if (!response.success) {
                throw response;
            } else {
                let paymentParams = {
                    invoice: response.responseBody.value._id,
                    status: false,
                    paid_on: null,
                    amount_paid: 0,
                    amount_due: response.responseBody.value.total,
                };
                response = await this.props.dispatch(sendInvoiceByEmail(paymentParams));
                if (!response || !response.success) {
                    throw response;
                } else {
                    Toast.show({
                        text: 'Invoice was successfully send by email.',
                        buttonText: 'Okay',
                        type: 'success',
                    });
                    return response;
                }
            }
        } catch (e) {
            const newError = new ErrorUtils(e);
            newError.showAlert();
        }
    };

    onSendInvoice = (values) => {
        this.sendInvoiceByEmail(values);
    };

    onSubmit = (values) => {
        this.sendInvoiceData(values);
    };

    render() {
        const {handleSubmit, editInvoice, getItems, getCustomers, subtotalValue, change, getUser: {userDetails}} = this.props;
        const currency = getCurrency(userDetails.base_currency);
        return (
            <Container>
                {editInvoice.isLoading && <Loader/>}
                <InnerPageHeader title={'Invoice'}/>
                <Content style={{flex: 1}} contentContainerStyle={{flex: 1}}>
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
                                       placeHolder={'Select a customer...'}
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
                        <FieldArray name="items"
                                    optionsArray={getItems.itemsList || []}
                                    change={change}
                                    currency={currency}
                                    component={renderItemsTextInputArray}
                        />
                        <Card>
                            <CardItem button light onPress={handleSubmit(this.calculateSubTotal)}>
                                <Left>
                                    <Icon active name="ios-calculator"/>
                                    <Body>
                                        <Text>Compute Total</Text>
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
                                       format={value => (formatCurrency(value, currency))}
                                       normalize={value => (normalizeCurrency(value))}
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
                                           value = normalizeCurrency(value);
                                           change('total', String(Number(subtotalValue) - Number(value)));
                                       }}
                                       format={value => (formatCurrency(value, currency))}
                                       normalize={value => (normalizeCurrency(value))}
                                       valdiate={[required, number]}
                                       component={renderTextInput}/>
                            </CardItem>
                            <CardItem cardBody style={{backgroundColor: 'lightgray', paddingHorizontal: 10}}>
                                <Field name={'total'}
                                       keyboardType={'numeric'}
                                       placeholder={'0'}
                                       label={'Total'}
                                       textAlign={'right'}
                                       editable={false}
                                       format={value => (formatCurrency(value, currency))}
                                       normalize={value => (normalizeCurrency(value))}
                                       validate={[required, number]}
                                       component={renderTextInput}/>
                            </CardItem>
                        </Card>
                        <Card transparent><CardItem/><CardItem/></Card>
                    </Content>
                    <Fab
                        style={{backgroundColor: '#5067FF'}}
                        position="bottomRight"
                        onPress={handleSubmit(this.onSendInvoice)}>
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

    calculateSubTotal = (values) => {
        if (values.items) {
            let allItemsSubtotal = values.items.reduce(function (a, b) {
                return a + Number(b.subtotal);
            }, 0);
            values.subtotal = String(allItemsSubtotal);
            values.total = String(allItemsSubtotal - Number(values.discount));
        }
    };
}

const selector = formValueSelector('invoiceForm');

const mapStateToProps = (state, props) => {
    let initialValues, subtotalValue = selector(state, 'subtotal');
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
        };
    } else {
        initialValues = {
            number: `INV${props.newNumber}`,
            customer: null,
            items: [{item: null, quantity: '0', subtotal: '0'}],
            subtotal: '0',
            discount: '0',
            total: '0',
        };
    }

    return ({
        initialValues,
        getUser: state.userReducer.getUser,
        editInvoice: state.invoiceReducer.editInvoice,
        getInvoices: state.invoiceReducer.getInvoices,
        getCustomers: state.customerReducer.getCustomers,
        getItems: state.itemReducer.getItems,
        subtotalValue,
    });
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({change}, dispatch);
};

const validate = (values) => ({
    due: validatePositiveTimeDifference(values.issued, values.due),
});


export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
    reduxForm({
        form: 'invoiceForm',
        validate,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        updateUnregisteredFields: true,
    }),
)(InvoiceForm);
