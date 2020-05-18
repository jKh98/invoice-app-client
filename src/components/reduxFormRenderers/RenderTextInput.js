import {Input, Label, Icon, Item, Text} from 'native-base';
import React from 'react';

/**
 * Renders a native-base input component based on supplied field parameters.
 *
 * @param field
 * @returns {*}
 */
const renderTextInput = (field) => {
    const {meta: {touched, error}, label, secureTextEntry, value, maxLength, keyboardType, placeholder, textAlign, icon, editable, input: {onChange, ...restInput}} = field;
    return (
        <Item itemProps>
            {label && <Label>{label}</Label>}
            {icon && <Icon active name={icon}/>}
            <Input
                underlineColorAndroid='transparent'
                onChangeText={onChange}
                maxLength={maxLength}
                placeholder={placeholder}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                label={label}
                textAlign={textAlign}
                value={String(value)}
                editable={editable}
                {...restInput} />
            {(touched && error) && <Text style={{color: '#f32013'}}>{error}</Text>}
        </Item>
    );
};

export default renderTextInput;
