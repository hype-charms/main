import { Currency } from "@hype-charms/types";

/** 
 * 
 * @param amount unit_amount
 * @param currency currency type
 * @param quantity amount of units being calculated
 * @returns 
 */
export const formatPrice = (amount: number, currency: Currency, quantity: number) => {
    const numberFormat = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        currencyDisplay: 'symbol',
    });
    const parts = numberFormat.formatToParts(amount);
    let zeroDecimalCurrency = true;
    for (const part of parts) {
        if (part.type === 'decimal') {
            zeroDecimalCurrency = false;
        }
    }
    amount = zeroDecimalCurrency ? amount : amount / 100;
    const total = (quantity * amount).toFixed(2) as unknown as bigint;
    return numberFormat.format(total);
};