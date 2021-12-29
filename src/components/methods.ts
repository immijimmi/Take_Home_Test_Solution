import { CryptoCurrency, Currency } from './enums';

interface RepeatCallback {
    (repeatCount: number): boolean | Promise<boolean>;
}

export class Methods {
    static truncateString(value: string, maxLength: number): string {
        return value.length > maxLength ? value.slice(0, maxLength - 3) + '...' : value;
    }

    static fiatToBigInt(value: string): bigint {
        return BigInt(Math.round(parseFloat(value) * 100));
    }

    static floatToBigInt(value: number): bigint {
        /*
            Some small accuracy may be lost generating this value, as the decimal component of
            the float will be rounded to allow conversion to bigint
        */

        return BigInt(Math.round(value));
    }

    static isCrypto(value?: Currency): boolean {
        if (value === undefined) return false;
        // TODO: This is pretty yikes but I can't seem to find an easier way to value check against string enums
        return Object.values(CryptoCurrency).includes(value as string as CryptoCurrency);
    }

    static moneyToString(value: bigint, currency: Currency): string {
        /*
            `value` should be passed an amount in the currency's lowest denomination.

            Some small accuracy may be lost generating this value, due to converting
            a decimal string with potentially many significant figures to a number primitive
        */
        const cryptoPrecision = 8;

        switch (currency) {
            case Currency.BTC:
                return `${parseFloat(Methods.divideByTens(value, 8)).toFixed(cryptoPrecision)} ${currency}`;
            case Currency.ETH:
                return `${parseFloat(Methods.divideByTens(value, 18)).toFixed(cryptoPrecision)} ${currency}`;
            case Currency.USD:
                return `$${parseFloat(Methods.divideByTens(value, 2)).toFixed(2)}`;
        }
    }

    static divideByTens(value: bigint, exponent: number): string {
        let valueStr = value.toString();
        if (exponent + 1 > valueStr.length) {
            // Add leading 0's as needed before placing decimal point
            valueStr = '0'.repeat(exponent + 1 - valueStr.length) + valueStr;
        }

        let result = valueStr.slice(0, valueStr.length - exponent) + '.' + valueStr.slice(valueStr.length - exponent);
        const reversedResultArray = result.split('').reverse();
        for (const char of reversedResultArray) {
            // Remove unnecessary 0's after the decimal (including the decimal point if only 0's follow it)
            if (['0', '.'].includes(char)) {
                result = result.slice(0, -1);
                if (char === '.') break;
            } else break;
        }

        return result;
    }

    static prettifyIsoString(value: string): string {
        return `${value.slice(0, 10).replaceAll('-', '/')} ${value.slice(11, 19)}`;
    }

    static async sleep(ms: number): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    static async repeatUntilSuccess(
        targetFunction: () => any,
        repeatDelay: number = 0,
        shouldContinue: RepeatCallback = (repeatCount) => true
    ): Promise<any> {
        let result;

        let repeats = 0;
        while (await shouldContinue(repeats)) {
            repeats += 1;

            try {
                result = await targetFunction();
                break;
            } catch (error) {
                console.error(error);

                await Methods.sleep(repeatDelay);
            }
        }

        return result;
    }
}
