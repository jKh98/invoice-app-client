/**
 * Validates that issued ate is before due date
 *
 * @param issued
 * @param due
 * @returns {*}
 */
export function validatePositiveTimeDifference(issued, due) {
    return due < issued ? 'Due date should be after issuing' : undefined;
}

/**
 * validates a required field
 *
 * @param value
 * @returns {*}
 */
export const required = value => (value ? undefined : 'Required');

/**
 * validates an email field
 *
 * @param value
 * @returns {*}
 */
export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined;

/**
 * validates a number field
 *
 * @param value
 * @returns {*}
 */
export const number = value =>
    value && isNaN(Number(value)) ? 'Should be a number' : undefined;

/**
 * validates an integer field
 *
 * @param value
 * @returns {*}
 */
export const integer = value =>
    value && Number.isInteger(value) ? 'Should be an integer' : undefined;

/**
 * validates a phone field
 *
 * @param value
 * @returns {*}
 */
export const phone = value =>
    value && !/^[a-zA-Z0-9]{8,16}$/i.test(value)
        ? 'Invalid phone number'
        : undefined;

/**
 * Adds separators and currency symbol to a number
 *
 * @param input
 * @param currency
 * @returns {string}
 */
export const formatCurrency = (input, currency) => {
    if (!input) {
        return;
    }
    return (currency)
        .concat(input)
        .replace(/,/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Strips a currency formatted string from symbols
 *
 * @param val
 * @returns {string}
 */
export const normalizeCurrency = (val) => {
    if (!val) {
        return;
    }
    return (val)
        .replace(/\b(0(?!\b))+/g, '')
        .replace(/\D/g, '', '');
};
