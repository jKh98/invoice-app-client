import React, {Component} from 'react';
import {Container, Content, CardItem, Card, Body, Button, Text} from 'native-base';
import {Field, reduxForm} from 'redux-form';
import renderTextInput from '../components/reduxFormRenderers/RenderTextInput';
import {phone, required} from '../utils/redux.form.utils';
import {currencies} from '../utils/currencies.utils';
import renderSelectOption from '../components/reduxFormRenderers/RenderSelectOption';
import {compose} from 'redux';
import {connect} from 'react-redux';
import InnerPageHeader from '../components/InnerPageHeader';
import {editUser, logoutUser} from '../actions/auth.actions';

class Profile extends Component<{}> {
    onSubmit = (values) => {
        console.log(values);
        // this.props.dispatch(editUser(values));
    };

    logoutUser = () => {
        this.props.dispatch(logoutUser());
    };

    render() {
        const {handleSubmit} = this.props;
        return (
            <Container>
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
