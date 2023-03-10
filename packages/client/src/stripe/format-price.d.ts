import { Currency } from "@hype-commerce/types";
/**
 *
 * @param amount unit_amount
 * @param currency currency type
 * @param quantity amount of units being calculated
 * @returns
 */
export declare const formatPrice: (amount: number, currency: Currency, quantity: number) => string;
