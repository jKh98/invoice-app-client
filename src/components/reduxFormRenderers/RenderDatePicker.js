import {DatePicker, Item, Label, Text, View} from 'native-base';
import React from 'react';

const renderDatePicker = (fields) => {
    const {input, placeholder, defaultValue, meta: {touched, error}, label, ...custom} = fields;
    return (
        <Item style={{flex: 1}}>
            <Label>{label}</Label>
            <DatePicker {...input} {...custom}
                        dateForm="MM/DD/YYYY"
                        onDateChange={(value) => input.onChange(value)}
                        autoOk={true}
                        defaultDate={input.value ? input.value : null}
                        style={{width: '100%'}}/>
            {touched && error && <Text style={{color: '#f32013'}}>{error}</Text>}
        </Item>
    );
};
export default renderDatePicker;
