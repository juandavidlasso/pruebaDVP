export const formatDecimal = (
    value: number,
    locale: string = 'es-CO',
    decimals: number = 2
): string => {
    return new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(value);
};

export const formatNumericString = (value: string): string => {
    if (!value) return '';
    const digits = value.replace(/\D/g, '');
    return new Intl.NumberFormat('es-CO').format(Number(digits));
};

export const parseAmount = (value: string): number => {
    return Number(value.replace(/\D/g, ''));
};

export const formatDateMinus5Hours = (value: string | number) => {
    if (!value) return '';
    const date = new Date(Number(value));

    if (isNaN(date.getTime())) return 'Invalid date';

    date.setHours(date.getHours() - 5);

    return date.toLocaleString('es-CO', {
        dateStyle: 'short',
        timeStyle: 'short',
    });
};
