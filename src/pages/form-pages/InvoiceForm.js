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
    Text, Tabs, Tab, Fab, List, Toast, Picker,
} from 'native-base';
import renderTextInput from '../../components/reduxFormRenderers/RenderTextInput';
import renderItemsTextInputArray from '../../components/reduxFormRenderers/RenderItemsInputArray';
import {Field, FieldArray, formValueSelector, reduxForm, change} from 'redux-form';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';
import {validateRequiredField} from '../../utils/form.utils';
import {ErrorUtils} from '../../utils/error.utils';
import {editInvoice, getInvoicesList} from '../../actions/invoice.actions';
import Loader from '../../components/Loader';
import renderSelectItem from '../../components/reduxFormRenderers/RenderSelectItem';
import renderDatePicker from '../../components/reduxFormRenderers/RenderDatePicker';
import moment from 'moment';

class InvoiceForm extends Component<{}> {

    modifyInvoicesData = async (values) => {
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
        values.issued = new Date(values.issued);
        values.due = new Date(values.due);
        values.payment.status = false;
        console.log(values);
        this.modifyInvoicesData(values);
    };

    render() {
        const {handleSubmit, editInvoice, getItems, getCustomers, totalValue, subtotalValue, amountPaid, change, items, fields} = this.props;
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
                                               component={renderTextInput}/>
                                    </CardItem>
                                    <CardItem cardBody>
                                        <Field
                                            component={renderDatePicker}
                                            keyboardType='default'
                                            name={'issued'}
                                            label={'Issued: '}
                                            placeholder="YYYY/MM/DD"
                                        />
                                    </CardItem>
                                </Card>
                                <Card style={{paddingHorizontal: 10}}>
                                    <CardItem cardBody>
                                        <Field name={`customer`}
                                               component={renderSelectItem}
                                               iosHeader="Select Customer"
                                               optionsArray={(getCustomers.customersList || [])}
                                               label={'To: '}
                                               placeholder={'Customer'}/>
                                    </CardItem>
                                    <CardItem cardBody>
                                        <Field
                                            component={renderDatePicker}
                                            keyboardType='default'
                                            name={'due'}
                                            label={'Due: '}
                                            placeholder="YYYY/MM/DD"
                                        />
                                    </CardItem>
                                </Card>
                                <Card>
                                    <FieldArray name="items"
                                                optionsArray={getItems.itemsList || []}
                                                change={change}
                                                rerenderOnEveryChange={true}
                                                onChange={(fields) => this.calculateSubTotal(fields)}
                                                component={renderItemsTextInputArray}
                                    />
                                    <CardItem cardBody style={{backgroundColor: 'lightgray', paddingHorizontal: 10}}>
                                        <Field name={'subtotal'}
                                               keyboardType={'numeric'}
                                               placeholder={'0'}
                                               label={'Subtotal'}
                                               textAlign={'right'}
                                               defaultValue={'0'}
                                               editable={false}
                                               component={renderTextInput}/>
                                    </CardItem>
                                </Card>
                                <Card>
                                    <CardItem cardBody style={{paddingHorizontal: 10}}>
                                        <Field name={'discount'}
                                               keyboardType={'numeric'}
                                               placeholder={'0'}
                                               label={'Discount'}
                                               textAlign={'right'}
                                               onChange={(value) => {
                                                   let newTotal = Number(subtotalValue) - Number(value);
                                                   change('total', String(newTotal));
                                                   change('amount_due', String(newTotal - Number(amountPaid)));
                                               }}
                                               component={renderTextInput}/>
                                    </CardItem>
                                    <CardItem cardBody style={{paddingHorizontal: 10}}>
                                        <Field name={'total'}
                                               keyboardType={'numeric'}
                                               placeholder={'0'}
                                               label={'Total'}
                                               textAlign={'right'}
                                               editable={false}
                                               component={renderTextInput}/>
                                    </CardItem>
                                    <CardItem cardBody style={{paddingHorizontal: 10}}>
                                        <Field name={'payment.amount_paid'}
                                               keyboardType={'numeric'}
                                               label={'Payments'}
                                               placeholder={'0'}
                                               textAlign={'right'}
                                               onChange={(value) => {
                                                   change('amount_due', String(Number(totalValue) - Number(value)));
                                               }}
                                               component={renderTextInput}/>
                                    </CardItem>
                                    <CardItem cardBody style={{backgroundColor: 'lightgray', paddingHorizontal: 10}}>
                                        <Field name={'amount_due'}
                                               keyboardType={'numeric'}
                                               placeholder={'0'}
                                               label={'Amount Due'}
                                               textAlign={'right'}
                                               editable={false}
                                               component={renderTextInput}/>
                                    </CardItem>
                                </Card>
                                <Button block primary onPress={handleSubmit(this.onSubmit)}>
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

    goBack() {
        Actions.pop();
        Actions.refresh();
    }

    sendInvoice() {
        //Todo Lookup
    }

    calculateSubTotal(fields) {
        console.log(fields.getAll());
        if (fields) {
            let allItemsSubtotal = fields.getAll().reduce(function (a, b) {
                return a + Number(b.subtotal);
            }, 0);
            console.log(allItemsSubtotal);
            change('subtotal', String(allItemsSubtotal));
        }
    }
}

//todo refactor
const validate = (values) => {
    return {
        name: validateRequiredField('Name', values.name),
        price: validateRequiredField('Price', values.price),
    };
};


const selector = formValueSelector('invoiceForm');

const mapStateToProps = (state, props) => {
    let initialValues, items = selector(state, 'items'), subtotalValue = selector(state, 'subtotal'),
        discountValue = selector(state, 'discount'), totalValue = selector(state, 'total'),
        amountPaid = selector(state, 'payment.amount_paid'), amountDue = selector(state, 'payment.amount_due');
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
            },

        };
    } else {
        initialValues = {
            number: 'INV0000',
            subtotal: '0',
            discount: '0',
            total: '0',
            payment: {
                amount_paid: '0',
                amount_due: '0',
            },
        };
    }
    return ({
        initialValues,
        editInvoice: state.invoiceReducer.editInvoice,
        getInvoices: state.invoiceReducer.getInvoices,
        getCustomers: state.customerReducer.getCustomers,
        getItems: state.itemReducer.getItems,
        items,
        subtotalValue,
        discountValue,
        totalValue,
        amountPaid,
        amountDue,
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
        validate,
    }),
)(InvoiceForm);
