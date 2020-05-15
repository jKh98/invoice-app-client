import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {Container, Content, Header, Title, Right, Left, Body, Card, CardItem, Icon, Button, Text} from 'native-base';
import renderTextInput from '../components/RenderTextInput';
import {Field, reduxForm} from 'redux-form';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {validateEmailField, validateRequiredField} from '../utils/form.utils';

class AddCustomer extends Component<{}> {
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
                        <Title>Customer</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content padder>
                    <Card>
                        <CardItem>
                            <Field name={'name'}
                                   keyboardType={'default'}
                                   placeholder={'Customer Name'}
                                   component={renderTextInput}/>
                        </CardItem>
                        <CardItem>
                            <Field name={'company'}
                                   keyboardType={'default'}
                                   placeholder={'Company'}
                                   component={renderTextInput}/>
                        </CardItem>
                        <CardItem>
                            <Field name={'email'}
                                   keyboardType={'email-address'}
                                   placeholder={'Email'}
                                   component={renderTextInput}/>
                        </CardItem>
                        <CardItem>
                            <Field name={'phone'}
                                   keyboardType={'phone-pad'}
                                   placeholder={'Phone'}
                                   component={renderTextInput}/>
                        </CardItem>
                        <CardItem>
                            <Field name={'mobile'}
                                   keyboardType={'phone-pad'}
                                   placeholder={'Mobile'}
                                   component={renderTextInput}/>
                        </CardItem>
                        <CardItem>
                            <Field name={'address_1'}
                                   keyboardType={'default'}
                                   placeholder={'Address 1'}
                                   component={renderTextInput}/>
                        </CardItem>
                        <CardItem>
                            <Field name={'address_2'}
                                   keyboardType={'default'}
                                   placeholder={'Address 2'}
                                   component={renderTextInput}/>
                        </CardItem>
                        <CardItem>
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
        name: validateRequiredField(values.name),
        phone: validateRequiredField(values.password),
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
        form: 'addCustomer',
        validate,
    }),
)(AddCustomer);
