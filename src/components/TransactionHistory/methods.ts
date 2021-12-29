import config from '../../config.json';
import { Methods as AppMethods } from '../methods';
import TransactionStruct from './TransactionStruct';
import { TransactionSource } from './enums';
import { PricesData, AnyTransactionData } from './interfaces';

export class Methods {
    static async getTransactionHistory(): Promise<TransactionStruct[]> {
        const result = [];
        const pollDelay = 1000;

        // Config shortcuts
        const dataSourceConfig = config.transactions.data_source;
        const transactionHistoryPaths = dataSourceConfig.paths.history;

        // Fetch prices data
        const pricesUrl = dataSourceConfig.root_url + dataSourceConfig.paths.prices;
        const pricesData: PricesData = await AppMethods.repeatUntilSuccess(
            () => Methods._fetchJson(pricesUrl),
            pollDelay
        );

        for (const pathKey in transactionHistoryPaths) {
            const pathKeyAsConfig = pathKey as keyof typeof transactionHistoryPaths;
            const pathKeyAsSource = pathKey as TransactionSource;

            const transactionHistoryUrl = dataSourceConfig.root_url + transactionHistoryPaths[pathKeyAsConfig];

            const responseData: AnyTransactionData[] = await AppMethods.repeatUntilSuccess(
                () => Methods._fetchJson(transactionHistoryUrl),
                pollDelay
            );
            for (const transactionData of responseData) {
                result.push(new TransactionStruct(transactionData, pathKeyAsSource, pricesData));
            }
        }

        return result;
    }

    static async _fetchJson(url: string): Promise<object> {
        const response = await fetch(url);
        const responseJson = await response.json();

        return responseJson;
    }
}
