import React from 'react';
import {Icon, Item, Label, Picker, Text} from 'native-base';

/**
 * Renders a native-base Picker component with options retrieved from a specified array of [{_id,_name,...}].
 *
 * @returns {*}
 * @param field
 */
const renderSelectOption = (field) => {
    const {meta: {touched, error}, input: {onChange, value, ...inputProps}, placeHolder, label, optionsArray, ...pickerProps} = field;
    return (
        <Item picker>
            {label && <Label>{label}</Label>}
            <Picker selectedValue={value}
                    iosIcon={<Icon name="arrow-down"/>}
                    onValueChange={value => onChange(value)}
                    {...inputProps} {...pickerProps} >
                <Picker.Item label={placeHolder} value={null}/>
                {optionsArray.map((option, i) => {
                    return <Picker.Item key={i}
                                        value={option._id}
                                        label={option.name}/>;
                })}
            </Picker>
            {(touched && error) && <Text style={{color: '#f32013'}}>{error}</Text>}
        </Item>

    );
};

export default renderSelectOption;


