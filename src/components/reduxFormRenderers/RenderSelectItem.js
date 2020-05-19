import React from 'react';
import {Picker, Label, Item, Icon} from 'native-base';

/**
 * Renders a native-base Picker component with options retrieved from a specified array of [{_id,_name,...}].
 *
 * @param onChange
 * @param value
 * @param inputProps
 * @param label
 * @param optionsArray
 * @param pickerProps
 * @returns {*}
 */
const renderSelectItem = ({input: {onChange, value, ...inputProps}, label, optionsArray, ...pickerProps}) => (
    <Item picker>
        {label && <Label>{label}</Label>}
        <Picker selectedValue={value}
                iosIcon={<Icon name="arrow-down"/>}
                onValueChange={value => onChange(value)}
                {...inputProps} {...pickerProps} >
            <Picker.Item label={'Select an option ...'} value={null}/>
            {optionsArray.map((option, i) => {
                return <Picker.Item key={i}
                                    value={option._id}
                                    label={option.name}/>;
            })}
        </Picker>
    </Item>
);

export default renderSelectItem;


