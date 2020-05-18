import React from 'react';
import {Item, Text, Icon, Picker} from 'native-base';

const renderSelectItem = ({input: {onChange, value, ...inputProps}, children, ...pickerProps}) => (
    <Picker selectedValue={value}
            onValueChange={value => onChange(value)}
            {...inputProps} {...pickerProps} >
        {children}
    </Picker>
);

export default renderSelectItem;


