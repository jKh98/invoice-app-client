import {DatePicker, Item, Label} from 'native-base';
import React from 'react';
import moment from 'moment';

const renderDatePicker = ({ input, placeholder, defaultValue, meta: { touched, error }, label ,...custom }) => (
    <Item>
        <Label>{label}</Label>
        <DatePicker {...input} {...custom}
                    dateForm="MM/DD/YYYY"
                    onDateChange={(value) => input.onChange(value)}
                    autoOk={true}
                    defaultDate={input.value ? input.value : null} />
        {touched && error && <span>{error}</span>}
    </Item>
);
export default renderDatePicker;
