import {View, Body, Right, Left, Text, CardItem, ListItem, Button, Icon, Content, Item} from 'native-base';
import React from 'react';
import {Field} from 'redux-form';
import renderTextInput from './RenderTextInput';
import renderSelectItem from './RenderSelectItem';
import {validateNumberField, validateRequiredField} from '../../utils/validate.utils';

/**
 * Renders an array of field tuples for redux-form. Each tuple has an item selector and a quantity input field
 *
 * @returns {*}
 * @param field
 */
const renderItemsInputArray = (field) => {
    const {fields, change, onChange, optionsArray, meta: {error, touched, submitFailed}} = field;
    return (
        <View style={{flex: 1}}>
            {fields.map((item, index) => (
                <CardItem key={index}>
                    <Button transparent onPress={() => fields.remove(index)}>
                        <Icon name='ios-remove' color={'black'}/>
                    </Button>
                    <Body>
                        <Field name={`${item}.item`}
                               component={renderSelectItem}
                               optionsArray={optionsArray}
                               iosHeader="Select Item"
                               placeholder={'Item'}
                               validate={(value) => {
                                   return validateRequiredField('Item', value);
                               }
                               }
                               onChange={(value) => {
                                   // Calculate product subtotal based on new product
                                   let quantity = Number(fields.get(index).quantity);
                                   let itemValue = optionsArray.find((e) => {
                                       if (e._id === value) {
                                           return e;
                                       }
                                   });
                                   if (quantity && item) {
                                       change(`${item}.subtotal`, String(quantity * itemValue.price));
                                   }
                                   // onChange();
                               }}
                        />
                        <Field
                            name={`${item}.quantity`}
                            keyboardType={'decimal-pad'}
                            placeholder={'0'}
                            textAlign={'right'}
                            label={'×'}
                            component={renderTextInput}
                            validate={(value) => {
                                return validateNumberField('Quantity', value, 1, null, true);
                            }}
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
                                // onChange();
                            }}
                        />
                        <Field
                            name={`${item}.subtotal`}
                            keyboardType={'decimal-pad'}
                            placeholder={'0'}
                            textAlign={'right'}
                            label={'Net Price'}
                            editable={false}
                            validate={(value) => {
                                return validateNumberField('Subtotal', value, 0);
                            }}
                            component={renderTextInput}
                        />
                    </Body>
                    {(touched && error || submitFailed) && <Text style={{color: '#f32013'}}>{error}</Text>}
                </CardItem>
            ))}
            <CardItem button light onPress={() => fields.push({})}>
                <Left>
                    <Icon active name="ios-add"/>
                    <Body>
                        <Text>Add Item</Text>
                    </Body>
                </Left>
            </CardItem>
        </View>
    );
};

export default renderItemsInputArray;

