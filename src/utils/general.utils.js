/**
 * Pads invoice number with zeros to attain a uniform invoice number width
 * @param num
 * @param places
 * @returns {string}
 */
export const zeroPad = (num, places) => String(num).padStart(places, '0');
