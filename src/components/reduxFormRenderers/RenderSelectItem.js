import React from 'react';
import {Picker} from 'native-base';

/**
 * Renders a native-base Picker component with options retrieved from a specified array of [{_id,_name,...}].
 *
 * @param onChange
 * @param value
 * @param inputProps
 * @param optionsArray
 * @param pickerProps
 * @returns {*}
 */
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


