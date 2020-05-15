import {Input, Label, Icon, Item, Text} from 'native-base';
import React from 'react';

const renderTextInput = (field) => {
    const {meta: {touched, error}, label, secureTextEntry, maxLength, keyboardType, placeholder, icon, input: {onChange, ...restInput}} = field;
    return (
        <Item>
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
                {...restInput} />
            {(touched && error) && <Text style={{color: '#f32013'}}>{error}</Text>}
        </Item>
    );
};

export default renderTextInput;
