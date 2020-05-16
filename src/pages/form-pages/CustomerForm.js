import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {Container, Content, Header, Title, Right, Left, Body, Card, CardItem, Icon, Button, Text} from 'native-base';
import renderTextInput from '../../components/reduxFormRenderers/RenderTextInput';
import {Field, reduxForm} from 'redux-form';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {validateEmailField, validateRequiredField} from '../../utils/form.utils';

class CustomerForm extends Component<{}> {
    render() {
        // alert(this.props.customer.name)
        return (
            <Container>
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
                    <Button padder block primary onPress={this.handleSubmit(this.onSubmit)}>
                        <Text>Save</Text>
                    </Button>
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
}

//todo refactor
const validate = (values) => {
    return {
        email: validateEmailField(values.email),
        name: validateRequiredField('Name', values.name),
        phone: validateRequiredField('Phone', values.phone),
        address_1: validateRequiredField('One Address', values.address_1),
    };
};

const mapStateToProps = (state, props) => {
    if (props.customer) {
        return ({
            initialValues: {
                name: props.customer.name,
                company: props.customer.company,
                email: props.customer.email,
                phone: props.customer.phone,
                mobile: props.customer.mobile,
                address_1: (props.customer.addresses)[0],
                address_2: (props.customer.addresses)[1],
                address_3: (props.customer.addresses)[2],
            },
        });
    }
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
