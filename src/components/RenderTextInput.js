import {Input, Label, Item} from 'native-base';
import {Text} from 'react-native';
import React from 'react';

const renderTextInput = (field) => {
    const {meta: {touched, error}, label, secureTextEntry, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
    return (
        <Item>
            <Label>{label}</Label>
            <Input
                onChangeText={onChange}
                maxLength={maxLength}
                placeholder={placeholder}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                label={label}
                {...restInput} />
            {(touched && error) && <Text>{error}</Text>}
        </Item>
    );
};

export default renderTextInput;
