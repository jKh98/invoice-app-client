import {DatePicker, Item, Label} from 'native-base';
import React from 'react';

const renderDatePicker = ({input, placeholder, defaultValue, meta: {touched, error}, label, ...custom}) => (
    <Item style={{flex: 1}}>
        <Label>{label}</Label>
        <DatePicker {...input} {...custom}
                    dateForm="MM/DD/YYYY"
                    onDateChange={(value) => input.onChange(value)}
                    autoOk={true}
                    defaultDate={input.value ? input.value : null}
                    style={{width: '100%'}}/>
        {touched && error && <span>{error}</span>}
    </Item>
);
export default renderDatePicker;
