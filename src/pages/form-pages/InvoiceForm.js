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
        console.log(values);
        // this.modifyInvoicesData(values);
    };

    render() {
        const {handleSubmit, editInvoice, getItems, getCustomers, items, totalValue, subtotalValue, paidAmount, change} = this.props;
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
                                        <Field name={'issued'}
                                               keyboardType={'numeric'}
                                               placeholder={''}
                                               label={'Issued: '}
                                               component={renderTextInput}/>
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
                                        <Field name={'due'}
                                               keyboardType={'default'}
                                               placeholder={''}
                                               label={'Due: '}
                                               component={renderTextInput}/>
                                    </CardItem>
                                </Card>
                                <Card>
                                    <FieldArray name="items"
                                                optionsArray={getItems.itemsList || []}
                                                change={change}
                                                items={items}
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
                                                   change('amount_due', String(newTotal - Number(paidAmount)));
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
                                        <Field name={'paid.amount'}
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
    let initialValues;
    let items = selector(state, 'items');
    let subtotalValue = selector(state, 'subtotal');
    let discountValue = selector(state, 'discount');
    let totalValue = selector(state, 'total');
    let paidAmount = selector(state, 'paid.amount');
    let amountDue = selector(state, 'amount_due');
    if (props.invoice) {

        props.invoice.items.forEach((item) => {
            item.quantity = String(item.quantity);
            item.subtotal = String(item.subtotal);
        });
        initialValues = {
            number: props.invoice.number,
            customer: props.invoice.customer,
            issued: props.invoice.issued,
            due: props.invoice.due,
            items: props.invoice.items,
            subtotal: props.invoice.subtotal.toString(),
            discount: props.invoice.discount.toString(),
            total: props.invoice.total.toString(),
            paid: {amount: props.invoice.paid.amount.toString()},

        };
    } else {
        initialValues = {
            number: 'INV0000',
            subtotal: '0',
            discount: '0',
            total: '0',
            paid: {amount: '0'},
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
        paidAmount,
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
