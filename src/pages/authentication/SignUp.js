import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Actions} from 'react-native-router-flux';
import {registerNewUser} from '../../actions/auth.actions';
import Loader from '../../components/Loader';
import {ErrorUtils} from '../../utils/error.utils';
import {Button, Container, Content, Body, Text, Header, CardItem, Card, Title, Icon, Left, Right} from 'native-base';
import renderTextInput from '../../components/reduxFormRenderers/RenderTextInput';
import {
    email, phone,
    required,
} from '../../utils/redux.form.utils';
import renderSelectOption from '../../components/reduxFormRenderers/RenderSelectOption';
import {currencies} from '../../utils/currencies.utils';
import InnerPageHeader from '../../components/InnerPageHeader';


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
        console.log(values);
        this.registerNewUser(values);
    };

    render() {
        const {handleSubmit, registerUser} = this.props;
        return (
            <Container style={{flex: 1, justifyContent: 'center'}}>
                {registerUser.isLoading && <Loader/>}
                <InnerPageHeader title={'Sign Up as Merchant'}/>
                <Content padder contentContainerStyle={{display: 'flex', flex: 1, justifyContent: 'center'}}>
                    <Card transparent>
                        <CardItem>
                            <Field name={'name'}
                                   placeholder={'Name'}
                                   keyboardType={'default'}
                                   validate={[required]}
                                   component={renderTextInput}/>
                        </CardItem>
                        <CardItem>
                            <Field name={'email'}
                                   placeholder={'Email'}
                                   keyboardType={'email-address'}
                                   validate={[email, required]}
                                   component={renderTextInput}/>
                        </CardItem>
                        <CardItem>
                            <Field name={'password'}
                                   keyboardType={'default'}
                                   placeholder={'Password'}
                                   secureTextEntry={true}
                                   validate={[required]}
                                   component={renderTextInput}/>
                        </CardItem>
                        <CardItem>
                            <Field name={'company'}
                                   keyboardType={'default'}
                                   placeholder={'Company'}
                                   component={renderTextInput}/>
                        </CardItem>
                        <CardItem>
                            <Field name={'phone'}
                                   keyboardType={'phone-pad'}
                                   placeholder={'Phone'}
                                   validate={[required, phone]}
                                   component={renderTextInput}/>
                        </CardItem>
                        <CardItem>
                            <Field name={'address'}
                                   keyboardType={'default'}
                                   placeholder={'Address'}
                                   validate={[required]}
                                   component={renderTextInput}/>
                        </CardItem>
                        <CardItem>
                            <Field name={'base_currency'}
                                   keyboardType={'default'}
                                   placeholder={'Base Items Currency'}
                                   optionsArray={currencies}
                                   validate={[required]}
                                   placeHolder={'Select Base Currency'}
                                   component={renderSelectOption}/>
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
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        updateUnregisteredFields: true,
    }),
)(SignUp);
