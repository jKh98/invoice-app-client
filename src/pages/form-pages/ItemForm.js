import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {
    Container,
    Content,
    Header,
    Title,
    Right,
    Left,
    Body,
    Card,
    CardItem,
    Icon,
    Button,
    Text,
} from 'native-base';
import renderTextInput from '../../components/RenderTextInput';
import {Field, reduxForm} from 'redux-form';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {validateEmailField, validateRequiredField} from '../../utils/form.utils';

class ItemForm extends Component<{}> {
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={this.goBack}>
                            <Icon name={'ios-arrow-back'}/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>New Item</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content padder>
                    <Card>
                        <CardItem>
                            <Field name={'name'}
                                   keyboardType={'default'}
                                   placeholder={'Item Name'}
                                   icon={'ios-barcode'}
                                   component={renderTextInput}/>
                        </CardItem>
                        <CardItem>
                            <Field name={'price'}
                                   keyboardType={'decimal-pad'}
                                   placeholder={'Unit Price'}
                                   icon={'ios-pricetag'}
                                   component={renderTextInput}/>
                        </CardItem>
                        <CardItem>
                            <Field name={'description'}
                                   keyboardType={'default'}
                                   placeholder={'Description'}
                                   icon={'ios-paper'}
                                   component={renderTextInput}/>
                        </CardItem>
                    </Card>
                    <Button padder block primary onPress={this.handleSubmit(this.onSubmit)}>
                        <Text>Save</Text>
                    </Button>
                </Content>
            </Container>
        );
    };

    handleSubmit(values) {
        //TODO DISPATCH ACTIONS
    }

    goBack() {
        //TODO handling
        Actions.pop();
    }
}

//todo refactor
const validate = (values) => {
    return {
        name: validateRequiredField('Name', values.name),
        price: validateRequiredField('Price', values.price),
    };
};

const mapStateToProps = (state) => ({
    //TODO CHECK STATE PARAMS
    // loginUser: state.authReducer.loginUser,
});

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: 'itemForm',
        validate,
    }),
)(ItemForm);
