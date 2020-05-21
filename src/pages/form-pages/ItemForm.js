import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {Button, Card, CardItem, Container, Content, Footer, FooterTab, Text, Toast} from 'native-base';
import renderTextInput from '../../components/reduxFormRenderers/RenderTextInput';
import {Field, reduxForm} from 'redux-form';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {formatCurrency, normalizeCurrency, number, required} from '../../utils/redux.form.utils';
import {ErrorUtils} from '../../utils/error.utils';
import {editItem, getItemsList} from '../../actions/item.actions';
import Loader from '../../components/Loader';
import {getCurrency} from '../../utils/currencies.utils';
import InnerPageHeader from '../../components/InnerPageHeader';

class ItemForm extends Component<{}> {
    modifyItemData = async (values) => {
        try {
            const response = await this.props.dispatch(editItem(values));
            if (!response.success) {
                throw response;
            } else {
                await this.refreshItemsList();
            }
        } catch (e) {
            const newError = new ErrorUtils(e);
            newError.showAlert();
        }
    };

    async refreshItemsList() {
        try {
            const response = await this.props.dispatch(getItemsList());
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

    onSubmit = (values) => {
        this.modifyItemData(values);
    };

    render() {
        const {handleSubmit, editItem, getUser: {userDetails}} = this.props;
        const currency = getCurrency(userDetails.base_currency);
        return (
            <Container>
                {editItem.isLoading && <Loader/>}
                <InnerPageHeader title={'Item'}/>
                <Content padder>
                    <Card style={{paddingHorizontal: 10}}>
                        <CardItem cardBody>
                            <Field name={'name'}
                                   keyboardType={'default'}
                                   placeholder={'Item Name'}
                                   icon={'ios-barcode'}
                                   validate={[required]}
                                   component={renderTextInput}/>
                        </CardItem>
                        <CardItem cardBody>
                            <Field name={'price'}
                                   keyboardType={'decimal-pad'}
                                   placeholder={'Unit Price'}
                                   valdiate={[number, required]}
                                   icon={'ios-pricetag'}
                                   format={value => (formatCurrency(value, currency))}
                                   normalize={value => (normalizeCurrency(value))}
                                   component={renderTextInput}/>
                        </CardItem>
                        <CardItem cardBody>
                            <Field name={'description'}
                                   keyboardType={'default'}
                                   placeholder={'Description'}
                                   icon={'ios-paper'}
                                   multiline
                                   component={renderTextInput}/>
                        </CardItem>
                    </Card>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button padder block primary onPress={handleSubmit(this.onSubmit)}>
                            <Text>Save</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    };

    goBack() {
        Actions.pop();
        Actions.refresh();
    }

}

const mapStateToProps = (state, props) => {
    let initialValues;
    if (props.item) {
        initialValues = {
            name: props.item.name,
            price: props.item.price.toString(),
            description: props.item.description,
        };
    }
    return ({
        initialValues,
        getUser: state.userReducer.getUser,
        editItem: state.itemReducer.editItem,
        getItems: state.itemReducer.getItems,
    });
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'itemForm',
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        updateUnregisteredFields: true,
    }),
)(ItemForm);
