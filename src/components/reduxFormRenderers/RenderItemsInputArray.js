import {View, Body, Right, Left, Text, CardItem, ListItem, Button, Icon, Picker} from 'native-base';
import React from 'react';
import {Field} from 'redux-form';
import renderTextInput from './RenderTextInput';
import renderSelectItem from './RenderSelectItem';

/**
 * Renders an array of field tuples for redux-form. Each tuple has an item selector and a quantity input field
 *
 * @param fields
 * @param optionsArray that contains item objects for the item selector
 * @param error
 * @param submitFailed
 * @returns {*}
 */
const renderItemsInputArray = ({fields, optionsArray, meta: {error, submitFailed}}) => (
    <View style={{flex: 1}}>
        {fields.map((item, index) => (
            <CardItem key={index}>
                <Left>
                    <Button transparent onPress={() => fields.remove(index)}>
                        <Icon name='ios-remove' color={'black'}/>
                    </Button>
                    <Field name={`${item}.item`}
                           component={renderSelectItem}
                           optionsArray={optionsArray}
                           iosHeader="Select Item"
                           placeholder={'Item'}>

                    </Field>

                </Left>
                <Right>
                    <Field
                        name={`${item}.quantity`}
                        keyboardType={'decimal-pad'}
                        placeholder={'0'}
                        component={renderTextInput}
                    />
                </Right>
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
        {submitFailed && error && <Text style={{color: '#f32013'}}>{error}</Text>}
    </View>
);

export default renderItemsInputArray;
