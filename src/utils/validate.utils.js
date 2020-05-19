export function validateRequiredField(fieldName, value) {
    return !value ? `${fieldName} is required.` : undefined;
}

export function validateEmailField(value) {
    return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address.' : undefined;
}

export function validateNumberField(fieldName, value, min = null, max = null, integer = false) {
    if (!value) {
        return validateRequiredField(fieldName);
    }
    try {
        Number(value);
    } catch (e) {
        return `${fieldName} should be a number.`;
    }
    if (integer && !Number.isInteger(Number(value))) {
        return `${fieldName} should be an integer.`;
    }
    if (min && Number(value) < min) {
        return `${fieldName} should be greater than ${min}.`;
    }
    if (max && Number(value) > max) {
        return `${fieldName} should be less than ${max}.`;
    }
}

export function validatePositiveTimeDifference(issued, due) {
    return due < issued ? 'Due date should be after issuing' : undefined;
}

export const required = value => (value ? undefined : 'Required')

export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined

export const number = value =>
    value && isNaN(Number(value)) ? 'Should be a number' : undefined

export const integer = value =>
    value && Number.isInteger(value) ? 'Should be an integer' : undefined

export const phone = value =>
    value && !/^(0|[1-9][0-9]{9})$/i.test(value)
        ? 'Invalid phone number, should be 10 digits'
        : undefined

