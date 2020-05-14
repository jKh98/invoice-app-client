import React, {Component} from 'react';
import {
    SafeAreaView, Text,
    View,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Container, Content, Header, Title, Right, Left, Body, Card, CardItem, Icon, Button, Footer} from 'native-base';
import renderTextInput from '../components/RenderTextInput';
import {Field, reduxForm} from 'redux-form';
import {compose} from 'redux';
import {connect} from 'react-redux';

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
                        <Title>New Customer</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content padder>
                    <Card>
                        <CardItem>
                            <Field name={'name'}
                                   placeholder={'Customer Name'}
                                   component={renderTextInput}/>
                        </CardItem>
                        <CardItem>
                            <Field name={'company'}
                                   placeholder={'Company'}
                                   component={renderTextInput}/>
                        </CardItem>
                        <CardItem>
                            <Field name={'email'}
                                   placeholder={'Email'}
                                   component={renderTextInput}/>
                        </CardItem>
                        <CardItem>
                            <Field name={'mobile'}
                                   placeholder={'Mobile'}
                                   component={renderTextInput}/>
                        </CardItem>
                        <CardItem>
                            <Field name={'phone'}
                                   placeholder={'Phone'}
                                   component={renderTextInput}/>
                        </CardItem>
                        <CardItem>
                            <Field name={'address_1'}
                                   placeholder={'Address 1'}
                                   component={renderTextInput}/>
                        </CardItem>
                        <CardItem>
                            <Field name={'address_2'}
                                   placeholder={'Address 2'}
                                   component={renderTextInput}/>
                        </CardItem>
                        <CardItem>
                            <Field name={'address_3'}
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
    const errors = {};
    if (!values.email) {
        errors.email = 'Email is required.';
    }
    if (!values.password) {
        errors.password = 'Password is required.';
    }
    return errors;
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
