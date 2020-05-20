import {View, Body, Right, Left, Text, CardItem, Header, Button, Icon, Card, Item} from 'native-base';
import React from 'react';
import {Field} from 'redux-form';
import renderTextInput from './RenderTextInput';
import renderSelectOption from './RenderSelectOption';
import {formatCurrency, normalizeCurrency, integer, number, required} from '../../utils/redux.form.utils';

/**
 * Renders an array of field tuples for redux-form. Each tuple has an item selector and a quantity input field
 *
 * @returns {*}
 * @param field
 */
const renderItemsInputArray = (field) => {
    const {fields, change, optionsArray, meta: {error, touched}, currency} = field;
    return (
        <View style={{flex: 1}}>
            {fields.map((item, index) => (
                <Card key={index}>
                    <CardItem>
                        <Body>
                            <Field name={`${item}.item`}
                                   component={renderSelectOption}
                                   optionsArray={optionsArray}
                                   iosHeader="Select Item"
                                   placeHolder={'Select an item...'}
                                   placeholder={'Item'}
                                   validate={[required]}
                                   onChange={(value) => {
                                       // Calculate product subtotal based on new product
                                       let quantity = Number(fields.get(index).quantity);
                                       let itemValue = optionsArray.find((e) => {
                                           if (e._id === value) {
                                               return e;
                                           }
                                       });
                                       if (quantity && itemValue) {
                                           change(`${item}.subtotal`, String(quantity * itemValue.price));
                                       }
                                   }}/>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Field
                                name={`${item}.quantity`}
                                keyboardType={'decimal-pad'}
                                placeholder={'0'}
                                textAlign={'right'}
                                label={'Quantity'}
                                component={renderTextInput}
                                validate={[required, integer]}
                                onChange={(value) => {
                                    // Calculate product subtotal based on new quantity
                                    let itemValue = optionsArray.find((e) => {
                                        if (e._id === fields.get(index).item) {
                                            return e;
                                        }
                                    });
                                    if (itemValue) {
                                        change(`${item}.subtotal`, String(Number(value) * itemValue.price));
                                    }
                                }}/>
                        </Left>
                        <Body/>
                        <Right>
                            <Field
                                name={`${item}.subtotal`}
                                keyboardType={'decimal-pad'}
                                placeholder={'0'}
                                textAlign={'right'}
                                editable={false}
                                validate={[required, number]}
                                format={value => (formatCurrency(value, currency))}
                                normalize={value => (normalizeCurrency(value))}
                                component={renderTextInput}/>
                            {(touched && error) && <Text style={{color: '#f32013'}}>{error}</Text>}
                        </Right>
                    </CardItem>
                    <CardItem button light onPress={() => fields.remove(index)}>
                        <Left>
                            <Icon active name='ios-trash'/>
                            <Body>
                                <Text>Remove Item</Text>
                            </Body>
                        </Left>
                    </CardItem>

                </Card>
            ))}
            <Card>
                <CardItem button light onPress={() => fields.push({})}>
                    <Left>
                        <Icon active name="ios-add"/>
                        <Body>
                            <Text>Add Item</Text>
                        </Body>
                    </Left>
                </CardItem>
            </Card>
        </View>
    );
};
export default renderItemsInputArray;

