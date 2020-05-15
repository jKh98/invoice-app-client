import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {compose} from 'redux';
import Logo from '../../components/Logo';
import {Actions} from 'react-native-router-flux';
import {registerNewUser} from '../../actions/auth.actions';
import Loader from '../../components/Loader';
import {ErrorUtils} from '../../utils/auth.utils';
import {Button, Container, Content, Body, Text, Input, CardItem, Card} from 'native-base';
import renderTextInput from '../../components/RenderTextInput';
import {validateEmailField, validateRequiredField} from '../../utils/form.utils';


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

    render() {
        const {handleSubmit, registerUser} = this.props;
        return (
            <Container style={{flex: 1, justifyContent: 'center'}}>
                {registerUser.isLoading && <Loader/>}
                <Content padder contentContainerStyle={{display: 'flex', flex: 1, justifyContent: 'center'}}>
                    <Logo/>
                    <Card transparent>
                        <CardItem>
                            <Body>
                                <Field name={'name'}
                                       placeholder={'Name'}
                                       keyboardType={'default'}
                                       component={renderTextInput}/>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Field name={'email'}
                                       placeholder={'Email'}
                                       keyboardType={'email-address'}
                                       component={renderTextInput}/>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Field name={'password'}
                                       keyboardType={'default'}
                                       placeholder={'Password'}
                                       secureTextEntry={true}
                                       component={renderTextInput}/>
                            </Body>
                        </CardItem>
                        <CardItem footer>
                            <Body>
                                <Button padder block primary onPress={handleSubmit(this.onSubmit)}>
                                    <Text>Sign Up</Text>
                                </Button>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Text> Already have an account?</Text>
                            <Button transparent onPress={this.goBack}>
                                <Text>Sign In</Text>
                            </Button>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    };
}

const validate = (values) => {
    return {
        email: validateEmailField(values.email),
        name: validateRequiredField('Name', values.name),
        password: validateRequiredField('Password', values.password),
    };
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
