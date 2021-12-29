export interface PricesData {
    BTC: number;
    ETH: number;
}

export interface BtcTransactionData {
    from: string;
    to: string;
    insertedAt: number;
    amount: bigint;
    state: 'CONFIRMED' | 'PENDING';
    type: 'sent' | 'received';
    hash: string;
}

export interface EthTransactionData {
    from: string;
    to: string;
    insertedAt: number;
    amount: bigint;
    state: 'CONFIRMED' | 'PENDING';
    type: 'sent' | 'received';
    hash: string;
}

export interface CustodialTransactionData {
    createdAt: string;

    /*
        If this type check fails,
        new logic must be added to handle whatever new exchange currency the API has provided
    */
    pair: 'USD-BTC' | 'BTC-USD' | 'USD-ETH' | 'ETH-USD';

    state: 'PENDING' | 'FINISHED';
    fiatValue: string;

    /*
        If this type check fails,
        new logic must be added to handle whatever new fiat currency the API has provided
    */
    fiatCurrency: 'USD';
    id: string;
}

export type AnyTransactionData = BtcTransactionData | EthTransactionData | CustodialTransactionData;
