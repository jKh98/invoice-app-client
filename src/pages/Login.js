import React, {Component} from 'react';
import {
    TouchableOpacity,
    View,
    Text,
} from 'react-native';
import {Container, Item, Content, Footer} from 'native-base';

import {Actions} from 'react-native-router-flux';
import Logo from '../components/Logo';
import {Field, reduxForm} from 'redux-form';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {loginUser} from '../actions/auth.actions';
import Loader from '../components/Loader';
import {ErrorUtils} from '../utils/auth.utils';
import InputTextRender from '../components/InputTextRender';

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


    signup() {
        Actions.signup();
    }

    onSubmit = (values) => {
        this.loginUser(values);
    };

    render() {
        const {handleSubmit, loginUser} = this.props;
        return (
            <Container>
                <Content>
                    {loginUser.isLoading && <Loader/>}
                    <Logo/>
                    <Item> <Field name={'email'}
                                  placeholder={'Email'}
                                  component={InputTextRender}/>
                    </Item>
                    <Item>
                        <Field name={'password'}
                               placeholder={'Password'}
                               secureTextEntry={true}
                               component={InputTextRender}/>
                    </Item>
                    <TouchableOpacity onPress={handleSubmit(this.onSubmit)}>
                        <Text>Login</Text>
                    </TouchableOpacity>
                </Content>
                <Footer>
                    <Text style={styles.smallButtonText}> Don't have an account yet?</Text>
                    <TouchableOpacity onPress={this.signup}>
                        <Text style={styles.smallButton}> Sign Up</Text>
                    </TouchableOpacity>
                    <FooterTab>
                        <Button full>
                            <Text>Footer</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    };
}

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
