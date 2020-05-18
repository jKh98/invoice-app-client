import React from 'react';
import {Item, Text, Icon, Picker} from 'native-base';

const renderSelectItem = ({input: {onChange, value, ...inputProps}, optionsArray, ...pickerProps}) => (
    <Picker selectedValue={value}
            onValueChange={value => onChange(value)}
            {...inputProps} {...pickerProps} >
        {optionsArray.map((option, i) => {
            return <Picker.Item key={i}
                                value={option._id}
                                label={option.name}/>;
        })}
    </Picker>
);

export default renderSelectItem;


