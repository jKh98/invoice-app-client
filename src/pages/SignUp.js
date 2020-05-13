import React, {Component} from 'react';
import {
    Text,
    View,
} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {compose} from 'redux';
import Logo from '../components/Logo';
import InputText from '../components/InputText';
import {Actions} from 'react-native-router-flux';
import {registerNewUser} from '../actions/auth.actions';
import Loader from '../components/Loader';
import {ErrorUtils} from '../utils/auth.utils';
import {Button, Container, Content, Form, Item} from 'native-base';


class SignUp extends Component<{}> {

    registerNewUser = async (values) => {
        try {
            const response = await this.props.dispatch(registerNewUser(values));
            if (!response.success) {
                throw response;
            }
        } catch (e) {
            const newError = new ErrorUtils(e);
            newError.showAlert();
        }
    };


    goBack() {
        Actions.pop();
    }

    onSubmit = (values) => {
        this.registerNewUser(values);
    };

    renderTextInput = (field) => {
        const {meta: {touched, error}, label, secureTextEntry, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
        return (
            <Item rounded padder>
                <InputText
                    onChangeText={onChange}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    label={label}
                    {...restInput} />
                {(touched && error) && <Text>{error}</Text>}
            </Item>
        );
    };

    render() {
        const {handleSubmit, registerUser} = this.props;
        return (
            <Container style={{flex: 1, justifyContent: 'center'}}>
                {registerUser.isLoading && <Loader/>}
                <Content padder>
                    <Logo/>
                    <Form>
                        <Field name={'name'}
                               placeholder={'name'}
                               component={this.renderTextInput}/>
                        <Field name={'email'}
                               placeholder={'Email'}
                               component={this.renderTextInput}/>
                        <Field name={'password'}
                               placeholder={'Password'}
                               secureTextEntry={true}
                               component={this.renderTextInput}/>
                        <Button padder block rounded primary onPress={handleSubmit(this.onSubmit)}>
                            <Text>Sign Up</Text>
                        </Button>
                    </Form>
                    <View style={{flex: 1}}>
                        <Text> Already have an account?</Text>
                        <Button transparent light onPress={this.goBack}>
                            <Text>Sign In</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    };
}

const validate = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Name is required.';
    }
    if (!values.email) {
        errors.email = 'Email is required.';
    }
    if (!values.password) {
        errors.password = 'Password is required.';
    }
    return errors;
};

const mapStateToProps = (state) => ({
    registerUser: state.authReducer.registerUser,
});

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'register',
        validate,
    }),
)(SignUp);
