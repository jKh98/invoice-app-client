import React, {Component} from 'react';
import {Container, Content, Button, Body, Text} from 'native-base';

import {Actions} from 'react-native-router-flux';
import Logo from '../../components/Logo';
import {Field, reduxForm} from 'redux-form';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/auth.actions';
import Loader from '../../components/Loader';
import {ErrorUtils} from '../../utils/auth.utils';
import renderTextInput from '../../components/RenderTextInput';
import {validateEmailField, validateRequiredField} from '../../utils/form.utils';

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

    render() {
        const {handleSubmit, loginUser} = this.props;
        return (
            <Container style={{flex: 1, justifyContent: 'center'}}>
                {loginUser.isLoading && <Loader/>}
                <Content padder>
                    <Logo/>
                    <Field name={'email'}
                           keyboardType={'email-address'}
                           placeholder={'Email'}
                           component={renderTextInput}/>
                    <Field name={'password'}
                           keyboardType={'default'}
                           placeholder={'Password'}
                           secureTextEntry={true}
                           component={renderTextInput}/>
                    <Button padder block primary onPress={handleSubmit(this.onSubmit)}>
                        <Text>Login</Text>
                    </Button>

                    <Body>
                        <Text> Don't have an account yet?</Text>
                        <Button transparent light onPress={this.signUp}>
                            <Text>Sign Up</Text>
                        </Button>
                    </Body>
                </Content>
            </Container>
        );
    };
}
const validate = (values) => {
    return {
        email: validateEmailField(values.email),
        password: validateRequiredField('Password',values.password),
    };
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
