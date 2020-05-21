import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {
    Container,
    Content,
    Card,
    CardItem,
    Button,
    Text,
    Toast, Footer, FooterTab,
} from 'native-base';
import renderTextInput from '../../components/reduxFormRenderers/RenderTextInput';
import {Field, reduxForm} from 'redux-form';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {email, phone, required} from '../../utils/redux.form.utils';
import {ErrorUtils} from '../../utils/error.utils';
import {editCustomer, getCustomersList} from '../../actions/customer.actions';
import Loader from '../../components/Loader';
import InnerPageHeader from '../../components/InnerPageHeader';

class CustomerForm extends Component<{}> {
    modifyCustomerData = async (values) => {
        try {
            const response = await this.props.dispatch(editCustomer(values));
            if (!response.success) {
                throw response;
            } else {
                await this.refreshCustomersList();
            }
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
            } else {
                Toast.show({
                    text: 'Customers list successfully updated.',
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
        values.addresses = [values.address_1, values.address_2, values.address_3];
        this.modifyCustomerData(values);

    };

    render() {
        const {handleSubmit, editCustomer} = this.props;
        return (
            <Container>
                {editCustomer.isLoading && <Loader/>}
                <InnerPageHeader title={'Customer'}/>
                <Content padder>
                    <Card style={{paddingHorizontal: 10}}>
                        <CardItem cardBody listItemPadding>
                            <Field name={'name'}
                                   keyboardType={'default'}
                                   placeholder={'Customer Name'}
                                   icon={'ios-contact'}
                                   valdiate={[required]}
                                   component={renderTextInput}/>
                        </CardItem>
                        <CardItem cardBody>
                            <Field name={'email'}
                                   keyboardType={'email-address'}
                                   placeholder={'Email'}
                                   icon={'ios-mail'}
                                   validate={[email, required]}
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
                            <Field name={'phone'}
                                   keyboardType={'phone-pad'}
                                   placeholder={'Phone'}
                                   icon={'ios-call'}
                                   validate={[phone, required]}
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
                    <Card style={{paddingHorizontal: 10}}>
                        <CardItem cardBody>
                            <Field name={'address_1'}
                                   keyboardType={'default'}
                                   placeholder={'Address 1'}
                                   validate={[required]}
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
                </Content>
                <Footer>
                    <FooterTab>
                        <Button padder block primary onPress={handleSubmit(this.onSubmit)}>
                            <Text>Save</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    };
}

const mapStateToProps = (state, props) => {
    let initialValues;
    if (props.customer) {
        initialValues = {
            name: props.customer.name,
            company: props.customer.company,
            email: props.customer.email,
            phone: props.customer.phone,
            mobile: props.customer.mobile,
            address_1: props.customer.addresses && (props.customer.addresses)[0],
            address_2: props.customer.addresses && (props.customer.addresses)[1],
            address_3: props.customer.addresses && (props.customer.addresses)[2],
        };
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
        keepDirtyOnReinitialize: true,
        updateUnregisteredFields: true,
    }),
)(CustomerForm);
