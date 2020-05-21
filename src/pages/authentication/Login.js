import React, {Component} from 'react';
import {Body, Button, Card, CardItem, Container, Content, Text} from 'native-base';

import {Actions} from 'react-native-router-flux';
import Logo from '../../components/Logo';
import {Field, reduxForm} from 'redux-form';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/auth.actions';
import Loader from '../../components/Loader';
import {ErrorUtils} from '../../utils/error.utils';
import renderTextInput from '../../components/reduxFormRenderers/RenderTextInput';
import {email, required} from '../../utils/redux.form.utils';

/**
 * Login page
 */
class Login extends Component<{}> {
    /**
     * Dispatches an action to login user and alerts on error
     *
     * @param values
     * @returns {Promise<void>}
     */
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

    /**
     * Opens registration page
     */
    openSignUp() {
        Actions.signup();
    }

    /**
     * Submits login form values
     *
     * @param values
     */
    onSubmit = (values) => {
        this.loginUser(values);
    };

    render() {
        const {handleSubmit, loginUser} = this.props;
        return (
            <Container>
                {loginUser.isLoading && <Loader/>}
                <Content padder contentContainerStyle={{display: 'flex', flex: 1, justifyContent: 'center'}}>
                    <Logo/>
                    <Card transparent>
                        <CardItem>
                            <Body>
                                <Field name={'email'}
                                       keyboardType={'email-address'}
                                       placeholder={'Email'}
                                       validate={[email, required]}
                                       component={renderTextInput}/>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Field name={'password'}
                                       keyboardType={'default'}
                                       placeholder={'Password'}
                                       secureTextEntry={true}
                                       validate={[required]}
                                       component={renderTextInput}/>
                            </Body>
                        </CardItem>
                        <CardItem footer>
                            <Body>
                                <Button padder block primary onPress={handleSubmit(this.onSubmit)}>
                                    <Text>Login</Text>
                                </Button>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Text> Don't have an account yet?</Text>
                            <Button transparent onPress={this.openSignUp}>
                                <Text>Sign Up</Text>
                            </Button>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    };
}

/**
 * maps loginUser reducer to props
 *
 * @param state
 * @returns {{loginUser: (Login.loginUser|loginUser)}}
 */
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
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        updateUnregisteredFields: true,
    }),
)(Login);
