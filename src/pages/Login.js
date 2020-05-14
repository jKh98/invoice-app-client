import React, {Component} from 'react';
import {
    TouchableOpacity,
    Text,
    View,
} from 'react-native';
import {Container, Header, Content, Form, Button, Body, Title, Item} from 'native-base';

import {Actions} from 'react-native-router-flux';
import Logo from '../components/Logo';
import {Field, reduxForm} from 'redux-form';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {loginUser} from '../actions/auth.actions';
import Loader from '../components/Loader';
import {ErrorUtils} from '../utils/auth.utils';
import InputText from '../components/InputText';

class Login extends Component<{}> {

    loginUser = async (values) => {
        try {
            const response = await this.props.dispatch(loginUser(values));
            if (!response.success) {
                throw response;
            }
        } catch (e) {
            const newError = new ErrorUtils(e);
            newError.showAlert();
        }
    };


    signUp() {
        Actions.signup();
    }

    onSubmit = (values) => {
        this.loginUser(values);
    };
    //todo refactor
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
        const {handleSubmit, loginUser} = this.props;
        return (
            <Container style={{flex: 1, justifyContent: 'center'}}>
                {loginUser.isLoading && <Loader/>}
                <Content padder>
                    <Logo/>
                    <Field name={'email'}
                           placeholder={'Email'}
                           component={this.renderTextInput}/>

                    <Field name={'password'}
                           placeholder={'Password'}
                           secureTextEntry={true}
                           component={this.renderTextInput}/>
                    <Button padder block rounded primary onPress={handleSubmit(this.onSubmit)}>
                        <Text>Login</Text>
                    </Button>
                    <View style={{flex: 1}}>
                        <Text> Don't have an account yet?</Text>
                        <Button transparent light onPress={this.signUp}>
                            <Text>Sign Up</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    };
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
    loginUser: state.authReducer.loginUser,
});

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'login',
        validate,
    }),
)(Login);
