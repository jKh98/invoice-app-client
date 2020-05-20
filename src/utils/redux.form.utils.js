export function validatePositiveTimeDifference(issued, due) {
    return due < issued ? 'Due date should be after issuing' : undefined;
}

export const required = value => (value ? undefined : 'Required');

export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined;

export const number = value =>
    value && isNaN(Number(value)) ? 'Should be a number' : undefined;

export const integer = value =>
    value && Number.isInteger(value) ? 'Should be an integer' : undefined;

export const phone = value =>
    value && !/^(0|[1-9][0-9]{9})$/i.test(value)
        ? 'Invalid phone number, should be 10 digits'
        : undefined;

export const formatCurrency = (input, currency) => {
    if (!input) {
        return;
    }

    return (currency)
        .concat(input)
        .replace(/,/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const normalizeCurrency = (val) => {
    if (!val) {
        return;
    }
    return (val)
        .replace(/\b(0(?!\b))+/g, '')
        .replace(/\D/g, '', '');
};
