export const isNullOrUndefined = (value) => value === null || value === undefined;
export const capitalizeFirstLetter = (value) => value.charAt(0).toUpperCase() + value.slice(1, );

export const joinValidElements = (elements, separator = ' ') => elements.filter(element => element).join(separator) || '';