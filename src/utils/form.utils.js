export function validateRequiredField(fieldName, value) {
    return !value ? `${fieldName} is required.` : undefined;
}

export function validateEmailField(value){
    return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? "Invalid email address.": undefined;
}


export function validatePhoneField(value){
    return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? "Invalid phone number.": undefined;
}
