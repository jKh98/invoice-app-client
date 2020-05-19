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

export function validatePhoneField(value) {
    return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid phone number.' : undefined;
}

export function validatePositiveTimeDifference(issued, due) {
    return due < issued ? 'Due date should be after issuing' : undefined;
}
