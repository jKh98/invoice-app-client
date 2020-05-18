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
import {Field, FieldArray, reduxForm} from 'redux-form';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {validateRequiredField} from '../../utils/form.utils';
import ListView from '../../components/ListView';
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
        const {handleSubmit, editInvoice, getItems, getCustomers} = this.props;
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

                                    <Field name={`customer`}
                                           component={renderSelectItem}
                                           iosHeader="Select Customer"
                                           optionsArray={(getCustomers.customersList || [])}
                                           label={'To: '}
                                           placeholder={'Customer'}>
                                        {/*{.map((option, i) => {*/}
                                        {/*    return <Picker.Item key={i}*/}
                                        {/*                        value={option}*/}
                                        {/*                        label={option.name}*/}
                                        {/*    />;*/}
                                        {/*})}*/}
                                    </Field>
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
                                                component={renderItemsTextInputArray}/>
                                    <CardItem cardBody style={{backgroundColor: 'lightgray'}}>
                                        <Left>
                                            <Text>Subtotal</Text>
                                        </Left>
                                        <Body/>
                                        <Right>
                                            <Field name={'subtotal'}
                                                   keyboardType={'numeric'}
                                                   placeholder={'0'}
                                                   component={renderTextInput}/>
                                        </Right>
                                    </CardItem>
                                </Card>
                                <Card>
                                    <CardItem cardBody>
                                        <Left>
                                            <Text>Discount</Text>
                                        </Left>
                                        <Body/>
                                        <Right>
                                            <Field name={'discount'}
                                                   keyboardType={'numeric'}
                                                   placeholder={'0'}
                                                   component={renderTextInput}/>
                                        </Right>
                                    </CardItem>
                                    <CardItem cardBody style={{backgroundColor: 'lightgray'}}>
                                        <Left>
                                            <Text>Total</Text>
                                        </Left>
                                        <Body/>
                                        <Right>
                                            <Field name={'total'}
                                                   keyboardType={'numeric'}
                                                   placeholder={'0'}
                                                   component={renderTextInput}/>
                                        </Right>
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

const mapStateToProps = (state, props) => {
    let initialValues;
    props.invoice.items.forEach((item) => {
        item.quantity = String(item.quantity);
    })
    if (props.invoice) {
        initialValues = {
            number: props.invoice.number,
            customer: props.invoice.customer,
            issued: props.invoice.issued,
            due: props.invoice.due,
            items: props.invoice.items,
            subtotal: props.invoice.subtotal,
            discount: props.invoice.discount,
            total: props.invoice.total,
            paid: props.invoice.paid,

        };
    }
    return ({
        initialValues,
        editInvoice: state.invoiceReducer.editInvoice,
        getInvoices: state.invoiceReducer.getInvoices,
        getCustomers: state.customerReducer.getCustomers,
        getItems: state.itemReducer.getItems,
    });
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'invoiceForm',
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        updateUnregisteredFields: true,
        validate,
    }),
)(InvoiceForm);
