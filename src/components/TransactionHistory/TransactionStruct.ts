import { CurrencyExchangeOverview } from '../interfaces';
import { Currency } from '../enums';
import { Methods } from '../methods';
import { TransactionDetails } from '../interfaces';
import { TransactionSource } from './enums';
import {
    PricesData,
    BtcTransactionData,
    EthTransactionData,
    CustodialTransactionData,
    AnyTransactionData,
} from './interfaces';

class TransactionStruct implements TransactionDetails {
    readonly from?: string;
    readonly to?: string;
    readonly createdAt: string;
    readonly isComplete: boolean;
    readonly usdAmount: bigint;
    readonly cryptoAmount: bigint;
    readonly exchangeOverview: CurrencyExchangeOverview;
    readonly id: string;

    constructor(transactionData: AnyTransactionData, transactionSource: TransactionSource, pricesData: PricesData) {
        switch (transactionSource) {
            case TransactionSource.BTC_NONCUSTODIAL:
                const dataAsBtcTransaction = transactionData as BtcTransactionData;

                this.from = dataAsBtcTransaction.from;
                this.to = dataAsBtcTransaction.to;
                this.createdAt = Methods.prettifyIsoString(new Date(dataAsBtcTransaction.insertedAt).toISOString());
                this.isComplete = dataAsBtcTransaction.state === 'CONFIRMED';
                this.cryptoAmount = dataAsBtcTransaction.amount;
                this.usdAmount = Methods.floatToBigInt(
                    parseFloat(Methods.divideByTens(dataAsBtcTransaction.amount, 8)) * pricesData['BTC'] * 100
                );
                this.exchangeOverview = {
                    ...(dataAsBtcTransaction.type === 'received' && { in: Currency.BTC }),
                    ...(dataAsBtcTransaction.type === 'sent' && { out: Currency.BTC }),
                };
                this.id = dataAsBtcTransaction.hash;
                break;
            case TransactionSource.ETH_NONCUSTODIAL:
                const dataAsEthTransaction = transactionData as EthTransactionData;

                this.from = dataAsEthTransaction.from;
                this.to = dataAsEthTransaction.to;
                this.createdAt = Methods.prettifyIsoString(new Date(dataAsEthTransaction.insertedAt).toISOString());
                this.isComplete = dataAsEthTransaction.state === 'CONFIRMED';
                this.cryptoAmount = dataAsEthTransaction.amount;
                this.usdAmount = Methods.floatToBigInt(
                    parseFloat(Methods.divideByTens(dataAsEthTransaction.amount, 18)) * pricesData['ETH'] * 100
                );
                this.exchangeOverview = {
                    ...(dataAsEthTransaction.type === 'received' && { in: Currency.ETH }),
                    ...(dataAsEthTransaction.type === 'sent' && { out: Currency.ETH }),
                };
                this.id = dataAsEthTransaction.hash;
                break;
            case TransactionSource.CUSTODIAL:
                const dataAsCustodialTransaction = transactionData as CustodialTransactionData;

                this.createdAt = Methods.prettifyIsoString(dataAsCustodialTransaction.createdAt);
                this.isComplete = dataAsCustodialTransaction.state === 'FINISHED';
                this.usdAmount = Methods.fiatToBigInt(dataAsCustodialTransaction.fiatValue);

                const crypto: 'BTC' | 'ETH' = dataAsCustodialTransaction.pair.includes('BTC') ? 'BTC' : 'ETH';
                const cryptoDenominationMultiplier =
                    crypto === 'BTC' ? BigInt(100000000) : BigInt(100000000) * BigInt(10000000000);
                this.cryptoAmount =
                    (this.usdAmount * cryptoDenominationMultiplier) /
                    Methods.fiatToBigInt(pricesData[crypto].toString());

                const inCurrency: Currency = dataAsCustodialTransaction.pair.slice(4) as Currency;
                const outCurrency: Currency = dataAsCustodialTransaction.pair.slice(0, 3) as Currency;
                this.exchangeOverview = {
                    in: inCurrency,
                    out: outCurrency,
                };
                this.id = dataAsCustodialTransaction.id;
                break;
        }
    }

    match(query: string): false | keyof TransactionDetails {
        if (this.from?.toLowerCase().includes(query.toLowerCase())) return 'from';
        if (this.to?.toLowerCase().includes(query.toLowerCase())) return 'to';
        if (this.createdAt.startsWith(query)) return 'createdAt';
        if (query.toLowerCase() === 'pending' && !this.isComplete) return 'isComplete';
        return false;
    }
}

export default TransactionStruct;
