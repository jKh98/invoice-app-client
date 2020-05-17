import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {Container, Content, Header, Title, Right, Left, Body, Card, CardItem, Icon, Button, Text,Toast } from 'native-base';
import renderTextInput from '../../components/reduxFormRenderers/RenderTextInput';
import {Field, reduxForm} from 'redux-form';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {validateEmailField, validateRequiredField} from '../../utils/form.utils';
import {ErrorUtils} from '../../utils/auth.utils';
import {editCustomer, getCustomersList} from '../../actions/customer.actions';
import Loader from '../../components/Loader';

class CustomerForm extends Component<{}> {
    modifyCustomerData = async (values) => {
        try {
            const response = await this.props.dispatch(editCustomer(values));
            if (!response.success) {
                throw response;
            }else {
                await this.refreshCustomersList()
            }
            console.log(response);
        } catch (e) {
            const newError = new ErrorUtils(e);
            newError.showAlert();
        }
    };

    async refreshCustomersList() {
        try {
            const response = await this.props.dispatch(getCustomersList());
            if (!response.success) {
                throw response;
            }else{
                Toast.show({
                    text: "Customers list successfully updated.",
                    buttonText: "Okay",
                    type: "success"
                })
            }
        } catch (e) {
            const newError = new ErrorUtils(e);
            newError.showAlert();
        }
    }

    onSubmit = (values) => {
        values.addresses = [values.address_1, values.address_2, values.address_3];
        this.modifyCustomerData(values);

    };

    render() {
        const {handleSubmit, editCustomer} = this.props;
        return (
            <Container>
                {editCustomer.isLoading && <Loader/>}
                <Header>
                    <Left>
                        <Button transparent onPress={this.goBack}>
                            <Icon name={'ios-arrow-back'}/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Customer</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content padder>
                    <Card style={{padding: 10}}>
                        <CardItem cardBody listItemPadding>
                            <Field name={'name'}
                                   keyboardType={'default'}
                                   placeholder={'Customer Name'}
                                   icon={'ios-contact'}
                                   component={renderTextInput}/>
                        </CardItem>
                        <CardItem cardBody>

                            <Field name={'company'}
                                   keyboardType={'default'}
                                   placeholder={'Company'}
                                   icon={'ios-briefcase'}
                                   component={renderTextInput}/>
                        </CardItem>
                        <CardItem cardBody>

                            <Field name={'email'}
                                   keyboardType={'email-address'}
                                   placeholder={'Email'}
                                   icon={'ios-mail'}
                                   component={renderTextInput}/>
                        </CardItem>
                        <CardItem cardBody>

                            <Field name={'phone'}
                                   keyboardType={'phone-pad'}
                                   placeholder={'Phone'}
                                   icon={'ios-call'}
                                   component={renderTextInput}/>
                        </CardItem>
                        <CardItem cardBody>
                            <Field name={'mobile'}
                                   keyboardType={'phone-pad'}
                                   placeholder={'Mobile'}
                                   icon={'ios-phone-portrait'}
                                   component={renderTextInput}/>
                        </CardItem>
                    </Card>
                    <Card style={{padding: 10}}>
                        <CardItem cardBody>
                            <Field name={'address_1'}
                                   keyboardType={'default'}
                                   placeholder={'Address 1'}
                                   component={renderTextInput}/>
                        </CardItem>
                        <CardItem cardBody>
                            <Field name={'address_2'}
                                   keyboardType={'default'}
                                   placeholder={'Address 2'}
                                   component={renderTextInput}/>
                        </CardItem>
                        <CardItem cardBody>
                            <Field name={'address_3'}
                                   keyboardType={'default'}
                                   placeholder={'Address 3'}
                                   component={renderTextInput}/>
                        </CardItem>
                    </Card>
                    <Button padder block primary onPress={handleSubmit(this.onSubmit)}>
                        <Text>Save</Text>
                    </Button>
                </Content>
            </Container>
        );
    };

    goBack() {
        //TODO handling
        Actions.pop()
        Actions.refresh()
    }
}

const validate = (values) => {
    return {
        email: validateEmailField(values.email),
        name: validateRequiredField('Name', values.name),
        phone: validateRequiredField('Phone', values.phone),
        address_1: validateRequiredField('One Address', values.address_1),
    };
};

const mapStateToProps = (state, props) => {
    let initialValues;
    if (props.customer) {
        initialValues = {
            name: props.customer.name,
            company: props.customer.company,
            email: props.customer.email,
            phone: props.customer.phone,
            mobile: props.customer.mobile,
            address_1: (props.customer.addresses)[0],
            address_2: (props.customer.addresses)[1],
            address_3: (props.customer.addresses)[2],
        }
    }
        return ({
            initialValues,
            editCustomer: state.customerReducer.editCustomer,
            getCustomers: state.customerReducer.getCustomers,
        });

};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'customerForm',
        enableReinitialize: true,
        validate,
    }),
)(CustomerForm);
