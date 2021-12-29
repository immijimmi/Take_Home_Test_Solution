import config from '../../config.json';
import { Constants } from '../constants';
import { Currency } from '../enums';
import { TransactionDetails } from '../interfaces';
import componentStyles from '../component.module.css';
import styles from './currencyExchange.module.css';
import { Methods } from '../methods';

interface CurrencyExchangeProps {
    className?: string;
    data: TransactionDetails;
}

function CurrencyExchange({ className, data }: CurrencyExchangeProps) {
    let exchangeOverviewClass = data.exchangeOverview.in ? styles.currencyIn : styles.currencyOut;
    exchangeOverviewClass =
        data.exchangeOverview.in && data.exchangeOverview.out ? styles.currencyExchange : exchangeOverviewClass;

    let containerClassName = `${componentStyles.xyCenterChildren}`;
    containerClassName += ` ${componentStyles.baseFont}`;
    containerClassName += ` ${componentStyles.smallSpacedChildren}`;
    containerClassName += ` ${componentStyles.mediumGapChildren}`;
    containerClassName += ` ${componentStyles.mediumBorderRadius}`;
    containerClassName += ` ${styles.text}`;
    containerClassName += ` ${exchangeOverviewClass}`;
    containerClassName += ` ${className}`;

    let lineItemClassName = `${componentStyles.xyCenterChildren}`;

    const isCryptoCurrency = {
        in: Methods.isCrypto(data.exchangeOverview.in),
        out: Methods.isCrypto(data.exchangeOverview.out),
    };
    const isTwoWay = data.exchangeOverview.in && data.exchangeOverview.out;
    const amounts = {
        // If the transaction is one-way, the opposite key will be used to store the converted amount
        in: isCryptoCurrency.in ? data.cryptoAmount : data.usdAmount,
        out: isCryptoCurrency.out ? data.cryptoAmount : data.usdAmount,
    };

    /*
        Generate the string(s) that will be rendered;
        One string for a one-way transaction, two strings for a two-way transaction
    */
    let text: string[] = data.exchangeOverview.in
        ? [
              `+${Methods.moneyToString(amounts.in, data.exchangeOverview.in)} (${Methods.moneyToString(
                  amounts.out,
                  Currency.USD
              )})`,
          ]
        : [
              `-${Methods.moneyToString(amounts.out, data.exchangeOverview.out!)} (${Methods.moneyToString(
                  amounts.in,
                  Currency.USD
              )})`,
          ];
    text = isTwoWay
        ? [
              `${Methods.moneyToString(amounts.out, data.exchangeOverview.out!)}`,
              `${Methods.moneyToString(amounts.in, data.exchangeOverview.in!)}`,
          ]
        : text;

    return (
        <div className={containerClassName}>
            {isTwoWay && (
                <>
                    <div className={lineItemClassName}>{text[0]}</div>
                    <div className={lineItemClassName}>
                        <img
                            alt=""
                            src={config.resources.icons.arrow.exchange.bright}
                            height={Constants.INLINE_ICON_HEIGHT}
                        />
                    </div>
                    <div className={lineItemClassName}>{text[1]}</div>
                </>
            )}
            {!isTwoWay && <div className={lineItemClassName}>{text[0]}</div>}
        </div>
    );
}

export default CurrencyExchange;
