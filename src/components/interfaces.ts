import { Currency } from './enums';

export interface CurrencyExchangeOverview {
    in?: Currency;
    out?: Currency;
}

export interface TransactionDetails {
    from?: string;
    to?: string;
    createdAt: string;
    isComplete: boolean;
    // Currency amounts should be stored in their lowest denomination
    usdAmount: bigint;
    cryptoAmount: bigint;
    exchangeOverview: CurrencyExchangeOverview;
    id: string; // Whatever unique identifier the API provides per transaction
    match(query: string): false | keyof TransactionDetails;
}
