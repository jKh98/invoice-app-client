import React, {Component} from 'react';
import {Body, Button, Card, CardItem, Container, Content, Text, Toast} from 'native-base';
import {Field, reduxForm} from 'redux-form';
import renderTextInput from '../components/reduxFormRenderers/RenderTextInput';
import {phone, required} from '../utils/redux.form.utils';
import {currencies} from '../utils/currencies.utils';
import renderSelectOption from '../components/reduxFormRenderers/RenderSelectOption';
import {compose} from 'redux';
import {connect} from 'react-redux';
import InnerPageHeader from '../components/InnerPageHeader';
import {editUser, getUser, logoutUser} from '../actions/auth.actions';
import {ErrorUtils} from '../utils/error.utils';
import Loader from '../components/Loader';

class Profile extends Component<{}> {
    onSubmit = async (values) => {
        try {
            const response = await this.props.dispatch(editUser(values));
            if (response.success) {
                await this.refreshUserData();
            } else {
                throw response;
            }
        } catch (e) {
            const newError = new ErrorUtils(e);
            newError.showAlert();
        }
    };

    async refreshUserData() {
        try {
            const response = await this.props.dispatch(getUser());
            if (!response.success) {
                throw response;
            } else {
                Toast.show({
                    text: 'Items list successfully updated.',
                    buttonText: 'Okay',
                    type: 'success',
                });
            }
        } catch (e) {
            const newError = new ErrorUtils(e);
            newError.showAlert();
        }
    }

    logoutUser = () => {
        this.props.dispatch(logoutUser());
    };

    render() {
        const {handleSubmit, editUser} = this.props;
        return (
            <Container>
                {editUser.isLoading && <Loader/>}
                <InnerPageHeader title={'Profile'}/>
                <Content padder contentContainerStyle={{display: 'flex', flex: 1, justifyContent: 'center'}}>
                    <Card transparent>
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
                                    <Text>Save Data</Text>
                                </Button>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card transparent>
                        <CardItem footer>
                            <Body>
                                <Button padder block danger onPress={() => {
                                    this.logoutUser();
                                }}>
                                    <Text>Logout</Text>
                                </Button>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    };
}

const mapStateToProps = (state) => ({
    getUser: state.userReducer.getUser,
    editUser: state.userReducer.editUser,
    initialValues: {
        company: state.userReducer.getUser.userDetails.company,
        phone: state.userReducer.getUser.userDetails.phone,
        address: state.userReducer.getUser.userDetails.address,
        base_currency: state.userReducer.getUser.userDetails.base_currency,
    },
});

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'editUser',
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        updateUnregisteredFields: true,
    }),
)(Profile);
