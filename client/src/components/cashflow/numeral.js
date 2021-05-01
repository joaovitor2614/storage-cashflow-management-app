
import numeral from 'numeral'
export function numeralConfig() {

    const config = numeral.register('locale', 'br', {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function (number) {
            return number === 1 ? 'real' : 'reais';
        },
        currency: {
            symbol: 'R$'
        }
    });
    return config
}
