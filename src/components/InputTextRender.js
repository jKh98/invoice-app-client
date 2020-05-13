import {Text, View} from 'react-native';
import React from 'react';

export default (field) => {
    const {meta: {touched, error}, label, secureTextEntry, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
    return (
        <View>
            <InputText
                onChangeText={onChange}
                maxLength={maxLength}
                placeholder={placeholder}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                label={label}
                {...restInput} />
            {(touched && error) && <Text>{error}</Text>}
        </View>
    );
};
