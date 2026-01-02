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
